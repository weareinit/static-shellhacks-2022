import { addDoc, collection } from "firebase/firestore";
import path from "path";
import { db } from "../firebaseApp";

export async function sendConfirmationEmail(
    email: string,
    name: string,
    attendance: string
): Promise<boolean> {
    const square = new URL(
        "../../../public/static/Accepted_Square.png",
        import.meta.url
    );
    const rectangle = new URL(
        "../../../public/static/Accepted_Rectangle.png",
        import.meta.url
    );
    const location = attendance === "Remote" ? "VIRTUAL" : "IN-PERSON";
    const address =
        attendance === "Remote"
            ? "on the Hopin platform"
            : "at the Kovens Conference Center";
    const data = {
        to: email,
        message: {
            subject:
                "🔥 ShellHacks 2022: Thank You for Confirming Your Attendance",
            plaintext: `Dear ${name}
            Thank you so much for confirming your attendance at ShellHacks. You have now done everything needed to participate! We're excited to welcome you September 9 - 11 for the ${location} modality ${address}. 

            Please be sure to do the following prior to the event!
            
            1️⃣ Check Out the ShellHacks FAQ
            
            You can find an informational guide to help answer some questions and get you ready for ShellHacks at https://upefiu.notion.site/ShellHacks-2022-Applicant-Updates-b7b549e525164c4b935f5e3126565946.
            
            2️⃣ Join Our Discord
            
            Discord is our official communication platform for ShellHacks, so be sure to sign up for it as soon as you can! On Discord you can chat with fellow attendees, discuss project ideas, find team members, get updates and reminders on certain events during Shellhacks, and more. You can also contact the event organizers and ask us any questions you have! Join our Discord using this link: https://discord.gg/upefiu.
            
            3️⃣ Follow Us and Share Your Acceptance
            
            Let everyone know you're excited for ShellHacks! Follow us on Instagram at https://www.instagram.com/upefiu and Twitter at https://twitter.com/upefiu and make a post or story tagging @upefiu using the hashtag #ShellHacks — attached below are some images for you to use! Please check us out on LinkedIn at https://www.linkedin.com/company/28673457 and Facebook at https://www.facebook.com/upefiu too and keep an eye out for any future updates!

            Best,
            
            ShellHacks Organizing Team`,
            html: `<p>Dear ${name},</p>
            <p>Thank you so much for confirming your attendance at ShellHacks. You have now done everything needed to participate! We're excited to welcome you September 9 - 11 for the <b>${location}</b> modality <b>${address}</b>.</p>
            ${
                attendance === "Remote"
                    ? ""
                    : "<p>The address for the in-person event is:<br>Kovens Conference Center<br>FIU Biscayne Bay Campus<br>3000 NE 151st St, North Miami, FL 33181</p>"
            }
            <p><u>Please be sure to do the following prior to the event!</u></p>
            <p><b>1️⃣ Check Out the ShellHacks FAQ</b></p>
            <p><a href="https://upefiu.notion.site/ShellHacks-2022-Applicant-Updates-b7b549e525164c4b935f5e3126565946" target="_blank" rel="noopener noreferrer">Here</a> is an informational guide to help answer some questions and get you ready for ShellHacks.</p>
            <p><b>2️⃣ Join Our Discord</b></p>
            <p>Discord is our official communication platform for ShellHacks, so be sure to sign up for it as soon as you can! On Discord you can chat with fellow attendees, discuss project ideas, find team members, get updates and reminders on certain events during Shellhacks, and more. You can also contact the event organizers and ask us any questions you have! Join our Discord <a href="https://discord.gg/upefiu" target="_blank" rel="noopener noreferrer">here</a>.</p>
            <p><b>3️⃣ Follow Us and Share Your Acceptance</b></p>
            <p>Let everyone know you're excited for ShellHacks! Follow us on <a href="https://www.instagram.com/upefiu" target="_blank" rel="noopener noreferrer">Instagram</a> and <a href="https://twitter.com/upefiu" target="_blank" rel="noopener noreferrer">Twitter</a> and make a post or story tagging @upefiu using the hashtag #ShellHacks — attached below are some images for you to use! Please check us out on <a href="https://www.linkedin.com/company/28673457" target="_blank" rel="noopener noreferrer">LinkedIn</a> and <a href="https://www.facebook.com/upefiu" target="_blank" rel="noopener noreferrer">Facebook</a> too and keep an eye out for any future updates!</p>
            <br>
            <p>With ❤️,</p>
            <p>ShellHacks Organizing Team</p>`,
            attachments: [
                {
                    filename: "ShellHacks_Accepted_Square.png",
                    path: square.toString(),
                },
                {
                    filename: "ShellHacks_Accepted_Rectangle.png",
                    path: rectangle.toString(),
                },
            ],
        },
    };

    try {
        await addDoc(collection(db, "mail"), data);
        return true;
    } catch (e) {
        return false;
    }
}
