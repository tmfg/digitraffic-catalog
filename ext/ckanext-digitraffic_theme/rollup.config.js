import styles from "rollup-plugin-styler";
import copy from 'rollup-plugin-copy'
import {nodeResolve} from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import cssnano from "cssnano";
import autoprefixer from "autoprefixer";
import typescript from "@rollup/plugin-typescript";

const inputs = {
    'css/digitraffic-theme': "ckanext/digitraffic_theme/src/ts/main-digitraffic-theme.ts",
    'js/digitrafficMain': "ckanext/digitraffic_theme/src/ts/main.ts"
}
export default Object.entries(inputs).map(([name, file]) => {
    const isOutputJs = name.startsWith('js/')
    const tsCompilePlugins = [
        nodeResolve({
            exportConditions: ["node", "default", "module", "import", "require"],
            preferBuiltins: true
        }),
        typescript(),
    ]
    const cssThemePlugins = [
        ...tsCompilePlugins,
        copy({
            targets: [
                {src: './node_modules/ckan/ckan/public/base/*', dest: './tmp/ckan_base'},
                {
                    src: './ckanext/digitraffic_theme/src/sass/override_ckan/_variables.scss',
                    dest: './tmp/ckan_base/scss'
                }
            ],
            hook: 'buildStart'
        }),
        styles({
            mode: "extract",
            url: {
                //inline: true
                publicPath: "../../assets",
                assetDir: "ckanext/digitraffic_theme/public"
            },
            plugins: [
                autoprefixer,
                cssnano
            ]
        }),
    ]
    const jsPlugins = [
        ...tsCompilePlugins,
        terser()
    ]
    return {
        input: {
            [name]: file
        },
        output: isOutputJs ? {
            inlineDynamicImports: true,
            dir: ".",
            entryFileNames: "ckanext/digitraffic_theme/assets/[name].js",
            format: "es"
        } : {
            dir: ".",
            assetFileNames: "ckanext/digitraffic_theme/assets/[name][extname]",
        },

        plugins: isOutputJs ? jsPlugins : cssThemePlugins,
    }
});