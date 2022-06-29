import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";

type SEOProps = {
    title?: string;
    description?: string;
    url?: string;
};

const SEO: React.FC<SEOProps> = (props: SEOProps) => {
    const { title, description, url } = props;

    const metaTitle = title ? title : "ShellHacks 2022";
    const metaDescription = description
        ? description
        : "ShellHacks is Florida’s largest hackathon, taking place September 16 - 18th both remotely and in Miami, FL!";
    const metaUrl = url ? url : "https://shellhacks.net";

    return (
        <Head>
            <title>{metaTitle}</title>
            <meta name="description" content={metaDescription} />
            <meta itemProp="name" content={metaTitle} />
            <meta itemProp="description" content={metaDescription} />

            {/* TWITTER */}
            <meta key="twitter:site" content="@upefiu"></meta>
            <meta key="twitter:title" content={metaTitle}></meta>
            <meta key="twitter:description" content={metaDescription}></meta>
            <meta key="twitter:creator" content={"@upefiu"}></meta>

            {/* FACEBOOK */}
            <meta key="og:title" content={metaTitle}></meta>
            <meta key="og:type" content="website"></meta>
            <meta key="og:url" content={metaUrl}></meta>
            <meta key="og:description" content={metaDescription}></meta>
            <meta key="og:site_name" content={metaTitle}></meta>

            {/* GOOGLE JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "http://schema.org",
                        "@type": "Hackathon",
                        name: title,
                        about: description,
                        url: url,
                    }),
                }}
            />
        </Head>
    );
};

export default SEO;
