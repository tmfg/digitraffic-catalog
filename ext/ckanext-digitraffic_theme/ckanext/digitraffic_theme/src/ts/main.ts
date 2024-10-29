import './modules/top-navigaiton'
import './modules/app-navigation'
import './modules/user-actions'
import './modules/select-switch'
import { createIcons, ExternalLink, User, Menu, Globe, ChevronDown, ChevronUp, Facebook, Twitter, Instagram, Youtube, Linkedin } from 'lucide'

jQuery( function() {
  $(".js-disabled").removeClass("js-disabled")
  createIcons({
    icons: {
      ExternalLink, User, Menu, Globe, ChevronDown, ChevronUp, Facebook, Twitter, Instagram, Youtube, Linkedin
    }
  })
})