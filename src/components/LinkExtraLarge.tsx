"use client";
import React, { FC } from 'react'
import { motion } from 'framer-motion';
import { LinkProps } from '@/types/links';
import { useLinks } from '@/context/LinksContext';
import './MyWorks.css'
import './MyWorksMarquee.css';
import Image from 'next/image';

/***************************************************************
                Types
***************************************************************/
// Types are imported from @/types/links

/***************************************************************
                Components
***************************************************************/
const LinkExtraLarge: FC<LinkProps> = ({ data, className }) => {
    const { trackClick } = useLinks();
    if (!data.isActive) return null;

    // Split the imageUrl string into an array of image paths
    const collageImages = data.imageUrl.split(',').map(url => url.trim());

    return (
        <a href={data.url} className={`block w-full max-w-md mx-auto ${className || ''}`} onClick={() => trackClick(data.id)}>
            <div className="border border-white/30 w-full max-w-md rounded-2xl overflow-hidden shadow-lg bg-white/10 flex flex-col items-center backdrop-blur-xl">
                {/* Marquee slider */}
                <div className="overflow-hidden w-full">
                    <div className="marquee flex items-center">
                        {[...collageImages, ...collageImages].map((src, i) => (
                            <div key={i} className="flex-shrink-0 w-80 h-60 mx-2 relative">
                                <Image
                                    src={src}
                                    alt={data.title}
                                    width={320}
                                    height={240}
                                    className="object-cover w-full h-full rounded-xl"
                                    style={{ maxHeight: '100%', maxWidth: '100%' }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                {/* Title below the collage, inside the container */}
                <div className="w-full px-6 pb-4 pt-4 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-xl md:text-3xl font-extrabold text-left text-white drop-shadow-lg luxe-title"
                    >
                        {data.title}
                    </motion.h2>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="h-[2px] animated-underline mx-auto mt-2"
                    />
                </div>
            </div>
        </a>
    );
};

/***************************************************************
                EXPORTS
***************************************************************/
export default LinkExtraLarge;