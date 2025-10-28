import type { Misplaced, WordleAnalyzerData } from "./wordle";

interface UnsolvedField{
    index: number,
    possible: string[]
}

export class WordleGuesser {

    guess(wordleData: WordleAnalyzerData): string{

        const guess: string[] = wordleData.fields.map(field => field.solvedNum !== null ? field.solvedNum : '?');

        const fields = wordleData.fields.map((field, index) => field.solvedNum === null ? ({
            index: index,
            possible: field.possible
        }) : undefined).filter(f => f !== undefined);

        const finalGuess = this.guessNextDigit(0, wordleData.misplaced, fields, guess);

        if (!finalGuess) return 'no guess';

        return finalGuess.join('');
    }

    guessNextDigit(position: number, misplaced: Misplaced[], fields: UnsolvedField[], guess: string[]): string[] {

        if (position >= fields.length) {
            return guess;
        }

        if (!fields[position]) return guess;
        if (fields[position].possible.length === 0) return guess;

        const digit = fields[position].possible[Math.floor(Math.random() * fields.length)] as string;

            guess = [...guess];
            guess[fields[position].index] = digit;
            
            
            misplaced = misplaced.map(m => {
                if (m.digit !== digit) return m;
                return {
                    ...m,
                    count: m.count - 1
                }
            });
            
            const thisMisplacedDigit = misplaced.find(m => m.digit === digit);
            if (!thisMisplacedDigit || 
                thisMisplacedDigit.count > 0 || 
                !thisMisplacedDigit.isMax) {
                    return this.guessNextDigit(position + 1, misplaced, fields, guess);
                }

            for (let i = position + 1; i < fields.length; i++) {
                const field = fields[i];
                if (!field) continue;
                if (fields[i] != undefined && field.possible.includes(digit)) {
                    field.possible = field.possible.filter(d => d !== digit);
                }
            }

            return this.guessNextDigit(position + 1, misplaced, fields, guess);

        
    }

    //TODO: Force guesser to use misplaced digits from previous guesses



}
