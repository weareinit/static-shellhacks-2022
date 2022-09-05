import React, { useRef, useState } from "react";
import styles from "./index.module.css";
import FAQBuilding from "../../../public/static/FAQ-Building.png";

enum SponsorTiers {
    CONCH,
    CONE,
    SCALLOP,
    SAND,
    KIND,
}

type SponsorItemProps = {
    sponsor: Sponsor;
};

type Sponsor = {
    name: string;
    link: string;
    image: any;
    tier: SponsorTiers;
};

const Sponsors: React.FC = () => {
    return <SponsorsBody />;
};

const SponsorItem = (props: SponsorItemProps) => {
    const { sponsor } = props;

    return (
        <a href={sponsor.link} target="_blank" rel="noreferrer noopener">
            <img alt={sponsor.name} src={sponsor.image} />
        </a>
    );
};

const SponsorList: Sponsor[] = [
    {
        name: "Lab22c",
        link: "https://lab22c.com/",
        image: import("./../../../public/static/sponsors/Lab22c.svg"),
        tier: SponsorTiers.CONCH,
    },
    {
        name: "Assurant",
        link: "https://www.assurant.com/",
        image: import("./../../../public/static/sponsors/Assurant.svg"),
        tier: SponsorTiers.CONE,
    },
    {
        name: "Kaseya",
        link: "https://www.kaseya.com/",
        image: import("./../../../public/static/sponsors/Kaseya.svg"),
        tier: SponsorTiers.CONE,
    },
    {
        name: "Vanguard",
        link: "https://global.vanguard.com/",
        image: import("./../../../public/static/sponsors/Vanguard.svg"),
        tier: SponsorTiers.CONE,
    },
    {
        name: "Capital One",
        link: "https://www.capitalone.com/",
        image: import("./../../../public/static/sponsors/CapitalOne.svg"),
        tier: SponsorTiers.CONE,
    },
    {
        name: "Autodesk",
        link: "https://www.autodesk.com/",
        image: import("./../../../public/static/sponsors/Autodesk.svg"),
        tier: SponsorTiers.SCALLOP,
    },
    {
        name: "Autodesk",
        link: "https://www.autodesk.com/",
        image: import("./../../../public/static/sponsors/Autodesk.svg"),
        tier: SponsorTiers.SCALLOP,
    },
    {
        name: "Addigy",
        link: "https://addigy.com/",
        image: import("./../../../public/static/sponsors/Addigy.svg"),
        tier: SponsorTiers.SCALLOP,
    },
    {
        name: "Google",
        link: "https://www.google.com/",
        image: import("./../../../public/static/sponsors/Google.svg"),
        tier: SponsorTiers.SCALLOP,
    },
    {
        name: "Bloomberg",
        link: "https://www.bloomberg.com/",
        image: import("./../../../public/static/sponsors/Bloomberg.svg"),
        tier: SponsorTiers.SCALLOP,
    },
    {
        name: "Schonfeld",
        link: "https://www.schonfeld.com/",
        image: import("./../../../public/static/sponsors/Schonfeld.svg"),
        tier: SponsorTiers.SCALLOP,
    },
    {
        name: "Meta",
        link: "https://about.facebook.com/",
        image: import("./../../../public/static/sponsors/Meta.svg"),
        tier: SponsorTiers.SCALLOP,
    },
    {
        name: "Miami-Dade County",
        link: "https://www.miamidade.gov/global/",
        image: import(
            "./../../../public/static/sponsors/Miami Dade County.svg"
        ),
        tier: SponsorTiers.SCALLOP,
    },
    {
        name: "State Farm",
        link: "https://www.statefarm.com/",
        image: import("./../../../public/static/sponsors/State Farm.svg"),
        tier: SponsorTiers.SCALLOP,
    },
    {
        name: "Slalom",
        link: "https://www.slalom.com/",
        image: import("./../../../public/static/sponsors/Slalom.svg"),
        tier: SponsorTiers.SCALLOP,
    },
    {
        name: "Salesforce",
        link: "https://www.salesforce.com/",
        image: import("./../../../public/static/sponsors/Salesforce.svg"),
        tier: SponsorTiers.SCALLOP,
    },
    {
        name: "Lexis Nexis",
        link: "https://www.lexisnexis.com/",
        image: import("./../../../public/static/sponsors/Lexis Nexis.svg"),
        tier: SponsorTiers.SCALLOP,
    },
    {
        name: "MITRE",
        link: "https://www.mitre.org/",
        image: import("./../../../public/static/sponsors/MITRE.svg"),
        tier: SponsorTiers.SCALLOP,
    },
    {
        name: "Southwest Airlines",
        link: "https://www.southwest.com/",
        image: import("./../../../public/static/sponsors/Southwest.svg"),
        tier: SponsorTiers.SCALLOP,
    },
    {
        name: "BrainStation",
        link: "https://brainstation.io/",
        image: import("./../../../public/static/sponsors/BrainStation.svg"),
        tier: SponsorTiers.SCALLOP,
    },
    {
        name: "KnowBe4",
        link: "https://www.knowbe4.com/",
        image: import("./../../../public/static/sponsors/KnowBe4.svg"),
        tier: SponsorTiers.SCALLOP,
    },
    {
        name: "Elfen Software",
        link: "https://www.elfensoftware.com/",
        image: import("./../../../public/static/sponsors/Elfen.svg"),
        tier: SponsorTiers.SCALLOP,
    },
    {
        name: "Avocademy",
        link: "https://www.avocademy.com/",
        image: import("./../../../public/static/sponsors/Avocademy.svg"),
        tier: SponsorTiers.SCALLOP,
    },
    {
        name: "Microsoft",
        link: "https://www.microsoft.com/",
        image: import("./../../../public/static/sponsors/Microsoft.svg"),
        tier: SponsorTiers.SCALLOP,
    },
    {
        name: "Xbox",
        link: "https://www.xbox.com/",
        image: import("./../../../public/static/sponsors/Xbox.svg"),
        tier: SponsorTiers.SCALLOP,
    },
    {
        name: "Nvidia",
        link: "https://www.nvidia.com/",
        image: import("./../../../public/static/sponsors/Nvidia.svg"),
        tier: SponsorTiers.SAND,
    },
    {
        name: "Rivian",
        link: "https://rivian.com/",
        image: import("./../../../public/static/sponsors/Rivian.svg"),
        tier: SponsorTiers.SAND,
    },
    {
        name: "JPMorgan Chase",
        link: "https://www.jpmorganchase.com/",
        image: import("./../../../public/static/sponsors/JPMC.svg"),
        tier: SponsorTiers.SAND,
    },
    {
        name: "Codepath",
        link: "https://www.codepath.org/",
        image: import("./../../../public/static/sponsors/Codepath.svg"),
        tier: SponsorTiers.SAND,
    },
    {
        name: "MLT",
        link: "https://mlt.org/",
        image: import("./../../../public/static/sponsors/MLT.svg"),
        tier: SponsorTiers.SAND,
    },
    {
        name: "ManTech",
        link: "https://www.mantech.com/",
        image: import("./../../../public/static/sponsors/ManTech.svg"),
        tier: SponsorTiers.SAND,
    },
    {
        name: "Carnival",
        link: "https://www.carnival.com/",
        image: import("./../../../public/static/sponsors/Carnival.svg"),
        tier: SponsorTiers.SAND,
    },
    {
        name: "ServiceNow",
        link: "https://www.servicenow.com/",
        image: import("./../../../public/static/sponsors/ServiceNow.svg"),
        tier: SponsorTiers.SAND,
    },
    {
        name: "Chevron",
        link: "https://www.chevron.com/",
        image: import("./../../../public/static/sponsors/Chevron.svg"),
        tier: SponsorTiers.SAND,
    },
    {
        name: "FIU Online",
        link: "https://fiuonline.fiu.edu/",
        image: import("./../../../public/static/sponsors/FIU Online.svg"),
        tier: SponsorTiers.SAND,
    },
    {
        name: "Figma",
        link: "https://www.figma.com/",
        image: import("./../../../public/static/sponsors/Figma.svg"),
        tier: SponsorTiers.KIND,
    },
    {
        name: "Electronic Arts",
        link: "https://www.ea.com/",
        image: import("./../../../public/static/sponsors/EA.svg"),
        tier: SponsorTiers.KIND,
    },
    {
        name: "JetBrains",
        link: "https://www.jetbrains.com/",
        image: import("./../../../public/static/sponsors/Jetbrains.svg"),
        tier: SponsorTiers.KIND,
    },
    {
        name: "JetBrains",
        link: "https://www.jetbrains.com/",
        image: import("./../../../public/static/sponsors/Jetbrains.svg"),
        tier: SponsorTiers.KIND,
    },
    {
        name: "Wolfram",
        link: "https://www.wolfram.com/",
        image: import("./../../../public/static/sponsors/Wolfram Alpha.svg"),
        tier: SponsorTiers.KIND,
    },
    {
        name: "repl.it",
        link: "https://replit.com/",
        image: import("./../../../public/static/sponsors/Replit.svg"),
        tier: SponsorTiers.KIND,
    },
];

const SponsorsBody: React.FC = () => (
    <section className={styles.faqBackground}>
        {/* <Stars className={styles.faqStars} /> */}
        <div className={styles.mainContent}>
            <span id="faq" className={styles.faqlink} />
            <img
                src={FAQBuilding.src}
                style={{
                    aspectRatio: "3/4",
                    minWidth: "150px",
                    maxWidth: "500px",
                    alignSelf: "start",
                }}
            />
            <div>
                <h1 className={styles.header}>Sponsors </h1>
                <ul>
                    {SponsorList.map((item, index) => {
                        return <SponsorItem key={index} sponsor={item} />;
                    })}
                </ul>
            </div>
        </div>
    </section>
);

export default Sponsors;
