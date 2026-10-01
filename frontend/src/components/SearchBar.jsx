import React, { useContext, useEffect, useState } from 'react'
import { Search, X, Sparkles } from 'lucide-react'
import { ShopContext } from '../context/ShopContext'
import { useLocation } from 'react-router-dom'

const SearchBar = () => {

    const {
        search,
        setSearch,
        showSearch,
        setShowSearch
    } = useContext(ShopContext)

    const [visible, setVisible] = useState(false)

    const location = useLocation()

    // =========================================
    // SHOW SEARCH ONLY ON COLLECTION PAGES
    // =========================================

    useEffect(() => {
        if (location.pathname.includes('collection')) {
            setVisible(true)
        } else {
            setVisible(false)
        }
    }, [location.pathname])

    // =========================================
    // SEARCH BAR
    // =========================================

    if (!showSearch || !visible) {
        return null
    }

    return (
        <section className="
            border-y
            border-neutral-200
            bg-[#fafafa]
            px-4
            py-5
            sm:px-6
        ">

            <div className="
                mx-auto
                flex
                max-w-4xl
                items-center
                justify-center
                gap-3
            ">

                {/* SEARCH CONTAINER */}

                <div className="
                    group
                    flex
                    h-12
                    w-full
                    items-center
                    rounded-full
                    border
                    border-neutral-200
                    bg-white
                    px-4
                    shadow-sm
                    transition-all
                    duration-200
                    focus-within:border-neutral-950
                    focus-within:shadow-md
                    sm:h-14
                    sm:px-5
                ">

                    {/* SEARCH ICON */}

                    <Search
                        size={18}
                        strokeWidth={1.8}
                        className="
                            mr-3
                            shrink-0
                            text-neutral-400
                            transition-colors
                            duration-200
                            group-focus-within:text-neutral-900
                        "
                    />

                    {/* INPUT */}

                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search products..."
                        aria-label="Search products"
                        autoFocus
                        className="
                            min-w-0
                            flex-1
                            bg-transparent
                            text-sm
                            text-neutral-900
                            outline-none
                            placeholder:text-neutral-400
                            sm:text-[15px]
                        "
                    />

                    {/* SEARCH HINT */}

                    {!search && (
                        <div className="
                            hidden
                            items-center
                            gap-1.5
                            text-[10px]
                            font-medium
                            uppercase
                            tracking-wider
                            text-neutral-300
                            sm:flex
                        ">
                            <Sparkles size={12} />
                            <span>
                                Find your style
                            </span>
                        </div>
                    )}

                    {/* CLEAR SEARCH */}

                    {search && (
                        <button
                            type="button"
                            onClick={() => setSearch('')}
                            aria-label="Clear search"
                            className="
                                flex
                                h-7
                                w-7
                                shrink-0
                                items-center
                                justify-center
                                rounded-full
                                text-neutral-400
                                transition-colors
                                hover:bg-neutral-100
                                hover:text-neutral-900
                            "
                        >
                            <X size={15} />
                        </button>
                    )}

                </div>

                {/* CLOSE SEARCH */}

                <button
                    type="button"
                    onClick={() => setShowSearch(false)}
                    aria-label="Close search"
                    className="
                        flex
                        h-11
                        w-11
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-neutral-200
                        bg-white
                        text-neutral-500
                        shadow-sm
                        transition-all
                        duration-200
                        hover:border-neutral-950
                        hover:bg-neutral-950
                        hover:text-white
                        active:scale-95
                        sm:h-12
                        sm:w-12
                    "
                >
                    <X
                        size={17}
                        strokeWidth={1.8}
                    />
                </button>

            </div>

        </section>
    )
}

export default SearchBar

