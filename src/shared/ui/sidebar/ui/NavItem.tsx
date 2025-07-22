import { NavLink } from 'react-router';
import type { SidebarItem } from '../model/consts';
import styles from './NavItem.module.scss';

interface NavItemProps {
    item: SidebarItem;
    collapsed: boolean;
}

export default function NavItem({ item, collapsed }: NavItemProps) {
    const NavItemIcon = () =>
        item.icon({
            width: '15px',
            height: '15px',
            className: styles.navitem__icon,
        });

    const getClass = (isActive: boolean) => {
        const classes = [styles.navitem];

        if (isActive) {
            classes.push(styles.navitem__active);
        }

        if(collapsed) {
            classes.push(styles['navitem-collapsed'])
        }

        return classes.join(' ');
    };

    return (
        <NavLink
            className={({ isActive }) => getClass(isActive)}
            to={item.link}
        >
            <div
                className={`${styles.navitem__wrapper}`}
            >
                <NavItemIcon />
                {collapsed ? null : <h3 className={styles.navitem__title}>{item.title}</h3>}
            </div>
        </NavLink>
    );
}
