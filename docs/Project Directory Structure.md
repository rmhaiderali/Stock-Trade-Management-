# Project Directory Structure Documentation

This document provides an overview of the directory structure of the project, detailing the purpose of each file and folder. 

## Root Directory

- **.env**
  - Contains environment variables for development.
  - Should be kept secure and not committed to version control.
- **.env.example**
  - An example environment variables file.
  - Should be committed to version control to serve as a template for other developers.

## src Directory

The `src` directory contains the source code for both the backend and frontend of the application.

### src/backend

The `backend` directory contains all the server-side code.

- **app.js**
  - The main application file that sets up the Express server, middleware, and routes.
- **index.js**
  - The entry point for the backend application, which starts the server.

#### src/backend/config

- **database.js**
  - Contains configuration and connection logic for the database.

#### src/backend/controllers

This directory contains the controller files, which handle the business logic for different routes.

  - Individual controller files (e.g., `signIn.controller.js`, `signUp.controller.js`) for handling specific sets of routes and business logic.

#### src/backend/middlewares

This directory contains middleware functions used in the application.

  - Individual middleware files (e.g., `queryUser.middleware.js`) for processing requests before they reach the controllers.

#### src/backend/models

This directory contains the Mongoose models for interacting with the MongoDB database.

  - Individual model files (e.g., `user.model.js`) defining the schema and methods for each collection.

#### src/backend/utils

This directory contains utility functions and helpers.

  - Individual utility files (e.g., `formatResponse.js`) for reusable functions across the application.

### src/frontend

The `frontend` directory contains all the client-side code.

- **App.jsx**
  - The main React component that serves as the entry point for the application UI.
- **index.css**
  - The main CSS file for styling the frontend.
- **main.jsx**
  - The entry point for the React application, rendering the `App` component and setting up any necessary context providers.

#### src/frontend/Components

This directory contains reusable React components.

  - Individual component files (e.g., `Navbar.jsx`, `Footer.jsx`, `Home.jsx`) for building the UI.