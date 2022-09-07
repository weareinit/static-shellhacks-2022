import React from "react";
import styles from "./index.module.css";
import UPEAA from "./../../../public/static/sponsors/UPE AA.svg";
import FIUK from "./../../../public/static/sponsors/FIU SCIS.svg";
import FIUC from "./../../../public/static/sponsors/FIU CEC.svg";
import CityYear from "./../../../public/static/sponsors/City Year.svg";
import RefreshMiami from "./../../../public/static/sponsors/Refresh Miami.svg";
import USF from "./../../../public/static/sponsors/SCP.svg";
import SHPE from "./../../../public/static/sponsors/SHPE.svg";
import KnightHacks from "./../../../public/static/sponsors/KnightHacks.svg";
import ShrimpSociety from "./../../../public/static/sponsors/Shrimp Society.svg";
import TechHub from "./../../../public/static/sponsors/Tech Hub SFL.svg";

type PartnerItemProps = {
    partner: Partner;
};

type Partner = {
    name: string;
    link: string;
    image: any;
};

const Partners: React.FC = () => {
    return <PartnersBody />;
};

const PartnerItem = (props: PartnerItemProps) => {
    const { partner } = props;

    return (
        <a
            href={partner.link}
            className={styles.logo}
            target="_blank"
            rel="noreferrer noopener"
        >
            {partner.image}
        </a>
    );
};

const PartnerList: Partner[] = [
    {
        name: "UPE Alumni Association",
        link: "https://www.linkedin.com/company/upe-alumni-association",
        image: <UPEAA />,
    },
    {
        name: "FIU KFSCIS",
        link: "https://www.cis.fiu.edu/",
        image: <FIUK />,
    },
    {
        name: "FIU CEC",
        link: "https://cec.fiu.edu/",
        image: <FIUC />,
    },
    {
        name: "City Year",
        link: "https://www.cityyear.org/",
        image: <CityYear />,
    },
    {
        name: "Refresh Miami",
        link: "https://refreshmiami.com/",
        image: <RefreshMiami />,
    },
    {
        name: "USF SCP",
        link: "https://www.usf.edu/honors/about-us/honors-society-of-competitive-programmers-story.aspx",
        image: <USF />,
    },
    {
        name: "SHPE",
        link: "https://www.shpe.org/",
        image: <SHPE />,
    },
    {
        name: "KnightHacks",
        link: "https://club.knighthacks.org/",
        image: <KnightHacks />,
    },
    {
        name: "Shrimp Society",
        link: "https://theshrimpsociety.com/",
        image: <ShrimpSociety />,
    },
    {
        name: "Tech Hub South Florida",
        link: "https://techhubsouthflorida.org/",
        image: <TechHub />,
    },
];

const PartnersBody: React.FC = () => (
    <section className={styles.faqBackground}>
        <div className={styles.mainContent}>
            <span id="sponsors" className={styles.faqlink} />
            <div>
                <h1 className={styles.header}>Community Partners</h1>
                <div className={styles.sponsorlist}>
                    {PartnerList.map((item, index) => {
                        return <PartnerItem key={index} partner={item} />;
                    })}
                </div>
            </div>
        </div>
    </section>
);

export default Partners;
