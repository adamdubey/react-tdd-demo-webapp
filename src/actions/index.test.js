import moxios from "moxios";
import { storeFactory } from "../../test/testUtils";
import { getSecretWord } from "./";

describe("getSecretWord", () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  test.skip("secretWord is returned", () => {
    const store = storeFactory();
    moxios.wait(() => {
      const request = moxios.request.mostRecent();
      request.respondWith({
        status: 200,
        response: "party"
      });
    });

    return store.dispatch(getSecretWord()).then(() => {
      const secretWord = store.getState().secretWord;
      expect(secretWord).toBe("party");
    });
  });
});
