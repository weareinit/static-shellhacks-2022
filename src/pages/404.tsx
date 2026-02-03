import CityBackground from "../components/CityBackground";
import LinkButton from "../components/LinkButton";
import NavBar from "../components/NavBar";
import SEO from "../components/SEO";
import styles from "./404.module.css";

const custom404: React.FC = () => {
    return (
        <div>
            <SEO />
            <NavBar />
            <div className={styles.background}>
                <CityBackground />
                <div className={styles.block}>
                    <p className={styles.error}>404</p>
                    <p className={styles.title}>Sorry, page not found</p>
                    <div className={styles.button}>
                        <LinkButton text="Home" url="/" filled={true} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default custom404;
