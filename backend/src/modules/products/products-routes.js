const { Router } = require("express");
const createProductRules = require("./middlewares/create-product-rules");
const updateProductRules = require("./middlewares/update-product-rules");

const ProductModel = require("./products-model");
const upload = require("../../shared/middlewares/upload");
const { cloudinary } = require("../../shared/cloudinary-utils");

const productsRoute = Router();

productsRoute.get("/products", async (req, res) => {
  const allProducts = await ProductModel.find();
  if (!allProducts) res.json([]);
  res.json({ message: "Here are your all product", data: allProducts });
});

productsRoute.get("/products/:id", async (req, res) => {
  const productID = req.params.id;
  const foundProduct = await ProductModel.findById(productID);
  if (!foundProduct) {
    return res.status(404).send(`Product with ${productID} doesn't exist`);
  }
  res.json(foundProduct);
});

productsRoute.post("/products", createProductRules, async (req, res) => {
  const newProduct = req.body;
  const addedProduct = await ProductModel.create({
    product_name: newProduct.product_name,
    category: newProduct.category,
    price: newProduct.price,
    description: newProduct.description,
  });
  if (!addedProduct) {
    return res
      .status(500)
      .send({ errorMessage: `Oops! Product couldn't be added!` });
  }
  res.json(addedProduct);
});

productsRoute.post(
  "/products-image",
  upload.single("image"),
  async (req, res) => {
    console.log(req.body);

    const productID = req.body.product_id;
    if (!productID) return res.status(400).send(`Required product id`);
    if (!req.file) return res.status(400).send(`Required product image`);
    const foundProduct = await ProductModel.findById(productID);
    if (!foundProduct) {
      return res.status(404).send(`Product with ${productID} doesn't exist`);
    }

    // create upload stream in cloudinary
    const stream = cloudinary.uploader.upload_stream(
      { folder: "product-images" }, // folder name in cloudinary
      (error, result) => {
        if (error) {
          console.log(error);
          res.status(500).json({ error: "Failed to upload product image" });
          return;
        }

        // updated the product with image url in database
        foundProduct.product_image = result.secure_url;
        foundProduct.save();

        res.json({
          message: "Image uploaded successfully",
          product: foundProduct,
        });
      }
    );

    // Pipe the image file buffer into Cloudinary
    stream.end(req.file.buffer);
  }
);

productsRoute.put("/products/:id", updateProductRules, async (req, res) => {
  const productID = req.params.id;
  const newProduct = req.body;
  const foundProduct = await ProductModel.exists({ id: productID });
  if (!foundProduct) {
    return res.status(404).send(`Product with ${productID} doesn't exist`);
  }
  const updatedProduct = await ProductModel.findByIdAndUpdate(
    productID,
    {
      $set: {
        product_name: newProduct.product_name,
        category: newProduct.category,
        price: newProduct.price,
        description: newProduct.description,
      },
    },
    { new: true }
  );
  if (!updatedProduct) {
    return res.status(500).send(`Oops! Product couldn't be updated!`);
  }
  res.json(updatedProduct);
});

productsRoute.delete("/products/:id", async (req, res) => {
  const productID = req.params.id;
  const foundProduct = await ProductModel.findById(productID);
  if (!foundProduct) {
    return res.status(404).send(`Product with ${productID} doesn't exist`);
  }
  const deletedProduct = await ProductModel.findByIdAndDelete(productID, {
    new: true,
  });
  if (!deletedProduct) {
    return res.status(500).send(`Oops! Product couldn't be deleted!`);
  }
  res.json(deletedProduct);
});

module.exports = productsRoute;
