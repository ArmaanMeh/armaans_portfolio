# Robotics Engineer Portfolio

A responsive React and Vite portfolio for Armaan Shaikh, styled with Tailwind CSS and custom CSS. Framer Motion is used for subtle scroll reveals, Three.js provides a configurable GLB/GLTF viewer, and Lucide React provides interface icons.

## Run locally

1. Install Node.js LTS if it is not already installed.
2. Open this folder in a terminal.
3. In PowerShell, run `npm.cmd install` once.
4. Run `npm.cmd run dev`.
5. Open the local URL printed by Vite, usually `http://localhost:5173`.

Use `npm.cmd run build` to create a production build in `dist/`.

## Update portfolio information

- Edit `src/data/portfolio.js` to update recruiter details, the CV path, email, employment and education entries, projects, and design media.
- To publish a CV download, add the intended PDF under `public/` and set `portfolio.cv` to its public path (for example, `/Armaan-Shaikh-CV.pdf`). The link is intentionally unset until a public copy is chosen.
- Add project visuals with each project's `image`, `imageAlt`, `imageCaption`, and optional `gallery` fields. Existing evidence-backed media can be enlarged from the project cards and case studies; projects with no source image retain an explicit placeholder.
- Add original mechanical portfolio media by setting each `designAreas` entry's `image` and optional downloadable `file` fields. The seven categories are ready for chassis, assemblies, CAD components, drawings, exploded views, calculations, and FEA/simulation evidence.
- Employment, education, academic focus, and personal engineering projects are configured separately under `portfolio.experience`.
- Case-study technical content is keyed by project id in `portfolio.caseStudies`. Keep claims tied to the linked source material and state when a result, sensor, implementation detail, or test is not documented.
- To enable the 3D viewer, place a SolidWorks-exported `.glb` or `.gltf` asset in `public/` and set `portfolio.robotModel.src` to its public URL (for example, `/models/robot.glb`). The existing hero illustration remains visible while no model is configured. Named meshes, or meshes with a `userData.label`, appear in the component selector.

## Main folders

- `src/App.jsx` — page sections and reusable UI components
- `src/components/RobotModelViewer.jsx` — modular Three.js GLB/GLTF viewer
- `src/App.css` — portfolio styling and responsive layouts
- `src/data/portfolio.js` — editable personal and project information
- `public/` — static assets such as the CV and site icon
