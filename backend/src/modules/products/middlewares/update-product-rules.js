const { body } = require("express-validator");
const checkValidation = require("../../../shared/middlewares/check-validation");
/**
 * Step 1: Define validation rules for updating a product
 * - product_name: optional, string, min length 3
 * - category: optional, string
 * - price: optional, positive number
 * - description: optional, string, max length 500
 *
 * Note: Fields are optional because an update request may only include some fields.
 *
 * Step 2: Combine rules into an array
 * - This array will be used as middleware in the PUT /products/:id route
 */

const updateProductRules = [
  body("product_name")
    .optional()
    .isString()
    .withMessage("Product name must be a string")
    .isLength({ min: 3 })
    .withMessage("Product name must be at least 3 characters long"),

  body("category")
    .optional()
    .isString()
    .withMessage("Category must be a string"),

  body("price")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("Price must be a positive number"),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string")
    .isLength({ max: 500 })
    .withMessage("Description must not exceed 500 characters"),

  checkValidation,
];

module.exports = updateProductRules;
