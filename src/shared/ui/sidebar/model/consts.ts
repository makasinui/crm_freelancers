import type { IconType } from 'react-icons';
import { MdOutlineCalendarMonth, MdOutlineDashboard, MdOutlineNote, MdOutlineTask } from 'react-icons/md';

export interface SidebarItem {
    id: number;
    title: string;
    link: string;
    icon: IconType;
}

const NAV_ITEMS: SidebarItem[] = [
    {
        id: 1,
        title: 'Dashboard',
        link: '/',
        icon: MdOutlineDashboard,
    },
    {
        id: 2,
        title: 'Tasks',
        link: '/tasks',
        icon: MdOutlineTask,
    },
    {
        id: 3,
        title: 'Notes',
        link: '/notes',
        icon: MdOutlineNote,
    },
    {
        id: 4,
        title: 'Calendar',
        link: '/calendar',
        icon: MdOutlineCalendarMonth
    }
];

export default NAV_ITEMS;
