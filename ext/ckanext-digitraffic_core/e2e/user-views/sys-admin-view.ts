import {UserView} from "./user-view";
import {URL} from "../page-object-models/pages-controller";
import {Identity} from "../users/identity-user";
import {KnownUser} from "../users/known-user";
import {BasePage} from "../page-object-models/base";
import {gotoNewPage} from "../page-object-models/util";
import {HomePage} from "../page-object-models";
import type {DatasetNavigationMixin, UserNavigationMixin} from "./mixins/mixin-types";
import {addMixinForUserView, MixinName} from "./mixins/mixins-controller";

export class SysAdminView extends UserView {

  private constructor(user: KnownUser, pom: BasePage) {
    super(user, pom);
  }

  static async of(sysAdmin: KnownUser): Promise<SysAdminView & DatasetNavigationMixin & UserNavigationMixin> {
    if (sysAdmin.identity !== Identity.SysAdmin) {
      throw new Error(`Expected sys admin, but got ${sysAdmin.identity}`);
    }

    console.log(`Creating SysAdminView for user ${sysAdmin.identity}`);
    const page = await sysAdmin.createNewPage()
    console.log('page created')
    sysAdmin.setTestContextPage(page)

    const pom = await gotoNewPage(
      page,
      URL.Home,
      async (homePagePOM: HomePage) => {
        console.log("Navigating to home page for sys admin");
        await homePagePOM.goto()
        console.log("Home page loaded for sys admin");
      }
    )
    console.log("Home page POM created for sys admin");
    const sysAdminView = new SysAdminView(sysAdmin, pom);
    const userViewWithUserNavigation = addMixinForUserView<UserNavigationMixin, SysAdminView>(sysAdminView, MixinName.UserNavigation);
    return addMixinForUserView<DatasetNavigationMixin, typeof userViewWithUserNavigation>(userViewWithUserNavigation, MixinName.DatasetNavigate);
  }
}