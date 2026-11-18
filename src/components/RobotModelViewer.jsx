import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

function disposeModel(root) {
  root.traverse((object) => {
    if (!object.isMesh) return
    object.geometry?.dispose()
    const materials = Array.isArray(object.material) ? object.material : [object.material]
    materials.filter(Boolean).forEach((material) => {
      Object.values(material).forEach((value) => {
        if (value?.isTexture) value.dispose()
      })
      material.dispose()
    })
  })
}

function getComponentLabel(object, index) {
  return object.userData.label || object.name || `Component ${index + 1}`
}

export default function RobotModelViewer({ src, format = 'glb' }) {
  const containerRef = useRef(null)
  const [status, setStatus] = useState('loading')
  const [progress, setProgress] = useState(0)
  const [components, setComponents] = useState([])
  const [selectedComponent, setSelectedComponent] = useState('')
  const [selectedLabel, setSelectedLabel] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const sceneRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return undefined

    let disposed = false
    let modelRoot = null
    let resizeObserver = null
    const scene = new THREE.Scene()
    sceneRef.current = scene
    scene.background = new THREE.Color('#091722')

    const width = Math.max(container.clientWidth, 1)
    const height = Math.max(container.clientHeight, 1)
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.01, 1000)
    camera.position.set(2.4, 1.7, 3.2)

    let renderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
    } catch (error) {
      sceneRef.current = null
      const message = error instanceof Error ? error.message : 'WebGL is unavailable in this browser.'
      window.setTimeout(() => {
        if (disposed) return
        setErrorMessage(message)
        setStatus('error')
      }, 0)
      return () => {
        disposed = true
        sceneRef.current = null
      }
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.setSize(width, height)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.domElement.setAttribute('aria-label', 'Interactive 3D robot model')
    container.appendChild(renderer.domElement)

    scene.add(new THREE.HemisphereLight(0xd9efff, 0x182634, 2.2))
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4)
    keyLight.position.set(3, 5, 4)
    scene.add(keyLight)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = false
    controls.enablePan = true
    controls.addEventListener('change', render)

    function render() {
      if (!disposed) renderer.render(scene, camera)
    }

    function resize() {
      const nextWidth = Math.max(container.clientWidth, 1)
      const nextHeight = Math.max(container.clientHeight, 1)
      camera.aspect = nextWidth / nextHeight
      camera.updateProjectionMatrix()
      renderer.setSize(nextWidth, nextHeight)
      render()
    }

    function selectObject(object, label) {
      setSelectedComponent(object.uuid)
      setSelectedLabel(label)
      container.dataset.selectedComponent = label
      render()
    }

    function selectFromCanvas(event) {
      if (!modelRoot) return
      const bounds = renderer.domElement.getBoundingClientRect()
      const pointer = new THREE.Vector2(
        ((event.clientX - bounds.left) / bounds.width) * 2 - 1,
        -((event.clientY - bounds.top) / bounds.height) * 2 + 1,
      )
      const raycaster = new THREE.Raycaster()
      raycaster.setFromCamera(pointer, camera)
      const intersections = raycaster.intersectObject(modelRoot, true)
      const selected = intersections[0]?.object
      if (!selected) return
      const index = loadedComponents.findIndex((component) => component.id === selected.uuid)
      selectObject(selected, getComponentLabel(selected, Math.max(index, 0)))
    }

    let loadedComponents = []
    renderer.domElement.addEventListener('pointerup', selectFromCanvas)
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(resize)
      resizeObserver.observe(container)
    } else {
      window.addEventListener('resize', resize)
    }
    resize()
    const loader = new GLTFLoader()
    loader.load(
      src,
      (gltf) => {
        if (disposed) {
          disposeModel(gltf.scene)
          return
        }
        modelRoot = gltf.scene
        const bounds = new THREE.Box3().setFromObject(modelRoot)
        const size = bounds.getSize(new THREE.Vector3())
        const center = bounds.getCenter(new THREE.Vector3())
        const maxDimension = Math.max(size.x, size.y, size.z)
        if (!Number.isFinite(maxDimension) || maxDimension <= 0) {
          setErrorMessage('The model contains no visible geometry.')
          setStatus('error')
          setProgress(0)
          return
        }

        modelRoot.position.sub(center)
        scene.add(modelRoot)
        const distance = maxDimension * 2.2
        camera.position.set(distance, distance * 0.72, distance)
        camera.near = Math.max(maxDimension / 1000, 0.001)
        camera.far = maxDimension * 100
        camera.updateProjectionMatrix()
        controls.target.set(0, 0, 0)
        controls.minDistance = maxDimension * 0.35
        controls.maxDistance = maxDimension * 8
        controls.update()

        const foundComponents = []
        modelRoot.traverse((object) => {
          if (object.isMesh) foundComponents.push(object)
        })
        loadedComponents = foundComponents
        setComponents(foundComponents.map((object, index) => ({
          id: object.uuid,
          label: getComponentLabel(object, index),
        })))
        setStatus('ready')
        setProgress(100)
        render()
      },
      (event) => {
        if (disposed) return
        if (event.total > 0) setProgress(Math.round((event.loaded / event.total) * 100))
      },
      (error) => {
        if (disposed) return
        setStatus('error')
        setProgress(0)
        setErrorMessage(error instanceof Error ? error.message : 'The model file could not be loaded.')
      },
    )

    return () => {
      disposed = true
      resizeObserver?.disconnect()
      window.removeEventListener('resize', resize)
      sceneRef.current = null
      controls.removeEventListener('change', render)
      controls.dispose()
      renderer.domElement.removeEventListener('pointerup', selectFromCanvas)
      renderer.dispose()
      if (modelRoot) disposeModel(modelRoot)
      renderer.domElement.remove()
    }
  }, [src])

  return (
    <div className="robot-viewer" aria-label="Interactive GLB or GLTF robot model viewer">
      <div className="robot-viewer-topline">
        <span className="status-dot" />
        <span>INTERACTIVE ROBOT MODEL</span>
      </div>
      <div className="robot-viewer-stage" ref={containerRef}>
        {status === 'loading' && (
          <div className="robot-viewer-state" role="status">
            <span className="status-dot" />
            <span>Loading robot model{progress > 0 ? ` · ${progress}%` : '…'}</span>
          </div>
        )}
        {status === 'error' && (
          <div className="robot-viewer-state robot-viewer-error" role="alert">
            <strong>Unable to load the 3D model.</strong>
            <span>{errorMessage || 'Check that the configured URL points to a valid GLB or GLTF file.'}</span>
          </div>
        )}
      </div>
      <div className="robot-viewer-controls">
        <p>Drag to rotate · Scroll or pinch to zoom</p>
        {components.length > 0 && (
          <label>
            <span>Robot component</span>
            <select
              value={selectedComponent}
              onChange={(event) => {
                const component = components.find((item) => item.id === event.target.value)
                if (!component) return
                const selected = sceneRef.current?.getObjectByProperty('uuid', component.id)
                if (selected) {
                  setSelectedComponent(component.id)
                  setSelectedLabel(component.label)
                  if (containerRef.current) containerRef.current.dataset.selectedComponent = component.label
                }
              }}
            >
              <option value="">Select a component</option>
              {components.map((component) => <option value={component.id} key={component.id}>{component.label}</option>)}
            </select>
          </label>
        )}
        {selectedLabel && <span className="robot-viewer-selected" aria-live="polite">Selected: {selectedLabel}</span>}
        <span className="robot-viewer-format">{format.toLowerCase() === 'gltf' ? 'GLTF' : 'GLB / GLTF'}</span>
      </div>
    </div>
  )
}
