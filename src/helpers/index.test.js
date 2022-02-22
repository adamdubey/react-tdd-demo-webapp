import { getLetterMatchCount } from "./";

describe("getLetterMatchCount", () => {
  const secretWord = "party";

  test("returns correct count when no matching letters", () => {
    const letterMatchCount = getLetterMatchCount("linux", secretWord);

    expect(letterMatchCount).toBe(0);
  });

  test("returns the correct count when there are n-matching letters", () => {
    const letterMatchCount = getLetterMatchCount("telemetry", secretWord);

    expect(letterMatchCount).toBe(3);
  });

  test("returns the correct count when there are duplicate letters in guess", () => {
    const letterMatchCount = getLetterMatchCount("parka", secretWord);

    expect(letterMatchCount).toBe(3);
  });
});
