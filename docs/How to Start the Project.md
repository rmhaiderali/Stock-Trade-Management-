# How to Start the Project

This guide will help you set up and start the project, both for development and production environments.

## Steps to Start the Project

### 1. Clone the Repository
First, you need to clone the repository to your local machine. Open your terminal and run the following command:
```bash
git clone <repository-url>
```
Replace `<repository-url>` with the actual URL of the repository.

### 2. Install Dependencies
Navigate to the project directory and install the necessary dependencies using npm:
```bash
cd <project-directory>
npm install
```
This will install all the packages listed in the `package.json` file.

### 3. Create a .env File
Create a `.env` file in the root directory of the project. This file will hold all your environment variables.

### 4. Copy Template from .env.example
Copy the content from the `.env.example` file to your newly created `.env` file:
The `.env.example` file contains the template of the environment variables needed for the project.

### 5. Add Values Corresponding to Variables
Open the `.env` file and add the appropriate values for each variable. For example:
```plaintext
JWT_SECRET_KEY=your_jwt_secret_key
OPENAI_API_KEY=your_openai_api_key
PLAID_CLIENT_ID=your_plaid_client_id
PLAID_SECRET=your_plaid_secret
POLYGON_API_KEY=your_polygon_api_key
MONGODB_URI=mongodb://localhost:27017/myapp
PORT=4000
```
- **JWT_SECRET**: A secret key for JWT authentication.
- **OPENAI_API_KEY**: Your Open AI API key.
- **PLAID_CLIENT_ID**: Your Plaid client ID.
- **PLAID_SECRET**: Your Plaid secret key.
- **POLYGON_API_KEY**: Your Polygon API key.
- **MONGODB_URI**: The URL of your MongoDB database.
- **PORT**: The port number on which the server will run.

### 6. Start the Server
You can start the server in either development or production mode:

#### Development Server
To start the development server, run:
```bash
npm run dev
```
This will start the server with development settings and enable features like hot-reloading.

#### Production Server
To start the server in production mode, run:
```bash
npm run start
```
This will start the server with production settings.

## Summary
1. **Clone the Repository**: `git clone <repository-url>`
2. **Install Dependencies**: `npm install`
3. **Create a .env File**: `touch .env`
4. **Copy Template from .env.example**: `cp .env.example .env`
5. **Add Values Corresponding to Variables**: Edit the `.env` file with appropriate values.
6. **Start the Server**: 
   - Development: `npm run dev`
   - Production: `npm run start`

By following these steps, you will have the project up and running on your local machine. Make sure to configure your environment variables correctly to ensure proper operation of the application.