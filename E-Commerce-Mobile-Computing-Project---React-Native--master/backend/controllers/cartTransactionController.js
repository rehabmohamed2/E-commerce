const CartTransaction = require('../models/cartTransactionModel');
const Product = require('../models/productModel');

exports.createTransaction = async (req, res) => {
  try {
    const { name, email, location, cartItems } = req.body;

    if (!name || !email || !location || !Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ message: 'Missing or invalid user/cart data' });
    }

    let total = 0;
    const formattedProducts = [];

    for (const item of cartItems) {
      const product = await Product.findById(item._id);
      if (!product) continue;

      const quantity = item.quantity || 1;
      const itemTotal = product.price * quantity;
      total += itemTotal;

      formattedProducts.push({
        productId: product._id,
        title: product.title,
        price: product.price,
        quantity: quantity,
        image: product.image
      });

      product.inventory = Math.max(0, product.inventory - quantity);
      product.sales += quantity;
      await product.save();
    }

    const transaction = new CartTransaction({
      user: { name, email, location },
      products: formattedProducts,
      total
    });

    await transaction.save();
    res.status(201).json({ message: 'Transaction completed', transaction });

  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await CartTransaction.find().sort({ createdAt: -1 });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve transactions', error: error.message });
  }
};



exports.getTransactionById = async (req, res) => {
  try {
    const transactionId = req.params.id;

    const transaction = await CartTransaction.findById(transactionId);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.status(200).json({ transaction });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
