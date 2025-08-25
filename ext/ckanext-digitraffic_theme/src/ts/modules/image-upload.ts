import { initialize } from "../module-constructs/module";


/* Image Upload
*
* This is a refactored version of image-upload.js in CKAN core.
* The URL button has been removed so as to leave only the Upload option.
*/

type ImageUploadOptions = {
    is_url: boolean;
    is_upload: boolean;
    field_upload: string;
    field_url: string;
    field_clear: string;
    field_name: string;
    upload_label: string;
    previous_upload: boolean;
};

type ImageUploadMO = {
    options: ImageUploadOptions;
    field_url: JQuery;
    field_image: JQuery;
    field_url_input: JQuery;
    field_name: JQuery;
    field_clear: JQuery;
    label_location: JQuery;
    button_url: JQuery;
    button_upload: JQuery;
    fields: JQuery;
    is_data_resource: boolean;
    previousUpload: boolean;
    _nameIsDirty: boolean
    input: JQuery
    _fileNameFromUpload: (url: string) => string;
    _updateUrlLabel: (label_text: string) => void;
    _onRemove: () => void;
    _onInputChange: () => void;
    _showOnlyButtons: () => void;
    _showOnlyFieldUrl: () => void;
    _onInputMouseOver: () => void;
    _onInputMouseOut: () => void;
    _onModifyName: () => void;
    _onFromWebBlur: () => void;
    _autoName: (name: string) => void;
    // CKAN translation function
    _: (text: string) => string;
}

