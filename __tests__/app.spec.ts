import { expandGitLink } from "../src/services/expandGitLink";
import { appStart } from "../src/services/appStart";

describe("App", () => {
  jest.setTimeout(30000);

  it("should start a new app", async () => {
    const response = await appStart(
      "ionic-team/ionic-pwa-toolkit",
      "../playground/test2",
      "subl"
    );

    console.log(response);

    expect(response).toBeTruthy();
  });
});
