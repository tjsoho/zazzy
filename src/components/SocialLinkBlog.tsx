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
import BlogBookIcon from './BlogBookIcon';
import { LinkProps } from '@/types/links';
import { useLinks } from '@/context/LinksContext';

/***************************************************************
                Types
***************************************************************/
// Types are imported from @/types/links

/***************************************************************
                Components
***************************************************************/
const SocialLinkBlog: FC<LinkProps> = ({ data, className }) => {
    const { trackClick } = useLinks();
    if (!data.isActive) return null;

    return (
        <a
            href={data.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full max-w-md bg-white/10 backdrop-blur-lg rounded-xl flex items-center gap-4 text-white hover:bg-white/20 transition-colors border border-white/30 px-4 font-bold ${className || ''}`}
            onClick={() => trackClick(data.id)}
        >
            <div className="w-12 h-12 flex items-center justify-center">
                <BlogBookIcon />
            </div>
            <span className="text-md font-extrabold text-white">{data.title}</span>
        </a>
    );
};

/***************************************************************
                EXPORTS
***************************************************************/
export default SocialLinkBlog; 