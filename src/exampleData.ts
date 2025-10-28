import { type PlayerWordleField, type WordleAnalyzerData, WordleFieldState } from "./wordle";

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
    state: WordleFieldState.Misplaced
  },
  {
    digit: "2",
    state: WordleFieldState.NotPresent
  },
  {
    digit: "1",
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
    digit: "9",
    state: WordleFieldState.NotPresent
  },
  {
    digit: "4",
    state: WordleFieldState.Correct
  },
  {
    digit: "2",
    state: WordleFieldState.Correct
  }
]];

export const exampleAnalyzerData: WordleAnalyzerData[] = [{
  fields: [
    {
      possible: ["5"],
      solvedNum: "5"
    },
    {
      possible: ["7"],
      solvedNum: "7"
    },
    {
      possible: ["2"],
      solvedNum: null
    },
    {
      possible: ["1", "2", "3", "4"],
      solvedNum: null
    },
  ],
  misplaced: [
    {
      digit: "2",
      count: 1,
      isMax: true
    }
  ]
}];