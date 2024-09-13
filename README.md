# Weather App with React and TypeScript

This project is a weather application built with React and TypeScript. It allows users to search for weather information by city and country.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)
- [License](#license)

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **Vite**: A build tool that aims to provide a faster and leaner development experience for modern web projects.
- **Zod**: A TypeScript-first schema declaration and validation library.
- **Axios**: A promise-based HTTP client for the browser and Node.js.
- **ESLint**: A tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
- **CSS Modules**: A CSS file in which all class and animation names are scoped locally by default.

### Getting Started

To get a local copy up and running follow these simple steps.

#### Prerequisites

Make sure you have the following installed on your local machine:

- Node.js
- pnpm (or npm/yarn)

#### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/your_username/weather-app.git
2. Install PNPM packages
    pnpm install
3. Create a .env.local file in the root directory and add your OpenWeather API key
    VITE_API_KEY=your_openweather_api_key
##### Project Structure
```
/clima-react-ts
├── public
│   ├── index.html
├── src
│   ├── assets
│   ├── components
│   │   ├── WeatherCard.tsx
│   │   ├── SearchBar.tsx
│   ├── hooks
│   │   ├── useWeather.ts
│   ├── services
│   │   ├── weatherService.ts
│   ├── styles
│   │   ├── App.module.css
│   ├── App.tsx
│   ├── main.tsx
│   ├── vite-env.d.ts
├── .eslintrc.js
├── .gitignore
├── index.html
├── package.json
├── pnpm-lock.yaml
├── README.md
├── tsconfig.json
├── vite.config.ts
```

##### Available Scripts

In the project directory, you can run:

- `pnpm dev`: Runs the app in the development mode.
- `pnpm build`: Builds the app for production to the `dist` folder.
- `pnpm preview`: Serves the production build locally.
- `pnpm lint`: Runs ESLint to analyze the code for potential errors and style issues.
```