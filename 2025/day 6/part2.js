import { log } from 'console';
import fs from 'fs';
import readline from 'readline';
import path from 'path';


async function ParseLines(filePath, callback) {
    const fileStream = fs.createReadStream(filePath);

    const rl = readline.createInterface(
        {
            input: fileStream,
            crlfDelay: Infinity
        }
    );
    let index = 0;

    for await (const line of rl) {
        callback(line, index);
        index++;
    }
}


const filePath = path.join('.', 'real')

const lines = [];
const problemNumbers = [];
let operations = [];

let sum = 0;



function ParseLine(line) {
    let values = line.split(' ');

    if (values[0] === '+' || values[0] === '*') {
        operations = values.filter(value => value !== '');
    } else {
        lines.push(line);
    }
}

function ParseNumbers() {
    let problemIndex = 0;
    for (let column = 0; column < lines[0].length; column++) {
        let numberInColumn = 0;
        for (const line of lines) {
            if (parseInt(line[column])) {
                numberInColumn = numberInColumn * 10 + parseInt(line[column]);
            }
        }
        if (numberInColumn === 0) {
            problemIndex++;
        } else {
            if (!problemNumbers[problemIndex]) {
                problemNumbers[problemIndex] = [];
            }
            problemNumbers[problemIndex].push(numberInColumn);
        }
    }
}


function CalculateResult() {
    for (let i = 0; i < problemNumbers.length; i++) {
        const op = operations[i];
        log('Calculating for numbers: ', problemNumbers[i], ' with operation: ', op);

        let result = op === '+' ? 0 : 1;
        for (let ii = 0; ii < problemNumbers[i].length; ii++) {
            result = op === '+' ? result + problemNumbers[i][ii] : result * problemNumbers[i][ii];
        }
        log('Result: ', result);
        sum += result;
    }
}

async function Solve() {
    await ParseLines(filePath, ParseLine);
    ParseNumbers();


    CalculateResult();

    console.log(`Sum: ${sum}`);
}

Solve();