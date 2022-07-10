import { User } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebaseApp";

export async function sendApplicationEmail(currentUser: User, name: string) {
    const data = {
        to: currentUser.email,
        message: {
            subject: "ShellHacks 2022 Application Received",
            plaintext: `Hey ${name}! 👋
            Thank you for applying to ShellHacks 2022! We have received your application and are excited to review it. Please look out for acceptances as they go out in waves in the coming months! 🌊
            What's Next?
            1️⃣  Join Our Discord
            Discord is our official communication platform for ShellHacks, so be sure to sign up for it as soon as you can! On Discord you can chat with fellow attendees, discuss project ideas, find team members, and more. You can also contact the event organizers and ask us any questions you have! Join our Discord at discord.gg/upefiu.
            2️⃣  Follow us on Social Media
            Follow us on Instagram at https://www.instagram.com/upefiu and on LinkedIn at https://www.linkedin.com/company/upe-fiu. We'll be posting updates, holding raffles for awesome prizes, and more! Feel free to let everyone know how excited you for ShellHacks by making a story and tagging @upefiu using the hashtag #ShellHacks.
            We can't wait to have you at ShellHacks this year!
            With ❤️
            ShellHacks Organizing Team`,
            html: `<h1>Hey ${name}! 👋</h1>
            <p>Thank you for applying to ShellHacks 2022! We have received your application and are excited to review it. Please look out for acceptances as they go out in waves in the coming months! 🌊</p>
            <h2>What's Next?</h2>
            <h3>1️⃣  Join Our Discord</h3>
            <p>Discord is our official communication platform for ShellHacks, so be sure to sign up for it as soon as you can! On Discord you can chat with fellow attendees, discuss project ideas, find team members, and more. You can also contact the event organizers and ask us any questions you have! Join our Discord <a href="discord.gg/upefiu" target="_blank" rel="noopener noreferrer">here</a>.</p>
            <h3>2️⃣  Follow us on Social Media</h3>
            <p>Follow us on Instagram <a href="https://www.instagram.com/upefiu" target="_blank" rel="noopener noreferrer">here</a> and on LinkedIn <a href="https://www.linkedin.com/company/upe-fiu" target="_blank" rel="noopener noreferrer">here</a>. We'll be posting updates, holding raffles for awesome prizes, and more! Feel free to let everyone know how excited you for ShellHacks by making a story and tagging @upefiu using the hashtag #ShellHacks.</p>
            <p>We can't wait to have you at ShellHacks this year!</p>
            <p>With ❤️</p>
            <p>ShellHacks Organizing Team</p>`,
        },
    };
    addDoc(collection(db, "mail"), data);
}
