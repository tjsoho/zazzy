/***************************************************************
                NOTES
***************************************************************/
/*
- Component follows the 50-line limit
- Single responsibility principle
- Uses TypeScript
- Follows project structure
- Implements proper error handling
*/

/***************************************************************
                IMPORTS
***************************************************************/
import { FC } from 'react';
import { LinkProps } from '@/types/links';
import { useLinks } from '@/context/LinksContext';
import Image from 'next/image';

/***************************************************************
                Types
***************************************************************/
// Types are imported from @/types/links

/***************************************************************
                Components
***************************************************************/
const LinkMedium: FC<LinkProps> = ({ data, className }) => {
    const { trackClick } = useLinks();
    if (!data.isActive) return null;

    return (
        <a
            href={data.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`block w-full max-w-md mx-auto ${className || ''}`}
            onClick={() => trackClick(data.id)}
        >
            <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-lg bg-white/10 flex flex-col items-center backdrop-blur-xl border border-white/30">
                <div className="relative h-52 w-full">
                    <Image
                        src={data.imageUrl}
                        alt={data.title}
                        fill
                        className="object-cover w-full h-full rounded-xl"
                        style={{ maxHeight: '100%', maxWidth: '100%' }}
                    />
                    <div className="absolute bottom-0 left-4 text-xl md:text-3xl font-extrabold text-white drop-shadow-lg z-10 pb-4">
                        {data.title}
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent"></div>
                </div>
            </div>
        </a>
    );
};

/***************************************************************
                EXPORTS
***************************************************************/
export default LinkMedium; 