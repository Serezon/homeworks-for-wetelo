const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

/**
 * Category Schema
 */
const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    required: true
  },
  order: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    default: ''
  }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
CategorySchema.method({
});

/**
 * Statics
 */
CategorySchema.statics = {
  /**
   * Get category
   * @param {ObjectId} id - The objectId of category.
   * @returns {Promise<Category, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((category) => {
        if (category) {
          return category;
        }
        const err = new APIError('No such category exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List categories in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of categories to be skipped.
   * @param {number} limit - Limit number of categories to be returned.
   * @returns {Promise<Category[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find({status: true})
      .sort({ order: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

/**
 * @typedef Category
 */
module.exports = mongoose.model('Category', CategorySchema);
