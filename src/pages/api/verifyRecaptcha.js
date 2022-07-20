import axios from "axios";

export default function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).send({message: 'Only POST requests allowed'});
    return;
    }

    const {token} = req.body;

    await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY}&response=${token}`);

    if (res.status(200)) {
        res.send("Human");
    }
}