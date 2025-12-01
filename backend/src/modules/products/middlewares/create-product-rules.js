const { body, query } = require("express-validator");
const checkValidation = require("../../../shared/middlewares/check-validation");

/**
 * Step 1: Define validation rules for creating a product
 * - product_name: required, string, min length 6
 * - category: required, string
 * - price: required, positive number
 * - description: optional, string, max length 500
 *
 * Step 2: Combine rules into an array
 * - This array will be used as middleware in the POST /products route
 */
const createProductRules = [
  body("product_name")
    .isString()
    .withMessage("Product name must be a string")
    .isLength({ min: 6 })
    .withMessage("Product name must be at least 6 characters long")
    .notEmpty()
    .withMessage("Product name is required"),

  body("category")
    .isString()
    .withMessage("Category must be a string")
    .notEmpty()
    .withMessage("Category is required"),

  body("price")
    .isFloat({ gt: 0 })
    .withMessage("Price must be a positive number")
    .notEmpty()
    .withMessage("Price is required"),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string")
    .isLength({ max: 500 })
    .withMessage("Description must not exceed 500 characters"),

  checkValidation,
];

module.exports = createProductRules;
