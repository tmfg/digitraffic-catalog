import {nodeResolve} from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";

const inputs = {
    'js/digitrafficMain': "src/ts/main.ts"
}
export default Object.entries(inputs).map(([name, file]) => {
    const tsCompilePlugins = [
        nodeResolve({
            exportConditions: ["node", "default", "module", "import", "require"],
            preferBuiltins: true
        }),
        typescript(),
    ]
    const jsPlugins = [
        ...tsCompilePlugins,
        terser()
    ]
    return {
        input: {
            [name]: file
        },
        output: {
            inlineDynamicImports: true,
            dir: ".",
            entryFileNames: "ckanext/digitraffic_core/assets/[name].js",
            format: "iife"
        },

        plugins: jsPlugins,
    }
});