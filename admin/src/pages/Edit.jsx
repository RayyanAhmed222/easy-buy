import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
    ImagePlus,
    X,
    Upload,
    PackageCheck,
    Tag,
    Layers3,
    Ruler,
    Star,
    Check,
    Loader2,
    FileText,
    Pencil,
    ArrowLeft,
    Sparkles
} from 'lucide-react'

import { assets } from '../assets/assets'
import { backendUrl } from '../App'
import categoryOptions from '../config/categoryOptions.js'

const Edit = ({ token }) => {

    const { id } = useParams()
    const navigate = useNavigate()

    // ========================================
    // IMAGE STATE
    // ========================================

    const [image1, setImage1] = useState(false)
    const [image2, setImage2] = useState(false)
    const [image3, setImage3] = useState(false)
    const [image4, setImage4] = useState(false)

    // Existing images
    const [oldImages, setOldImages] = useState([])

    // ========================================
    // PRODUCT STATE
    // ========================================

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')

    const [category, setCategory] = useState('Men')
    const [gender, setGender] = useState('')
    const [subCategory, setSubcategory] = useState('')
    const [subSubCategory, setSubSubCategory] = useState('')

    const [bestSeller, setBestseller] = useState(false)
    const [sizes, setSizes] = useState([])

    // ========================================
    // LOADING
    // ========================================

    const [loading, setLoading] = useState(true)
    const [updating, setUpdating] = useState(false)

    // ========================================
    // SIZE OPTIONS
    // ========================================

    const sizeOptions = ['S', 'M', 'L', 'XL', 'XXL']

    // ========================================
    // IMAGE DATA
    // ========================================

    const images = [
        {
            id: 'image1',
            value: image1,
            setter: setImage1,
            oldValue: oldImages[0]
        },
        {
            id: 'image2',
            value: image2,
            setter: setImage2,
            oldValue: oldImages[1]
        },
        {
            id: 'image3',
            value: image3,
            setter: setImage3,
            oldValue: oldImages[2]
        },
        {
            id: 'image4',
            value: image4,
            setter: setImage4,
            oldValue: oldImages[3]
        }
    ]

    // ========================================
    // GET IMAGE URL
    // ========================================

    const getImageUrl = (image) => {

        if (!image) {
            return assets.upload_area
        }

        if (typeof image === 'string') {
            return image
        }

        return assets.upload_area
    }

    // ========================================
    // FETCH PRODUCT
    // ========================================

    const fetchProduct = async () => {

        try {

            setLoading(true)

            const response = await axios.post(
                backendUrl + '/api/product/single',
                {
                    productId: id
                }
            )

            if (response.data.success) {

                const product = response.data.product

                // ========================================
                // PRODUCT INFORMATION
                // ========================================

                setName(product.name || '')
                setDescription(product.description || '')
                setPrice(product.price || '')

                // ========================================
                // CATEGORY
                // ========================================

                setCategory(product.category || 'Men')

                // ========================================
                // GENDER
                // ========================================

                setGender(product.gender || '')

                // ========================================
                // SUB CATEGORY
                // ========================================

                setSubcategory(product.subCategory || '')

                // ========================================
                // PRODUCT TYPE
                // ========================================

                setSubSubCategory(product.subSubCategory || '')

                // ========================================
                // BEST SELLER
                // ========================================

                setBestseller(
                    product.bestSeller === true ||
                    product.bestSeller === 'true'
                )

                // ========================================
                // SIZES
                // ========================================

                let productSizes = product.sizes || []

                if (typeof productSizes === 'string') {
                    try {
                        productSizes = JSON.parse(productSizes)
                    } catch {
                        productSizes = []
                    }
                }

                setSizes(
                    Array.isArray(productSizes)
                        ? productSizes
                        : []
                )

                // ========================================
                // EXISTING IMAGES
                // ========================================

                const existingImages = [
                    product.image1,
                    product.image2,
                    product.image3,
                    product.image4
                ].filter(Boolean)

                /*
                    Some APIs may return an `image` array instead
                    of image1/image2/image3/image4.
                */

                if (existingImages.length > 0) {

                    setOldImages(existingImages)

                } else if (Array.isArray(product.image)) {

                    setOldImages(product.image)

                } else {

                    setOldImages([])

                }

            } else {

                toast.error(
                    response.data.message ||
                    'Unable to load product.'
                )

            }

        } catch (error) {

            console.log(error)

            toast.error(
                error.response?.data?.message ||
                error.message ||
                'Unable to load product.'
            )

        } finally {

            setLoading(false)

        }
    }

    // ========================================
    // LOAD PRODUCT
    // ========================================

    useEffect(() => {

        if (id) {
            fetchProduct()
        }

    }, [id])

    // ========================================
    // TOGGLE SIZE
    // ========================================

    const toggleSize = (size) => {

        setSizes((prev) =>
            prev.includes(size)
                ? prev.filter((item) => item !== size)
                : [...prev, size]
        )

    }

    // ========================================
    // HANDLE CATEGORY CHANGE
    // ========================================

    const handleCategoryChange = (value) => {

        setCategory(value)
        setGender('')
        setSubcategory('')
        setSubSubCategory('')

    }

    // ========================================
    // HANDLE GENDER CHANGE
    // ========================================

    const handleGenderChange = (value) => {

        setGender(value)
        setSubcategory('')
        setSubSubCategory('')

    }

    // ========================================
    // HANDLE SUB CATEGORY CHANGE
    // ========================================

    const handleSubCategoryChange = (value) => {

        setSubcategory(value)
        setSubSubCategory('')

    }

    // ========================================
    // SUBMIT UPDATE
    // ========================================

    const onSubmitHandler = async (e) => {

        e.preventDefault()

        // ========================================
        // VALIDATION
        // ========================================

        if (!name.trim()) {
            toast.error('Please enter product name.')
            return
        }

        if (!description.trim()) {
            toast.error('Please enter product description.')
            return
        }

        if (!price || Number(price) < 0) {
            toast.error('Please enter a valid product price.')
            return
        }

        if (category === 'Kids' && !gender) {
            toast.error('Please select a gender.')
            return
        }

        if (!subCategory) {
            toast.error('Please select a sub category.')
            return
        }

        if (!subSubCategory) {
            toast.error('Please select a product type.')
            return
        }

        if (sizes.length === 0) {
            toast.error('Please select at least one size.')
            return
        }

        try {

            setUpdating(true)

            const formData = new FormData()

            // ========================================
            // PRODUCT ID
            // ========================================

            formData.append('id', id)

            // ========================================
            // PRODUCT INFORMATION
            // ========================================

            formData.append('name', name)
            formData.append('description', description)
            formData.append('price', price)

            // ========================================
            // CATEGORY INFORMATION
            // ========================================

            formData.append('category', category)
            formData.append('gender', gender)
            formData.append('subCategory', subCategory)
            formData.append('subSubCategory', subSubCategory)

            // ========================================
            // BEST SELLER
            // ========================================

            formData.append('bestSeller', bestSeller)

            // ========================================
            // SIZES
            // ========================================

            formData.append(
                'sizes',
                JSON.stringify(sizes)
            )

            // ========================================
            // NEW IMAGES
            // Only send images that were changed
            // ========================================

            if (image1) {
                formData.append('image1', image1)
            }

            if (image2) {
                formData.append('image2', image2)
            }

            if (image3) {
                formData.append('image3', image3)
            }

            if (image4) {
                formData.append('image4', image4)
            }

            // ========================================
            // UPDATE API
            // ========================================

            const response = await axios.post(
                backendUrl + '/api/product/update',
                formData,
                {
                    headers: {
                        token
                    }
                }
            )

            // ========================================
            // RESPONSE
            // ========================================

            if (response.data.success) {

                toast.success(
                    response.data.message ||
                    'Product updated successfully.'
                )

                setTimeout(() => {
                    navigate('/list')
                }, 500)

            } else {

                toast.error(
                    response.data.message ||
                    'Unable to update product.'
                )

            }

        } catch (error) {

            console.log(error)

            toast.error(
                error.response?.data?.message ||
                error.message ||
                'Something went wrong while updating product.'
            )

        } finally {

            setUpdating(false)

        }
    }

    // ========================================
    // IMAGE UPLOAD CARD
    // ========================================

    const ImageUploadCard = ({ item, index }) => {

        const preview = item.value
            ? URL.createObjectURL(item.value)
            : getImageUrl(item.oldValue)

        return (

            <div className="relative group">

                <label
                    htmlFor={item.id}
                    className={`
                        relative
                        flex
                        aspect-square
                        w-full
                        cursor-pointer
                        items-center
                        justify-center
                        overflow-hidden
                        rounded-2xl
                        border
                        border-dashed
                        transition-all
                        duration-300
                        ${
                            item.value || item.oldValue
                                ? 'border-neutral-300 bg-white'
                                : 'border-neutral-300 bg-neutral-50 hover:border-black hover:bg-white'
                        }
                    `}
                >

                    {item.value || item.oldValue ? (

                        <>
                            <img
                                src={preview}
                                alt={`Product ${index + 1}`}
                                className="
                                    h-full
                                    w-full
                                    object-cover
                                    transition-transform
                                    duration-500
                                    group-hover:scale-105
                                "
                            />

                            {!item.value && (
                                <div className="
                                    absolute
                                    bottom-0
                                    left-0
                                    right-0
                                    bg-black/70
                                    px-2
                                    py-2
                                    text-center
                                ">
                                    <span className="
                                        text-[9px]
                                        font-medium
                                        uppercase
                                        tracking-wider
                                        text-white
                                    ">
                                        Current Image
                                    </span>
                                </div>
                            )}
                        </>

                    ) : (

                        <div className="
                            flex
                            flex-col
                            items-center
                            justify-center
                            gap-3
                            text-center
                        ">

                            <div className="
                                flex
                                h-12
                                w-12
                                items-center
                                justify-center
                                rounded-full
                                bg-white
                                shadow-sm
                            ">
                                <ImagePlus
                                    size={21}
                                    strokeWidth={1.6}
                                    className="text-neutral-500"
                                />
                            </div>

                            <div>

                                <p className="
                                    text-xs
                                    font-medium
                                    text-neutral-700
                                ">
                                    Add Image
                                </p>

                                <p className="
                                    mt-1
                                    text-[10px]
                                    text-neutral-400
                                ">
                                    JPG / PNG
                                </p>

                            </div>

                        </div>

                    )}

                    <input
                        id={item.id}
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={(e) => {

                            const file =
                                e.target.files?.[0]

                            if (file) {
                                item.setter(file)
                            }

                        }}
                    />

                </label>

                {(item.value || item.oldValue) && (

                    <button
                        type="button"
                        onClick={() => {

                            if (item.value) {
                                item.setter(false)
                            }

                        }}
                        className="
                            absolute
                            right-2
                            top-2
                            flex
                            h-7
                            w-7
                            items-center
                            justify-center
                            rounded-full
                            bg-black/80
                            text-white
                            opacity-0
                            transition
                            duration-200
                            group-hover:opacity-100
                            hover:bg-black
                        "
                        title={
                            item.value
                                ? 'Remove new image'
                                : 'Select another image to replace'
                        }
                    >
                        <X size={14} />
                    </button>

                )}

                <div className="mt-2 text-center">

                    <span className="
                        text-[10px]
                        uppercase
                        tracking-[0.15em]
                        text-neutral-400
                    ">
                        Image {index + 1}
                    </span>

                </div>

            </div>

        )
    }

    // ========================================
    // LOADING SCREEN
    // ========================================

    if (loading) {

        return (

            <div className="
                flex
                min-h-[70vh]
                items-center
                justify-center
                bg-[#f7f7f5]
                px-4
            ">

                <div className="
                    flex
                    flex-col
                    items-center
                    justify-center
                    rounded-3xl
                    border
                    border-neutral-200
                    bg-white
                    px-10
                    py-10
                    text-center
                    shadow-sm
                ">

                    <div className="
                        mb-4
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-full
                        bg-neutral-100
                    ">

                        <Loader2
                            size={21}
                            className="
                                animate-spin
                                text-neutral-700
                            "
                        />

                    </div>

                    <p className="
                        text-sm
                        font-medium
                        text-neutral-900
                    ">
                        Loading Product
                    </p>

                    <p className="
                        mt-1
                        text-xs
                        text-neutral-400
                    ">
                        Please wait while we load the product details.
                    </p>

                </div>

            </div>

        )
    }

    // ========================================
    // PAGE
    // ========================================

    return (

        <div className="
            min-h-screen
            bg-[#f7f7f5]
            px-4
            py-6
            sm:px-6
            lg:px-8
        ">

            <div className="
                mx-auto
                max-w-6xl
            ">

                {/* ========================================
                    HEADER
                ======================================== */}

                <div className="
                    mb-8
                    flex
                    flex-col
                    justify-between
                    gap-4
                    sm:flex-row
                    sm:items-end
                ">

                    <div>

                        <div className="
                            mb-3
                            flex
                            items-center
                            gap-2
                        ">

                            <Sparkles
                                size={15}
                                className="text-neutral-500"
                            />

                            <span className="
                                text-[11px]
                                font-medium
                                uppercase
                                tracking-[0.25em]
                                text-neutral-500
                            ">
                                EASYBUY / ADMIN
                            </span>

                        </div>

                        <h1 className="
                            text-3xl
                            font-medium
                            tracking-tight
                            text-neutral-900
                            sm:text-4xl
                        ">
                            Edit Product
                        </h1>

                        <p className="
                            mt-2
                            max-w-xl
                            text-sm
                            leading-6
                            text-neutral-500
                        ">
                            Update your product information and keep your
                            EASYBUY collection fresh.
                        </p>

                    </div>

                    <button
                        type="button"
                        onClick={() => navigate('/list')}
                        className="
                            flex
                            w-fit
                            items-center
                            gap-2
                            rounded-full
                            border
                            border-neutral-200
                            bg-white
                            px-4
                            py-2.5
                            text-xs
                            font-medium
                            text-neutral-700
                            shadow-sm
                            transition-all
                            duration-200
                            hover:border-black
                            hover:bg-black
                            hover:text-white
                        "
                    >

                        <ArrowLeft size={15} />

                        Back to Products

                    </button>

                </div>

                {/* ========================================
                    FORM
                ======================================== */}

                <form onSubmit={onSubmitHandler}>

                    <div className="
                        grid
                        grid-cols-1
                        gap-6
                        lg:grid-cols-[1fr_340px]
                    ">

                        {/* ========================================
                            LEFT COLUMN
                        ======================================== */}

                        <div className="space-y-6">

                            {/* ========================================
                                PRODUCT IMAGES
                            ======================================== */}

                            <section className="
                                rounded-3xl
                                border
                                border-neutral-200
                                bg-white
                                p-5
                                shadow-sm
                                sm:p-7
                            ">

                                <div className="mb-6">

                                    <div className="
                                        flex
                                        items-center
                                        gap-3
                                    ">

                                        <div className="
                                            flex
                                            h-10
                                            w-10
                                            items-center
                                            justify-center
                                            rounded-xl
                                            bg-neutral-100
                                        ">

                                            <Upload
                                                size={18}
                                                className="text-neutral-700"
                                            />

                                        </div>

                                        <div>

                                            <h2 className="
                                                text-base
                                                font-medium
                                                text-neutral-900
                                            ">
                                                Product Images
                                            </h2>

                                            <p className="
                                                mt-0.5
                                                text-xs
                                                text-neutral-400
                                            ">
                                                Replace any image you want to update
                                            </p>

                                        </div>

                                    </div>

                                </div>

                                <div className="
                                    grid
                                    grid-cols-2
                                    gap-3
                                    sm:grid-cols-4
                                ">

                                    {images.map((item, index) => (

                                        <ImageUploadCard
                                            key={item.id}
                                            item={item}
                                            index={index}
                                        />

                                    ))}

                                </div>

                                <div className="
                                    mt-5
                                    flex
                                    items-start
                                    gap-2
                                    rounded-xl
                                    bg-neutral-50
                                    px-4
                                    py-3
                                ">

                                    <ImagePlus
                                        size={15}
                                        className="
                                            mt-0.5
                                            shrink-0
                                            text-neutral-400
                                        "
                                    />

                                    <p className="
                                        text-[11px]
                                        leading-5
                                        text-neutral-500
                                    ">
                                        Existing images are kept automatically.
                                        Upload a new image only when you want to
                                        replace the current one.
                                    </p>

                                </div>

                            </section>

                            {/* ========================================
                                PRODUCT INFORMATION
                            ======================================== */}

                            <section className="
                                rounded-3xl
                                border
                                border-neutral-200
                                bg-white
                                p-5
                                shadow-sm
                                sm:p-7
                            ">

                                <div className="
                                    mb-6
                                    flex
                                    items-center
                                    gap-3
                                ">

                                    <div className="
                                        flex
                                        h-10
                                        w-10
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-neutral-100
                                    ">

                                        <FileText
                                            size={18}
                                            className="text-neutral-700"
                                        />

                                    </div>

                                    <div>

                                        <h2 className="
                                            text-base
                                            font-medium
                                            text-neutral-900
                                        ">
                                            Product Information
                                        </h2>

                                        <p className="
                                            mt-0.5
                                            text-xs
                                            text-neutral-400
                                        ">
                                            Update the basic details of your product
                                        </p>

                                    </div>

                                </div>

                                <div className="space-y-5">

                                    {/* Product Name */}

                                    <div>

                                        <label className="
                                            mb-2
                                            block
                                            text-xs
                                            font-medium
                                            uppercase
                                            tracking-wider
                                            text-neutral-600
                                        ">
                                            Product Name
                                        </label>

                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
                                            placeholder="e.g. Premium Oversized T-Shirt"
                                            required
                                            className="
                                                w-full
                                                rounded-xl
                                                border
                                                border-neutral-200
                                                bg-neutral-50
                                                px-4
                                                py-3
                                                text-sm
                                                text-neutral-900
                                                outline-none
                                                transition
                                                placeholder:text-neutral-400
                                                focus:border-black
                                                focus:bg-white
                                            "
                                        />

                                    </div>

                                    {/* Description */}

                                    <div>

                                        <label className="
                                            mb-2
                                            block
                                            text-xs
                                            font-medium
                                            uppercase
                                            tracking-wider
                                            text-neutral-600
                                        ">
                                            Product Description
                                        </label>

                                        <textarea
                                            value={description}
                                            onChange={(e) =>
                                                setDescription(e.target.value)
                                            }
                                            placeholder="Write a clear description of your product..."
                                            rows={5}
                                            required
                                            className="
                                                w-full
                                                resize-none
                                                rounded-xl
                                                border
                                                border-neutral-200
                                                bg-neutral-50
                                                px-4
                                                py-3
                                                text-sm
                                                leading-6
                                                text-neutral-900
                                                outline-none
                                                transition
                                                placeholder:text-neutral-400
                                                focus:border-black
                                                focus:bg-white
                                            "
                                        />

                                    </div>

                                    {/* Price */}

                                    <div className="max-w-xs">

                                        <label className="
                                            mb-2
                                            block
                                            text-xs
                                            font-medium
                                            uppercase
                                            tracking-wider
                                            text-neutral-600
                                        ">
                                            Product Price
                                        </label>

                                        <div className="relative">

                                            <span className="
                                                absolute
                                                left-4
                                                top-1/2
                                                -translate-y-1/2
                                                text-sm
                                                font-medium
                                                text-neutral-500
                                            ">
                                                $
                                            </span>

                                            <input
                                                type="number"
                                                min="0"
                                                step="0.01"
                                                value={price}
                                                onChange={(e) =>
                                                    setPrice(e.target.value)
                                                }
                                                placeholder="0"
                                                required
                                                className="
                                                    w-full
                                                    rounded-xl
                                                    border
                                                    border-neutral-200
                                                    bg-neutral-50
                                                    py-3
                                                    pl-14
                                                    pr-4
                                                    text-sm
                                                    text-neutral-900
                                                    outline-none
                                                    transition
                                                    placeholder:text-neutral-400
                                                    focus:border-black
                                                    focus:bg-white
                                                "
                                            />

                                        </div>

                                    </div>

                                </div>

                            </section>

                            {/* ========================================
                                PRODUCT CLASSIFICATION
                            ======================================== */}

                            <section className="
                                rounded-3xl
                                border
                                border-neutral-200
                                bg-white
                                p-5
                                shadow-sm
                                sm:p-7
                            ">

                                <div className="
                                    mb-6
                                    flex
                                    items-center
                                    gap-3
                                ">

                                    <div className="
                                        flex
                                        h-10
                                        w-10
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-neutral-100
                                    ">

                                        <Layers3
                                            size={18}
                                            className="text-neutral-700"
                                        />

                                    </div>

                                    <div>

                                        <h2 className="
                                            text-base
                                            font-medium
                                            text-neutral-900
                                        ">
                                            Product Classification
                                        </h2>

                                        <p className="
                                            mt-0.5
                                            text-xs
                                            text-neutral-400
                                        ">
                                            Organize your product into the right collection
                                        </p>

                                    </div>

                                </div>

                                <div className="
                                    grid
                                    grid-cols-1
                                    gap-5
                                    sm:grid-cols-2
                                    lg:grid-cols-3
                                ">

                                    {/* Category */}

                                    <div>

                                        <label className="
                                            mb-2
                                            block
                                            text-xs
                                            font-medium
                                            uppercase
                                            tracking-wider
                                            text-neutral-600
                                        ">
                                            Category
                                        </label>

                                        <select
                                            value={category}
                                            onChange={(e) =>
                                                handleCategoryChange(
                                                    e.target.value
                                                )
                                            }
                                            className="
                                                w-full
                                                appearance-none
                                                rounded-xl
                                                border
                                                border-neutral-200
                                                bg-neutral-50
                                                px-4
                                                py-3
                                                text-sm
                                                text-neutral-800
                                                outline-none
                                                transition
                                                focus:border-black
                                                focus:bg-white
                                            "
                                        >

                                            <option value="Men">
                                                Men
                                            </option>

                                            <option value="Women">
                                                Women
                                            </option>

                                            <option value="Kids">
                                                Juniors
                                            </option>

                                        </select>

                                    </div>

                                    {/* Gender */}

                                    {category === 'Kids' && (

                                        <div>

                                            <label className="
                                                mb-2
                                                block
                                                text-xs
                                                font-medium
                                                uppercase
                                                tracking-wider
                                                text-neutral-600
                                            ">
                                                Gender
                                            </label>

                                            <select
                                                value={gender}
                                                onChange={(e) =>
                                                    handleGenderChange(
                                                        e.target.value
                                                    )
                                                }
                                                required
                                                className="
                                                    w-full
                                                    rounded-xl
                                                    border
                                                    border-neutral-200
                                                    bg-neutral-50
                                                    px-4
                                                    py-3
                                                    text-sm
                                                    text-neutral-800
                                                    outline-none
                                                    transition
                                                    focus:border-black
                                                    focus:bg-white
                                                "
                                            >

                                                <option value="">
                                                    Select Gender
                                                </option>

                                                {Object.keys(
                                                    categoryOptions.Kids || {}
                                                ).map((item) => (

                                                    <option
                                                        key={item}
                                                        value={item}
                                                    >
                                                        {item}
                                                    </option>

                                                ))}

                                            </select>

                                        </div>

                                    )}

                                    {/* Sub Category */}

                                    <div>

                                        <label className="
                                            mb-2
                                            block
                                            text-xs
                                            font-medium
                                            uppercase
                                            tracking-wider
                                            text-neutral-600
                                        ">
                                            Sub Category
                                        </label>

                                        <select
                                            value={subCategory}
                                            onChange={(e) =>
                                                handleSubCategoryChange(
                                                    e.target.value
                                                )
                                            }
                                            disabled={
                                                category === 'Kids' &&
                                                !gender
                                            }
                                            required
                                            className="
                                                w-full
                                                rounded-xl
                                                border
                                                border-neutral-200
                                                bg-neutral-50
                                                px-4
                                                py-3
                                                text-sm
                                                text-neutral-800
                                                outline-none
                                                transition
                                                focus:border-black
                                                focus:bg-white
                                                disabled:cursor-not-allowed
                                                disabled:opacity-50
                                            "
                                        >

                                            <option value="">
                                                Select Sub Category
                                            </option>

                                            {category !== 'Kids' &&

                                                Object.keys(
                                                    categoryOptions[
                                                        category
                                                    ] || {}
                                                ).map((item) => (

                                                    <option
                                                        key={item}
                                                        value={item}
                                                    >
                                                        {item}
                                                    </option>

                                                ))
                                            }

                                            {category === 'Kids' &&
                                                gender &&

                                                Object.keys(
                                                    categoryOptions.Kids?.[
                                                        gender
                                                    ] || {}
                                                ).map((item) => (

                                                    <option
                                                        key={item}
                                                        value={item}
                                                    >
                                                        {item}
                                                    </option>

                                                ))
                                            }

                                        </select>

                                    </div>

                                    {/* Product Type */}

                                    <div>

                                        <label className="
                                            mb-2
                                            block
                                            text-xs
                                            font-medium
                                            uppercase
                                            tracking-wider
                                            text-neutral-600
                                        ">
                                            Product Type
                                        </label>

                                        <select
                                            value={subSubCategory}
                                            onChange={(e) =>
                                                setSubSubCategory(
                                                    e.target.value
                                                )
                                            }
                                            disabled={!subCategory}
                                            required
                                            className="
                                                w-full
                                                rounded-xl
                                                border
                                                border-neutral-200
                                                bg-neutral-50
                                                px-4
                                                py-3
                                                text-sm
                                                text-neutral-800
                                                outline-none
                                                transition
                                                focus:border-black
                                                focus:bg-white
                                                disabled:cursor-not-allowed
                                                disabled:opacity-50
                                            "
                                        >

                                            <option value="">
                                                Select Product Type
                                            </option>

                                            {category !== 'Kids' &&

                                                (
                                                    categoryOptions[
                                                        category
                                                    ]?.[
                                                        subCategory
                                                    ] || []
                                                ).map((item) => (

                                                    <option
                                                        key={item}
                                                        value={item}
                                                    >
                                                        {item}
                                                    </option>

                                                ))
                                            }

                                            {category === 'Kids' &&

                                                (
                                                    categoryOptions.Kids?.[
                                                        gender
                                                    ]?.[
                                                        subCategory
                                                    ] || []
                                                ).map((item) => (

                                                    <option
                                                        key={item}
                                                        value={item}
                                                    >
                                                        {item}
                                                    </option>

                                                ))
                                            }

                                        </select>

                                    </div>

                                </div>

                            </section>

                            {/* ========================================
                                SIZES
                            ======================================== */}

                            <section className="
                                rounded-3xl
                                border
                                border-neutral-200
                                bg-white
                                p-5
                                shadow-sm
                                sm:p-7
                            ">

                                <div className="
                                    mb-6
                                    flex
                                    items-center
                                    gap-3
                                ">

                                    <div className="
                                        flex
                                        h-10
                                        w-10
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-neutral-100
                                    ">

                                        <Ruler
                                            size={18}
                                            className="text-neutral-700"
                                        />

                                    </div>

                                    <div>

                                        <h2 className="
                                            text-base
                                            font-medium
                                            text-neutral-900
                                        ">
                                            Available Sizes
                                        </h2>

                                        <p className="
                                            mt-0.5
                                            text-xs
                                            text-neutral-400
                                        ">
                                            Select all sizes available for this product
                                        </p>

                                    </div>

                                </div>

                                <div className="
                                    flex
                                    flex-wrap
                                    gap-2
                                ">

                                    {sizeOptions.map((size) => {

                                        const selected =
                                            sizes.includes(size)

                                        return (

                                            <button
                                                key={size}
                                                type="button"
                                                onClick={() =>
                                                    toggleSize(size)
                                                }
                                                className={`
                                                    flex
                                                    h-11
                                                    min-w-11
                                                    items-center
                                                    justify-center
                                                    rounded-xl
                                                    border
                                                    px-4
                                                    text-sm
                                                    font-medium
                                                    transition-all
                                                    duration-200
                                                    ${
                                                        selected
                                                            ? 'border-black bg-black text-white shadow-sm'
                                                            : 'border-neutral-200 bg-neutral-50 text-neutral-600 hover:border-neutral-400 hover:bg-white'
                                                    }
                                                `}
                                            >

                                                {selected && (

                                                    <Check
                                                        size={13}
                                                        className="mr-1.5"
                                                    />

                                                )}

                                                {size}

                                            </button>

                                        )

                                    })}

                                </div>

                            </section>

                        </div>

                        {/* ========================================
                            RIGHT COLUMN
                        ======================================== */}

                        <div className="
                            space-y-6
                            lg:sticky
                            lg:top-6
                            lg:self-start
                        ">

                            {/* ========================================
                                UPDATE SUMMARY
                            ======================================== */}

                            <div className="
                                rounded-3xl
                                border
                                border-neutral-200
                                bg-white
                                p-5
                                shadow-sm
                                sm:p-6
                            ">

                                <div className="
                                    mb-6
                                    flex
                                    items-center
                                    gap-3
                                ">

                                    <div className="
                                        flex
                                        h-10
                                        w-10
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-neutral-900
                                    ">

                                        <Pencil
                                            size={17}
                                            className="text-white"
                                        />

                                    </div>

                                    <div>

                                        <h2 className="
                                            text-base
                                            font-medium
                                            text-neutral-900
                                        ">
                                            Product Summary
                                        </h2>

                                        <p className="
                                            text-xs
                                            text-neutral-400
                                        ">
                                            Review your changes
                                        </p>

                                    </div>

                                </div>

                                <div className="space-y-4">

                                    {/* Product */}

                                    <div className="
                                        flex
                                        items-center
                                        justify-between
                                        gap-4
                                        border-b
                                        border-neutral-100
                                        pb-4
                                    ">

                                        <span className="
                                            text-xs
                                            text-neutral-500
                                        ">
                                            Product
                                        </span>

                                        <span className="
                                            max-w-[170px]
                                            truncate
                                            text-right
                                            text-xs
                                            font-medium
                                            text-neutral-900
                                        ">
                                            {name || 'Not added'}
                                        </span>

                                    </div>

                                    {/* Category */}

                                    <div className="
                                        flex
                                        items-center
                                        justify-between
                                        gap-4
                                        border-b
                                        border-neutral-100
                                        pb-4
                                    ">

                                        <span className="
                                            text-xs
                                            text-neutral-500
                                        ">
                                            Category
                                        </span>

                                        <span className="
                                            text-xs
                                            font-medium
                                            text-neutral-900
                                        ">
                                            {category === 'Kids'
                                                ? 'Juniors'
                                                : category
                                            }
                                        </span>

                                    </div>

                                    {/* Sub Category */}

                                    <div className="
                                        flex
                                        items-center
                                        justify-between
                                        gap-4
                                        border-b
                                        border-neutral-100
                                        pb-4
                                    ">

                                        <span className="
                                            text-xs
                                            text-neutral-500
                                        ">
                                            Collection
                                        </span>

                                        <span className="
                                            max-w-[170px]
                                            truncate
                                            text-right
                                            text-xs
                                            font-medium
                                            text-neutral-900
                                        ">
                                            {subCategory || 'Not selected'}
                                        </span>

                                    </div>

                                    {/* Product Type */}

                                    <div className="
                                        flex
                                        items-center
                                        justify-between
                                        gap-4
                                        border-b
                                        border-neutral-100
                                        pb-4
                                    ">

                                        <span className="
                                            text-xs
                                            text-neutral-500
                                        ">
                                            Type
                                        </span>

                                        <span className="
                                            max-w-[170px]
                                            truncate
                                            text-right
                                            text-xs
                                            font-medium
                                            text-neutral-900
                                        ">
                                            {subSubCategory ||
                                                'Not selected'
                                            }
                                        </span>

                                    </div>

                                    {/* Price */}

                                    <div className="
                                        flex
                                        items-center
                                        justify-between
                                        gap-4
                                        border-b
                                        border-neutral-100
                                        pb-4
                                    ">

                                        <span className="
                                            text-xs
                                            text-neutral-500
                                        ">
                                            Price
                                        </span>

                                        <span className="
                                            text-sm
                                            font-semibold
                                            text-neutral-900
                                        ">
                                            {price
                                                ? `$ ${Number(
                                                    price
                                                ).toLocaleString()}`
                                                : '$ 0'
                                            }
                                        </span>

                                    </div>

                                    {/* Sizes */}

                                    <div className="
                                        flex
                                        items-center
                                        justify-between
                                        gap-4
                                    ">

                                        <span className="
                                            text-xs
                                            text-neutral-500
                                        ">
                                            Sizes
                                        </span>

                                        <span className="
                                            max-w-[170px]
                                            truncate
                                            text-right
                                            text-xs
                                            font-medium
                                            text-neutral-900
                                        ">
                                            {sizes.length > 0
                                                ? sizes.join(', ')
                                                : 'None selected'
                                            }
                                        </span>

                                    </div>

                                </div>

                            </div>

                            {/* ========================================
                                BEST SELLER
                            ======================================== */}

                            <div
                                onClick={() =>
                                    setBestseller(
                                        (prev) => !prev
                                    )
                                }
                                className={`
                                    cursor-pointer
                                    rounded-3xl
                                    border
                                    p-5
                                    transition-all
                                    duration-300
                                    ${
                                        bestSeller
                                            ? 'border-black bg-black text-white'
                                            : 'border-neutral-200 bg-white text-neutral-900'
                                    }
                                `}
                            >

                                <div className="
                                    flex
                                    items-center
                                    justify-between
                                ">

                                    <div className="
                                        flex
                                        items-center
                                        gap-3
                                    ">

                                        <div
                                            className={`
                                                flex
                                                h-10
                                                w-10
                                                items-center
                                                justify-center
                                                rounded-xl
                                                ${
                                                    bestSeller
                                                        ? 'bg-white/10'
                                                        : 'bg-neutral-100'
                                                }
                                            `}
                                        >

                                            <Star
                                                size={18}
                                                className={
                                                    bestSeller
                                                        ? 'fill-white'
                                                        : ''
                                                }
                                            />

                                        </div>

                                        <div>

                                            <p className="text-sm font-medium">
                                                Best Seller
                                            </p>

                                            <p
                                                className={`
                                                    mt-0.5
                                                    text-[11px]
                                                    ${
                                                        bestSeller
                                                            ? 'text-white/60'
                                                            : 'text-neutral-400'
                                                    }
                                                `}
                                            >
                                                Feature this product
                                            </p>

                                        </div>

                                    </div>

                                    <div
                                        className={`
                                            flex
                                            h-6
                                            w-11
                                            items-center
                                            rounded-full
                                            p-1
                                            transition
                                            ${
                                                bestSeller
                                                    ? 'justify-end bg-white'
                                                    : 'justify-start bg-neutral-200'
                                            }
                                        `}
                                    >

                                        <div
                                            className={`
                                                h-4
                                                w-4
                                                rounded-full
                                                transition
                                                ${
                                                    bestSeller
                                                        ? 'bg-black'
                                                        : 'bg-white shadow-sm'
                                                }
                                            `}
                                        />

                                    </div>

                                </div>

                            </div>

                            {/* ========================================
                                UPDATE BUTTON
                            ======================================== */}

                            <button
                                type="submit"
                                disabled={updating}
                                className="
                                    flex
                                    w-full
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-2xl
                                    bg-black
                                    px-6
                                    py-4
                                    text-sm
                                    font-medium
                                    text-white
                                    shadow-lg
                                    shadow-black/10
                                    transition-all
                                    duration-300
                                    hover:-translate-y-0.5
                                    hover:bg-neutral-800
                                    hover:shadow-xl
                                    disabled:cursor-not-allowed
                                    disabled:opacity-60
                                    disabled:hover:translate-y-0
                                "
                            >

                                {updating ? (

                                    <>
                                        <Loader2
                                            size={17}
                                            className="animate-spin"
                                        />

                                        Updating Product...
                                    </>

                                ) : (

                                    <>
                                        <PackageCheck
                                            size={17}
                                        />

                                        Update Product
                                    </>

                                )}

                            </button>

                            {/* ========================================
                                CANCEL BUTTON
                            ======================================== */}

                            <button
                                type="button"
                                disabled={updating}
                                onClick={() => navigate('/list')}
                                className="
                                    flex
                                    w-full
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-2xl
                                    border
                                    border-neutral-200
                                    bg-white
                                    px-6
                                    py-4
                                    text-sm
                                    font-medium
                                    text-neutral-700
                                    shadow-sm
                                    transition-all
                                    duration-300
                                    hover:border-black
                                    hover:bg-neutral-950
                                    hover:text-white
                                    disabled:cursor-not-allowed
                                    disabled:opacity-50
                                "
                            >

                                <ArrowLeft size={16} />

                                Cancel Changes

                            </button>

                            {/* ========================================
                                TRUST NOTE
                            ======================================== */}

                            <div className="
                                flex
                                items-start
                                gap-3
                                rounded-2xl
                                border
                                border-neutral-200
                                bg-white
                                p-4
                            ">

                                <div className="
                                    flex
                                    h-8
                                    w-8
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-neutral-100
                                ">

                                    <Check
                                        size={15}
                                        className="text-neutral-700"
                                    />

                                </div>

                                <div>

                                    <p className="
                                        text-xs
                                        font-medium
                                        text-neutral-800
                                    ">
                                        Changes are safe
                                    </p>

                                    <p className="
                                        mt-1
                                        text-[11px]
                                        leading-5
                                        text-neutral-400
                                    ">
                                        Review the product information,
                                        images and sizes before saving
                                        your changes.
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </form>

            </div>

        </div>

    )
}

export default Edit

