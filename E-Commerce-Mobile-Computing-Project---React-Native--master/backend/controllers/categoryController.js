const Category = require('../models/categoryModel');
const Product = require('../models/productModel');
// const cloudinary = require('../utils/cloudinary');


exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        const categoriesWithProductCount = await Promise.all(
        categories.map(async (category) => {
          const productCount = await Product.countDocuments({ category: category.title });
          return {
            ...category._doc, 
            productCount,
          };
        })
      );
  
      res.status(200).json({
        status: 'success',
        results: categoriesWithProductCount.length,
        data: {
          categories: categoriesWithProductCount,
        },
      });
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err.message,
        error: err,
      });
    }
  };

exports.getCategory = async ( req , res ) => {
    try {
        const category = await Category.findById(req.params.id);

        res.status(200).json({
            status:'success',
            data: {
                category
            }
        })

    } catch( err ){
        res.status(404).json({
            status: 'fail',
            message: "Couldn't the find category",
            error:err
        })
    }
};



    