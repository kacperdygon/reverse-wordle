import type { Misplaced, WordleAnalyzerData } from "./wordle";

interface UnsolvedField{
    index: number,
    possible: string[]
}

export class WordleGuesser {

    guesses: string[][] = [];

    guess(wordleData: WordleAnalyzerData): string{

        const guess: string[] = wordleData.fields.map(field => field.solvedNum !== null ? field.solvedNum : '?');

        const fields = wordleData.fields.map((field, index) => field.solvedNum === null ? ({
            index: index,
            possible: field.possible
        }) : undefined).filter(f => f !== undefined);

        this.guessNextDigit(0, wordleData.misplaced, fields, guess);

        const finalGuess = this.guesses[Math.floor(Math.random() * this.guesses.length)];

        if (!finalGuess) return 'no guess';

        console.log([...this.guesses]);
        console.log(this.guesses.length);

        this.guesses.length = 0;

        return finalGuess.join('');
    }

    guessNextDigit(position: number, misplaced: Misplaced[], fields: UnsolvedField[], guess: string[]): void {

        if (position >= fields.length) {
            this.guesses.push(guess);
        }

        if (!fields[position]) return;
        if (fields[position].possible.length === 0) return;

        
        for (const digit of fields[position].possible) {

            const fieldsCopy = fields.map(f => ({
                index: f.index,
                possible: [...f.possible]
            }));
            guess = [...guess];

            if (!fieldsCopy[position]) return;
            guess[fieldsCopy[position].index] = digit;
            
            
            const misplacedCopy = misplaced.map(m => {
                if (m.digit !== digit) return m;
                return {
                    ...m,
                    count: m.count - 1
                }
            });

            const misplacedCount = misplacedCopy.reduce((a, b) => a + b.count, 0);
            const remainingPositions = fieldsCopy.length - (position + 1);

            if (misplacedCount >= remainingPositions){
                for (let i = position + 1; i < fieldsCopy.length; i++) {
                    const field = fieldsCopy[i];
                    if (!field) continue;
                    field.possible = field.possible.filter(d => misplacedCopy.some(m => m.digit === d));
                }
            } 
            
            const thisMisplacedDigit = misplacedCopy.find(m => m.digit === digit);
            if (!thisMisplacedDigit || 
                thisMisplacedDigit.count > 0 || 
                !thisMisplacedDigit.isMax) {
                    this.guessNextDigit(position + 1, misplacedCopy, fieldsCopy, guess);
                    continue;
                }

            for (let i = position + 1; i < fieldsCopy.length; i++) {
                const field = fieldsCopy[i];
                if (!field) continue;
                field.possible = field.possible.filter(d => d !== digit);
            }

            this.guessNextDigit(position + 1, misplacedCopy, fieldsCopy, guess);

        }
    }

}
