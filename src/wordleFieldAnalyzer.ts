import { WordleFieldState, type PlayerWordleField, type Misplaced, type WordleField } from "./wordle";

export class WordleFieldAnalyzer {
    fields: WordleField[];
    misplaced: Misplaced[];

      constructor(length: number){
          this.misplaced = [];
          this.fields = Array.from({length: length}, () => ({
              possible: Array.from({ length: 10 }, (_ , i) => `${i}`),
              solvedNum: null
          }));
      }

      applyFieldData(fields: PlayerWordleField[]){
          this.applyCorrectFieldsData(fields);
          this.applyMisplacedFieldsData(fields);
          this.applyNotPresentFieldsData(fields);
      }

      clearMisplaced(){
        this.misplaced = this.misplaced.filter(m => m.count > 0);
      }

      getNotSolvedFields(){
          return this.fields.filter((field) => field.possible.length !== 0);
      }


      applyCorrectFieldsData(fields: PlayerWordleField[]){


          fields.forEach((value, index) => {
              if (value.state === WordleFieldState.Correct && this.getFieldSolvedNum(index) === null){

                  this.setFieldSolvedNum(index, value.digit);
                  // TODO: Subtract from misplaced when found a new correct digit, checking if it's new shouldn't be based on length because it can be (very rarely) wrong

                  this.subtractFromMisplaced(value.digit);

                  if (!this.isMisplacedAlreadySolved(value.digit)) return;
                  this.applyNotPresentDigitData(value.digit);

              }
          })
      }

      subtractFromMisplaced(digit: string){
          const obj = this.misplaced.find(m => m.digit === digit);
          if (!obj) return;
          if (obj.count > 0) obj.count -= 1;
      }

      isMisplacedAlreadySolved(digit: string){
          const obj = this.misplaced.find(m => m.digit === digit);
          if (!obj) return false;
          return obj.count === 0 && obj.isMax;
      }

      applyMisplacedFieldsData(fields: PlayerWordleField[]){
          const misplacedDigits: string[] = [];

          fields.forEach((value, index) => {
              if (value.state === WordleFieldState.Misplaced){
                  if (misplacedDigits.includes(value.digit)) return;
                  this.applyMisplacedDigitData(value.digit, index, fields);
                  misplacedDigits.push(value.digit);
              }
          })
      }

      applyMisplacedDigitData(digit: string, index: number, fields: PlayerWordleField[]){
          let possibleDigits = this.getFieldPossibleDigits(index);
          possibleDigits = possibleDigits.filter(n => n !== digit);

          this.setFieldPossibleDigits(index, possibleDigits);

          const counts = countDigits(digit, fields);

          const isMax: boolean = counts.notPresent > 0;

          const obj = this.misplaced.find(m => m.digit === digit);

          if (!obj){
              this.misplaced.push({
                  digit: digit,
                  count: counts.misplaced,
                  isMax: isMax
              });
              return;
          }


          if (obj.count > counts.misplaced || (obj.count == counts.misplaced && obj.isMax)) return;
          obj.count = counts.misplaced;
          obj.isMax = isMax;
      }

      applyNotPresentFieldsData(playerFields: PlayerWordleField[]){

          for (const [index, playerField] of playerFields.entries()){
              if (playerField.state === WordleFieldState.NotPresent){
                if (!this.isDigitAlreadyMisplaced(playerField.digit))
                    this.applyNotPresentDigitData(playerField.digit);
                else {
                    const possibleDigits = this.getFieldPossibleDigits(index).filter(d => d !== playerField.digit);
                    this.setFieldPossibleDigits(index, possibleDigits);
                }
              }
          }

      }

      applyNotPresentDigitData(digit: string){
          for (const field of this.fields){
              if (field.solvedNum) continue;
              field.possible = field.possible.filter(d => d !== digit)
          }
      }

      isDigitAlreadyMisplaced(digit: string){
          return this.misplaced.some(m => m.digit === digit && m.count > 0);
      }

      setFieldPossibleDigits(index: number, numbers: string[]){
          if (!this.fields[index]) {
            console.error("Trying to access non-existing field at index:", index);
            return;
          };
          this.fields[index].possible = numbers;
      }

      setFieldSolvedNum(index: number, number: string){
          if (!this.fields[index]) {
            console.error("Trying to access non-existing field at index:", index);
            return;
          };
          this.fields[index].solvedNum = number;
      }

      getFieldPossibleDigits(index: number): string[]{
          if (!this.fields[index]) {
            console.error("Trying to access non-existing field at index:", index);
            return [];
          };
          return [...this.fields[index].possible];
      }

      getFieldSolvedNum(index: number): string | null{
          if (!this.fields[index]) {
            console.error("Trying to access non-existing field at index:", index);
            return null;
          };
          return this.fields[index].solvedNum;
      }

      getAllData(){
          return {
              fields: this.fields,
              misplaced: this.misplaced
          }
      }

    }

    function countDigits(digit: string, fields: PlayerWordleField[]){
    let notPresentCount = 0;
    let misplacedCount = 0;

    for (const field of fields){
        if (field.digit !== digit) continue;
        if (field.state === WordleFieldState.Misplaced) misplacedCount++;
        if (field.state === WordleFieldState.NotPresent) notPresentCount++;
    }

    return {
        notPresent: notPresentCount,
        misplaced: misplacedCount
    };
}
