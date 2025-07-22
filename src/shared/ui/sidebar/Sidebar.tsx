import { TbSquareToggle } from 'react-icons/tb';

import styles from './Sidebar.module.scss';
import NAV_ITEMS from './model/consts';
import NavItem from './ui/NavItem';
import { useState } from 'react';

export default function SideBar() {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleCollapsed = () => setIsCollapsed(!isCollapsed);

    return (
        <nav className={`${styles.sidebar} ${isCollapsed ? styles['sidebar-collapsed'] : ''}`}>
            <div className={styles.sidebar__header}>
                <span className={styles['sidebar__header-title']}>CRM</span>
            </div>
            <ul className={styles.sidebar__items}>
                {NAV_ITEMS.map((navItem) => (
                    <NavItem
                        key={navItem.id}
                        collapsed={isCollapsed}
                        item={navItem}
                    />
                ))}
            </ul>
            <div className={styles.sidebar__footer} onClick={toggleCollapsed}>
                <TbSquareToggle />
                <span className={styles['sidebar__footer-title']}>Toggle sidebar</span>
            </div>
        </nav>
    );
}
