import React from "react";
import styles from "./index.module.css";
import Lab22c from "./../../../public/static/sponsors/Lab22c.svg";
import Assurant from "./../../../public/static/sponsors/Assurant.svg";
import Kaseya from "./../../../public/static/sponsors/Kaseya.svg";
import Vanguard from "./../../../public/static/sponsors/Vanguard.svg";
import CapitalOne from "./../../../public/static/sponsors/CapitalOne.svg";
import Autodesk from "./../../../public/static/sponsors/Autodesk.svg";
import Addigy from "./../../../public/static/sponsors/Addigy.svg";
import Google from "./../../../public/static/sponsors/Google.svg";
import Bloomberg from "./../../../public/static/sponsors/Bloomberg.svg";
import Schonfeld from "./../../../public/static/sponsors/Schonfeld.svg";
import Meta from "./../../../public/static/sponsors/Meta.svg";
import MDC from "./../../../public/static/sponsors/Miami Dade County.svg";
import StateFarm from "./../../../public/static/sponsors/State Farm.svg";
import Slalom from "./../../../public/static/sponsors/Slalom.svg";
import Salesforce from "./../../../public/static/sponsors/Salesforce.svg";
import LexisNexis from "./../../../public/static/sponsors/Lexis Nexis.svg";
import HPCC from "./../../../public/static/sponsors/HPCC Solutions.svg";
import MITRE from "./../../../public/static/sponsors/MITRE.svg";
import Southwest from "./../../../public/static/sponsors/Southwest.svg";
import BrainStation from "./../../../public/static/sponsors/BrainStation.svg";
import KnowBe4 from "./../../../public/static/sponsors/KnowBe4.svg";
import Elfen from "./../../../public/static/sponsors/Elfen.svg";
import Avocademy from "./../../../public/static/sponsors/Avocademy.svg";
import Microsoft from "./../../../public/static/sponsors/Microsoft.svg";
import Xbox from "./../../../public/static/sponsors/Xbox.svg";
import Nvidia from "./../../../public/static/sponsors/Nvidia.svg";
import Rivian from "./../../../public/static/sponsors/Rivian.svg";
import JPMC from "./../../../public/static/sponsors/JPMC.svg";
import Codepath from "./../../../public/static/sponsors/Codepath.svg";
import MLT from "./../../../public/static/sponsors/MLT.svg";
import ManTech from "./../../../public/static/sponsors/ManTech.svg";
import Carnival from "./../../../public/static/sponsors/Carnival.svg";
import ServiceNow from "./../../../public/static/sponsors/ServiceNow.svg";
import Chevron from "./../../../public/static/sponsors/Chevron.svg";
import FIUOnline from "./../../../public/static/sponsors/FIU Online.svg";
import Figma from "./../../../public/static/sponsors/Figma.svg";
import EA from "./../../../public/static/sponsors/EA.svg";
import JetBrains from "./../../../public/static/sponsors/Jetbrains.svg";
import Wolfram from "./../../../public/static/sponsors/Wolfram Alpha.svg";
import Replit from "./../../../public/static/sponsors/Replit.svg";
import Emerge from "./../../../public/static/sponsors/Emerge.svg";
import GCP from "./../../../public/static/sponsors/GCP.svg";
import Echo from "./../../../public/static/sponsors/echoAR.svg";
import Balsamiq from "./../../../public/static/sponsors/Balsamiq.svg";
import MLH from "./../../../public/static/sponsors/MLH.svg";

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

    let style;
    switch (sponsor.tier) {
        case SponsorTiers.CONCH:
            style = styles.conch;
            break;
        case SponsorTiers.CONE:
            style = styles.cone;
            break;
        case SponsorTiers.SCALLOP:
            style = styles.scallop;
            break;
        case SponsorTiers.SAND:
            style = styles.sand;
            break;
        case SponsorTiers.KIND:
            style = styles.kind;
            break;
    }

    return (
        <a
            href={sponsor.link}
            className={`${style} ${styles.logo}`}
            target="_blank"
            rel="noreferrer noopener"
        >
            {sponsor.image}
        </a>
    );
};

