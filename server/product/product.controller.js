const Product = require('./product.model');
const Category = require('../category/category.model');

/**
 * Load product and append to req.
 */
function load(req, res, next, id) {
  Product.get(id)
    .then((product) => {
      req.product = product; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get product
 * @returns {Product}
 */
function get(req, res) {
  return res.json(req.product);
}


function create(req, res, next) {
  const product = new Product({
    name: req.body.name,
    category: req.body.category,
    image: req.file.path,
    code: req.body.code,
    price: req.body.price,
    available: req.body.available,
    size: req.body.size,
    stock: req.body.stock,
    discount: req.body.discount,
    order: req.body.order
  });

  product.save()
    .then(savedProduct => res.json(savedProduct))
    .catch(e => next(e));
}


function update(req, res, next) {
  const product = req.product;
  product.name = req.body.name;
  product.category - req.body.category;
  product.image = req.file.path;
  product.code = req.body.code;
  product.price = req.body.price;
  product.available = req.body.available;
  product.size = req.body.size;
  product.stock = req.body.stock;
  product.discount = req.body.discount;
  product.order = req.body.order;

  product.save()
    .then(savedProduct => res.json(savedProduct))
    .catch(e => next(e));
}

function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Product.list({ limit, skip })
    .then(products => res.json(products))
    .catch(e => next(e));
}

/**
 * Delete prudct.
 * @returns {Product}
 */
function remove(req, res, next) {
  const product = req.product;
  product.remove()
    .then(deletedProduct => res.json(deletedProduct))
    .catch(e => next(e));
}

module.exports = { load, get, create, update, list, remove };
