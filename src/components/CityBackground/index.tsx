import styles from "./index.module.css";
import CityPNGA from "../../../public/static/CityPNGA.png";
import Image from "next/image";

const CityBackground: React.FC = () => {
    return (
        <div className={styles.cityBackground}>
            <div className={styles.cityDiv}>
                <Image
                    src={CityPNGA}
                    alt="Miami City Skyline"
                    loading="eager"
                    className={styles.city}
                    style={{ width: '100%', height: 'auto' }}
                />
            </div>
        </div>
    );
};

export default CityBackground;
