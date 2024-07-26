import { NavItem } from "@app/interfaces/nav-item.interface";

export const sidebarData: NavItem[] = [
    {
        navCap: 'Home',
    },
    {
        displayName: 'Home',
        iconName: 'home',
        horizontal: true,
        vertical: true,
        route: 'home',
    },
    {
        navCap: 'Events'
    },
    {
        displayName: 'Booking',
        iconName: 'calendar-event',
        horizontal: true,
        vertical: true,
        route: 'booking',
    },
    {
        displayName: 'Activities',
        iconName: 'checklist',
        horizontal: true,
        vertical: true,
        route: 'activities',
    },
    {
        navCap: 'Account'
    },
    {
        displayName: 'Profile Setting',
        iconName: 'user-circle',
        horizontal: false,
        vertical: true,
        route: 'profile',
    },
    {
        navCap: 'Contact'
    },
    {
        displayName: 'About Us',
        iconName: 'users-group',
        horizontal: true,
        vertical: true,
        route: 'about',
    },
    {
        displayName: 'Contact Us',
        iconName: 'address-book',
        horizontal: true,
        vertical: true,
        route: 'contact',
    },
];