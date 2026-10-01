import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsLetterBox from '../components/NewsLetterBox'

const Home = () => {
    return (
        <main className="bg-white">

            {/* ========================================
                HERO
            ======================================== */}
            <section>
                <Hero />
            </section>


            {/* ========================================
                LATEST COLLECTION
            ======================================== */}
            <section className="px-4 sm:px-6 lg:px-8">
                <LatestCollection />
            </section>


            {/* ========================================
                BEST SELLERS
            ======================================== */}
            <section className="px-4 sm:px-6 lg:px-8">
                <BestSeller />
            </section>


            {/* ========================================
                SHOPPING BENEFITS
            ======================================== */}
            <section className="mt-8">
                <OurPolicy />
            </section>


            {/* ========================================
                NEWSLETTER
            ======================================== */}
            <section className="mt-8">
                <NewsLetterBox />
            </section>

        </main>
    )
}

export default Home

