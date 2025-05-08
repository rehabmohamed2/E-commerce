const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');
const mongoose = require('mongoose');
const http = require('http');


// Connect to the database
DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB).then(() => {
    console.log('Connected to DataBase...');
}).catch((err) => {
    console.log('Error Connecting to DataBase');
    console.log(err);
});

const server = http.createServer(app);  

const port = process.env.PORT || 3000;
server.listen(port,'0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
});
