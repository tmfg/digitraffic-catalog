import {
    FdsNavigationVariant
} from "@fintraffic/fds-coreui-components/dist/navigation";

const DIGITRAFFIC_SERVICE = { label: "Digitraffic", value: "digitraffic" };

const FT_SERVICES = [
    { label: "Liikennetilanne", value: "liikennetilanne", url: "https://liikennetilanne.fintraffic.fi/" },
    { label: "Palauteväylä", value: "palautevayla", url: "https://www.palautevayla.fi/aspa?lang=fi" },
    { label: "Junalähdöt", value: "junalahdot", url: "https://junalahdot.fintraffic.fi/" },
    { label: "Drone-palvelut", value: "dronepalvelut", url: "https://skynavx.fi/#/drone" },
    DIGITRAFFIC_SERVICE,
    { label: "Digitransit", value: "digitransit", url: "https://digitransit.fi/" },
    { label: "Reittiopas", value: "reittiopas", url: "https://opas.matka.fi/" },
    { label: "NAP", value: "nap", url: "https://finap.fi/#/" }
];


const CATALOG_SERVICE = {
    label: "Datakatalogi",
    value: "datacatalog",
    url: "/",
    items: [
        {
            label: "Datasets",
            value: "datasets",
            url: "/dataset"
        }
    ]
}


const DATACATALOG_NAVIGATION = [
    { label: "Datasets", value: "datasets", url: }
];

const setTopNavigationProperties = () => {
    const handleSelection = (event) => {
        const item = event.detail;
        if (item.value === DIGITRAFFIC_SERVICE.value) {
            window.location.href = window.location.origin;
        } else {
            window.location.href = item.url;
        }
    };

    const topNavigation = document.getElementById("top-navigation");

    topNavigation.variant = FdsNavigationVariant.primary;
    topNavigation.items = FT_SERVICES;
    topNavigation.selected = DIGITRAFFIC_SERVICE;
    topNavigation.verticalMenuNavText = "Services";

    topNavigation.addEventListener('select', handleSelection);
}

const setAppNavigationProperties = () => {
    const handleSelection = (event) => {
        const item = event.detail;

    };

    const topNavigation = document.getElementById("app-navigation");

    topNavigation.variant = FdsNavigationVariant.secondary;
    topNavigation.items = CATALOG_NAVIGATION;
    topNavigation.verticalMenuNavText = "Nav";

    topNavigation.addEventListener('select', handleSelection);
}

export const setPropertiesAfterInitialDownload = () => {
    setTopNavigationProperties()
    setAppNavigationProperties()
}