import React, { useRef, useState } from "react";
import styles from "./faq.module.css";
import FAQBuilding from "../../public/static/FAQ-Building.png";

const FAQ: React.FC = () => {
    return <FAQBody />;
};

const SingleFAQ = (props: {
    question: string | JSX.Element;
    children: string | JSX.Element;
}) => {
    const [opened, setOpened] = useState(false);
    const question = useRef<HTMLParagraphElement>(null);
    const answer = useRef<HTMLParagraphElement>(null);

    return (
        <li
            className={styles.questionBlock}
            style={
                !opened
                    ? {
                          maxHeight: Math.floor(
                              question.current?.getBoundingClientRect()
                                  .height ?? 70
                          ),
                      }
                    : {
                          maxHeight:
                              (question.current?.getBoundingClientRect()
                                  .height ?? 70) +
                              (answer.current?.getBoundingClientRect().height ??
                                  0),
                      }
            }
        >
            <p
                ref={question}
                className={styles.question}
                onClick={() => setOpened((q) => !q)}
            >
                <span className={styles.questionStatus}>
                    {!opened ? "+" : "-"}
                </span>
                {props.question}
            </p>
            <p ref={answer} className={styles.answer}>
                {props.children}
            </p>
        </li>
    );
};

const FAQS = [
    [
        "What is a hackathon?",
        "A hackathon is a weekend-long event where students come together to learn the latest technologies and build innovative projects",
    ],
    [
        "How long is it?",
        <>
            ShellHacks is a{" "}
            <span style={{ color: "red" }}>36-hour hackathon</span>, beginning
            at 4pm on Friday and ending at 3pm on Sunday. We encourage you to
            work on your project for as long as you can during this time.
        </>,
    ],
    [
        "Who can come?",
        <>
            If you’re currently a college student or have graduated in the past
            year, you're more than welcome to attend! Not a student? No problem!
            You can attend as a mentor and help out our students! Mentor
            applications are available{" "}
            <a href="https://go.fiu.edu/Shell2022Mentor">here</a>.
        </>,
    ],
    [
        "Will there be any transportation aid provided?",
        "If you are an FIU students there will be busses transporting hackers from MMC to BBC throughout the weekend. \n If you are a student at a university/college in Florida, ShellHacks will send busses to those schools if sign ups and confirmations are significantly high, so tell your friends and classmates to sign up to hopefully have shuttles go to your school.",
    ],
    [
        "How much experience do I need?",
        "None! We welcome students from all academic backgrounds and skill levels, so don’t be afraid to come and join us! We’ll have introductory workshops for you to learn new skills, industry mentors to help you out, and great tools to build your projects. Whether you’ve never coded before or have lots of experience, there’s a place for you at ShellHacks!",
    ],
    [
        "Do I need to have a group?",
        "Not at all! You can be a lone wolf, come with a team (no more than four people), or join some teams at ShellHacks. We’ll also have team building activities to help you find the right teammates!",
    ],
    [
        "How much does it cost?",
        "Nothing! That’s right, ShellHacks is entirely free (even the food!) for all attendees to participate. All you need to worry about is learning new skills, developing cool projects, and having fun!",
    ],
];

const FAQBody: React.FC = () => (
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
                    alignSelf: "center",
                }}
            />
            <div>
                <h1 className={styles.header}>FAQ </h1>
                <ul>
                    {FAQS.map((f) => {
                        return (
                            <SingleFAQ key={f[0].toString()} question={f[0]}>
                                {f[1]}
                            </SingleFAQ>
                        );
                    })}
                </ul>
            </div>
        </div>
    </section>
);

export default FAQ;
