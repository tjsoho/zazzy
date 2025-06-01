/***************************************************************
                NOTES
***************************************************************/
/*
- Sidebar for admin dashboard navigation
- Uses TypeScript
- Follows project structure and 50-line limit
*/

/***************************************************************
                IMPORTS
***************************************************************/
import { FC } from 'react';

/***************************************************************
                Types
***************************************************************/
interface AdminSidebarProps {
    className?: string;
}

/***************************************************************
                Components
***************************************************************/
const AdminSidebar: FC<AdminSidebarProps> = ({ className }) => {
    return (
        <aside className={`w-16 bg-orange-400 flex flex-col items-center py-6 rounded-r-3xl shadow-lg ${className || ''}`}>
            <div className="flex flex-col gap-6 text-white text-2xl">
                <span>🏠</span>
                <span>🔗</span>
                <span>📊</span>
                <span>⚙️</span>
            </div>
        </aside>
    );
};

/***************************************************************
                EXPORTS
***************************************************************/
export default AdminSidebar; 