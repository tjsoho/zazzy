/***************************************************************
                NOTES
***************************************************************/
/*
- Admin page using AdminDashboard layout
- Includes header, greeting, avatar, and card-style link management
- Uses TypeScript
- Follows project structure and 50-line limit
- Implements proper error handling
*/

/***************************************************************
                IMPORTS
***************************************************************/
'use client';
import { FC } from 'react';
import AdminDashboard from '@/components/admin/AdminDashboard';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminFunctions from '@/components/admin/AdminFunctions';

/***************************************************************
                Components
***************************************************************/
const AdminPage: FC = () => {
    return (
        <AdminDashboard>
            <AdminHeader />
            <div className="max-w-2xl mx-auto w-full">
                <AdminFunctions />
            </div>
        </AdminDashboard>
    );
};

/***************************************************************
                EXPORTS
***************************************************************/
export default AdminPage;

/***************************************************************
                 NOTES
***************************************************************/
/*
- Admin interface for managing link tree
- Protected route (needs authentication)
- Form for updating profile and links
- Mobile-friendly design
*/ 