import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import App from "./App";
import { findByTestAttribute, storeFactory } from "../test/testUtils";

// activate global mock
jest.mock("./actions");

/**
 * App Functional Tests
 * 
 * Generate wrapper with init values and submit
 * 
 # @ function
 *
 * @param {object} state - init conditions
 * @returns {Wrapper} - mounted App component
 */

const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  const wrapper = mount(
    <Provider store={store}>
      <App />
    </Provider>
  );

  // register value to input-box
  const inputBox = findByTestAttribute(wrapper, "input-box");
  inputBox.simulate("change", { target: { value: "train" } });

  // register click on submit-btn
  const submitButton = findByTestAttribute(wrapper, "submit-btn");
  submitButton.simulate("click", { preventDefault() {} });

  return wrapper;
};

describe("no words guessed", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup({ secretWord: "party", success: false, guessedWords: [] });
  });

  test("creates GuessedWords table with one row", () => {
    const guessedWordRows = findByTestAttribute(wrapper, "guessed-word");
    expect(guessedWordRows).toHaveLength(1);
  });
});

describe("some words guessed", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup({
      secretWord: "party",
      success: false,
      guessedWords: [{ guessedWord: "agile", letterMatchCount: 1 }]
    });
  });

  test("adds row to guessedWords table", () => {
    const guessedWordNodes = findByTestAttribute(wrapper, "guessed-word");
    expect(guessedWordNodes).toHaveLength(2);
  });
});

describe("guess secret word", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup({
      secretWord: "party",
      success: false,
      guessedWords: [{ guessedWord: "agile", letterMatchCount: 1 }]
    });

    const inputBox = findByTestAttribute(wrapper, "input-box");
    const mockEvent = { target: { value: "party" } };
    inputBox.simulate("change", mockEvent);

    const submitButton = findByTestAttribute(wrapper, "submit-btn");
    submitButton.simulate("click", { preventDefault() {} });
  });

  test("adds row to guessedWords table", () => {
    const guessedWordNodes = findByTestAttribute(wrapper, "guessed-word");
    expect(guessedWordNodes).toHaveLength(3);
  });

  test("displays congrats component", () => {
    const congrats = findByTestAttribute(wrapper, "component-congrats");
    expect(congrats.text().length).toBeGreaterThan(0);
  });

  test("does not display input component contents", () => {
    const inputBox = findByTestAttribute(wrapper, "input-box");
    expect(inputBox.exists()).toBe(false);

    const submitButton = findByTestAttribute(wrapper, "submit-btn");
    expect(submitButton.exists()).toBe(false);
  });
});
