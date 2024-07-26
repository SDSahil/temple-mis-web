export interface NavItem {
    displayName?: string;
    disabled?: boolean;
    external?: boolean;
    twoLines?: boolean;
    chip?: boolean;
    iconName?: string;
    navCap?: string;
    chipContent?: string;
    chipClass?: string;
    subtext?: string;
    horizontal?: boolean;
    vertical?: boolean;
    route?: string;
    children?: NavItem[];
    ddType?: string;
}
