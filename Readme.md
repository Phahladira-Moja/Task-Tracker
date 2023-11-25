# Task Tracker Application

This application is designed exclusively for tracking an individuals tasks.

## Running Locally

### Prerequisites

Make sure you have the following installed:

- Git
- Node.js
- MongoDB (Local or Remote)

### Installation

1. Clone the repository and install dependencies:

   ```bash
   git clone [repository_url]
   cd task-tracker
   cd client
   npm install
   cd ../server
   npm install
   ```

2. Modify the `.env` file:

   Create a `.env` file in the `server` folder. Add the following variables:

   - `PORT` (Set the PORT to 8000)
   - `JWT_KEY`
   - `DATABASE_URL` (Your connection string - which can either be local or remote)

3. Start the server (Ensure the server starts before the client):

   ```bash
   cd server
   npm run dev
   ```

4. Start the client:

   ```bash
   cd ../client
   npm run dev
   ```

## Thoughts & Comments

- **Backend Approach:** Implemented a clean architecture with a repository pattern for data access. Utilized Prisma as the ORM for MongoDB instead of mongoose.
- **Authentication:** Added authentication to allow each user personalized use of the application. JWT tokens are used for proper authentication post-login, ensuring user information is not stored on the frontend.

- **Server Production Readiness:** Integrated packages for production readiness, including CORS for API querying, express rate limiter to prevent abuse of API endpoints, helmet for security headers, morgan for request logging, and Winston for error logging, winston also creates log file on server for auditing purposes.

- **Frontend Technologies:** Chose Shadcn as the component library alongside Tailwind CSS for seamless functionality development. Shadcn's modular approach allows for selective installation and customization of components.

- **Search Filter Feature:** Implemented a basic search filter on the frontend to filter and search tasks retrieved from the backend, assuming users may have a substantial number of tasks.

## Problems & Solutions

- **Token Validation Issue:** Encountered problems with axios when handling JWT validation, causing errors instead of graceful failure. Switched to using fetch to handle token validation gracefully.
