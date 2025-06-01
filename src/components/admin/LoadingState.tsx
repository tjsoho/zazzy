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
'use client';
import { FC } from 'react';

/***************************************************************
                Components
***************************************************************/
const LoadingState: FC = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Link Management</h1>
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

/***************************************************************
                EXPORTS
***************************************************************/
export default LoadingState; 