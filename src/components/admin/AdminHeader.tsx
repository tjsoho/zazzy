/***************************************************************
                NOTES
***************************************************************/
/*
- Header for admin dashboard
- Shows greeting, title, and avatar
- Uses TypeScript
- Follows project structure and 50-line limit
*/

/***************************************************************
                IMPORTS
***************************************************************/
import { FC } from 'react';
import Image from 'next/image';

/***************************************************************
                Types
***************************************************************/
interface AdminHeaderProps {
    className?: string;
}

/***************************************************************
                Components
***************************************************************/
const AdminHeader: FC<AdminHeaderProps> = ({ className }) => {
    return (
        <div className={`flex items-center justify-between mb-8 ${className || ''}`}>
            <div>
                <h2 className="text-lg text-gray-500 font-medium mb-1">Good Evening, Admin!</h2>
                <h1 className="text-3xl font-bold text-black">Link Management</h1>
            </div>
            <Image
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Admin Avatar"
                width={48}
                height={48}
                className="w-12 h-12 rounded-full border-2 border-orange-400 shadow"
            />
        </div>
    );
};

/***************************************************************
                EXPORTS
***************************************************************/
export default AdminHeader; 