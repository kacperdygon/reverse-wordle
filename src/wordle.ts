// import { exampleAnalyzerData } from "./exampleData";
import { WordleFieldAnalyzer } from "./wordleFieldAnalyzer";
import type { WordleGuesser } from "./wordleGuesser";

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

export interface WordleAnalyzerData{
    fields: WordleField[];
    misplaced: Misplaced[];
}

export class Wordle{


  wordleFieldAnalyzer: WordleFieldAnalyzer;
  wordleGuesser: WordleGuesser;

  constructor(wordLength: number, wordleGuesser: WordleGuesser){
      this.wordleFieldAnalyzer = new WordleFieldAnalyzer(wordLength);
      this.wordleGuesser = wordleGuesser;
  }

  analyzeData(fields: PlayerWordleField[]){
      this.wordleFieldAnalyzer.applyFieldData(fields);
      return this.wordleFieldAnalyzer.getAllData();
    }

    guess(wordleData: WordleAnalyzerData){
        return this.wordleGuesser.guess(wordleData);
    }

  getAllAnalyzerData(){
      return this.wordleFieldAnalyzer.getAllData();
  }

}
