import {UserView} from "./user-view";
import {URL} from "../page-object-models/pages-controller";
import {Identity} from "../users/identity-user";
import {KnownUser} from "../users/known-user";
import {BasePage} from "../page-object-models/base";
import {gotoNewPage} from "../page-object-models/util";
import {HomePage} from "../page-object-models";
import type {UserNavigationMixin} from "./mixins/mixin-types";
import {addMixinForUserView, MixinName} from "./mixins/mixins-controller";

export class OrganizationMemberView extends UserView {

  private constructor(user: KnownUser, pom: BasePage) {
    super(user, pom);
  }

  static async of(organizationMember: KnownUser): Promise<OrganizationMemberView & UserNavigationMixin> {
    if (organizationMember.identity !== Identity.OrganizationMember) {
      throw new Error(`Expected organization member, but got ${organizationMember.identity}`);
    }

    console.log(`Creating OrganizationMemberView for user ${organizationMember.identity}`);
    const page = await organizationMember.createNewPage()
    console.log('page created')
    organizationMember.setTestContextPage(page)

    const pom = await gotoNewPage(
      page,
      URL.Home,
      async (homePagePOM: HomePage) => {
        console.log("Navigating to home page for organization member");
        await homePagePOM.goto()
        console.log("Home page loaded for organization member");
      }
    )
    console.log("Home page POM created for organization member");
    const organizationMemberView = new OrganizationMemberView(organizationMember, pom);
    return addMixinForUserView<UserNavigationMixin, OrganizationMemberView>(organizationMemberView, MixinName.UserNavigation);
  }
}