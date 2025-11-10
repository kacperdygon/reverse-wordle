import type { WordleAnalyzerData } from "./wordle";

export abstract class WordleGuesser{
  abstract guess(wordleData: WordleAnalyzerData): string;
}
