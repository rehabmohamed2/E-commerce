const Product = require('../models/productModel');
const APIFeatures = require('../utils/apiFeatures');


exports.getAllProducts = async(req, res)=>{
    try {
        const features = new APIFeatures(Product.find(), req.query);
        features.filter().sort().limitFields();


        if (req.query.search) {
            const searchRegex = new RegExp(req.query.search, 'i');
            features.query = features.query.find({
                $or: [
                    { title: { $regex: searchRegex } },
                    { description: { $regex: searchRegex } },
                    { category: { $regex: searchRegex } }
                ]
            });
        }
        features.pagination();
        const products = await features.query;

        const totalCount = await Product.countDocuments();

        res.status(200).json({
            status: 'success',
            totalCount: totalCount,
            results: products.length,
            data: {
                products
            }
        });
    } catch(err) {
        res.status(404).json({
            status: 'fail',
            message: err.message
        })
    }
}
exports.getProduct = async(req, res)=>{
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json({
            status:'success',
            data: {
                product
            }
        });

    } catch(err) { 
        res.status(404).json({
            status: 'fail',
            message: err.message
        })
    }
}
// exports.createProduct = async (req, res) => {
//     try {
//         console.log(req.body, "In Create Product! ❤️");

//         const newProduct = await Product.create(req.body);

//         res.status(201).json({
//             status: "success",
//             message: "Product created successfully!",
//             data: {
//                 product: newProduct
//             }
//         });

//     } catch (err) {
//         if (err.name === "ValidationError") {
//             const validationErrors = Object.values(err.errors).map(error => error.message);

//             return res.status(400).json({
//                 status: "fail",
//                 message: "Validation error",
//                 errors: validationErrors
//             });
//         }

//         res.status(400).json({
//             status: "fail",
//             message: "Couldn't create the product",
//             error: err.message
//         });
//     }
// };



