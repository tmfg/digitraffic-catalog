import "./modules/top-navigation";
import "./modules/app-navigation";
import "./modules/user-actions";
import "./modules/dataset-form";
import "./modules/iri-fragment-input";
import "./modules/language-menu";
import "./modules/temporal-coverage";
import "./modules/multi-select";
import "./modules/language-toggle-buttons";
import "./modules/contact-detail";
import "./modules/rights-holder";
import "./modules/form-layout";
import "./modules/image-upload";
import "./popover-listener";
import {
  ChevronDown,
  ChevronUp,
  createIcons,
  ExternalLink,
  Facebook,
  Globe,
  Instagram,
  Linkedin,
  Menu,
  Twitter,
  User,
  Youtube,
} from "lucide";

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
      Facebook,
      Twitter,
      Instagram,
      Youtube,
      Linkedin,
    },
  });
});
