const chalk = require('chalk');
const CartModel = require('../Models/CartModel');

const saveCart = async(req, res) => {
    var title = req.body.title;
    var price = req.body.price;
    var totalPrice = req.body.totalPrice;
    var qty = req.body.size;
    var discount = req.body.discount;
    var image = req.body.image;
    var productId = req.body.productId



    try {

        const ProductData = new CartModel({

            title,
            price,
            productId,
            totalPrice,
            qty,
            discount,
            discountedPrice: price * (1 - (discount / 100)),
            image
        })
        const result = await ProductData.save();
        if (result) {
            console.log(chalk.green.inverse("Product save in cart"))
            res.json({
                Success: "Product save in cart ",
                result
            })
        } else {
            console.error(chalk.red.inverse("cart not save"))
            res.json({
                Error: "cart not save ",
                result
            })
        }

    } catch (Error) {
        res.json({
            Error: "cart not save",
        })
        console.error(chalk.red.inverse(Error));
    }
}

const getCart = (req, res) => {
    try {
        CartModel.find({}, (err, data) => {

            if (data) {
                res.json({
                    Success: " find cart Data",
                    data
                })
            } else if (err) {

            }


        })
    } catch (err) {
        console.error(err)
        res.status(404).json({ Error: 'find Cart Data' })
    }
}


const updateCartProductById = async(req, res) => {
    try {
        const _id = req.params.id;
        const result = await CartModel.findByIdAndUpdate(_id, req.body, { new: true })
        if (result) {
            console.log(chalk.green.inverse("updated Cart Product find successfully"))
            res.status(200).send({
                Success: " cart Product save Success fully ",
                result
            })
        } else {
            console.error(chalk.red.inverse("cart Product not updated"))
            res.json({
                Error: "cart Product not update Success fully ",

            })
        }
    } catch (Error) {
        res.json({
            Error: "updated cart Product did not Save Successfully",

        })
        console.error(chalk.red.inverse(Error));
    }
}
const deleteProductByid = async(req, res) => {
    try {
        const _id = req.params.id;
        const result = await CartModel.findByIdAndDelete(_id)
        if (result) {
            console.log(chalk.green.inverse("Product Cart Deleted successfully"))
            res.status(200).send({
                Success: "Product Cart deleted Successfully ",
                result
            })
        } else {
            console.error(chalk.red.inverse("Product Cart not delete"))
            res.json({
                Error: "Product Cart not delete",

            })
        }
    } catch (Error) {
        res.status(500).send({
            Error: "product Cart not delete",

        })
        console.error(chalk.red.inverse(Error));
    }
}

const findCartByProductId = async(req, res) => {
    try {
        const _id = req.params.productId;
        const result = await CartModel.find({ productId: _id }, (err, data) => {
            if (data) {
                console.log(chalk.green.inverse("Product id matched successfully", data))
            }
        })
        if (result) {
            // console.log(chalk.green.inverse("Product id matched successfully"))
            res.status(200).send({
                Success: "Product id match Successfully ",
                result
            })
        } else {
            console.error(chalk.red.inverse("Product id not match"))
            res.json({
                    Error: "Product id not match",

                }

            )
        }
    } catch (Error) {
        res.status(500).send({
            Error: "product productid not match",

        })
        console.error(chalk.red.inverse(Error));
    }
}

module.exports = { getCart, saveCart, updateCartProductById, deleteProductByid, findCartByProductId }