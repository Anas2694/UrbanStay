# 🏙️ UrbanStay
> A modern rental platform to discover, list, and book unique stays.

A full-stack Airbnb-inspired property rental platform built with Node.js, Express, and MongoDB. UrbanStay lets users discover, list, review, and book unique stays around the world — complete with interactive maps, image uploads, and secure authentication.

![Node.js](https://img.shields.io/badge/Node.js-Backend-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)
![Express](https://img.shields.io/badge/Express.js-Framework-black)
![Render](https://img.shields.io/badge/Deployed-Render-blue)
---

## 🌐 Live Demo

👉 https://urbanstay-81ly.onrender.com

---

## ✨ Features

* **Browse & Search** — Explore listings or search by location/country with category filters.
* **Listings CRUD** — Create, edit, delete listings with image uploads.
* **Bookings** — Date-based booking with automatic pricing and tax calculation.
* **Reviews** — Add and manage user reviews.
* **Interactive Maps** — Mapbox integration for location visualization.
* **Image Uploads** — Cloudinary + Multer integration.
* **Authentication** — Passport.js with session-based login.
* **Flash Messages** — Real-time feedback for user actions.
* **Responsive UI** — Built with EJS and Bootstrap.

---

## 💡 Key Highlights

* Full-stack MVC architecture
* RESTful routing & middleware design
* Secure authentication system
* Cloud-based media storage
* Interactive map integration

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
| Validation     | Joi                             |

---

## 🚀 Getting Started

### Prerequisites

* Node.js v18+
* MongoDB Atlas account
* Cloudinary account
* Mapbox account

### Installation

```bash
git clone https://github.com/your-username/UrbanStay.git
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
```

---

### Run the App

```bash
node app.js
```

Visit: **http://localhost:8080**

---

## 📁 Project Structure

```
UrbanStay/
├── app.js                   # Entry point
├── cloudConfig.js           # Cloudinary setup
├── middleware.js            # Auth middleware
├── schema.js                # Joi validation schemas
├── models/
│   ├── listings.js          # Listing model
│   ├── reviews.js           # Review model
│   ├── user.js              # User model
│   ├── bookings.js          # Booking model
│   └── init/                # Seed data
├── routes/
│   ├── listing.js
│   ├── review.js
│   ├── user.js
│   └── booking.js
├── utils/
│   ├── controllers/
│   ├── ExpressError.js
│   └── wrapAsync.js
├── views/
│   ├── layouts/
│   ├── includes/
│   ├── listings/
│   └── users/
└── public/
    ├── css/
    └── js/
```

---

## 🗺️ Routes Overview

| Method | Route                        | Description       |
| ------ | ---------------------------- | ----------------- |
| GET    | `/listings`                  | All listings      |
| GET    | `/listings/search?location=` | Search listings   |
| GET    | `/listings/filter/:category` | Filter listings   |
| GET    | `/listings/new`              | New listing form  |
| POST   | `/listings`                  | Create listing    |
| GET    | `/listings/:id`              | Listing details   |
| PUT    | `/listings/:id`              | Update listing    |
| DELETE | `/listings/:id`              | Delete listing    |
| POST   | `/listings/:id/reviews`      | Add review        |
| DELETE | `/listings/:id/reviews/:rid` | Delete review     |
| POST   | `/bookings/:id`              | Create booking    |
| GET    | `/signup`                    | Signup page       |
| POST   | `/signup`                    | Register user     |
| GET    | `/login`                     | Login page        |
| POST   | `/login`                     | Authenticate user |
| GET    | `/logout`                    | Logout            |

---

## 🧠 Challenges & Learnings

* Implemented secure authentication using Passport.js
* Integrated Cloudinary for scalable image storage
* Designed RESTful APIs and middleware flow
* Managed relationships between users, listings, and reviews

---

## 🚀 Future Improvements

* Payment integration (Stripe)
* Wishlist feature
* Advanced search & filters
* Real-time booking system

---

## 👨‍💻 Author

**Mohd Viquaruddin Anas**

---

## 📄 License

This project is open source under the ISC License.
