# Robotics Engineer Portfolio

A responsive React and Vite portfolio for Armaan Shaikh, styled with Tailwind CSS and custom CSS. Framer Motion is used for subtle scroll reveals, Three.js is installed for future interactive 3D work, and Lucide React provides interface icons.

## Run locally

1. Install Node.js LTS if it is not already installed.
2. Open this folder in a terminal.
3. In PowerShell, run `npm.cmd install` once.
4. Run `npm.cmd run dev`.
5. Open the local URL printed by Vite, usually `http://localhost:5173`.

Use `npm.cmd run build` to create a production build in `dist/`.

## Update portfolio information

- Edit `src/data/portfolio.js` to update the name, subtitle, CV path, email, social profile URLs, skills, projects, and mechanical-design labels.
- Add the CV PDF under `public/` and set `portfolio.cv` to its public path (for example, `/Armaan-Shaikh-CV.pdf`) to enable the download buttons.
- Add project images and replace each project image placeholder in `src/App.jsx` when the real project visuals are available.
- Replace the mechanical-design placeholders in `src/App.jsx` with CAD images, drawings, assemblies, or calculations when ready.
- Update project descriptions, technologies, GitHub URLs, and demo URLs in `src/data/portfolio.js` with verified details. No project results or specifications are assumed.

## Main folders

- `src/App.jsx` — page sections and reusable UI components
- `src/App.css` — portfolio styling and responsive layouts
- `src/data/portfolio.js` — editable personal and project information
- `public/` — static assets such as the CV and site icon
