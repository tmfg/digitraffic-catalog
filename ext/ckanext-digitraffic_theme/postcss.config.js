import path from "path";

const config = (ctx) => {
    const assetsFolder = 'assets'
    const assetsPath = path.resolve('ckanext/digitraffic_theme/public/' + assetsFolder)

    const cssPlugins = {
        'postcss-url': [
            // Copies the assets used from node_modules under the assets folder
            {
                url: 'copy',
                basePath: path.resolve('node_modules'),
                assetsPath: assetsPath,
                useHash: true
            },
            // Renames the path to only contain relevant part for the browser
            {
                url: (asset) => {
                    const publicAssetRegEx = new RegExp("^(\.\./)+public/" + assetsFolder)
                    if (asset.url?.match(publicAssetRegEx)) {
                        const assetRelativeToAssetsPath = asset.url.replace(publicAssetRegEx, '')
                        const urlForBrowser = assetsFolder + assetRelativeToAssetsPath
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