import { ComponentProps } from "react";
import styles from "./index.module.css";

type ItemProps = {
    title: string;
    children: React.ReactNode;
};

const SidebarItem: React.FC<ItemProps> = (props: ItemProps) => {
    return (
        <div className={styles.sidebarItem}>
            <p className={styles.sidebarTitle}>{props.title}</p>
            {props.children}
        </div>
    );
};

export default SidebarItem;
