# Express API Backend Project
## ✨ Features

- **Authentication & Authorization**: JWT-based authentication with bcrypt password hashing
- **User Management**: Complete user CRUD operations with role-based access
- **Subscription Management**: Full subscription lifecycle management
- **Workflow Automation**: Integration with Upstash Workflow for automated tasks
- **Security**: Helmet, CORS, ArcJet protection, and rate limiting
- **Database**: MongoDB with Mongoose ODM
- **Email**: Nodemailer integration for transactional emails
- **Validation**: Comprehensive input validation and error handling
- **Development Tools**: ESLint, Nodemon, and structured logging

## 🛠️ Tech Stack

### Core

- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT + bcryptjs
- **Email**: Nodemailer

### Security & Middleware

- **Security Headers**: Helmet
- **CORS**: Cross-origin resource sharing
- **Protection**: ArcJet security middleware
- **Logging**: Morgan HTTP request logger
- **Parsing**: Cookie parser, JSON & URL-encoded

### External Services

- **Workflow**: Upstash Workflow automation
- **Queue**: QStash for background jobs

## 📁 Project Structure

```
src/
├── app.js                 # Express app configuration
├── index.js              # Server entry point
├── config/               # Configuration files
│   ├── arcjet.js        # ArcJet security config
│   ├── env.js           # Environment variables
│   ├── nodemailer.js    # Email configuration
│   └── upstash.js       # Upstash workflow config
├── controllers/          # Route controllers
│   ├── auth.controllers.js
│   ├── subscription.controllers.js
│   ├── user.controllers.js
│   └── workflow.controllers.js
├── database/             # Database configuration
│   └── mongodb.js
├── middlewares/          # Custom middleware
│   ├── arc.middleware.js
│   ├── auth.middleware.js
│   ├── errors.middleware.js
│   └── notfound.middleware.js
├── models/               # Mongoose schemas
│   ├── subscriptions.models.js
│   └── users.model.js
├── routes/               # API routes
│   ├── auth.routes.js
│   ├── subscription.routes.js
│   ├── user.routes.js
│   └── workflow.routes.js
└── utils/                # Utility functions
    ├── email-template.js
    └── send-email.js
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd express-api-starter
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Environment Setup**
   Create a `.env.development` file in the root directory:

   ```env
   # Server Configuration
   PORT=3000
   NODE_ENV=development
   SERVER_URL=http://localhost:3000

   # Database
   MONGO_URI=mongodb://localhost:27017/express-api-starter

   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_EXPIRES_IN=7d

   # ArcJet Security
   ARCJET_KEY=your-arcjet-key
   ARCJET_ENV=development

   # Upstash Configuration
   QSTASH_TOKEN=your-qstash-token
   QSTASH_URL=your-qstash-url

   # Email Configuration
   EMAIL_PASSWORD=your-email-app-password
   ```

4. **Start development server**
   ```bash
   pnpm run dev
   ```

The API will be available at `http://localhost:3000`

## 📖 API Documentation

### Authentication Endpoints

#### Sign Up

```http
POST /api/v1/auth/sign-up
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Sign In

```http
POST /api/v1/auth/sign-in
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Sign Out

```http
POST /api/v1/auth/sign-out
Authorization: Bearer <jwt-token>
```

### User Endpoints

#### Get All Users

```http
GET /api/v1/users
```

#### Get User by ID

```http
GET /api/v1/users/:id
Authorization: Bearer <jwt-token>
```

### Subscription Endpoints

#### Create Subscription

```http
POST /api/v1/subscriptions
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "name": "Netflix Premium",
  "price": 15.99,
  "currency": "USD",
  "frequency": "monthly",
  "category": "entertainment",
  "paymentMethod": "credit_card",
  "startDate": "2025-01-01T00:00:00.000Z"
}
```

#### Get User Subscriptions

```http
GET /api/v1/subscriptions/:userId
Authorization: Bearer <jwt-token>
```

#### Get All Subscriptions

```http
GET /api/v1/subscriptions
Authorization: Bearer <jwt-token>
```

#### Get Subscription by ID

```http
GET /api/v1/subscriptions/details/:id
Authorization: Bearer <jwt-token>
```

## 🔧 Available Scripts

```bash
# Start production server
pnpm start

# Start development server with auto-reload
pnpm run dev

# Run ESLint for code linting
pnpm run lint

# Update all dependencies to latest versions
pnpm run install-latest
```

## 🛡️ Security Features

- **Helmet**: Sets various HTTP headers for security
- **CORS**: Configurable cross-origin resource sharing
- **ArcJet**: Advanced bot protection and rate limiting
- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for secure password storage
- **Input Validation**: Mongoose schema validation
- **Error Handling**: Centralized error handling middleware

## 🔄 Workflow Automation

The API includes integration with Upstash Workflow for:

- Subscription renewal reminders
- Background job processing
- Automated email notifications
- Scheduled tasks

## 📧 Email Features

- Transactional email support via Nodemailer
- HTML email templates
- Subscription renewal notifications
- Welcome emails for new users

## 🗃️ Database Schema

### User Model

- `name`: String (required, 3-50 chars)
- `email`: String (required, unique, validated)
- `password`: String (required, hashed, select: false)
- `timestamps`: CreatedAt, UpdatedAt

### Subscription Model

- `name`: String (required, 3-50 chars)
- `price`: Number (required, min: 0)
- `currency`: Enum (USD, EUR, GBP, INR)
- `frequency`: Enum (daily, weekly, monthly, yearly)
- `category`: Enum (personal, business, enterprise, etc.)
- `paymentMethod`: String (required)
- `status`: Enum (active, inactive, cancelled, expired)
- `startDate`: Date (required)
- `renewalDate`: Date (auto-calculated)
- `user`: ObjectId (ref: User, required)
- `timestamps`: CreatedAt, UpdatedAt

## 🚨 Error Handling

The API includes comprehensive error handling:

- Custom error middleware
- 404 handler for undefined routes
- Validation error responses
- Database error handling
- JWT authentication errors

## 🔧 Configuration

### Environment Variables

| Variable         | Description                          | Required |
| ---------------- | ------------------------------------ | -------- |
| `PORT`           | Server port                          | Yes      |
| `NODE_ENV`       | Environment (development/production) | Yes      |
| `MONGO_URI`      | MongoDB connection string            | Yes      |
| `JWT_SECRET`     | JWT signing secret                   | Yes      |
| `JWT_EXPIRES_IN` | JWT expiration time                  | Yes      |
| `ARCJET_KEY`     | ArcJet API key                       | Yes      |
| `QSTASH_TOKEN`   | QStash authentication token          | Yes      |
| `EMAIL_PASSWORD` | Email service app password           | Yes      |
| `SERVER_URL`     | Base server URL                      | Yes      |
