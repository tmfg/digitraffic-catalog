import {UserView} from "./user-view";
import {URL} from "../page-object-models/pages-controller";
import {Identity} from "../users/identity-user";
import {KnownUser} from "../users/known-user";
import {BasePage} from "../page-object-models/base";
import {gotoNewPage} from "../page-object-models/util";
import {HomePage} from "../page-object-models";
import type {DatasetNavigationMixin, UserNavigationMixin} from "./mixins/mixin-types";
import {addMixinForUserView, MixinName} from "./mixins/mixins-controller";

export class OrganizationEditorView extends UserView {

  private constructor(user: KnownUser, pom: BasePage) {
    super(user, pom);
  }

  static async of(organizationEditor: KnownUser): Promise<OrganizationEditorView & DatasetNavigationMixin & UserNavigationMixin> {
    if (organizationEditor.identity !== Identity.OrganizationEditor) {
      throw new Error(`Expected organization editor, but got ${organizationEditor.identity}`);
    }

    console.log(`Creating OrganizationEditorView for user ${organizationEditor.identity}`);
    const page = await organizationEditor.createNewPage()
    console.log('page created')
    organizationEditor.setTestContextPage(page)

    const pom = await gotoNewPage(
      page,
      URL.Home,
      async (homePagePOM: HomePage) => {
        console.log("Navigating to home page for organization editor");
        await homePagePOM.goto()
        console.log("Home page loaded for organization editor");
      }
    )
    console.log("Home page POM created for organization editor");
    const organizationEditorView = new OrganizationEditorView(organizationEditor, pom);
    const userViewWithUserNavigation = addMixinForUserView<UserNavigationMixin, OrganizationEditorView>(organizationEditorView, MixinName.UserNavigation);
    return addMixinForUserView<DatasetNavigationMixin, typeof userViewWithUserNavigation>(userViewWithUserNavigation, MixinName.DatasetNavigate);
  }
}