import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html>
            <Head>
                <meta name="author" content="Upsilon Pi Epsilon" />
                <meta
                    name="keywords"
                    content="UPE, Upsilon Pi Epsilon, Florida International University, FIU, Hackathon, Coding, Programming"
                />
                <meta
                    name="description"
                    content="ShellHacks is Florida's largest hackathon."
                />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="true"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
