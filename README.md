
# Sports Facility Booking Platform Server


## Introduction:

#### Project Description:

This tasked  for developing the backend for a sports facility booking platform. This assignment focuses on implementing the following key functionalities: Error Handling, CRUD operations, Authentication & Authorization, and Transaction & Rollback if needed.


## Features
#### Core Features:

* User Authentication: Secure user sign-up and login.
* Facility Management: CRUD operations for facilities.
* Booking System: Real-time booking and availability check.
* Payment Integration: After Bookings payments option for payment by amarpay.


### Uses Technology Stack:

*   **Programming Language**: TypeScript
*   **Web Framework**: Express.js
*   **ODM & Validation Library**: Mongoose for MongoDB


### Other Tools and Packages uses:

*   bcrypt
*   http-status
*   jsonwebtoken
*   zod
*   axios

## Installation
#### Prerequisites
List any prerequisites needed to set up the project.

- Node.js (v22.2.0 or higher)
- Mongoose (v8.4.1 or higher)
###### Node Package Manager(npm)
- npm(v10.2.5 or latest) 

### Steps to Install
Provide step-by-step instructions for setting up the project locally.

1.Clone the repository:

2.Navigate to the project directory:

3.Install dependencies:

4.Create a `.env` file and configure the environment variables. 

5.Start the development server:

6.Access the API at `http://localhost:3000`.

## Usage
Running the Server
Provide instructions on how to start and use the server.

* npm run dev


## API Documentation
### Endpoints Overview

1. **User Sign Up**
*   **Route**: `POST /api/auth/signup`

2. **User Login**
*   **Route**: `POST /api/auth/login`

3. **Create a Facility (Admin Only)**
*   **Route**: `POST /api/facility`

4. **Update a Facility (Admin Only)**
*   **Route**: `PUT /api/facility/:id`

5. **Delete a Facility - Soft Delete (Admin Only)**
*   **Route**: `DELETE /api/facility/:id`

**6\. Get All Facilities**
*  **Route**: `GET /api/facility`

7 **Check Availability**
*   **Route**: `GET /api/check-availability`

**8\. Create a Booking (User Only)**
  *   **Route**: `POST /api/bookings`
  
**9\. View All Bookings (Admin Only)**
  *   **Route**: `GET /api/bookings`

  **10\. View Bookings by User (User Only)**
  *   **Route**: `GET /api/bookings/user`

  **11\. Cancel a Booking (User Only)**
  *   **Route**: `DELETE /api/bookings/:id`

  **12\. Refresh Token**
  *   **Route**: `POST /api/auth/refresh-token`
  **13\. Payment Confirmation**
  *   **Route**: `POST /api/payments/confirmation`