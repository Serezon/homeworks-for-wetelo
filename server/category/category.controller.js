const Category = require('./category.model');

/**
 * Load category and append to req.
 */
function load(req, res, next, id) {
  Category.get(id) 
    .then((category) => {
      req.category = category; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get category
 * @returns {Category}
 */
function get(req, res) {
  return res.json(req.category);
}

/**
 * Create new category
 * @returns {Category}
 */
function create(req, res, next) {
  const category = new Category({
    name: req.body.name,
    status: req.body.status,
    order: req.body.order,
    image: req.body.image
  });

  category.save()
    .then(savedCategory => res.json(savedCategory))
    .catch(e => next(e));
}

/**
 * Update existing category
 * @returns {Category}
 */
function update(req, res, next) {
  const category = req.category;
  category.name = req.body.name;
  category.status = req.body.status;
  category.order = req.body.order;
  category.image = req.body.image;

  category.save()
    .then(savedCategory => res.json(savedCategory))
    .catch(e => next(e));
}

/**
 * Get category list.
 * @property {number} req.query.skip - Number of categories to be skipped.
 * @property {number} req.query.limit - Limit number of categories to be returned.
 * @returns {Category[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Category.list({ limit, skip })
    .then(categories => res.json(categories))
    .catch(e => next(e));
}

/**
 * Delete category.
 * @returns {Category}
 */
function remove(req, res, next) {
  const category = req.category;
  category.remove()
    .then(deletedCategory => res.json(deletedCategory))
    .catch(e => next(e));
}

module.exports = { load, get, create, update, list, remove };
