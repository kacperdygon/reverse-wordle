// import { exampleAnalyzerData } from "./exampleData";
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

export interface WordleAnalyzerData{
    fields: WordleField[];
    misplaced: Misplaced[];
}

export class Wordle{


  wordleFieldAnalyzer: WordleFieldAnalyzer;
  wordleGuesser: WordleGuesser;

  constructor(wordLength: number){
      this.wordleFieldAnalyzer = new WordleFieldAnalyzer(wordLength);
      this.wordleGuesser = new WordleGuesser();
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