const ImageUpload: ckan.Module<HTMLDivElement, ImageUploadMO> = {
    options: {
        is_url: false,
        is_upload: false,
        field_upload: 'image_upload',
        field_url: 'image_url',
        field_clear: 'clear_upload',
        field_name: 'name',
        upload_label: '',
        previous_upload: false
    },

    // Provide default values for all required properties
    field_url: $(),
    field_image: $(),
    field_url_input: $(),
    field_name: $(),
    field_clear: $(),
    label_location: $(),
    button_url: $(),
    button_upload: $(),
    fields: $(),
    is_data_resource: false,
    previousUpload: false,
    _nameIsDirty: false,
    input: $(),



    /* Should be changed to true if user modifies resource's name
     *
     * @type {Boolean}
     */
    // _nameIsDirty: false, // Already defined above

    initialize(this) {
        initialize.apply(this);

        const options = this.options;
        // firstly setup the fields
        const field_upload = 'input[name="' + options.field_upload + '"]';
        const field_url = 'input[name="' + options.field_url + '"]';
        const field_clear = 'input[name="' + options.field_clear + '"]';
        const field_name = 'input[name="' + options.field_name + '"]';

        this.input = $(field_upload, this.el);
        this.field_url = $(field_url, this.el).parents('.form-group');
        this.field_image = this.input.parents('.form-group');
        this.field_url_input = $('input', this.field_url);
        this.field_name = this.el.parents('form').find(field_name);
        // this is the location for the upload/link data/image label
        this.label_location = $('label[for="field-image-url"]');
        // determines if the resource is a data resource
        this.is_data_resource = (this.options.field_url === 'url') && (this.options.field_upload === 'upload');
        this.previousUpload = this.options.previous_upload;

        // Is there a clear checkbox on the form already?
        const checkbox = $(field_clear, this.el);
        if (checkbox.length > 0) {
            checkbox.parents('.form-group').remove();
        }

        // Adds the hidden clear input to the form
        this.field_clear = $('<input type="hidden" name="' + options.field_clear + '">')
            .appendTo(this.el);

        // Button to attach local file to the form
        this.button_upload = $('<a href="javascript:;" class="btn btn-default">' +
            '<i class="fa fa-cloud-upload"></i>' +
            this._('Upload') + '</a>')
            .insertAfter(this.input);

        if (this.previousUpload) {
            $('<div class="error-inline"><i class="fa fa-warning"></i> ' +
                this._('Please select the file to upload again') + '</div>').appendTo(this.field_image);
        }

        // Button for resetting the form when there is a URL set
        const removeText = this._('Remove');
        $('<a href="javascript:;" class="btn btn-danger btn-remove-url">'
            + removeText + '</a>')
            .prop('title', removeText)
            .on('click', this._onRemove)
            .insertBefore(this.field_url_input);

        // Update the main label (this is displayed when no data/image has been uploaded/linked)
        $('label[for="field-image-upload"]').text(options.upload_label || this._('Image'));

        // Setup the file input
        this.input
            .on('mouseover', this._onInputMouseOver)
            .on('mouseout', this._onInputMouseOut)
            .on('change', this._onInputChange)
            .prop('title', this._('Upload a file on your computer'))
            .css('width', this.button_upload.outerWidth() ?? 0);

        // Fields storage. Used in this.changeState
        this.fields = $('<i />')
            .add(this.button_upload)
            .add(this.input)
            .add(this.field_url)
            .add(this.field_image);

        // Disables autoName if user modifies name field
        this.field_name
            .on('change', this._onModifyName);
        // Disables autoName if resource name already has value,
        // i.e. we on edit page
        if (this.field_name.val()) {
            this._nameIsDirty = true;
        }

        if (options.is_url) {
            this._showOnlyFieldUrl();

            this._updateUrlLabel(this._('URL'));
        } else if (options.is_upload) {
            this._showOnlyFieldUrl();

            this.field_url_input.prop('readonly', true);
            // If the data is an uploaded file, the filename will display rather than whole url of the site
            const filename = this._fileNameFromUpload(String(this.field_url_input.val()) ?? "");
            this.field_url_input.val(filename);

            this._updateUrlLabel(this._('File'));
        } else {
            this._showOnlyButtons();
        }
    },
    /* Quick way of getting just the filename from the uri of the resource data
     *
     * url - The url of the uploaded data file
     *
     * Returns String.
     */
    _fileNameFromUpload: function (url) {
        // If it's a local CKAN image return the entire URL.
        if (/^\/base\/images/.test(url)) {
            return url;
        }

        // remove fragment (#)
        url = url.substring(0, (url.indexOf("#") === -1) ? url.length : url.indexOf("#"));
        // remove query string
        url = url.substring(0, (url.indexOf("?") === -1) ? url.length : url.indexOf("?"));
        // extract the filename
        url = url.substring(url.lastIndexOf("/") + 1, url.length);

        return url; // filename
    },

    /* Update the `this.label_location` text
     *
     * If the upload/link is for a data resource, rather than an image,
     * the text for label[for="field-image-url"] will be updated.
     *
     * label_text - The text for the label of an uploaded/linked resource
     *
     * Returns nothing.
     */
    _updateUrlLabel: function (label_text) {
        if (!this.is_data_resource) {
            return;
        }

        this.label_location.text(label_text);
    },
    /* Event listener for resetting the field back to the blank state
     *
     * Returns nothing.
     */
    _onRemove: function () {
        this._showOnlyButtons();

        this.field_url_input.val('');
        this.field_url_input.prop('readonly', false);

        this.field_clear.val('true');
    },

    /* Event listener for when someone chooses a file to upload
     *
     * Returns nothing.
     */
    _onInputChange: function () {
        let file_name = this.input.val() ?? "".split(/^C:\\fakepath\\/).pop() ?? "";

        // Internet Explorer 6-11 and Edge 20+
        const isIE = !!document.DOCUMENT_NODE;
        const isEdge = !isIE && !!(window as any).StyleMedia;
        // for IE/Edge when 'include filepath option' is enabled
        if (isIE || isEdge) {
            const fName = String(file_name).match(/[^\\\/]+$/);
            file_name = fName ? fName[0] : String(file_name);
        }

        this.field_url_input.val(file_name);
        this.field_url_input.prop('readonly', true);

        this.field_clear.val('');

        this._showOnlyFieldUrl();

        this._autoName(String(file_name));

        this._updateUrlLabel(this._('File'));
    },

    /* Show only the buttons, hiding all others
     *
     * Returns nothing.
     */
    _showOnlyButtons: function () {
        this.fields.hide();
        this.button_upload
            .add(this.field_image)
            .add(this.input)
            .show();
    },

    /* Show only the URL field, hiding all others
     *
     * Returns nothing.
     */
    _showOnlyFieldUrl: function () {
        this.fields.hide();
        this.field_url.show();
    },

    /* Event listener for when a user mouseovers the hidden file input
     *
     * Returns nothing.
     */
    _onInputMouseOver: function () {
        this.button_upload.addClass('hover');
    },

    /* Event listener for when a user mouseouts the hidden file input
     *
     * Returns nothing.
     */
    _onInputMouseOut: function () {
        this.button_upload.removeClass('hover');
    },

    /* Event listener for changes in resource's name by direct input from user
     *
     * Returns nothing
     */
    _onModifyName: function () {
        this._nameIsDirty = true;
    },

    /* Event listener for when someone loses focus of URL field
     *
     * Returns nothing
     */
    _onFromWebBlur: function () {
        const urlValue = this.field_url_input.val() ?? "";
        const match = String(urlValue).match(/([^\/]+)\/?$/);
        if (match && match[1]) {
            this._autoName(match[1]);
        }
    },

    /* Automatically add file name into field Name
     *
     * Select by attribute [name] to be on the safe side and allow to change field id
     * Returns nothing
     */
    _autoName: function (name) {
        if (!this._nameIsDirty) {
            this.field_name.val(name);
        }
    }
} as ckan.Module<HTMLDivElement, ImageUploadMO>;

ckan.module('digitraffic_image_upload', ImageUpload)
