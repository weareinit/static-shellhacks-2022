import "./index.css";
import City from "../../svg/CityNoShell.svg";

const CityBackground: React.FC = () => {
    return (
        <div className="cityBackground">
            <img alt="City Background" className="city" src={City} />
        </div>
    );
};

export default CityBackground;
