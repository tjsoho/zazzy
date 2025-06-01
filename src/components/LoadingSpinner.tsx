/***************************************************************
                NOTES
***************************************************************/
/*
- Loading spinner component
- Client-side only
- Uses TypeScript
*/

/***************************************************************
                IMPORTS
***************************************************************/
'use client';
import { FC } from 'react';

/***************************************************************
                Types
***************************************************************/
interface LoadingSpinnerProps {
    className?: string;
}

/***************************************************************
                Components
***************************************************************/
const LoadingSpinner: FC<LoadingSpinnerProps> = ({ className = '' }) => {
    return (
        <div className={`min-h-screen flex items-center justify-center ${className}`}>
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );
};

/***************************************************************
                EXPORTS
***************************************************************/
export default LoadingSpinner; 