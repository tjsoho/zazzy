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
import { FC, useState, useEffect } from 'react';
import { LinkData } from '@/types/links';
import { useLinks } from '@/context/LinksContext';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import SortableLink from './SortableLink';
import LoadingSpinner from '../LoadingSpinner';

/***************************************************************
                Components
***************************************************************/
const AdminFunctions: FC = () => {
    const { links, isLoading, updateLinks } = useLinks();
    const [editingLink, setEditingLink] = useState<LinkData | null>(null);
    const [sortedLinks, setSortedLinks] = useState<LinkData[]>([]);

    useEffect(() => {
        // Sort links by order when they change
        const sorted = [...links].sort((a, b) => a.order - b.order);
        setSortedLinks(sorted);
    }, [links]);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5, // Minimum drag distance before activation
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleEdit = (link: LinkData) => {
        setEditingLink({ ...link });
    };

    const handleSave = async (updatedLink: LinkData) => {
        try {
            const currentLink = links.find(l => l.id === updatedLink.id);
            if (currentLink) {
                const finalLink = {
                    ...updatedLink,
                    clicks: currentLink.clicks,
                    clickHistory: currentLink.clickHistory,
                };
                await updateLinks(
                    links.map(link =>
                        link.id === finalLink.id ? finalLink : link
                    )
                );
            }
            setEditingLink(null);
        } catch (error) {
            console.error('Error saving link:', error);
        }
    };

    const handleDelete = async (linkId: string) => {
        try {
            await updateLinks(links.filter(link => link.id !== linkId));
        } catch (error) {
            console.error('Error deleting link:', error);
        }
    };

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = sortedLinks.findIndex((item) => item.id === active.id);
            const newIndex = sortedLinks.findIndex((item) => item.id === over.id);

            if (oldIndex !== -1 && newIndex !== -1) {
                const newLinks = arrayMove(sortedLinks, oldIndex, newIndex).map((item, index) => ({
                    ...item,
                    order: index + 1,
                }));

                try {
                    await updateLinks(newLinks);
                } catch (error) {
                    console.error('Error updating link order:', error);
                }
            }
        }
    };

    const handleEditChange = (updatedLink: LinkData) => {
        setEditingLink(updatedLink);
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={sortedLinks.map(link => link.id)}
                    strategy={verticalListSortingStrategy}
                >
                    <div className="grid gap-2">
                        {sortedLinks.map(link => (
                            <SortableLink
                                key={link.id}
                                link={link}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                isEditing={editingLink?.id === link.id}
                                editingLink={editingLink}
                                onSave={handleSave}
                                onCancel={() => setEditingLink(null)}
                                onEditChange={handleEditChange}
                            />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>
        </div>
    );
};

/***************************************************************
                EXPORTS
***************************************************************/
export default AdminFunctions; 