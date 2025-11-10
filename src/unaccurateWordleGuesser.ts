import type { Misplaced, WordleAnalyzerData } from "./wordle";
import { WordleGuesser } from "./wordleGuesser";

interface UnsolvedField{
    index: number,
    possible: string[]
}

export class UnaccurateWordleGuesser extends WordleGuesser {

    guess(wordleData: WordleAnalyzerData): string{


        const guess: string[] = wordleData.fields.map(field => field.solvedNum !== null ? field.solvedNum : '?');

    const fields = wordleData.fields.map((field, index) => field.solvedNum === null ? ({
      index: index,
      possible: [...field.possible]
    }) : undefined).filter(f => f !== undefined) as UnsolvedField[];

    const requiredDigits = this.extractRequiredDigits(wordleData.misplaced);
    const maxedDigits = this.extractMaxedDigits(wordleData.misplaced);

    const finalGuess = this.guessNextDigit(0, fields, guess, requiredDigits, maxedDigits);

        if (!finalGuess) return 'no guess';

        return finalGuess.join('');
    }

  guessNextDigit(position: number, fields: UnsolvedField[], guess: string[], requiredDigits: string[], maxedDigits: Set<string>): string[] | undefined {

    console.log('position:', position);
      console.log(fields.map(v => {return {
        index: v.index,
        possible: [...v.possible]
      }}))
      console.log(requiredDigits, maxedDigits)

        if (position >= fields.length) {
          console.log('przypadek 1')
          return requiredDigits.length === 0 ? guess : undefined;
        }

        if (!fields[position]) {
          console.log('przypadek 2')
          return undefined;
        }
        if (fields[position].possible.length === 0) {
          console.log('przypadek 3')
          return undefined;
        }

    const possible = fields[position].possible;

    const requiredDigitSet = new Set(requiredDigits);
    const requiredOptions = possible.filter(digit => requiredDigitSet.has(digit));
    const acceptingSlotsAhead = this.getRemainingSlotsAcceptingRequired(requiredDigits, fields, position + 1);
    const capacity = (requiredOptions.length > 0 ? 1 : 0) + acceptingSlotsAhead;
    const mustUseRequired = requiredOptions.length > 0 && requiredDigits.length >= capacity || requiredDigits.length === fields.length - position;
  const pool = mustUseRequired && requiredOptions.length > 0 ? requiredOptions : possible;

        if (pool.length === 0) {
          console.log('przypadek 4')
          return undefined;
        }

    const digitsToTry = [...pool].sort(() => Math.random() - 0.5);

    for (const digit of digitsToTry) {
      const nextGuess = [...guess];
      nextGuess[fields[position].index] = digit;

      const nextRequiredDigits = [...requiredDigits];
      const requiredIndex = nextRequiredDigits.indexOf(digit);
      if (requiredIndex !== -1) nextRequiredDigits.splice(requiredIndex, 1);

      const nextRequiredDigitSet = new Set(nextRequiredDigits);
      const digitStillRequired = nextRequiredDigitSet.has(digit);
      const digitHasMaxConstraint = maxedDigits.has(digit);

      const nextFields = fields.map(field =>
        field ? { index: field.index, possible: [...field.possible] } : undefined
      ) as UnsolvedField[];

      for (let i = position + 1; i < nextFields.length; i++) {
        const field = nextFields[i];
        if (!field) continue;
        if (!digitStillRequired && digitHasMaxConstraint && field.possible.includes(digit)) {
          field.possible = field.possible.filter(d => d !== digit);
          if (field.possible.length === 0) {
            break;
          }
        }
      }

      if (nextFields.some((field, idx) => idx > position && field !== undefined && field.possible.length === 0)) {
        continue;
      }

      const result = this.guessNextDigit(position + 1, nextFields, nextGuess, nextRequiredDigits, maxedDigits);
      if (result) {
        return result;
      }
    }

    return undefined;

    }

    private getRemainingSlotsAcceptingRequired(requiredDigits: string[], fields: UnsolvedField[], position: number): number {
                let count = 0;
                const requiredDigitSet = new Set(requiredDigits);
        for (let i = position; i < fields.length; i++) {
                    if (fields[i]?.possible.some(digit => requiredDigitSet.has(digit))) {
              count++;
          }
        }
        return count;
    }

    private extractRequiredDigits(misplaced: Misplaced[]): string[] {
        const digits: string[] = [];
        misplaced.forEach(({ digit, count }) => {
            for (let i = 0; i < count; i++) {
                digits.push(digit);
            }
        });
        return digits;
    }

  private extractMaxedDigits(misplaced: Misplaced[]): Set<string> {
    const result = new Set<string>();
    misplaced.forEach(({ digit, isMax }) => {
      if (isMax) result.add(digit);
    });
    return result;
  }






}
