import React from 'react'

const Title = ({ text1, text2 }) => {
    return (
        <div className="
            inline-flex
            items-center
            gap-2.5
            mb-4
        ">

            {/* TITLE */}
            <p className="
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.18em]
                text-neutral-400
                sm:text-xs
            ">
                {text1}

                <span className="
                    ml-1.5
                    text-neutral-950
                ">
                    {text2}
                </span>
            </p>

            {/* ACCENT LINE */}
            <span className="
                h-px
                w-8
                bg-neutral-950
                sm:w-12
            " />

        </div>
    )
}

export default Title
