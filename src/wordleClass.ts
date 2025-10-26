interface Misplaced{
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
    possible: string[]
}

export class Wordle{

    fields: WordleField[];
    misplaced: Misplaced[];
    notPresent: string[];

    constructor(length: number){
        this.misplaced = [];
        this.fields = Array.from({length: length}, () => ({
            possible: Array.from({ length: 10 }, (_ , i) => `${i}`)
        }));
        this.notPresent = [];
    }

    getNotSolvedFields(){
        return this.fields.filter((field) => field.possible.length !== 0);
    }

    applyFieldData(fields: PlayerWordleField[]){
        this.applyCorrectFieldsData(fields);
        this.applyMisplacedFieldsData(fields);
        this.applyNotPresentFieldsData(fields);
    }

    applyCorrectFieldsData(fields: PlayerWordleField[]){

        
        fields.forEach((value, index) => {
            if (value.state === WordleFieldState.Correct){
                if (this.getFieldPossibleDigits(index).length > 1) {
                    this.setFieldPossibleDigits(index, [value.digit]);
                    // TODO: Subtract from misplaced when found a new correct digit, checking if it's new shouldn't be based on length because it can be (very rarely) wrong
                }
            } 
        })
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

        let isMax: boolean = counts.notPresent > 0;

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
        const fields = this.getNotSolvedFields();

        for (const playerField of playerFields){
            if (playerField.state === WordleFieldState.NotPresent
                && !this.isDigitAlreadyMisplaced(playerField.digit)){
                    this.applyNotPresentDigitData(playerField.digit);
            }
        }
        
    }

    applyNotPresentDigitData(digit: string){
        // TODO: it's probably not needed
        this.notPresent.push(digit);

        for (const field of this.fields){
            if (field.possible.length != 1){
                field.possible = field.possible.filter(d => d !== digit)
            }
        }
    }

    isDigitAlreadyMisplaced(digit: string){
        return this.misplaced.some(m => m.digit === digit && m.count > 0);
    }

    setFieldPossibleDigits(index: number, numbers: string[]){
        if (!this.fields[index]) return;
        this.fields[index].possible = numbers;
    }

    getFieldPossibleDigits(index: number): string[]{
        if (!this.fields[index]) return [];
        return [...this.fields[index].possible];
    }

    getAllData(){
        return {
            fields: this.fields,
            misplaced: this.misplaced,
            notPresent: this.notPresent
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