const SponsorList: Sponsor[] = [
    {
        name: "Lab22c",
        link: "https://lab22c.com/",
        image: <Lab22c />,
        tier: SponsorTiers.CONCH,
    },
    {
        name: "Assurant",
        link: "https://www.assurant.com/",
        image: <Assurant />,
        tier: SponsorTiers.CONE,
    },
    {
        name: "Microsoft",
        link: "https://www.microsoft.com/",
        image: <Microsoft />,
        tier: SponsorTiers.CONE,
    },
    {
        name: "Xbox",
        link: "https://www.xbox.com/",
        image: <Xbox />,
        tier: SponsorTiers.CONE,
    },
    {
        name: "Kaseya",
        link: "https://www.kaseya.com/",
        image: <Kaseya />,
        tier: SponsorTiers.CONE,
    },
    {
        name: "Vanguard",
        link: "https://global.vanguard.com/",
        image: <Vanguard />,
        tier: SponsorTiers.CONE,
    },
    {
        name: "Capital One",
        link: "https://www.capitalone.com/",
        image: <CapitalOne />,
        tier: SponsorTiers.CONE,
    },
    {
        name: "Schonfeld",
        link: "https://www.schonfeld.com/",
        image: <Schonfeld />,
        tier: SponsorTiers.SCALLOP,
    },
    {
        name: "Google",
        link: "https://www.google.com/",
        image: <Google />,
        tier: SponsorTiers.SCALLOP,
    },
    {
        name: "Meta",
        link: "https://about.facebook.com/",
        image: <Meta />,
        tier: SponsorTiers.SCALLOP,
    },
    {
        name: "Salesforce",
        link: "https://www.salesforce.com/",
        image: <Salesforce />,
        tier: SponsorTiers.SCALLOP,
    },
    {
        name: "State Farm",
        link: "https://www.statefarm.com/",
        image: <StateFarm />,
        tier: SponsorTiers.SCALLOP,
    },
    {
        name: "MITRE",
        link: "https://www.mitre.org/",
        image: <MITRE />,
        tier: SponsorTiers.SCALLOP,
    },
    {
        name: "Bloomberg",
        link: "https://www.bloomberg.com/",
        image: <Bloomberg />,
        tier: SponsorTiers.SCALLOP,
    },
    {
        name: "Southwest Airlines",
        link: "https://www.southwest.com/",
        image: <Southwest />,
        tier: SponsorTiers.SCALLOP,
    },
    {
        name: "Autodesk",
        link: "https://www.autodesk.com/",
        image: <Autodesk />,
        tier: SponsorTiers.SCALLOP,
    },
    {
        name: "Addigy",
        link: "https://addigy.com/",
        image: <Addigy />,
        tier: SponsorTiers.SCALLOP,
    },
    {
        name: "Slalom",
        link: "https://www.slalom.com/",
        image: <Slalom />,
        tier: SponsorTiers.SCALLOP,
    },
    {
        name: "Lexis Nexis",
        link: "https://www.lexisnexis.com/",
        image: <LexisNexis />,
        tier: SponsorTiers.SCALLOP,
    },
    {
        name: "HPCC Systems",
        link: "https://hpccsystems.com/",
        image: <HPCC />,
        tier: SponsorTiers.SCALLOP,
    },
    {
        name: "BrainStation",
        link: "https://brainstation.io/",
        image: <BrainStation />,
        tier: SponsorTiers.SCALLOP,
    },
    {
        name: "Avocademy",
        link: "https://www.avocademy.com/",
        image: <Avocademy />,
        tier: SponsorTiers.SCALLOP,
    },
    {
        name: "Elfen Software",
        link: "https://www.elfensoftware.com/",
        image: <Elfen />,
        tier: SponsorTiers.SCALLOP,
    },
    {
        name: "Miami-Dade County",
        link: "https://www.miamidade.gov/global/",
        image: <MDC />,
        tier: SponsorTiers.SCALLOP,
    },
    {
        name: "KnowBe4",
        link: "https://www.knowbe4.com/",
        image: <KnowBe4 />,
        tier: SponsorTiers.SCALLOP,
    },
    {
        name: "JPMorgan Chase",
        link: "https://www.jpmorganchase.com/",
        image: <JPMC />,
        tier: SponsorTiers.SAND,
    },
    {
        name: "MLT",
        link: "https://mlt.org/",
        image: <MLT />,
        tier: SponsorTiers.SAND,
    },
    {
        name: "Nvidia",
        link: "https://www.nvidia.com/",
        image: <Nvidia />,
        tier: SponsorTiers.SAND,
    },
    {
        name: "Rivian",
        link: "https://rivian.com/",
        image: <Rivian />,
        tier: SponsorTiers.SAND,
    },
    {
        name: "ManTech",
        link: "https://www.mantech.com/",
        image: <ManTech />,
        tier: SponsorTiers.SAND,
    },
    {
        name: "Codepath",
        link: "https://www.codepath.org/",
        image: <Codepath />,
        tier: SponsorTiers.SAND,
    },
    {
        name: "Carnival",
        link: "https://www.carnival.com/",
        image: <Carnival />,
        tier: SponsorTiers.SAND,
    },
    {
        name: "Chevron",
        link: "https://www.chevron.com/",
        image: <Chevron />,
        tier: SponsorTiers.SAND,
    },
    {
        name: "ServiceNow",
        link: "https://www.servicenow.com/",
        image: <ServiceNow />,
        tier: SponsorTiers.SAND,
    },
    {
        name: "FIU Online",
        link: "https://fiuonline.fiu.edu/",
        image: <FIUOnline />,
        tier: SponsorTiers.SAND,
    },
    {
        name: "eMerge Americas",
        link: "https://emergeamericas.com/",
        image: <Emerge />,
        tier: SponsorTiers.SAND,
    },
    {
        name: "Figma",
        link: "https://www.figma.com/",
        image: <Figma />,
        tier: SponsorTiers.KIND,
    },
    {
        name: "Electronic Arts",
        link: "https://www.ea.com/",
        image: <EA />,
        tier: SponsorTiers.KIND,
    },
    {
        name: "Google Cloud",
        link: "https://cloud.google.com/",
        image: <GCP />,
        tier: SponsorTiers.KIND,
    },
    {
        name: "echo3D",
        link: "https://www.echo3d.co/",
        image: <Echo />,
        tier: SponsorTiers.KIND,
    },
    {
        name: "Balsamiq",
        link: "https://balsamiq.com/",
        image: <Balsamiq />,
        tier: SponsorTiers.KIND,
    },
    {
        name: "Wolfram",
        link: "https://www.wolfram.com/",
        image: <Wolfram />,
        tier: SponsorTiers.KIND,
    },
    {
        name: "JetBrains",
        link: "https://www.jetbrains.com/",
        image: <JetBrains />,
        tier: SponsorTiers.KIND,
    },
    {
        name: "repl.it",
        link: "https://replit.com/",
        image: <Replit />,
        tier: SponsorTiers.KIND,
    },
    {
        name: "MLH",
        link: "https://mlh.io/",
        image: <MLH />,
        tier: SponsorTiers.KIND,
    },
];

const SponsorsBody: React.FC = () => (
    <section className={styles.faqBackground}>
        <div className={styles.mainContent}>
            <span id="sponsors" className={styles.faqlink} />
            <div>
                <h1 className={styles.header}>Sponsors</h1>
                <div className={styles.sponsorlist}>
                    {SponsorList.map((item, index) => {
                        return <SponsorItem key={index} sponsor={item} />;
                    })}
                </div>
            </div>
        </div>
    </section>
);

export default Sponsors;
