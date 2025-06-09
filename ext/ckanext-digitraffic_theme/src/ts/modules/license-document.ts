import { initialize } from "../module-constructs/module";

type LicenseDocumentMO = {
    _getLicenseId: () => JQuery<HTMLElement>;
    _getLicenseText: () => JQuery<HTMLElement>;
    _toggleLicenseText: (
        licenseId: JQuery<HTMLElement>,
        licenseTextParent: JQuery<HTMLElement>,
    ) => void;
};

const LicenseDocument: ckan.Module<HTMLElement, LicenseDocumentMO> = {
    initialize(this) {
        initialize.apply(this);

        const licenseId = this._getLicenseId();
        const licenseTextParent = this._getLicenseText().closest(
            "div.form-group.control-full",
        );

        licenseId.on(
            "change",
            () => this._toggleLicenseText(licenseId, licenseTextParent),
        );
        this._toggleLicenseText(licenseId, licenseTextParent);
    },

    _toggleLicenseText(
        licenseId: JQuery<HTMLElement>,
        licenseTextParent: JQuery<HTMLElement>,
    ) {
        if (licenseId.val()) {
            licenseTextParent.show();
        } else {
            licenseTextParent.hide();
        }
    },
    _getLicenseId(): JQuery<HTMLElement> {
        return this.$("[name='license_id']");
    },
    _getLicenseText(): JQuery<HTMLElement> {
        return this.$("[name='license_text']");
    },
};

ckan.module("digitraffic_theme_license_document", LicenseDocument);
