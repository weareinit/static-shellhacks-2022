import { useAuthUser, withAuthUser } from "next-firebase-auth";
import React, { useRef, useState } from "react";
import NavBar, { AccountActionState } from "../components/NavBar";
import SEO from "../components/SEO";
import styles from "./faq.module.css";
import Stars from "../../public/static/Stars.svg";
import FAQBuilding from "../../public/static/FAQ-Building.png";
import FAQShell from "../../public/static/FAQ-Shell.png";

const FAQ: React.FC = () => {
    const user = useAuthUser();
    return (
        <div>
            <SEO />
            <NavBar
                accountAction={
                    user.email != null
                        ? AccountActionState.DASHBOARD
                        : AccountActionState.LOGIN
                }
                isInLandingPage={false}
            />
            <FAQBody />
        </div>
    );
};

const SingleFAQ = (props: { question: string; children: string; }) => {

    const [opened, setOpened] = useState(false);
    const question = useRef<HTMLParagraphElement>(null);
    const answer = useRef<HTMLParagraphElement>(null);

    console.log(question.current?.clientHeight);

    return (
        <li className={styles.questionBlock} style={!opened ? {
            maxHeight: Math.floor(question.current?.getBoundingClientRect().height ?? 70)
        } : {
            maxHeight: (question.current?.getBoundingClientRect().height ?? 70) + (answer.current?.getBoundingClientRect().height ?? 0)
        }}>
            <p ref={question} className={styles.question} onClick={() => setOpened((q) => !q)}>
                <span className={styles.questionStatus}>{!opened ? "+" : "-"}</span>
                {props.question}
            </p>
            <p ref={answer} className={styles.answer}>{props.children}</p>
        </li>
    );
};

const FAQS = [
    ["What is a hackathon?", "A hackathon is a weekend-long event where students come together to learn the latest technologies and build innovative projects"],
    ["What is a hackathon?", "A hackathon is a weekend-long event where students come together to learn the latest technologies and build innovative projects"],
    ["What is a hackathon?", "A hackathon is a weekend-long event where students come together to learn the latest technologies and build innovative projects"],
    ["What is a hackathon?", "A hackathon is a weekend-long event where students come together to learn the latest technologies and build innovative projects"],
    ["What is a hackathon?", "A hackathon is a weekend-long event where students come together to learn the latest technologies and build innovative projects"],
];

const FAQBody: React.FC = () => (
    <section className={styles.pageHeroBackground}>
        <img src={FAQShell.src} className={styles.shell} />
        <Stars className={styles.pageHeroStars} />

        <div className={styles.mainContent}>
            <img src={FAQBuilding.src} style={{ aspectRatio: "3/4", minWidth: "150px", maxWidth: "500px", alignSelf: "start" }} />
            <div>
                <h1 className={styles.header}>FAQ </h1>
                <ul>
                    {FAQS.map((f) => {
                        return (
                            <SingleFAQ question={f[0]}>
                                {f[1]}
                            </SingleFAQ>
                        );
                    })}
                </ul>
            </div>
        </div>

        {/* <div className={styles.pageHeroTop}>
            <Stars className={styles.pageHeroStars} />
            <ShellHacks className={styles.pageHeroLogo} />
            <h2>FLORIDA'S LARGEST HACKATHON</h2>
        </div>
        <div className={styles.pageHeroMiddle}>
            <div className={styles.detailsDiv}>
                prettier-ignore
                <EmojiProvider data={emojiData}>
                    <ul>
                        <li><Emoji className={styles.detailsMarker} name="rocket" />September 9-11, 2022</li>
                        <li><Emoji className={styles.detailsMarker} name="rocket" />Florida International University</li>
                        <li><Emoji className={styles.detailsMarker} name="rocket" />Miami, FL ● In-Person & Virtual!</li>
                    </ul>
                </EmojiProvider>
            </div>
            <div className={styles.buttonsDiv}>
                <LinkButton text="Sign Up!" url="/entry" filled={true} />
                <div className={styles.buttonsRow}>
                    <LinkButton
                        text="Discord"
                        url="https://discord.gg/upefiu"
                    />
                    <LinkButton
                        text="Sponsor Us"
                        url="mailto:Upe@fiu.edu?subject=We want to sponsor"
                    />
                </div>
            </div>
        </div>
        <Footer />
        <div className={styles.pageHeroCity}>
            <Image alt="Plane" className="pageHeroPlane" src={Plane} />
                <div id="spotlight1" className="pageHeroSpotlight" />
                <div id="spotlight2" className="pageHeroSpotlight" />
            <Image
                src={CityPNGA}
                loading="eager"
                layout="responsive"
                priority
            />
        </div> */}
    </section>
);

export default withAuthUser()(FAQ);
