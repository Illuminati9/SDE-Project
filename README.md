# OneTap

The OneTap is a web application that aggregates local service providers such as plumbers, electricians, and cleaners, making it convenient for users to find and book reliable professionals for their various service needs.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The OneTap aims to bridge the gap between service seekers and service providers by providing a user-friendly platform for users to discover and connect with local professionals. Service providers can create profiles, showcase their services, and manage bookings through the application. Users can search for services based on location, reviews, and ratings, and book appointments with their preferred professionals.

## Features

- User Registration and Authentication
- Service Provider Registration and Profile Management
- Search and Filter Services by Location, Reviews, and Ratings
- Service Booking and Appointment Scheduling
- Service Reviews and Ratings
- Admin Panel to Manage Service Providers and Listings
- Responsive Web Design for Mobile and Desktop

## Tech Stack

The OneTap is built using the following technologies:

- Frontend:
  - React.js - A JavaScript library for building user interfaces
  - Redux - A predictable state container for managing application state
  - Axios - A promise-based HTTP client for making API requests

- Backend:
  - Node.js - A runtime environment for executing JavaScript on the server-side
  - Express - A fast and minimalist web framework for Node.js
  - MongoDB - A NoSQL database for storing application data
  - Mongoose - An ODM (Object Data Modeling) library for MongoDB

- Others:
  - JSON Web Tokens (JWT) - For user authentication and authorization
  - Bcrypt - For hashing and encrypting user passwords
  - Material-UI - A popular UI framework for React.js applications
  - Nodemailer - For sending email notifications
  - Heroku - For deploying the application to a cloud server

## Getting Started

To run the OneTap application locally, follow the steps below:

### Installation

1. Clone the repository:

```
git clone https://github.com/Illuminati9/SDE-Project
```

2. Change to the project directory:
   
```
cd SDE-Project
```

3. Install frontend dependencies:

```
cd client
npm install
```

4. Install backend dependencies:

```
cd ../server
npm install
```


### Configuration

1. Create a `.env` file in the `server` directory and configure the following environment variables:

```
PORT=5000
MONGODB_URI=<Your_MongoDB_URI>
JWT_SECRET=<Your_JWT_Secret>
EMAIL_USERNAME=<Your_Email_Username>
EMAIL_PASSWORD=<Your_Email_Password>
```

Replace `<Your_MongoDB_URI>` with the connection URI to your MongoDB database, `<Your_JWT_Secret>` with a secret key for JWT token generation, `<Your_Email_Username>` with your email service username for sending notifications, and `<Your_Email_Password>` with the corresponding password.

### Running the Application

1. Start the backend server:

```
cd server
npm start
```

2. Start the frontend development server:

```
cd client
npm start
```


The application will now be running at `http://localhost:3000`.

### API Documentation

For detailed API documentation and endpoints, please refer to the [API documentation](API_DOCS.md) file.

## Contributing

Contributions to the OneTap project are welcome! Please feel free to submit issues, feature requests, or pull requests.






