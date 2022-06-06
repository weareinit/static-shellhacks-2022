import Image from "next/image";
import styles from "./index.module.css";

type ImageProps = {
    alt: string;
    src: any;
    style: any;
};

const ImageWrapper: React.FC<ImageProps> = (props: ImageProps) => {
    return (
        <div className={props.style}>
            <div className={styles.image}>
                <Image alt={props.alt} src={props.src} />
            </div>
        </div>
    );
};

export default ImageWrapper;
