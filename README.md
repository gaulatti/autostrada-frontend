# Autostrada

A modern **React** and **TypeScript** application built with **Vite** that powers the Autostrada dashboard. The project delivers a dynamic frontend interface featuring robust state management with Redux and Redux Saga, seamless authentication through AWS Amplify, and feature flag support for phased rollouts. The UI leverages **Radix UI Themes** and **Tailwind CSS** for an appealing and responsive design. 🚀

---

## Introduction

Autostrada is a web performance monitoring platform that allows users to track and analyze the performance of their websites over time. The frontend provides a comprehensive dashboard for viewing performance metrics, managing scans, and analyzing website performance data collected via Google PageSpeed Insights and Lighthouse reports.

Key features of the frontend include:

- A **responsive user interface** that supports dynamic routing using React Router
- Comprehensive **authentication** flows powered by AWS Amplify and Cognito
- Data-management interfaces including interactive **data tables**, detailed reports, and dashboards
- A structured state management system with Redux and Redux Saga to handle asynchronous operations and global state changes
- **Feature flag management** to progressively release new functionalities

This repository is the frontend counterpart of the Autostrada platform and is tightly integrated with the backend service for fetching and displaying scan data, user teams, project information, and more. The project architecture ensures scalability, ease of maintenance, and enhanced user experience.

---

## Features

- **User Authentication**

  - Sign in and sign out mechanisms using AWS Cognito (configured in the root and API client modules)
  - Utilizes hooks such as `useAuthStatus` and `useLogout` for accessing authentication status

- **Dynamic Routing**

  - Routes are defined using React Router and include both public and private layouts
  - The router configuration covers pages for scans, targets, and authentication

- **Redux State Management**

  - Global state is managed through Redux, enhanced with Redux Saga for side effects
  - Reducers and dispatchers handle user data, teams, feature flags, and lifecycle events

- **Data Tables and Pagination**

  - Interactive data tables are built with @tanstack/react-table
  - Tables support sorting, pagination, and dynamic fetching via custom hooks using Axios
  - Pages for clusters, providers, projects, and URLs include data tables for detailed reporting

- **Theming and UI Components**

  - Components use Radix UI Themes combined with Tailwind CSS for a modern look and feel
  - A collapsible sidebar navigation and header components are included for easy access to different functionalities.

- **Feature Flags**

  - Custom hook `useFeatureFlags` allows conditional rendering of features for phased openings.
  - This mechanism enables controlled rollouts and A/B testing of new features.

- **Vite Build Tool Integration**
  - The project uses Vite with plugins such as TailwindCSS, React Router, and tsconfig paths for an improved developer experience.
  - Fast module hot-reloading and optimized production builds are supported.

---

## Installation

Follow these steps to set up and run the project on your local machine:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/gaulatti/autostrada-frontend.git
   cd autostrada-frontend
   ```

2. **Install Dependencies**

   Use npm (or yarn/pnpm) to install project dependencies:

   ```bash
   npm install
   ```

3. **Environment Setup**

   Create a `.env` file at the root of the project and define the required environment variables. See the [Configuration](#configuration) section for more details.

4. **Run the Development Server**

   Start the Vite development server:

   ```bash
   npm run dev
   ```

5. **Build for Production**

   Use the following command to create a production build:

   ```bash
   npm run build
   ```

6. **Preview the Production Build**

   To preview the production build locally:

   ```bash
   npm run preview
   ```

---

## Requirements

Before installing, ensure your environment meets the following requirements:

| **Component**    | **Version/Requirement**                               | **Notes**                                  |
| ---------------- | ----------------------------------------------------- | ------------------------------------------ |
| **Node.js**      | >= 14.x                                               | Latest LTS versions recommended            |
| **npm**          | >= 6.x                                                | Or yarn / pnpm alternative                 |
| **TypeScript**   | Integrated with project (configured in tsconfig.json) |                                            |
| **Vite**         | Bundler used by the project                           | Fast and optimized build tool              |
| **React**        | Version 18+                                           | Modern React features are utilized         |
| **AWS Amplify**  | Configured via environment variables                  | Used for authentication via Amazon Cognito |
| **Tailwind CSS** | Used for styling                                      | Ensure PostCSS compatible toolchain        |

Make sure your system has these installed to run and build the project successfully.

---

## Usage

After installation, you can:

- **Run the App Locally:**  
  Launch the development server with hot-reloading using `npm run dev`. This allows you to work on your features immediately.

- **Access Different Sections:**  
  Use the sidebar and navigation menus to explore sections such as Scans, Targets, Platforms, Providers, and Projects. Each section includes detailed data tables with interactive pagination, sorting, and additional reporting features.

- **API Integration:**  
  The frontend communicates with backend endpoints through a custom API client that leverages Axios. Endpoints are dynamically determined using environment variables like `VITE_API_FQDN` or `VITE_API_PORT`.

- **Authentication Flow:**  
  Authentication is handled via AWS Cognito. Users sign in, and their session is managed by hooks that trigger Redux sagas to fetch initial user data and setup the application state.

---

## Configuration

The project requires several environment variables to configure authentication, API endpoints, and other functionalities. The main configuration file is the Vite configuration, which integrates plugins such as Tailwind CSS, React Router, and tsconfig paths.

Key configuration variables include:

- **Authentication Settings:**

  - `VITE_COGNITO_USER_POOL_ID`
  - `VITE_COGNITO_CLIENT_ID`
  - `VITE_USER_POOL_DOMAIN`
  - `VITE_FQDN`  
    These variables are used to configure AWS Amplify in the root module and ensure that OAuth flows are enabled for production deployments.

- **API Endpoints:**
  - `VITE_API_FQDN` – The fully qualified domain name of the API server.
  - `VITE_API_PORT` – The local API port if no fqdn is provided.
- **Theming and Styling:**
  - Tailwind CSS variables and custom configurations are maintained within the project’s styling files.
  - Check the Tailwind config (integrated via the Vite plugin) for further customizations. 

To change any of these settings, update the `.env` file with the appropriate values. Make sure to restart the development server after making changes.

---

## Contributing

Contributions are warmly welcome! If you would like to contribute to the Autostrada Frontend project, please follow these guidelines:

- **Fork and Clone:**  
  Fork the repository and clone your fork locally.

- **Create Feature Branches:**  
  Always create a feature branch for your contributions instead of committing directly to the main branch.

- **Code Style & Quality:**  
  Adhere to the established code style using TypeScript, React best practices, and Tailwind CSS conventions.  
  Ensure that your changes are well-documented using inline comments and clear commit messages.

- **Pull Requests:**  
  Submit a pull request with a clear description of the changes and reference any related issues.  
  Make sure to address any feedback from maintainers promptly.

- **Testing:**  
  Ensure that new features include proper testing and that existing functionalities are not broken.

- **Documentation:**  
  Update the README and any relevant documentation with your proposed changes to help future developers understand your modifications.

We value community contributions and review all submitted pull requests with care, ensuring that the platform remains robust and maintainable.

---

Happy coding! 💻✨

If you have any questions or need assistance, feel free to open an issue in the repository.
