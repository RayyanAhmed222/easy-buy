import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

import {
  Search,
  RefreshCw,
  Package,
  Pencil,
  Trash2,
  Star,
  SlidersHorizontal,
  X,
  ChevronDown,
  Layers3,
  Tag,
  Users,
  Ruler,
  Sparkles
} from 'lucide-react'

import { backendUrl, currency } from '../App'

const List = ({ token }) => {

  const [list, setList] = useState([])
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [deletingId, setDeletingId] = useState(null)

  const navigate = useNavigate()

  // =========================================
  // FETCH PRODUCTS
  // =========================================
  const fetchList = async (isRefresh = false) => {
    try {

      if (isRefresh) {
        setRefreshing(true)
      } else {
        setLoading(true)
      }

      const response = await axios.get(
        backendUrl + '/api/product/list'
      )

      if (response.data.success) {
        setList(response.data.products || [])
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(
        error.response?.data?.message ||
        error.message ||
        'Failed to load products'
      )
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  // =========================================
  // REMOVE PRODUCT
  // =========================================
  const removeProduct = async (id) => {

    const product = list.find(item => item._id === id)

    const confirmed = window.confirm(
      `Are you sure you want to delete "${product?.name || 'this product'}"?`
    )

    if (!confirmed) return

    try {

      setDeletingId(id)

      const response = await axios.post(
        backendUrl + '/api/product/remove',
        { id },
        { headers: { token } }
      )

      if (response.data.success) {

        toast.success(response.data.message)

        setList(prev =>
          prev.filter(item => item._id !== id)
        )

      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)

      toast.error(
        error.response?.data?.message ||
        error.message ||
        'Failed to delete product'
      )

    } finally {
      setDeletingId(null)
    }
  }

  // =========================================
  // EDIT PRODUCT
  // =========================================
  const editProduct = (id) => {
    navigate(`/edit-product/${id}`)
  }

  // =========================================
  // FETCH ON LOAD
  // =========================================
  useEffect(() => {
    fetchList()
  }, [])

  // =========================================
  // CATEGORIES
  // =========================================
  const categories = useMemo(() => {

    const uniqueCategories = [
      ...new Set(
        list
          .map(item => item.category)
          .filter(Boolean)
      )
    ]

    return ['All', ...uniqueCategories]

  }, [list])

  // =========================================
  // FILTER PRODUCTS
  // =========================================
  const filteredProducts = useMemo(() => {

    const query = search.trim().toLowerCase()

    return list.filter(item => {

      const matchesSearch =
        !query ||
        item.name?.toLowerCase().includes(query) ||
        item.category?.toLowerCase().includes(query) ||
        item.gender?.toLowerCase().includes(query) ||
        item.subCategory?.toLowerCase().includes(query) ||
        item.subSubCategory?.toLowerCase().includes(query)

      const matchesCategory =
        categoryFilter === 'All' ||
        item.category === categoryFilter

      return matchesSearch && matchesCategory
    })

  }, [list, search, categoryFilter])

  // =========================================
  // PRICE FORMAT
  // =========================================
  const formatPrice = (price) => {
    return Number(price || 0).toLocaleString('en-PK')
  }

  return (
    <div className="min-h-screen bg-[#f7f7f5] px-4 py-5 sm:px-6 lg:px-8">

      {/* =========================================
                PAGE HEADER
            ========================================= */}
      <div className="mb-6">

        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

          <div>

            <div className="mb-2 flex items-center gap-2">

              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-white">
                <Package size={16} />
              </div>

              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                EASYBUY / ADMIN
              </span>

            </div>

            <h1 className="text-2xl font-semibold tracking-tight text-neutral-950 sm:text-3xl">
              Product Inventory
            </h1>

            <p className="mt-1 text-sm text-neutral-500">
              Manage, edit and organize your complete product catalog.
            </p>

          </div>

          <div className="flex items-center gap-3">

            <div className="rounded-xl border border-neutral-200 bg-white px-4 py-2.5 shadow-sm">

              <p className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                Total Products
              </p>

              <p className="mt-0.5 text-lg font-semibold text-neutral-900">
                {list.length}
              </p>

            </div>

            <button
              type="button"
              onClick={() => fetchList(true)}
              disabled={refreshing}
              className="
                                flex
                                h-11
                                items-center
                                gap-2
                                rounded-xl
                                border
                                border-neutral-200
                                bg-white
                                px-4
                                text-sm
                                font-medium
                                text-neutral-700
                                shadow-sm
                                hover:border-neutral-300
                                hover:bg-neutral-50
                                disabled:cursor-not-allowed
                                disabled:opacity-60
                            "
            >
              <RefreshCw
                size={16}
                className={refreshing ? 'animate-spin' : ''}
              />

              <span className="hidden sm:inline">
                Refresh
              </span>
            </button>

          </div>

        </div>

      </div>


      {/* =========================================
                SEARCH + FILTER BAR
            ========================================= */}
      <div className="mb-5 rounded-2xl border border-neutral-200 bg-white p-3 shadow-sm">

        <div className="flex flex-col gap-3 lg:flex-row">

          {/* Search */}
          <div className="relative flex-1">

            <Search
              size={18}
              className="
                                pointer-events-none
                                absolute
                                left-4
                                top-1/2
                                -translate-y-1/2
                                text-neutral-400
                            "
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products, category, gender..."
              className="
                                h-11
                                w-full
                                rounded-xl
                                border
                                border-neutral-200
                                bg-neutral-50
                                pl-11
                                pr-10
                                text-sm
                                text-neutral-900
                                outline-none
                                transition
                                placeholder:text-neutral-400
                                focus:border-black
                                focus:bg-white
                            "
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                className="
                                    absolute
                                    right-3
                                    top-1/2
                                    flex
                                    h-7
                                    w-7
                                    -translate-y-1/2
                                    items-center
                                    justify-center
                                    rounded-full
                                    text-neutral-400
                                    hover:bg-neutral-100
                                    hover:text-neutral-900
                                "
              >
                <X size={15} />
              </button>
            )}

          </div>


          {/* Category Filter */}
          <div className="relative lg:w-52">

            <SlidersHorizontal
              size={16}
              className="
                                pointer-events-none
                                absolute
                                left-4
                                top-1/2
                                -translate-y-1/2
                                text-neutral-400
                            "
            />

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="
                                h-11
                                w-full
                                appearance-none
                                rounded-xl
                                border
                                border-neutral-200
                                bg-neutral-50
                                pl-10
                                pr-10
                                text-sm
                                font-medium
                                text-neutral-800
                                outline-none
                                focus:border-black
                                focus:bg-white
                            "
            >
              {categories.map(category => (
                <option
                  key={category}
                  value={category}
                >
                  {category === 'All'
                    ? 'All Categories'
                    : category
                  }
                </option>
              ))}
            </select>

            <ChevronDown
              size={16}
              className="
                                pointer-events-none
                                absolute
                                right-4
                                top-1/2
                                -translate-y-1/2
                                text-neutral-400
                            "
            />

          </div>

        </div>

      </div>


      {/* =========================================
                RESULT INFO
            ========================================= */}
      {!loading && (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">

          <p className="text-sm text-neutral-500">
            Showing{' '}
            <span className="font-semibold text-neutral-900">
              {filteredProducts.length}
            </span>{' '}
            {filteredProducts.length === 1
              ? 'product'
              : 'products'
            }
          </p>

          {(search || categoryFilter !== 'All') && (
            <button
              type="button"
              onClick={() => {
                setSearch('')
                setCategoryFilter('All')
              }}
              className="
                                text-xs
                                font-semibold
                                text-neutral-600
                                underline
                                underline-offset-4
                                hover:text-black
                            "
            >
              Clear filters
            </button>
          )}

        </div>
      )}

      {/* =========================================
    LOADING
========================================= */}

      {loading ? (
        <div className="rounded-2xl border border-neutral-200 bg-white p-12 shadow-sm">
          <div className="flex flex-col items-center justify-center text-center">

            <div
              className="
                    mb-4
                    h-10
                    w-10
                    animate-spin
                    rounded-full
                    border-2
                    border-neutral-200
                    border-t-black
                "
            />

            <p className="text-sm font-medium text-neutral-900">
              Loading products
            </p>

            <p className="mt-1 text-xs text-neutral-500">
              Please wait while we fetch your catalog.
            </p>

          </div>
        </div>
      ) : filteredProducts.length === 0 ? (
        /* =========================================
           EMPTY STATE
        ========================================= */
        <div className="rounded-2xl border border-dashed border-neutral-300 bg-white px-6 py-16 text-center shadow-sm">

          <div className="
                        mx-auto
                        mb-4
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-2xl
                        bg-neutral-100
                        text-neutral-500
                    ">
            <Package size={24} />
          </div>

          <h3 className="text-lg font-semibold text-neutral-900">
            No products found
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm text-neutral-500">
            {search || categoryFilter !== 'All'
              ? 'Try changing your search or category filter.'
              : 'Your product catalog is currently empty.'
            }
          </p>

          {(search || categoryFilter !== 'All') && (
            <button
              type="button"
              onClick={() => {
                setSearch('')
                setCategoryFilter('All')
              }}
              className="
                                mt-5
                                rounded-xl
                                bg-black
                                px-5
                                py-2.5
                                text-sm
                                font-semibold
                                text-white
                                hover:bg-neutral-800
                            "
            >
              Clear Filters
            </button>
          )}

        </div>

      ) : (

        <>
          {/* =========================================
                        DESKTOP TABLE
                    ========================================= */}
          <div className="hidden xl:block overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">

            {/* Table Header */}
            <div className="
                            grid
                            grid-cols-[70px_minmax(180px,2fr)_100px_100px_140px_140px_150px_110px_110px]
                            items-center
                            gap-4
                            border-b
                            border-neutral-200
                            bg-neutral-50
                            px-5
                            py-3
                        ">

              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                Image
              </span>

              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                Product
              </span>

              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                Category
              </span>

              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                Gender
              </span>

              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                Sub Category
              </span>

              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                Product Type
              </span>

              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                Sizes
              </span>

              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                Price
              </span>

              <span className="text-center text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                Actions
              </span>

            </div>


            {/* Table Rows */}
            {filteredProducts.map((item, index) => (

              <div
                key={item._id || index}
                className="
                                    grid
                                    grid-cols-[70px_minmax(180px,2fr)_100px_100px_140px_140px_150px_110px_110px]
                                    items-center
                                    gap-4
                                    border-b
                                    border-neutral-100
                                    px-5
                                    py-4
                                    last:border-b-0
                                    hover:bg-neutral-50/70
                                "
              >

                {/* Image */}
                <div className="
                                    h-14
                                    w-14
                                    overflow-hidden
                                    rounded-xl
                                    bg-neutral-100
                                ">
                  <img
                    src={item.image?.[0]}
                    alt={item.name}
                    className="
                                            h-full
                                            w-full
                                            object-cover
                                        "
                  />
                </div>


                {/* Product */}
                <div className="min-w-0">

                  <p className="truncate text-sm font-semibold text-neutral-900">
                    {item.name}
                  </p>

                  {item.bestSeller && (
                    <span className="
                                            mt-1
                                            inline-flex
                                            items-center
                                            gap-1
                                            rounded-full
                                            bg-amber-50
                                            px-2
                                            py-0.5
                                            text-[10px]
                                            font-semibold
                                            text-amber-700
                                        ">
                      <Star
                        size={10}
                        fill="currentColor"
                      />
                      Best Seller
                    </span>
                  )}

                </div>


                {/* Category */}
                <div>
                  <span className="
                                        inline-flex
                                        rounded-full
                                        bg-neutral-100
                                        px-2.5
                                        py-1
                                        text-[11px]
                                        font-semibold
                                        text-neutral-700
                                    ">
                    {item.category || '-'}
                  </span>
                </div>


                {/* Gender */}
                <p className="text-xs text-neutral-600">
                  {item.gender || '-'}
                </p>


                {/* Sub Category */}
                <p className="truncate text-xs text-neutral-600">
                  {item.subCategory || '-'}
                </p>


                {/* Product Type */}
                <p className="truncate text-xs text-neutral-600">
                  {item.subSubCategory || '-'}
                </p>


                {/* Sizes */}
                <div className="flex flex-wrap gap-1">

                  {item.sizes?.length > 0
                    ? item.sizes.map((size, sizeIndex) => (
                      <span
                        key={sizeIndex}
                        className="
                                                    rounded-md
                                                    border
                                                    border-neutral-200
                                                    bg-white
                                                    px-1.5
                                                    py-0.5
                                                    text-[10px]
                                                    font-medium
                                                    text-neutral-600
                                                "
                      >
                        {size}
                      </span>
                    ))
                    : (
                      <span className="text-xs text-neutral-400">
                        -
                      </span>
                    )
                  }

                </div>


                {/* Price */}
                <p className="text-sm font-semibold text-neutral-900">
                  {currency}{formatPrice(item.price)}
                </p>


                {/* Actions */}
                <div className="flex items-center justify-center gap-2">

                  <button
                    type="button"
                    onClick={() => editProduct(item._id)}
                    title="Edit product"
                    className="
                                            flex
                                            h-9
                                            w-9
                                            items-center
                                            justify-center
                                            rounded-lg
                                            border
                                            border-neutral-200
                                            bg-white
                                            text-neutral-600
                                            hover:border-black
                                            hover:bg-black
                                            hover:text-white
                                        "
                  >
                    <Pencil size={15} />
                  </button>

                  <button
                    type="button"
                    onClick={() => removeProduct(item._id)}
                    disabled={deletingId === item._id}
                    title="Delete product"
                    className="
                                            flex
                                            h-9
                                            w-9
                                            items-center
                                            justify-center
                                            rounded-lg
                                            border
                                            border-red-100
                                            bg-red-50
                                            text-red-500
                                            hover:border-red-500
                                            hover:bg-red-500
                                            hover:text-white
                                            disabled:cursor-not-allowed
                                            disabled:opacity-50
                                        "
                  >
                    {deletingId === item._id ? (
                      <span className="
                                                h-4
                                                w-4
                                                animate-spin
                                                rounded-full
                                                border-2
                                                border-red-200
                                                border-t-red-500
                                            " />
                    ) : (
                      <Trash2 size={15} />
                    )}
                  </button>

                </div>

              </div>

            ))}

          </div>


          {/* =========================================
                        MOBILE / TABLET CARDS
                    ========================================= */}
          <div className="grid gap-4 xl:hidden">

            {filteredProducts.map((item, index) => (

              <div
                key={item._id || index}
                className="
                                    overflow-hidden
                                    rounded-2xl
                                    border
                                    border-neutral-200
                                    bg-white
                                    shadow-sm
                                "
              >

                {/* Product Top */}
                <div className="flex gap-4 p-4">

                  <div className="
                                        h-24
                                        w-24
                                        shrink-0
                                        overflow-hidden
                                        rounded-xl
                                        bg-neutral-100
                                    ">
                    <img
                      src={item.image?.[0]}
                      alt={item.name}
                      className="
                                                h-full
                                                w-full
                                                object-cover
                                            "
                    />
                  </div>


                  <div className="min-w-0 flex-1">

                    <div className="flex items-start justify-between gap-3">

                      <div className="min-w-0">

                        <p className="
                                                    truncate
                                                    text-base
                                                    font-semibold
                                                    text-neutral-900
                                                ">
                          {item.name}
                        </p>

                        <p className="mt-1 text-xs text-neutral-500">
                          {item.category || 'Uncategorized'}
                        </p>

                      </div>

                      {item.bestSeller && (
                        <span className="
                                                    flex
                                                    shrink-0
                                                    items-center
                                                    gap-1
                                                    rounded-full
                                                    bg-amber-50
                                                    px-2
                                                    py-1
                                                    text-[10px]
                                                    font-semibold
                                                    text-amber-700
                                                ">
                          <Star
                            size={10}
                            fill="currentColor"
                          />
                          Best
                        </span>
                      )}

                    </div>


                    <p className="
                                            mt-3
                                            text-lg
                                            font-semibold
                                            text-neutral-950
                                        ">
                      {currency}{formatPrice(item.price)}
                    </p>


                    <div className="mt-3 flex flex-wrap gap-1.5">

                      {item.gender && (
                        <span className="
                                                    rounded-full
                                                    bg-neutral-100
                                                    px-2.5
                                                    py-1
                                                    text-[10px]
                                                    font-medium
                                                    text-neutral-600
                                                ">
                          {item.gender}
                        </span>
                      )}

                      {item.subCategory && (
                        <span className="
                                                    rounded-full
                                                    bg-neutral-100
                                                    px-2.5
                                                    py-1
                                                    text-[10px]
                                                    font-medium
                                                    text-neutral-600
                                                ">
                          {item.subCategory}
                        </span>
                      )}

                    </div>

                  </div>

                </div>


                {/* Product Details */}
                <div className="
                                    grid
                                    grid-cols-2
                                    gap-3
                                    border-t
                                    border-neutral-100
                                    px-4
                                    py-4
                                    sm:grid-cols-4
                                ">

                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                      Category
                    </p>
                    <p className="mt-1 text-xs font-medium text-neutral-800">
                      {item.category || '-'}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                      Type
                    </p>
                    <p className="mt-1 truncate text-xs font-medium text-neutral-800">
                      {item.subSubCategory || '-'}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                      Gender
                    </p>
                    <p className="mt-1 text-xs font-medium text-neutral-800">
                      {item.gender || '-'}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                      Sizes
                    </p>

                    <div className="mt-1 flex flex-wrap gap-1">

                      {item.sizes?.length > 0
                        ? item.sizes.map((size, sizeIndex) => (
                          <span
                            key={sizeIndex}
                            className="
                                                            rounded-md
                                                            bg-neutral-100
                                                            px-1.5
                                                            py-0.5
                                                            text-[9px]
                                                            font-medium
                                                            text-neutral-600
                                                        "
                          >
                            {size}
                          </span>
                        ))
                        : (
                          <span className="text-xs text-neutral-400">
                            -
                          </span>
                        )
                      }

                    </div>

                  </div>

                </div>


                {/* Actions */}
                <div className="
                                    flex
                                    items-center
                                    justify-end
                                    gap-2
                                    border-t
                                    border-neutral-100
                                    bg-neutral-50/70
                                    px-4
                                    py-3
                                ">

                  <button
                    type="button"
                    onClick={() => editProduct(item._id)}
                    className="
                                            flex
                                            items-center
                                            gap-2
                                            rounded-xl
                                            border
                                            border-neutral-200
                                            bg-white
                                            px-4
                                            py-2.5
                                            text-xs
                                            font-semibold
                                            text-neutral-700
                                            hover:border-black
                                            hover:bg-black
                                            hover:text-white
                                        "
                  >
                    <Pencil size={14} />
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => removeProduct(item._id)}
                    disabled={deletingId === item._id}
                    className="
                                            flex
                                            items-center
                                            gap-2
                                            rounded-xl
                                            border
                                            border-red-100
                                            bg-red-50
                                            px-4
                                            py-2.5
                                            text-xs
                                            font-semibold
                                            text-red-600
                                            hover:border-red-500
                                            hover:bg-red-500
                                            hover:text-white
                                            disabled:cursor-not-allowed
                                            disabled:opacity-50
                                        "
                  >
                    {deletingId === item._id ? (
                      <span className="
                                                h-3.5
                                                w-3.5
                                                animate-spin
                                                rounded-full
                                                border-2
                                                border-red-200
                                                border-t-red-500
                                            " />
                    ) : (
                      <Trash2 size={14} />
                    )}

                    Delete
                  </button>

                </div>

              </div>

            ))}

          </div>

        </>

      )}

    </div>
  )
}

export default List
