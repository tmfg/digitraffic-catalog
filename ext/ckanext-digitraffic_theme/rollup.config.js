import styles from "rollup-plugin-styler";
import copy from 'rollup-plugin-copy'

export default {
    input: "bundleCSS.js",
    output: {
        file: "bundle.js",
        assetFileNames: "[name][extname]",
    },

    plugins: [
        copy({
            targets: [
                {src: './node_modules/ckan/ckan/public/base/*', dest: './tmp/ckan_base'},
                {src: './ckanext/digitraffic_theme/resources/sass/override_ckan/_variables.scss', dest: './tmp/ckan_base/scss'}
            ],
            hook: 'buildStart'
        }),
        styles({
            mode: "extract",
        }),

    ],
};