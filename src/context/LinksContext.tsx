/***************************************************************
                NOTES
***************************************************************/
/*
- Context provider for managing links state
- Uses TypeScript
- Implements proper error handling
- Handles hydration properly
*/

/***************************************************************
                IMPORTS
***************************************************************/
'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { LinkData } from '@/types/links';
import { LinksContextType } from '@/types/linksContext';
import {
    fetchLinks,
    updateLinksAPI,
    updateLinkAPI,
    deleteLinkAPI,
    trackClickAPI,
} from '@/hooks/useLinksApi';

/***************************************************************
                Context
***************************************************************/
const LinksContext = createContext<LinksContextType | undefined>(undefined);

/***************************************************************
                Hooks
***************************************************************/
export function useLinks() {
    const context = useContext(LinksContext);
    if (context === undefined) {
        throw new Error('useLinks must be used within a LinksProvider');
    }
    return context;
}

/***************************************************************
                Components
***************************************************************/
export function LinksProvider({ children }: { children: ReactNode }) {
    const [links, setLinks] = useState<LinkData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchLinks()
            .then(setLinks)
            .catch(console.error)
            .finally(() => setIsLoading(false));
    }, []);

    if (isLoading) {
        // Optionally, you can return a loading spinner here
        return null;
    }

    const updateLinks = async (newLinks: LinkData[]) => {
        try {
            await updateLinksAPI(newLinks);
            setLinks(newLinks);
        } catch (error) {
            console.error('Error updating links:', error);
            throw error;
        }
    };

    const updateLink = async (updatedLink: LinkData) => {
        try {
            await updateLinkAPI(updatedLink);
            setLinks(currentLinks =>
                currentLinks.map(link =>
                    link.id === updatedLink.id ? updatedLink : link
                )
            );
        } catch (error) {
            console.error('Error updating link:', error);
            throw error;
        }
    };

    const deleteLink = async (linkId: string) => {
        try {
            await deleteLinkAPI(linkId);
            setLinks(currentLinks =>
                currentLinks.filter(link => link.id !== linkId)
            );
        } catch (error) {
            console.error('Error deleting link:', error);
            throw error;
        }
    };

    const trackClick = async (linkId: string) => {
        try {
            const updatedAnalytics = await trackClickAPI(linkId);
            setLinks(currentLinks =>
                currentLinks.map(link =>
                    link.id === linkId
                        ? {
                            ...link,
                            clicks: updatedAnalytics.clicks,
                            clickHistory: updatedAnalytics.clickHistory,
                        }
                        : link
                )
            );
        } catch (error) {
            console.error('Error tracking click:', error);
            throw error;
        }
    };

    return (
        <LinksContext.Provider value={{ links, isLoading, updateLinks, updateLink, deleteLink, trackClick }}>
            {children}
        </LinksContext.Provider>
    );
} 