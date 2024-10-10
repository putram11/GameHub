# GameHub

Welcome to **GameHub**, a comprehensive platform designed for video game enthusiasts to explore, manage, and engage with a diverse collection of games. GameHub provides a centralized space for users to browse game data, read detailed information about their favorite titles, and seamlessly manage game-related content through an admin-friendly CMS. This platform is ideal for both casual players who are looking to discover new games and administrators responsible for updating and maintaining game data.

## Table of Contents

- [Features](#features)
  - [Public Features](#public-features)
  - [CMS Features](#cms-features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
  - [Client](#client)
  - [Server](#server)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)

---

## Features

### Public Features

1. **Landing Page with Game List**:
   - Displays a list of games using interactive cards.
   - Includes features like **pagination**, **search**, and **filter** to help users find games quickly and easily.
   
2. **Game Details Page**:
   - Provides detailed information on each game, including title, genre, description, and images.
   - Allows users to view more in-depth information about the game.

### CMS Features

1. **Login Page**:
   - Secure login interface for admin/staff users.
   - Ensures that only authorized personnel can access and modify game data.

2. **Game Management**:
   - Admins can create, read, update, and delete (CRUD) game data.
   - Features a user-friendly form to add new games, edit existing ones, and upload or update game images.
   
3. **Genre/Category Management**:
   - Admins can create, read, update, and delete game genres and categories.
   
4. **Staff Management**:
   - Admins can register new staff accounts and manage existing accounts.
   - Secure role-based access ensures that only certain users can modify game data.

5. **User Role and Authorization**:
   - Admins have full access to all features.
   - Staff members can view and edit their own created content but have limited access to other administrative tasks.

6. **Image Upload Feature**:
   - Integrated image upload functionality via cloud storage services like ImageKit or Cloudinary, allowing admins to easily update game cover art or screenshots.

---

## Technologies Used

GameHub is built using modern technologies to ensure scalability, performance, and user-friendliness:

### Frontend
- **React.js**: For creating a dynamic, responsive, and interactive user interface.
- **React Router**: For handling multi-page routing without reloading the page.
- **Axios**: For making API calls to the backend server.
- **CSS Frameworks (e.g., TailwindCSS or Bootstrap)**: For responsive and attractive web designs.

### Backend
- **Node.js** with **Express.js**: For building a robust REST API.
- **PostgreSQL**: For managing the game data, users, and genres with a relational database structure.
- **JWT Authentication**: For secure login and token-based authentication and authorization.
- **Multer** & **Cloudinary/ImageKit**: For handling image uploads.

### Testing
- **Jest**: For unit and integration tests, ensuring the reliability of the API.
- **Supertest**: For testing HTTP requests in the API.

### Deployment
- **Firebase**: For deploying the client-side of the application.
- **AWS EC2/GCP**: For deploying the backend server.

---

## Installation

### Client

To run the client-side of the GameHub application locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo-url
   ```

2. Navigate to the client directory:
   ```bash
   cd client-public
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the client:
   ```bash
   npm run dev
   ```

5. Access the client at `http://localhost:5173`.

### Server

To run the server-side of GameHub:

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables by creating a `.env` file:
   ```bash
   PORT=3000
   DATABASE_URL=your_postgresql_database_url
   JWT_SECRET=your_secret_key
   CLOUD_STORAGE_API_KEY=your_imagekit_or_cloudinary_key
   ```

4. Run database migrations (if applicable):
   ```bash
   npx sequelize db:migrate
   ```

5. Start the server:
   ```bash
   npm start
   ```

6. Access the API at `http://localhost:3000`.

---

## API Documentation

GameHub's backend offers a fully-featured REST API for managing game-related data. Here's a quick overview of the available routes:

### Public API

- **GET** `/pub/games`: Retrieve a list of all games (with pagination, filtering, and sorting).
- **GET** `/pub/games/:id`: Retrieve details of a single game by its ID.

### CMS API (Authenticated)

- **POST** `/login`: Login as an admin or staff.
- **POST** `/add-user`: Add a new staff member (Admin only).
- **GET** `/games`: Get a list of all games (Admin/Staff).
- **POST** `/games`: Create a new game (Admin/Staff).
- **PUT** `/games/:id`: Update a game's details (Admin/Staff).
- **DELETE** `/games/:id`: Delete a game (Admin/Staff).
- **PATCH** `/games/:id/upload`: Upload or update a game's image (Admin/Staff).
- **GET** `/genres`: Retrieve all available genres.

---

## Deployment

The client-side of GameHub is deployed using **Firebase Hosting**, providing fast and reliable access to the user interface. The server-side is hosted on **AWS EC2**, ensuring a scalable and secure environment for the backend operations.

---

## Conclusion

GameHub is an all-in-one solution for managing game content, offering a streamlined experience for both gamers and administrators. Whether you're looking to discover new games or manage existing content, GameHub provides the tools you need in a sleek and user-friendly interface.

Feel free to explore and contribute to the project!

---

#### Contact

For any questions or contributions, please contact: [your-email@example.com].
