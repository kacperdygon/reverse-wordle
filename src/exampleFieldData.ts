import { type PlayerWordleField, WordleFieldState } from "./wordle";

export const exampleFieldData: PlayerWordleField[][] = [[
  {
    digit: "5",
    state: WordleFieldState.Correct
  },
  {
    digit: "3",
    state: WordleFieldState.NotPresent
  },
  {
    digit: "8",
    state: WordleFieldState.NotPresent
  },
  {
    digit: "7",
    state: WordleFieldState.Misplaced
  },
  {
    digit: "7",
    state: WordleFieldState.NotPresent
  }
],
[
  {
    digit: "5",
    state: WordleFieldState.Correct
  },
  {
    digit: "7",
    state: WordleFieldState.Correct
  },
  {
    digit: "2",
    state: WordleFieldState.NotPresent
  },
  {
    digit: "2",
    state: WordleFieldState.Misplaced
  },
  {
    digit: "2",
    state: WordleFieldState.Misplaced
  }
],
[
  {
    digit: "5",
    state: WordleFieldState.Correct
  },
  {
    digit: "3",
    state: WordleFieldState.NotPresent
  },
  {
    digit: "8",
    state: WordleFieldState.NotPresent
  },
  {
    digit: "7",
    state: WordleFieldState.Misplaced
  },
  {
    digit: "7",
    state: WordleFieldState.NotPresent
  }
]];
