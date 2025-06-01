/***************************************************************
                NOTES
***************************************************************/
/*
- Sortable link component for admin dashboard
- Collapsible design with expandable analytics
- Uses TypeScript
- Follows project structure
- Implements proper error handling
*/

/***************************************************************
                IMPORTS
***************************************************************/
'use client';
import { FC, useState } from 'react';
import { LinkData } from '@/types/links';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

/***************************************************************
                Types
***************************************************************/
interface SortableLinkProps {
    link: LinkData;
    onEdit: (link: LinkData) => void;
    onDelete: (linkId: string) => void;
    isEditing: boolean;
    editingLink: LinkData | null;
    onSave: (link: LinkData) => void;
    onCancel: () => void;
    onEditChange: (link: LinkData) => void;
}

type Period = 'day' | 'week' | 'month' | 'quarter' | 'year';

/***************************************************************
                Helpers
***************************************************************/
const getPeriodClicks = (history: { [date: string]: number }, period: Period): number => {
    const now = new Date();
    const startDate = new Date();

    switch (period) {
        case 'day':
            startDate.setHours(0, 0, 0, 0);
            break;
        case 'week':
            startDate.setDate(now.getDate() - now.getDay());
            startDate.setHours(0, 0, 0, 0);
            break;
        case 'month':
            startDate.setDate(1);
            startDate.setHours(0, 0, 0, 0);
            break;
        case 'quarter':
            const quarter = Math.floor(now.getMonth() / 3);
            startDate.setMonth(quarter * 3);
            startDate.setDate(1);
            startDate.setHours(0, 0, 0, 0);
            break;
        case 'year':
            startDate.setMonth(0, 1);
            startDate.setHours(0, 0, 0, 0);
            break;
    }

    return Object.entries(history).reduce((total, [date, clicks]) => {
        const clickDate = new Date(date);
        return clickDate >= startDate ? total + clicks : total;
    }, 0);
};

/***************************************************************
                Components
***************************************************************/
const SortableLink: FC<SortableLinkProps> = ({
    link,
    onEdit,
    onDelete,
    isEditing,
    editingLink,
    onSave,
    onCancel,
    onEditChange,
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: link.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const handleInputChange = (field: keyof LinkData, value: string) => {
        if (editingLink) {
            onEditChange({
                ...editingLink,
                [field]: value,
            });
        }
    };

    const todayClicks = getPeriodClicks(link.clickHistory, 'day');
    const weekClicks = getPeriodClicks(link.clickHistory, 'week');
    const monthClicks = getPeriodClicks(link.clickHistory, 'month');
    const quarterClicks = getPeriodClicks(link.clickHistory, 'quarter');
    const yearClicks = getPeriodClicks(link.clickHistory, 'year');

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="bg-white border border-gray-200 rounded-lg shadow-sm"
        >
            {isEditing ? (
                <div className="p-4 space-y-4">
                    <div className="flex items-center gap-2">
                        <span className="text-gray-500 font-medium">#{link.order}</span>
                        <input
                            type="text"
                            value={editingLink?.title || ''}
                            onChange={(e) => handleInputChange('title', e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-black"
                            placeholder="Link Title"
                        />
                    </div>
                    <input
                        type="text"
                        value={editingLink?.url || ''}
                        onChange={(e) => handleInputChange('url', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                        placeholder="Link URL"
                    />
                    <input
                        type="text"
                        value={editingLink?.imageUrl || ''}
                        onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                        placeholder="Image URL"
                    />
                    <div className="flex justify-end gap-2">
                        <button
                            onClick={onCancel}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => editingLink && onSave(editingLink)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            Save
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <div
                        className="p-3 flex items-center justify-between cursor-pointer hover:bg-gray-50"
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        <div className="flex items-center gap-3">
                            <div
                                {...attributes}
                                {...listeners}
                                className="p-1 cursor-move text-gray-400 hover:text-gray-600"
                                onClick={(e) => e.stopPropagation()}
                            >
                                ⋮⋮
                            </div>
                            <span className="text-gray-500 font-medium">#{link.order}</span>
                            <h3 className="text-black font-medium truncate max-w-md">{link.title}</h3>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">
                                {link.clicks} clicks
                            </span>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onEdit(link);
                                }}
                                className="p-1.5 text-gray-600 hover:text-gray-800"
                            >
                                Edit
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete(link.id);
                                }}
                                className="p-1.5 text-red-600 hover:text-red-800"
                            >
                                Delete
                            </button>
                            <svg
                                className={`w-5 h-5 text-gray-400 transform transition-transform ${isExpanded ? 'rotate-180' : ''
                                    }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </div>
                    </div>
                    {isExpanded && (
                        <div className="px-3 pb-3 border-t border-gray-100">
                            <div className="pt-3 text-sm">
                                <p className="text-gray-600 truncate">{link.url}</p>
                                {link.imageUrl && (
                                    <p className="text-gray-600 truncate mt-1">{link.imageUrl}</p>
                                )}
                            </div>
                            <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
                                <div className="bg-gray-50 p-2 rounded">
                                    <p className="text-gray-600">Today</p>
                                    <p className="text-black font-medium">{todayClicks}</p>
                                </div>
                                <div className="bg-gray-50 p-2 rounded">
                                    <p className="text-gray-600">This Week</p>
                                    <p className="text-black font-medium">{weekClicks}</p>
                                </div>
                                <div className="bg-gray-50 p-2 rounded">
                                    <p className="text-gray-600">This Month</p>
                                    <p className="text-black font-medium">{monthClicks}</p>
                                </div>
                                <div className="bg-gray-50 p-2 rounded">
                                    <p className="text-gray-600">This Quarter</p>
                                    <p className="text-black font-medium">{quarterClicks}</p>
                                </div>
                                <div className="bg-gray-50 p-2 rounded">
                                    <p className="text-gray-600">This Year</p>
                                    <p className="text-black font-medium">{yearClicks}</p>
                                </div>
                                <div className="bg-gray-50 p-2 rounded">
                                    <p className="text-gray-600">Total</p>
                                    <p className="text-black font-medium">{link.clicks}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

/***************************************************************
                EXPORTS
***************************************************************/
export default SortableLink; 