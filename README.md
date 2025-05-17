# ElectroMart - Product Management System

ElectroMart is a full-stack web application for managing electronic products inventory. It features a modern React frontend with and a Node.js/Express backend with PostgreSQL database.

## Features

- **Product Management:**
  - View all products in a responsive grid layout
  - Add new products with detailed information
  - Update existing products
  - Delete products
  - Real-time inventory tracking

- **Modern UI/UX:**
  - Responsive design that works on all devices
  - Clean and intuitive interface
  - Loading states and error handling
  - Form validation
  - Beautiful card-based layout

## Project Structure

```
electromart/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── App.jsx         # Main application component
│   │   └── main.jsx        # Application entry point
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js      # Vite configuration
│   └── tailwind.config.js  # Tailwind CSS configuration
│
├── backend-node/            # Node.js/Express backend
│   ├── src/
│   │   ├── config/         # Configuration files
│   │   ├── controllers/    # Request handlers
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Custom middleware
│   │   └── server.js       # Server entry point
│   ├── package.json
│   └── .env               # Environment variables (create this)
│
└── sql/                    # SQL scripts and database schema
```

## Technology Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- Modern ES6+ JavaScript

### Backend
- Node.js
- Express
- PostgreSQL
- RESTful API design

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn package manager

## Setup and Installation

1. **Clone the repository:**
   ```bash
   git clone <https://gitlab.stud.idi.ntnu.no/ahmadsa/electromart.git>
   cd electromart
   ```

2. **Set up the backend:**
   ```bash
   cd backend-node
   npm install
   ```
   Create a `.env` file in the backend-node directory:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_NAME=electromart
   PORT=3000
   NODE_ENV=development
   ```

3. **Set up the frontend:**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up the database:**
   - Create a PostgreSQL database named 'electromart'
   - Run the SQL scripts from the `sql` directory

## Running the Application

1. **Start the backend server:**
   ```bash
   cd backend-node
   npm run dev
   ```
   The server will start on http://localhost:3000

2. **Start the frontend development server:**
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will be available on http://localhost:5174

## API Endpoints

### Products API
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get a specific product
- `POST /api/products` - Create a new product
- `PUT /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product

## Product Schema

```javascript
{
  productid: number,
  name: string,
  description: string,
  price: number,
  stockquantity: number,
  brandid: number,
  categoryid: number
}
```

## Environment Variables

### Backend (.env)
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=electromart
PORT=3000
NODE_ENV=development
```

## Development

- The backend uses `nodemon` for auto-reloading during development
- The frontend uses Vite's hot module replacement
- API requests from frontend are proxied through Vite to the backend
- Tailwind CSS is configured for styling with custom utility classes

## Troubleshooting

1. **Port Already in Use:**
   - The backend will automatically try the next available port
   - The frontend (Vite) will also automatically find an available port

2. **Database Connection Issues:**
   - Verify PostgreSQL is running
   - Check database credentials in .env
   - Ensure database exists and is accessible

3. **CORS Issues:**
   - The backend has CORS enabled
   - Frontend requests are proxied through Vite
   - Check proxy settings in vite.config.js
