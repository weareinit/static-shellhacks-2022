import { useAuthUser, withAuthUser } from "next-firebase-auth";
import React, { CSSProperties, useRef, useState } from "react";
import NavBar, { AccountActionState } from "../components/NavBar";
import SEO from "../components/SEO";
import styles from "./schedule.module.css";
import Stars from "../../public/static/Stars.svg";
import FAQShell from "../../public/static/FAQ-Shell.png";

const Schedule: React.FC = () => {
    return <ScheduleBody />;
};

const Header = (props: {
    children: string;
    selected: boolean;
    onClick: () => void;
}) => {
    return (
        <li
            className={styles.questionBlock}
            style={
                {
                    "--gradient": props.selected
                        ? "var(--pink-tan-gradient)"
                        : "var(--glass-background)",
                    color: !props.selected ? "white" : "var(--shell-purple)",
                } as CSSProperties
            }
            onClick={props.onClick}
        >
            <p className={styles.question}>{props.children}</p>
        </li>
    );
};

const Days = [
    "Friday, Sept. 9th",
    "Saturday, Sept. 10th",
    "Sunday, Sept. 11th",
] as string[];

const Badge = (props: { children: string }) => {
    const B = (props: { children: string }) => {
        const s = {
            background:
                props.children == "In Person"
                    ? "var(--shell-pink)"
                    : "var(--shell-tan)",
            color: props.children == "In Person" ? "white" : "black",
        };
        return (
            <div className={styles.badge} style={s}>
                <p>{props.children}</p>
            </div>
        );
    };

    return (
        <>
            {props.children == "Both" ? (
                <div className={styles.badges}>
                    <B>In Person</B>
                    <B>Virtual</B>
                </div>
            ) : (
                <B>{props.children}</B>
            )}
        </>
    );
};

const Schedules = [
    <>
        <h1>Check-In</h1>
        <p>
            4:00 PM - 7:00 PM EST
            {/* | Location: <a href="/dashboard">Dashboard</a> */}
        </p>
        <Badge>Both</Badge>
        <br />

        <h1>Dinner</h1>
        <p>7:00 PM - 8:00 PM EST</p>
        <Badge>In Person</Badge>
        <br />

        <h1>Opening Ceremony</h1>
        <p>8:00 PM - 9:00 PM EST</p>
        <Badge>Both</Badge>
        <br />

        <h1>Sponsor Fair</h1>
        <p>9:00 PM - 11:00 PM EST</p>
        <Badge>In Person</Badge>
        <br />

        <h1>Hacking Begins!</h1>
        <p>11:00 PM EST</p>
        <Badge>Both</Badge>
        <br />

        <h1>Team Building Activity</h1>
        <p>11:00 PM EST - 12:00 AM EST</p>
        <Badge>Both</Badge>
        <br />

        <h1>Workshops & Activies</h1>
        <p>(Specific times on hacker guide)</p>
        <Badge>Both</Badge>
        <br />
    </>,
    <>
        <h1>Workshops & Activities</h1>
        <p>Hosted throughout the day & night. More details coming soon!</p>
    </>,
    <>
        <h1>Breakfast</h1>
        <p>8:00 AM - 9:00 AM EST</p>
        <Badge>In Person</Badge>
        <br />

        <h1>Hacking Ends!</h1>
        <p>11:00 AM EST</p>
        <Badge>Both</Badge>
        <br />

        <h1>Project Submission!</h1>
        <p>11:00 AM EST - 1:00 PM EST</p>
        <Badge>Both</Badge>
        <br />

        <h1>Project Expo & Judging</h1>
        <p>1:00 PM EST - 5:00 PM EST</p>
        <Badge>Both</Badge>
        <br />

        <h1>Closing Ceramony</h1>
        <p>5:00 PM EST - 6:00 PM EST</p>
        <Badge>Both</Badge>
        <br />
    </>,
];

const ScheduleBody: React.FC = () => {
    const [selected, setSelected] = useState(0);

    return (
        <section className={styles.faqBackground}>
            <img src={FAQShell.src} className={styles.shell} />
            {/* <Stars className={styles.faqStars} /> */}

            <div className={styles.mainContent}>
                <span id="schedule" className={styles.schedulelink} />
                <div>
                    <h1 className={styles.header}>Schedule</h1>
                    <ul className={styles.questionList}>
                        {Days.map((f, i) => {
                            return (
                                <Header
                                    key={f}
                                    selected={i == selected}
                                    onClick={() => {
                                        setSelected(i);
                                    }}
                                >
                                    {f}
                                </Header>
                            );
                        })}
                    </ul>
                    <div className={styles.scheduleBox}>
                        <div className={styles.schedule}>
                            {Schedules[selected]}
                            <p className={styles.moreInfo}>
                                For more information, please check your hacker
                                guide on the <a href="/dashboard">Dashboard</a>!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Schedule;
