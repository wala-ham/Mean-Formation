const express = require('express')
const Product = require('../models/product');
const router = express.Router()

//annotation for product shcema
/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         image:
 *           type: string
 *         user:
 *           type: string
 *           description: ID of the user associated with the product
 *       example:
 *         title: SampleProduct
 *         description: Sample product description
 *         price: 29.99
 *         image: sampleproduct.jpg
 *         user: 123456789012345678901234  # Replace with actual user ID
 */

const multer = require('multer');
filename= '';
    const mystorage = multer.diskStorage ({
    destination: './uploads',
    filename: (req, file, redirect) =>{
    let date= Date.now();
    let fl = date + '.' + file.mimetype.split('/')[1];
    redirect (null, fl);
    filename = fl;
    }
    })
const upload = multer({storage: mystorage});


router.post('/createproduct',upload.any('image'), async (req, res) =>{
    try {
        data = req.body;
        prod = new Product (data);
        prod.image=filename;
        savedProd = await prod.save();
        filename=''
        res.status (200).send(savedProd)
    } 
    catch (error) {
        res.status (400).send(error)
    }
})

router.post('/createproductU', upload.any('image'), async (req, res) => {
    try {
        const productData = req.body;
        const product = new Product(productData);
        product.image = filename;

        // If user ID is provided in the request, associate the product with the user
        if (productData.userId) {
            const user = await User.findById(productData.userId);
            if (user) {
                product.user = user._id;
                user.products.push(product._id);
                await user.save();
            }
        }

        const savedProduct = await product.save();
        filename = '';
        res.status(200).send(savedProduct);
    } catch (error) {
        res.status(400).send(error);
    }
});


// All Products
router.get('/allproduct', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).send(products);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete Product
router.delete('/delprod/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedProd = await Product.findByIdAndDelete(id);
        res.status(200).send(deletedProd);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Update Product
router.put('/uptprod/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const newData = req.body;
        const updated = await Product.findByIdAndUpdate(id, newData);
        res.status(200).send(updated);
    } catch (error) {
        res.status(400).send(error);
    }
});

/**
 * @swagger
 * /product/createproduct:
 *   post:
 *     summary: Create a new product
 *     description: Create a new product with the provided data.
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: image
 *         type: file
 *         description: Image file for the product
 *       - in: formData
 *         name: title
 *         type: string
 *         description: Title of the product
 *       - in: formData
 *         name: description
 *         type: string
 *         description: Description of the product
 *       - in: formData
 *         name: price
 *         type: number
 *         description: Price of the product
 *     responses:
 *       '200':
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Product created successfully
 *               createdProduct:
 *                 title: NewProduct
 *                 description: Product description
 *                 price: 19.99
 *                 image: newproduct.jpg
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               error: Bad Request
 */

/**
 * @swagger
 * /product/createproductU:
 *   post:
 *     summary: Create a new product associated with a user
 *     description: Create a new product with the provided data and associate it with a user.
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: image
 *         type: file
 *         description: Image file for the product
 *       - in: formData
 *         name: title
 *         type: string
 *         description: Title of the product
 *       - in: formData
 *         name: description
 *         type: string
 *         description: Description of the product
 *       - in: formData
 *         name: price
 *         type: number
 *         description: Price of the product
 *       - in: formData
 *         name: userId
 *         type: string
 *         description: User ID to associate the product with
 *     responses:
 *       '200':
 *         description: Product created and associated with the user successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Product created and associated with the user successfully
 *               createdProduct:
 *                 title: NewProduct
 *                 description: Product description
 *                 price: 19.99
 *                 image: newproduct.jpg
 *                 user: 123456789012345678901234  # Replace with actual user ID
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               error: Bad Request
 */

/**
 * @swagger
 * /product/allproduct:
 *   get:
 *     summary: Get all products
 *     description: Retrieve a list of all products.
 *     responses:
 *       '200':
 *         description: List of products retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               products:
 *                 - title: Product1
 *                   description: Product description 1
 *                   price: 29.99
 *                   image: product1.jpg
 *                 - title: Product2
 *                   description: Product description 2
 *                   price: 39.99
 *                   image: product2.jpg
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               error: Bad Request
 */

/**
 * @swagger
 * /product/delprod/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     description: Delete a product by providing the product ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Product ID to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Product deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Product deleted successfully
 *               deletedProduct:
 *                 title: DeletedProduct
 *                 description: Deleted product description
 *                 price: 49.99
 *                 image: deletedproduct.jpg
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               error: Bad Request
 */

/**
 * @swagger
 * /product/uptprod/{id}:
 *   put:
 *     summary: Update a product by ID
 *     description: Update a product's information by providing the product ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Product ID to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: New product data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               image:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Product updated successfully
 *               updatedProduct:
 *                 title: UpdatedProduct
 *                 description: Updated product description
 *                 price: 59.99
 *                 image: updatedproduct.jpg
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               error: Bad Request
 */



module.exports = router;