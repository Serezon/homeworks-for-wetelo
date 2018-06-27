const express = require('express');
const userRoutes = require('./server/user/user.route');
const authRoutes = require('./server/auth/auth.route');
const roleRoutes = require('./server/role/role.route');
const categoryRoutes = require('./server/category/category.route');
const productRoutes = require('./server/product/product.route')
//const formImage = require('./server/views/form.html');

const router = express.Router(); // eslint-disable-line new-cap

// TODO: use glob to match *.route files

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount user routes at /users
router.use('/users', userRoutes);

// mount auth routes at /auth
router.use('/auth', authRoutes);

// mount role routes at /role
router.use('/role', roleRoutes);

// mount category routes at /category
router.use('/category', categoryRoutes);

// mount product routes at /product
router.use('/product', productRoutes);



module.exports = router;
