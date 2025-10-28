import { WordleFieldAnalyzer } from "./wordleFieldAnalyzer";
import { WordleGuesser } from "./wordleGuesser";

export interface Misplaced{
    digit: string,
    count: number,
    isMax: boolean
}

export enum WordleFieldState{
    Correct,
    Misplaced,
    NotPresent
}

export interface PlayerWordleField{
    digit: string,
    state: WordleFieldState
}

export interface WordleField{
    possible: string[],
    solvedNum: string | null
}

export class Wordle{


  wordleFieldAnalyzer: WordleFieldAnalyzer;
  wordleGuesser: WordleGuesser;

  constructor(wordLength: number){
      this.wordleFieldAnalyzer = new WordleFieldAnalyzer(wordLength);
      this.wordleGuesser = new WordleGuesser();
  }

  applyFieldData(fields: PlayerWordleField[]){
      this.wordleFieldAnalyzer.applyFieldData(fields);
  }

  getAllData(){
      return this.wordleFieldAnalyzer.getAllData();
  }

}
