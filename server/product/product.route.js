const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const productCtrl = require('./product.controller');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file,cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file,cb) => {
    cb(null, new Date().toISOString() + file.originalname);
  }
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
  cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storage, 
  limits: {
  fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/products - Get list of products */
  .get(productCtrl.list)

  /** POST /api/products - Create new product */
  .post( upload.single('image'), 
  validate(paramValidation.updateProduct),
  productCtrl.create);

router.route('/:productId')
  /** GET /api/products/:productId - Get product */
  .get(productCtrl.get)

  /** PUT /api/products/:productId - Update product */
  .put(validate(paramValidation.updateProduct), productCtrl.update)

  /** DELETE /api/products/:productId - Delete product */
  .delete(productCtrl.remove);

/** Load product when API with productId route parameter is hit */
router.param('productId', productCtrl.load);

module.exports = router;
