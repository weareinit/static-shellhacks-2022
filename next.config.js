import path from "path";

module.exports = {
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            // issuer section restricts svg as component only to
            // svgs imported from js / ts files.
            //
            // This allows configuring other behavior for
            // svgs imported from other file types (such as .css)
            issuer: { and: [/\.(js|ts|md)x?$/] },
            use: ["@svgr/webpack"],
            resolve: {
                alias: {
                    core: path.join(__dirname, "core"),
                },
            },
        });
        return config;
    },
};
