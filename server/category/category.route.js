const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const categoryCtrl = require('./category.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/category - Get list of categories */
  .get(categoryCtrl.list)

  /** POST /api/category - Create new category */
  .post(validate(paramValidation.createCategory), categoryCtrl.create);

router.route('/:categoryId')
  /** GET /api/category/:categoryId - Get category */
  .get(categoryCtrl.get)

  /** PUT /api/category/:categoryId - Update category */
  .put(validate(paramValidation.updateCategory), categoryCtrl.update)

  /** DELETE /api/category/:categoryId - Delete category */
  .delete(categoryCtrl.remove);

/** Load category when API with categoryId route parameter is hit */
router.param('categoryId', categoryCtrl.load);

module.exports = router;
