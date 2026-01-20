# WorkHive
A platform for connecting service providers with customers.

*Built with the tools and technologies:*  
  
![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)
![JSON](https://img.shields.io/badge/JSON-000000?style=flat&logo=json&logoColor=white)
![npm](https://img.shields.io/badge/npm-CB3837?style=flat&logo=npm&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)  
![Dotenv](https://img.shields.io/badge/.ENV-ECD53F?style=flat&logo=dotenv&logoColor=black) 
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black) 
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=flat&logo=sequelize&logoColor=white) 
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=flat&logo=cloudinary&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-008CDD?style=flat&logo=stripe&logoColor=white)

## Table of Contents
- [Overview](#Overview)
- [Getting Started](#GettingStarted)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)

- [Features](#features)
- [API Documentation](#API Documentation).
  
  ---
# Overview
WorkHive is a platform designed to connect users with service providers, manage bookings, facilitate secure payments, and streamline communication. The system supports user authentication, 
category and service management, booking and payment workflows, reviews,
notifications, chat, and more. It integrates with Cloudinary for file uploads and Stripe for payment processing, providing a robust solution for service-based businesses.
# Getting Started

## Prerequisites
This project requires the following dependencies:

- **Programming Language**: JavaScript
- **Runtime Environment**: Node.js
- **Package Manager**: Npm  
## Installation
Build WorkHive_project from the source and install dependencies:

### 1. **Clone the repository**:
```bash
git clone https://github.com/hamsahesham66/workhive_project
```
###  2.**Navigate to the project directory**:
```bash
cd workHive_project
```
###  3.**Install dependencies**:
Using npm
```bash
npm install
```
###  4.**Create a .env file in the root directory and add your environment variables**:


## Usage
Run the project with :

Using npm
```bash
npm run start:dev
```
# Features

- **User Authentication:** Sign up, login, password reset, and JWT-based route protection.
- **User Profile Management:** Update user data and change password.
- **Category Management:** Create, list, and view categories.
- **Service Provider Management:** List service providers by category, view provider details.
- **Service Management:** List services by provider and category.
- **Booking System:** Create, view, and cancel bookings with validation and time restrictions.
- **Payment Integration:** Stripe checkout and payment confirmation.
- **Review System:** Create, update, delete, and view reviews for providers and users.
- **Notifications:** Fetch and update work notifications for users.
- **Contact Us:** Submit contact messages.
- **Worker Applications:** Submit applications with file uploads.
- **Chat System:** Conversations and messaging between users and admin.
- **Cloudinary Integration:** (Ready for use) for image/file uploads.
- **Error Handling:** Centralized error middleware.
- **Validation:** Express-validator for request validation.
- **Environment Configuration:** Uses `.env` for secrets and config.

## 📚 API Documentation

We have detailed API documentation hosted on Postman.

[![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)](https://documenter.getpostman.com/view/39201675/2sB2ixju5U)

> **Tip:** Click the button above to see the full list of endpoints, example requests, and responses.
