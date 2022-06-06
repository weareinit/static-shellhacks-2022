import styles from "./index.module.css";
import City from "../../svg/CityNoShell.svg";
import CityPNG from "../../svg/CityPNGA.png";
import Image from "next/image";

const CityBackground: React.FC = () => {
    return (
        <div className={styles.cityBackground}>
            <Image
                src={CityPNG}
                loading="eager"
                layout="responsive"
                className={styles.city}
            />
        </div>
    );
};

export default CityBackground;
