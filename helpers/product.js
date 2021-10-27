const axios = require("axios");
const { CardFactory } = require("botbuilder-core");
const Orders = require("../database/models/order");
const ProductCard = require("../resources/ProductCard");

exports.getCategories = async () => {
  try {
    const categories = await axios.get(
      "https://fakestoreapi.com/products/categories"
    );
    return { success: true, categories: categories.data };
  } catch (error) {
    console.log("error");
  }
};

exports.getProducts = async (category) => {
  try {
    const products = await axios.get(
      `https://fakestoreapi.com/products/category/${category}`
    );
    let product = CardFactory.adaptiveCard(
      ProductCard.allProduct(products.data)
    );
    return { success: true, products: [product] };
  } catch (error) {
    console.log("error");
  }
};

exports.confirmOrder = async (id) => {
  try {
    const product = await axios.get(`https://fakestoreapi.com/products/${id}`);
    let card = CardFactory.adaptiveCard(ProductCard.confirmOrder(product.data));
    return { success: true, product: [card] };
  } catch (error) {
    console.log("error");
  }
};

exports.addOrder = async (userId, productId) => {
  let product;
  try {
    product = await axios.get(`https://fakestoreapi.com/products/${productId}`);
    await Orders.create({ userId: userId, productId });
    let card = CardFactory.adaptiveCard(
      ProductCard.orderSuccessful(product.data)
    );
    return { success: true, card };
  } catch (error) {
    console.log(error);
    let card = CardFactory.adaptiveCard(
      ProductCard.orderUnsuccessful(product.data)
    );
    return { success: false, card };
  }
};
