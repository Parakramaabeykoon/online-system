import product from "../models/product.js";
import { isAdmin } from "./userController.js";


export async function createProduct(req, res) {

  if (!isAdmin(req)) {
    res.status(401).json({
      message: "You are not authorized to create product"
    });
    return;
  }

  try {
    const productData = req.body;

    // 💡 req.body එක Array එකක්ද (නිෂ්පාදන කිහිපයක්ද) කියා පරීක්ෂා කිරීම
    if (Array.isArray(productData)) {
      // නිෂ්පාදන කිහිපයක්ම එකවර සේව් කිරීම (Bulk Insert)
      const savedProducts = await product.insertMany(productData);

      return res.status(201).json({
        message: "All products created successfully",
        count: savedProducts.length,
        products: savedProducts,
      });
    } else {
      // 💡 එක නිෂ්පාදනයක් පමණක් ආවොත් කලින් වගේම සේව් කිරීම
      const Product = new product(productData);
      await Product.save();

      return res.status(201).json({
        message: "Product created successfully",
        product: Product,
      });
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed create product",

    });
  }
}


export async function getProduct(req, res) {
  try {

    const products = await product.find();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to retrieve product"
    });
  }
}

export async function deleteProduct(req, res) {
  if (!isAdmin(req)) {
    res.status(403).json({
      message: "You are not authorized to delete a product"
    });
    return;
  }
  try {
    const productID = req.params.productID

    await product.deleteOne({
      productID: productID
    })
    res.json({
      message: "Product delete successfully"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to delete product",
    })
  }
}

export async function updateProduct(req, res) {
  if (!isAdmin(req)) {
    res.status(403).json({
      message: "You are not authorized to update a product"
    });
    return;
  }
  try {
    const productID = req.params.productID;
    const updatedData = req.body;
    await product.updateOne(
      { productID: productID },
      updatedData

    );
    res.json({

      message: "Product update successfully"
    })
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to update product",
    })
  }
}

export async function getProductid(req, res) {
  try {
    const productID = req.params.productID;

    // 💡 Variable නම 'foundProduct' ලෙස වෙනස් කරන ලදි
    const foundProduct = await product.findOne({ productID: productID });

    // 💡 'product == null' වෙනුවට 'foundProduct' පරීක්ෂා කිරීම
    if (foundProduct == null) {
      res.status(404).json({
        message: "Product not found"
      });
    } else {
      res.json(foundProduct);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to retrieve product by ID", // 💡 spelling නිවැරදි කරන ලදි
      error: err.message
    });
  }
}