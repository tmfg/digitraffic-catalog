import {
    ChevronDown,
    ChevronUp,
    createIcons,
    ExternalLink,
    Globe,
    Menu,
    User,
} from "lucide";
import "./modules/app-navigation";
import "./modules/contact-detail";
import "./modules/dataset-form";
import "./modules/form-layout";
import "./modules/image-upload";
import "./modules/iri-fragment-input";
import "./modules/language-menu";
import "./modules/language-toggle-buttons";
import "./modules/multi-select";
import "./modules/temporal-coverage";
import "./modules/top-navigation";
import "./modules/user-actions";
import "./popover-listener";

jQuery(function () {
  $(".js-disabled").removeClass("js-disabled");
  createIcons({
    icons: {
      ExternalLink,
      User,
      Menu,
      Globe,
      ChevronDown,
      ChevronUp,
    },
  });
});
