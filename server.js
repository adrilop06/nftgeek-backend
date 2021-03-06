//import express
const express = require("express");
//import dotenv
const dotenv = require ("dotenv");
//dotenv
dotenv.config();
//import cors
const cors = require("cors");
//import dbConnect
const dbConnect = require("./config/db/dbConnect");
//import middleware
const {eHandler, eNotFound} = require ('./Middlewares/Error/eHandler');
//import the user route
const userRoutes = require ("./Route/Users/userRoute"); 
//import the post routes
const postRoute = require("./Route/Posts/postRoute");
//import the comment routes
const commentRoute = require("./Route/Comments/commentRoute");
//import the tag routes
const tagRoute = require("./Route/Tag/tagRoute");
//import bookmark
const bookmarkRoute = require("./Route/Bookmark/bookmarkRoute");
//import category
const categoryRoute = require("./Route/Category/categoryRoute");
const scrapMarketRoute = require("./Route/Scrap/scrapMarketRoute");
const scrapNewsRoute = require("./Route/Scrap/scrapNewsRoute");

/*************************************************************/
//insert express like a function inside a const app
const app = express();
//data based
dbConnect();

/************************************************************/




/************************************************************/
//Middelware in express is a function that intercept the comunications and can 
//access to request and responses
/*
Middleware is an express function that sits between the request and the response. 
In this case, the function is executed on requests that have a payload of json objects.
*/
app.use(express.json());

app.use(cors());
app.options('*', cors());


//registration user process. Post and update user information
//route user
//in case of user petition route check te kind and call the component post or get
app.use('/api/users',userRoutes);
//post routes
app.use('/api/posts',cors(),postRoute)
//comment routes
app.use('/api/comments',commentRoute);
//tag routes
app.use('/api/tag',cors(),tagRoute);
//category routes
app.use('/api/category',cors(), categoryRoute);
//bookmark
app.use('/api/bookmark', bookmarkRoute);
//market 
app.use('/api/market', scrapMarketRoute);

app.use('/api/news', scrapNewsRoute);






/*************************************************************/
//express error handler through our application
//lunch the eNotFound first. If not, the error not found is going to be lunch as an html because is not defined in eHandler
app.use(eNotFound);
app.use(eHandler);




/************************************************************/
//create a dinamic port
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, function(){
    console.log('Server is working properly in port: ' + PORT )
  }); 
}



module.exports = app;