import { BasePage } from "./base";
import type { Page } from "@playwright/test";
import { setPom, URL } from "./pages-controller";

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page, [
      page.getByRole("heading", { name: "Datalle näkyvyyttä ja käyttäjiä" }),
    ]);
  }
  async goto(): Promise<HomePage> {
    await this.page.goto(URL.Home);
    return this;
  }
}

setPom(URL.Home, HomePage);
