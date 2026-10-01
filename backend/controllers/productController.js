import { v2 as cloudinary } from 'cloudinary'
import productModel from '../models/productModel.js'


// =========================================
// ADD PRODUCT
// =========================================

const addProduct = async (req, res) => {

    try {

        const {
            name,
            description,
            price,
            category,
            gender,
            subCategory,
            subSubCategory,
            sizes,
            bestSeller
        } = req.body


        // =========================================
        // GET IMAGES
        // =========================================

        const image1 =
            req.files?.image1 &&
            req.files.image1[0]

        const image2 =
            req.files?.image2 &&
            req.files.image2[0]

        const image3 =
            req.files?.image3 &&
            req.files.image3[0]

        const image4 =
            req.files?.image4 &&
            req.files.image4[0]


        const images = [
            image1,
            image2,
            image3,
            image4
        ].filter(
            (item) => item !== undefined
        )


        // =========================================
        // UPLOAD IMAGES TO CLOUDINARY
        // =========================================

        const imageUrl = await Promise.all(

            images.map(async (item) => {

                const result =
                    await cloudinary.uploader.upload(
                        item.path,
                        {
                            resource_type: 'image'
                        }
                    )

                return result.secure_url

            })

        )


        // =========================================
        // PRODUCT DATA
        // =========================================

        const productData = {

            name,

            description,

            price: Number(price),

            category,

            gender,

            subCategory,

            subSubCategory,

            sizes: JSON.parse(sizes),

            bestSeller:
                bestSeller === "true"
                    ? true
                    : false,

            image: imageUrl,

            date: Date.now()

        }


        console.log(productData)


        // =========================================
        // SAVE PRODUCT
        // =========================================

        const product =
            new productModel(productData)

        await product.save()


        res.json({

            success: true,

            message: "Product Added"

        })


    } catch (error) {

        console.log(error)

        res.json({

            success: false,

            message: error.message

        })

    }

}



// =========================================
// LIST PRODUCTS
// =========================================

const listProducts = async (req, res) => {

    try {

        const products =
            await productModel.find({})


        res.json({

            success: true,

            products

        })


    } catch (error) {

        console.log(error)

        res.json({

            success: false,

            message: error.message

        })

    }

}



// =========================================
// REMOVE PRODUCT
// =========================================

const removeProduct = async (req, res) => {

    try {

        await productModel.findByIdAndDelete(
            req.body.id
        )


        res.json({

            success: true,

            message: "Product Removed"

        })


    } catch (error) {

        console.log(error)

        res.json({

            success: false,

            message: error.message

        })

    }

}



// =========================================
// SINGLE PRODUCT
// =========================================

const singleProduct = async (req, res) => {

    try {

        const { productId } = req.body


        const product =
            await productModel.findById(productId)


        if (!product) {

            return res.json({

                success: false,

                message: "Product not found"

            })

        }


        res.json({

            success: true,

            product

        })


    } catch (error) {

        console.log(error)

        res.json({

            success: false,

            message: error.message

        })

    }

}



// =========================================
// UPDATE PRODUCT
// =========================================

const updateProduct = async (req, res) => {

    try {

        const {
            id,
            name,
            description,
            price,
            category,
            gender,
            subCategory,
            subSubCategory,
            sizes,
            bestSeller
        } = req.body


        // =========================================
        // FIND PRODUCT
        // =========================================

        const product =
            await productModel.findById(id)


        if (!product) {

            return res.json({

                success: false,

                message: "Product not found"

            })

        }


        // =========================================
        // EXISTING IMAGES
        // =========================================

        let imageUrl = [...product.image]


        // =========================================
        // NEW IMAGES
        // =========================================

        const image1 =
            req.files?.image1 &&
            req.files.image1[0]

        const image2 =
            req.files?.image2 &&
            req.files.image2[0]

        const image3 =
            req.files?.image3 &&
            req.files.image3[0]

        const image4 =
            req.files?.image4 &&
            req.files.image4[0]


        // =========================================
        // IMAGE FILES
        // =========================================

        const newImages = [
            image1,
            image2,
            image3,
            image4
        ]


        // =========================================
        // UPLOAD REPLACED IMAGES
        // =========================================

        for (
            let i = 0;
            i < newImages.length;
            i++
        ) {

            if (newImages[i]) {

                const result =
                    await cloudinary.uploader.upload(
                        newImages[i].path,
                        {
                            resource_type: 'image'
                        }
                    )


                // Replace image at same position

                imageUrl[i] =
                    result.secure_url

            }

        }


        // =========================================
        // UPDATE PRODUCT
        // =========================================

        product.name = name

        product.description = description

        product.price = Number(price)

        product.category = category

        product.gender = gender

        product.subCategory = subCategory

        product.subSubCategory =
            subSubCategory

        product.sizes =
            JSON.parse(sizes)

        product.bestSeller =
            bestSeller === "true"
                ? true
                : false

        product.image =
            imageUrl


        // =========================================
        // SAVE
        // =========================================

        await product.save()


        res.json({

            success: true,

            message: "Product Updated"

        })


    } catch (error) {

        console.log(error)

        res.json({

            success: false,

            message: error.message

        })

    }

}



// =========================================
// EXPORT
// =========================================

export {
    addProduct,
    listProducts,
    removeProduct,
    singleProduct,
    updateProduct
}
