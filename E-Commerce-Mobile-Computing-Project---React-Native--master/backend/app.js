const express = require('express');
const morgan = require('morgan');
const app = express();

// Middleware setup
app.use(express.json());

// Import routes
const productRoute = require('./routes/productRoutes');
const categoryRoute = require('./routes/categoryRoutes');
const userRoute = require('./routes/userRoutes');
const cartTransactionRoute = require('./routes/cartTransactionRoutes');

// Use morgan for logging in development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Middleware to add request time
app.use((req, res, next) => {
    console.log("Hello From Developer in app.js");
    req.requestTime = new Date().toISOString();
    next();
});


// API Routes
app.use('/api/products', productRoute);
app.use('/api/category', categoryRoute);
app.use('/api/users', userRoute);
app.use('/api/cart', cartTransactionRoute);


module.exports = app;
