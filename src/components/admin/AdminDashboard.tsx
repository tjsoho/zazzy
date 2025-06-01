/***************************************************************
                NOTES
***************************************************************/
/*
- Admin dashboard layout for the admin page
- Composes sidebar, main content, and live mobile preview
- Uses TypeScript
- Follows project structure and 50-line limit
*/

/***************************************************************
                IMPORTS
***************************************************************/
import { FC, ReactNode } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminMobilePreview from './AdminMobilePreview';

/***************************************************************
                Types
***************************************************************/
interface AdminDashboardProps {
    children: ReactNode;
}

/***************************************************************
                Components
***************************************************************/
const AdminDashboard: FC<AdminDashboardProps> = ({ children }) => {
    return (
        <div className="flex min-h-screen bg-gradient-to-r from-orange-50 to-pink-50">
            <AdminSidebar />
            <main className="flex-1 flex flex-col p-8">{children}</main>
            <AdminMobilePreview />
        </div>
    );
};

/***************************************************************
                EXPORTS
***************************************************************/
export default AdminDashboard; 