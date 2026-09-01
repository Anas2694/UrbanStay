# 🏙️ UrbanStay
> A modern rental platform to discover, list, and book unique stays.

A full-stack Airbnb-inspired property rental platform built with Node.js, Express, and MongoDB. UrbanStay lets users discover, list, review, and book unique stays around the world, complete with interactive maps, image uploads, secure authentication, and automated booking confirmation emails.

![Node.js](https://img.shields.io/badge/Node.js-Backend-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)
![Express](https://img.shields.io/badge/Express.js-Framework-black)
![Render](https://img.shields.io/badge/Deployed-Render-blue)

---

## 🏗️ System Architecture

```mermaid
flowchart LR
  Client["Web Client"]
  Server["Express API Server"]
  DB[("MongoDB Atlas")]
  Cloudinary["Cloudinary API"]
  Mapbox["Mapbox API"]
  Brevo["Brevo Email API"]

  Client -- "HTTP Requests" --> Server
  Server -- "Query & Save" --> DB
  Server -- "Image Upload" --> Cloudinary
  Server -- "Geocoding" --> Mapbox
  Server -- "Async Events" --> Brevo

  style Client fill:#1e1b4b,stroke:#6366f1,stroke-width:2px,color:#fff
  style Server fill:#2e1065,stroke:#8b5cf6,stroke-width:2px,color:#fff
  style DB fill:#022c22,stroke:#10b981,stroke-width:2px,color:#fff
  style Cloudinary fill:#1e1b4b,stroke:#6366f1,stroke-width:2px,color:#fff
  style Mapbox fill:#451a03,stroke:#f59e0b,stroke-width:2px,color:#fff
  style Brevo fill:#4c0519,stroke:#ef4444,stroke-width:2px,color:#fff
```

---

## 🌐 Live Demo

👉 https://urbanstay-81ly.onrender.com

---

## ✨ Features

* **Browse & Search** - Explore listings or search by location/country with category filters.
* **Listings CRUD** - Create, edit, delete listings with image uploads.

```mermaid
sequenceDiagram
  actor Client
  participant Server
  participant Mapbox as "Mapbox API"
  participant DB as "MongoDB"

  Client->>Server: POST /listings (Multipart Form)
  Server->>Mapbox: Forward Geocode (Location text)
  Mapbox->>Server: Return GeoJSON coordinates
  Server->>Server: Process image with Multer/Cloudinary
  Server->>DB: Save new Listing record
  DB->>Server: Acknowledge save
  Server->>Client: Redirect to /listings
```

* **Bookings** - Date-based booking with automatic pricing and tax calculation.

```mermaid
sequenceDiagram
  actor Client
  participant Server
  participant DB as "MongoDB"
  participant Brevo as "Brevo API"

  Client->>Server: POST /bookings/:id (Check-in, Check-out)
  Server->>Server: Calculate nights, subtotal, and tax
  Server->>DB: Save Booking record
  DB->>Server: Confirm booking saved
  Server-)Brevo: Emit 'booking.created' event (Async)
  Server->>Client: Redirect to Listing Details
  Brevo->>Client: Send confirmation email
```

* **My Bookings** - View all your past and upcoming bookings in one place.
* **Cancel Booking** - Cancel any confirmed booking with a single click.
* **Booking Confirmation Email** - Automated email sent to users upon booking via Brevo.
* **Reviews** - Add and manage user reviews with star ratings.
* **Interactive Maps** - Mapbox integration for location visualization.
* **Image Uploads** - Cloudinary + Multer integration.
* **Authentication** - Passport.js with session-based login.
* **Flash Messages** - Real-time feedback for user actions.
* **Responsive UI** - Built with EJS and Bootstrap.

---

## 💡 Key Highlights

* Full-stack MVC architecture
* RESTful routing & middleware design
* Event-driven architecture using Node.js EventEmitter
* Automated transactional emails via Brevo API
* Secure authentication system
* Cloud-based media storage
* Interactive map integration
* CI/CD Pipeline Configured

---

## 🛠️ Tech Stack

| Layer          | Technology                      |
| -------------- | ------------------------------- |
| Runtime        | Node.js                         |
| Framework      | Express.js                      |
| Templating     | EJS + EJS-Mate                  |
| Database       | MongoDB Atlas + Mongoose        |
| Authentication | Passport.js                     |
| Sessions       | express-session + connect-mongo |
| File Uploads   | Multer + Cloudinary             |
| Maps           | Mapbox GL JS                    |
| Email Service  | Brevo (Transactional Email API) |
| Validation     | Joi                             |

---

## 🚀 Getting Started

### Prerequisites

* Node.js v18+
* MongoDB Atlas account
* Cloudinary account
* Mapbox account
* Brevo account (free, 300 emails/day)

### Installation

```bash
git clone https://github.com/Anas2694/UrbanStay.git
cd UrbanStay
npm install
```

---

### Environment Variables

Create a `.env` file in the root directory:

```env
ATLASDB_URL=your_mongodb_connection_string
SECRET=your_session_secret

CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

MAP_TOKEN=your_mapbox_access_token

BREVO_API_KEY=your_brevo_api_key
```

---

### Run the App

```bash
node app.js
```

Visit: **http://localhost:8080**

---

## 📁 Project Structure

```text
UrbanStay/
├── .gitignore
├── app.js                   # Application entry point
├── cloudConfig.js           # Cloudinary configuration
├── middleware.js            # Authentication middlewares
├── package.json
├── schema.js                # Joi validation schemas
├── models/
│   ├── bookings.js
│   ├── listings.js
│   ├── reviews.js
│   ├── user.js
│   └── init/
│       ├── data.js          # Sample initial data
│       └── index.js         # Database seed script
├── routes/
│   ├── booking.js
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── services/
│   └── notificationService.js  # Brevo integration
├── utils/
│   ├── ExpressError.js
│   ├── eventBus.js             # Local event emitter
│   ├── wrapAsync.js
│   └── controllers/            # Route controllers
│       ├── listings.js
│       ├── reviews.js
│       └── users.js
└── views/
    ├── error.ejs
    ├── bookings/
    ├── includes/
    ├── layouts/
    ├── listings/
    └── users/
```

---

## 🗺️ Routes Overview

| Method | Route                            | Description                           |
| ------ | -------------------------------- | ------------------------------------- |
| GET    | `/listings`                      | Retrieve all listings                 |
| POST   | `/listings`                      | Create a new listing                  |
| GET    | `/listings/new`                  | Render new listing form               |
| GET    | `/listings/search`               | Search listings by location/country   |
| GET    | `/listings/filter/:category`     | Filter listings by category           |
| GET    | `/listings/:id`                  | View specific listing details         |
| PUT    | `/listings/:id`                  | Update a specific listing             |
| DELETE | `/listings/:id`                  | Delete a specific listing             |
| GET    | `/listings/:id/edit`             | Render edit listing form              |
| POST   | `/listings/:id/reviews`          | Submit a review for a listing         |
| DELETE | `/listings/:id/reviews/:reviewId`| Delete a specific review              |
| GET    | `/bookings/my-bookings`          | View user's booking history           |
| POST   | `/bookings/:id`                  | Create a booking for a listing        |
| PATCH  | `/bookings/:id/cancel`           | Cancel an existing booking            |
| GET    | `/signup`                        | Render signup page                    |
| POST   | `/signup`                        | Register a new user                   |
| GET    | `/login`                         | Render login page                     |
| POST   | `/login`                         | Authenticate user credentials         |
| GET    | `/logout`                        | Log out current user                  |
| GET    | `/demouser`                      | Create and login a temporary demo user|

---

## 📧 Email Notifications

When a booking is confirmed, an automated email is sent to the user containing:

* Property name and location
* Check-in and check-out dates
* Number of nights
* Total amount with 18% GST

This is implemented using an **event-driven architecture**. The booking controller emits a `booking.created` event which the notification service listens to asynchronously, so email delivery never slows down the booking response.

---

## 🧠 Challenges & Learnings

* Implemented secure authentication using Passport.js
* Integrated Cloudinary for scalable image storage
* Designed RESTful APIs and middleware flow
* Built an event-driven notification system with Node.js EventEmitter
* Integrated Brevo transactional email API for booking confirmations
* Managed relationships between users, listings, reviews, and bookings

---

## 🚀 Future Improvements

* Wishlist / Save listings feature
* Host dashboard
* Advanced search & filters
* Real-time booking availability calendar

---

## 👨‍💻 Author

**Mohd Viquaruddin Anas**

---

## 📄 License

This project is open source under the ISC License.

[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://dokugen.samueltuoyo.com)
