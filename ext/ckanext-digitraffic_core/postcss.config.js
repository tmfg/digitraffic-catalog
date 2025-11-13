import path from "path";

const config = (ctx) => {
    const assetsFolder = 'assets'
    const assetsPath = path.resolve('ckanext/digitraffic_core/public/' + assetsFolder)

    const cssPlugins = {
        'postcss-url': [
            // Changes the ckan url to what CKAN expects
            {
                filter: '**/ckan/ckan/public/**/*',
                url: (asset) => {
                    return asset.url.replace('ckan/ckan/public/', '../../../')
                },
            },
            // Copies the assets used from node_modules under the assets folder. CKAN assets are not included as
            // they will be cached by the above setting
            {
                url: 'copy',
                basePath: path.resolve('node_modules'),
                assetsPath: assetsPath,
                useHash: true,
                multi: true
            },
            // Renames the path to only contain relevant part for the browser
            {
                url: (asset) => {
                    const publicAssetRegEx = new RegExp("^(\.\./)+public/" + assetsFolder)
                    if (asset.url?.match(publicAssetRegEx)) {
                        const urlForBrowser = asset.url.replace('/public/', '/')
                        return urlForBrowser
                    }
                    return asset.url
                },
                multi: true
            }
        ],
        cssnano: {
            preset: 'default'
        }
    }


    return {
        plugins: cssPlugins
    }
}

export default config