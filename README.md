# Biblio - Virtual Library Management System

A modern web application for managing a virtual library, allowing users to browse, borrow, and manage digital books.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repo
   ```sh
   git clone https://github.com/your_username/biblio.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Create a `.env` file in the root directory and add the following environment variables:
   ```
   MONGO_URL=your_mongo_url
   PORT=your_port
   JWT_SECRET=your_jwt_secret
   NODE_ENV=your_node_env
   MAILTRAP_TOKEN=your_mailtrap_token
   MAILTRAP_ENDPOINT=your_mailtrap_endpoint
   CLIENT_URL=your_client_url
   ```

## Usage

1. Start the server
   ```sh
   npm start
   ```
2. Open your browser and navigate to `http://localhost:your_port`

## Environment Variables

The following environment variables are used in this project:

- `MONGO_URL`: The URL for connecting to MongoDB database.
- `PORT`: The port on which the server will run.
- `JWT_SECRET`: The secret key for JWT authentication.
- `NODE_ENV`: The environment in which the application is running (e.g., development, production).
- `MAILTRAP_TOKEN`: The token for Mailtrap email service.
- `MAILTRAP_ENDPOINT`: The endpoint for Mailtrap email service.
- `CLIENT_URL`: The URL of the client application.

## API Endpoints

### Auth

- `POST /api/auth/signup`: Register a new user.
- `POST /api/auth/login`: Login a user.

### Books

- `GET /api/books`: Get all available books.
- `GET /api/books/:id`: Get book details by ID.
- `POST /api/books`: Add a new book (Admin only).
- `PUT /api/books/:id`: Update book details (Admin only).
- `DELETE /api/books/:id`: Remove a book (Admin only).

### Clubs

- `GET /api/clubs`: Get all clubs.
- `POST /api/clubs`: Create a new club.
- `PUT /api/clubs/:clubId`: Update club details.
- `GET /api/clubs/:clubId`: Get club details by ID.

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.
