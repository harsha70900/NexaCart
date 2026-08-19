# 🛒 NexaCart

### Full-Stack E-Commerce Platform

NexaCart is a secure full-stack e-commerce web application built to provide a modern online shopping experience with secure authentication, product management, shopping features, and online payment integration.

The application combines a **React + TypeScript frontend** with a **Spring Boot REST API backend**, **Spring Security + JWT authentication**, **MySQL**, and **Razorpay payment integration**.

---

## 🚀 Live Application

🌐 **Frontend:** Add your deployed frontend URL here

🔗 **GitHub Repository:**
https://github.com/harsha70900/NexaCart

---

## ✨ Features

### 🔐 Authentication & Security

* JWT-based user authentication
* Spring Security integration
* Secure protected API endpoints
* Role-based access control
* Authentication-aware frontend navigation

### 🛍️ Shopping Experience

* Browse available products
* View detailed product information
* Search products
* Filter products
* Add products to cart
* Manage cart items
* Wishlist functionality
* Product ratings and reviews

### 📦 Product Management

* Product creation
* Product updates
* Product deletion
* Product information management
* Product availability handling

### 💳 Payments

* Razorpay payment integration
* Online payment processing
* Payment workflow integrated with the application

### 🗄️ Backend & Database

* RESTful APIs using Spring Boot
* Spring Data JPA
* MySQL database integration
* Entity-based data management
* Structured backend architecture

### 🎨 Frontend

* Responsive React interface
* TypeScript-based frontend
* Component-based architecture
* Client-side routing
* Interactive shopping experience

### 🐳 Deployment & DevOps

* Docker support
* Maven-based backend project
* Separate frontend and backend structure
* Environment-based configuration

---

## 🧰 Tech Stack

### Frontend


\

### Backend



\

### Database & Payments

\

### Tools


\

---

## 🏗️ Architecture

```text
                    ┌──────────────────────┐
                    │      NexaCart UI     │
                    │  React + TypeScript  │
                    └──────────┬───────────┘
                               │
                               │ REST API
                               ▼
                    ┌──────────────────────┐
                    │    Spring Boot API   │
                    │                      │
                    │ Spring Security      │
                    │ JWT Authentication   │
                    │ REST Controllers     │
                    │ Service Layer        │
                    │ Spring Data JPA      │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │        MySQL         │
                    │      Database        │
                    └──────────────────────┘

                               │
                               │ Payment Request
                               ▼
                    ┌──────────────────────┐
                    │       Razorpay       │
                    │  Payment Integration │
                    └──────────────────────┘
```

---

## 📂 Project Structure

```text
NexaCart/
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.ts
│   └── README.md
│
├── src/
│   └── main/
│       └── java/
│           └── ...
│
├── .mvn/
│   └── wrapper/
│
├── Dockerfile
├── mvnw
├── mvnw.cmd
├── pom.xml
├── .gitignore
└── README.md
```

---

## ⚙️ Getting Started

Follow the steps below to run NexaCart locally.

### 1. Clone the Repository

```bash
git clone https://github.com/harsha70900/NexaCart.git
```

```bash
cd NexaCart
```

---

## 🔧 Backend Setup

### 2. Configure MySQL

Create a MySQL database for the application.

```sql
CREATE DATABASE jwtdb;
```

Then configure your database connection in the Spring Boot application configuration.

Example:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/jwtdb
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD
```

> Never commit real database credentials, JWT secrets, or payment credentials to GitHub.

---

### 3. Configure Environment Variables

Add the required application secrets and credentials using your local environment configuration.

Typical values include:

```text
DATABASE_URL
DATABASE_USERNAME
DATABASE_PASSWORD
JWT_SECRET
RAZORPAY_KEY_ID
RAZORPAY_KEY_SECRET
```

Use the exact variable names expected by the application configuration.

---

### 4. Run the Backend

Using Maven Wrapper:

#### Windows

```bash
mvnw.cmd spring-boot:run
```

#### macOS / Linux

```bash
./mvnw spring-boot:run
```

The backend will start on the configured Spring Boot port.

---

## 💻 Frontend Setup

### 5. Navigate to Frontend

```bash
cd frontend
```

### 6. Install Dependencies

```bash
npm install
```

### 7. Start Development Server

```bash
npm run dev
```

Vite will provide the local frontend URL in the terminal.

---

## 🔒 Security

NexaCart uses Spring Security and JWT-based authentication to protect application resources.

The authentication flow follows the general structure:

```text
User Login
    ↓
Authentication Request
    ↓
Spring Security
    ↓
JWT Generated
    ↓
JWT Sent With Protected Requests
    ↓
JWT Validation
    ↓
Authorized API Access
```

Sensitive credentials should be stored through environment variables rather than committed to source control.

---

## 💳 Payment Flow

NexaCart integrates Razorpay for online payments.

The general payment workflow is:

```text
User
 ↓
Shopping Cart
 ↓
Checkout
 ↓
Payment Request
 ↓
Razorpay
 ↓
Payment Processing
 ↓
Payment Result
 ↓
Order Completion
```

---

## 🧪 Testing

Backend tests can be executed using Maven:

```bash
mvnw.cmd test
```

For macOS / Linux:

```bash
./mvnw test
```

---

## 🐳 Docker

NexaCart includes a Dockerfile for containerized backend deployment.

Build the Docker image:

```bash
docker build -t nexacart .
```

Run the container:

```bash
docker run -p 8080:8080 nexacart
```

Configure the required environment variables according to your deployment environment.

---

## 📸 Screenshots

> Screenshots will be added here to showcase the application UI.

### 🏠 Home Page

### 🛍️ Products

### 📦 Product Details

### 🛒 Shopping Cart

### 💳 Checkout

---

## 🎯 Project Goals

NexaCart was developed to demonstrate practical full-stack software development skills, including:

* Building RESTful APIs
* Developing responsive frontend interfaces
* Implementing secure authentication
* Working with relational databases
* Integrating third-party payment services
* Managing frontend-backend communication
* Containerizing applications with Docker
* Structuring a real-world full-stack application

---

## 🔮 Future Improvements

Potential future enhancements include:

* Order history and tracking
* Advanced product recommendations
* Admin analytics dashboard
* Improved payment verification
* Automated testing expansion
* CI/CD pipeline
* Cloud-native deployment improvements
* Advanced search and filtering

---

## 👨‍💻 Developer

### Harshavardhan S V

B.Tech Computer Science & Engineering

**GitHub:**
https://github.com/harsha70900

**LinkedIn:**
https://www.linkedin.com/in/harshavardhansv/

---

## ⭐ Support

If you find this project useful or interesting, consider giving the repository a ⭐.

---

## 📄 License

This project is developed for educational and portfolio purposes.
