import '@fintraffic/fds-coreui-components/dist/define/all';
import { setPropertiesAfterInitialDownload } from './fdsProperties.js'

document.addEventListener("DOMContentLoaded", function() {
    setPropertiesAfterInitialDownload()
})