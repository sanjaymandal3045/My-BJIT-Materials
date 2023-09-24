const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const ProductModel = require("../model/Product");
const { success, failure } = require("../util/common");
const UserModel = require("../model/user");
const CartModel = require("../model/cart");
const transactionModel = require("../model/transaction");
const HTTP_STATUS = require("../constants/statusCodes");
const Cart = require("../model/cart");

class Product {
  async addToCart(req, res) {
    try {
      const { userid, productid, quantity } = req.body;

      const user = await UserModel.findById(userid);
      if (!user) {
        return res.status(400).send(failure("User id does not exist"));
      }

      const product = await ProductModel.findById(productid);
      if (!product) {
        return res.status(400).send(failure("Product id invalid"));
      }

      if (product.stock < quantity) {
        return res.status(400).send(failure("Product stock invalid"));
      }

      let cart = await CartModel.findOne({ user: userid });

      if (!cart) {
        cart = await CartModel.create({
          user: userid,
          products: [
            {
              product: productid,
              quantity: quantity,
            },
          ],
          total: product.price * quantity,
        });
      } else {
        const existingProduct = cart.products.find(
          (item) => String(item.product) === productid
        );

        if (existingProduct) {
          existingProduct.quantity += quantity;
        } else {
          cart.products.push({
            product: productid,
            quantity: quantity,
          });
        }

        cart.total = cart.total + quantity * product.price;

        await cart.save();
      }

      return res.status(200).send(success("Successfully added to cart", cart));
    } catch (error) {
      console.error("Error:", error.message);
      return res.status(500).send(failure("Server Error"));
    }
  }

  async removeFromCart(req, res) {
    try {
      const { userid, productid, quantity } = req.body;

      const user = await UserModel.findById(userid);
      if (!user) {
        return res.status(400).send(failure("User id does not exist"));
      }

      const product = await ProductModel.findById(productid);
      if (!product) {
        return res.status(400).send(failure("Product id invalid"));
      }

      const cart = await CartModel.findOne({ user: userid });
      if (!cart) {
        return res.status(400).send(failure("User does not have a cart"));
      }

      const cartProductIndex = cart.products.findIndex(
        (item) => String(item.product) === productid
      );
      if (cartProductIndex === -1) {
        return res.status(400).send(failure("Product is not in the cart"));
      }

      const cartProduct = cart.products[cartProductIndex];

      console.log(cartProduct);
      if (cartProduct.quantity > quantity) {
        cartProduct.quantity -= quantity;
      } else {
        cart.products.splice(cartProductIndex, 1);
      }

      cart.total = cart.total - quantity * product.price;

      await cart.save();

      return res
        .status(200)
        .send(success("Successfully removed from cart", cart));
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).send(failure("Server Error"));
    }
  }

  async checkOut(req, res) {
    try {
      const { userid, cartId } = req.body;

      const user = await UserModel.findById(userid);
      if (!user) {
        return res.status(400).send(failure("User id does not exist"));
      }

      const cart = await Cart.findOne({ user: userid }).populate(
        "products.product"
      );

      if (!cart) {
        return res.status(400).send(failure("User does not have a cart"));
      } else {
        for (const cartProduct of cart.products) {
          const productId = cartProduct.product._id;
          const quantity = cartProduct.quantity;

          // Update the product schema to reduce stock
          const product = await ProductModel.findById(productId);
          if (!product) {
            throw new Error(`ProductId not found`);
          }

          if (product.stock < quantity) {
            throw new Error(
              `Insufficient stock for product`
            );
          }

          product.stock -= quantity;
          cart.total = 0;

          const newTransaction = await transactionModel.create({
            cart: cartId,
          });
          
          await product.save();

          cart.products.pull({ _id: cartProduct._id });
        }

        cart.products = [];

        await cart.save();

        return res.status(200).send(failure("Checked Out Successfully"));
      }
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).send(failure("Server Error"));
    }
  }
}

module.exports = new Product();
