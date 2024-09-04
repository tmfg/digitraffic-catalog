import styles from "rollup-plugin-styler";

export default {
    input: "bundleCSS.js",
    output: {
        file: "foo.js",
        assetFileNames: "[name]-[hash][extname]",
    },
    plugins: [
        styles({
            mode: "extract",
            /*exclude: [
                "~/ckan/ckan/public/base/scss/_variables.scss"
            ],
            sass: {
                includePaths: [
                    "./ckanext/digitraffic_theme/resources/sass/override_ckan/_variables.scss",
                    "~/ckan/ckan/public/base/scss"
                ]
            }*/
        }),
    ],
};