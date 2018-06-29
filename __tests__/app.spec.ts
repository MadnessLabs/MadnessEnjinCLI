import {execSync} from 'child_process';

describe("App", () => {
  jest.setTimeout(30000);

  it("should start a new app", async () => {
    const response = await execSync('cd ../playground');

    console.log(response);

    expect(response).toBeTruthy();
  });
});
