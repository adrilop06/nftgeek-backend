const express = require ('express');
const cors = require("cors");

//import middleware
const authorizationMiddleware = require('../../Middlewares/Authotization/authorizationMiddleware');
const { 
        createCategoryController,
        fetchAllCategoryController,
        fetchCategoryController,
        updateCategoryController,
        removeCategoryController
} = require('../../Controller/Category/categoryController');

const categoryRoute = express.Router();

//categoryRoute.use(cors());
categoryRoute.options('*', cors());

//create category
categoryRoute.post('/',cors(),authorizationMiddleware, createCategoryController,);
//Fetch all categorys
categoryRoute.get('/',cors(),authorizationMiddleware, fetchAllCategoryController,);
//Fetch one categorys
categoryRoute.get('/:slug',cors(),authorizationMiddleware, fetchCategoryController);
//Update category
categoryRoute.put('/:id',cors(),authorizationMiddleware, updateCategoryController);
//Remove category
categoryRoute.delete('/:id',cors(),authorizationMiddleware, removeCategoryController);


module.exports = categoryRoute;