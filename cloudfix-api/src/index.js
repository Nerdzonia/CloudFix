const dotenv = require("dotenv");
const server = require('./config/express');

//load file .env variables
dotenv.config(); 

server();
 

