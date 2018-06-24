const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const roleCtrl = require('./role.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/role - Get list of roles */
  .get(roleCtrl.list)

  /** POST /api/role - Create new role */
  // .post(validate(paramValidation.createRole), roleCtrl.create);
  .post(validate(paramValidation.createRole), roleCtrl.create);

router.route('/:roleId')
  /** GET /api/role/:roleId - Get role */
  .get(roleCtrl.get)

  /** PUT /api/role/:roleId - Update role */
  .put(validate(paramValidation.updateRole), roleCtrl.update)
  // .put(roleCtrl.update)

  /** DELETE /api/role/:roleId - Delete role */
  .delete(roleCtrl.remove);

/** Load role when API with roleId route parameter is hit */
router.param('roleId', roleCtrl.load);

module.exports = router;
