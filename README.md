# Manish Suthar - Developer Portfolio
[![Ask DeepWiki](https://devin.ai/assets/askdeepwiki.png)](https://deepwiki.com/manishsuthar01/manish-dev-portfolio)

This repository contains the source code for my personal developer portfolio. It's a full-stack MERN application featuring a dynamic content management system for projects and blog posts, a secure admin dashboard, and a modern, animated frontend built with React and Vite.

## Tech Stack

-   **Backend**: Node.js, Express, MongoDB, Mongoose, JWT (Authentication), Zod (Validation), Cloudinary (Image Hosting), Multer (File Uploads), Helmet (Security), Express Rate Limit.
-   **Frontend**: React, Vite, Tailwind CSS, GSAP (GreenSock Animation Platform), Framer Motion, Lenis (Smooth Scrolling), React Router, Recharts.

## Features

-   **Dynamic Content Management**: Full CRUD capabilities for projects and blog articles through a secure admin dashboard.
-   **Secure Admin Panel**: Role-based access control with JWT authentication. The dashboard provides an analytics overview, project management, and blog management functionalities.
-   **Rich Frontend Experience**: A highly polished user interface featuring complex animations with GSAP and Framer Motion, and smooth scrolling provided by Lenis.
-   **Project Showcase**: A dedicated section to display work, with individual detail pages for each project.
-   **Personal Blog**: A complete blogging platform to share insights and articles, with content managed from the admin panel.
-   **Cloud Media Uploads**: Seamless image uploads for blog posts and projects are handled via Multer and hosted on Cloudinary.
-   **API Rate Limiting**: Implemented to prevent abuse of authentication and admin API endpoints.

## Project Structure

The repository is organized into a monorepo-like structure with two main directories: `backEnd` and `frontend`.

```
/
├── backEnd/
│   ├── db/              # Mongoose models (User, Blog, Project)
│   ├── modules/         # Feature-sliced logic (auth, admin, blog, project)
│   ├── middleware/      # Auth, role checks, rate limiting, file uploads
│   ├── routes/          # Main API routes
│   └── server.js        # Express server entry point
└── frontend/
    ├── src/
    │   ├── components/  # Reusable UI components
    │   ├── features/    # Logic and components sliced by feature
    │   ├── layouts/     # Public and Dashboard layout components
    │   ├── pages/       # Top-level page components
    │   └── context/     # Global state management (Auth, Loading)
    └── vite.config.js   # Vite configuration with proxy for the backend
```

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

-   Node.js (v18.0.0 or higher)
-   npm
-   A running MongoDB instance (local or a cloud service like MongoDB Atlas)

### Installation & Setup

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/manishsuthar01/manish-dev-portfolio.git
    cd manish-dev-portfolio
    ```

2.  **Configure Environment Variables:**
    Create a `.env` file in the root of the project and populate it with the following:
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_KEY=your_secret_jwt_

    # Cloudinary credentials for image uploads
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    ```

3.  **Install Dependencies:**
    The root `package.json` is configured to install dependencies for both the backend and frontend.
    ```bash
    npm install
    ```

5.  **Run the Application:**

    -   **Development Mode:**
        Run the backend and frontend servers concurrently in separate terminals.
        ```bash
        # Terminal 1: Start the backend server (from the root directory)
        npm run server

        # Terminal 2: Start the frontend dev server (from the frontend directory)
        cd frontend
        npm run dev
        ```
        The frontend will be available at `http://localhost:3000`, which proxies API requests to the backend server at `http://localhost:5000`.

    -   **Production Mode:**
        This command builds the frontend application and then starts the production server, which serves the static build.
        ```bash
        # From the root directory
        npm run build
        npm start
        ```
        The application will be available at `http://localhost:5000`.
