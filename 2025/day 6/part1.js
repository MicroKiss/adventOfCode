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

const numbers = [];
let operations = [];

let sum = 0;



function ParseLine(line) {
    let values = line.split(' ');
    values = values.filter(value => value !== '');


    if (values[0] === '+' || values[0] === '*') {
        operations = values
    } else {
        numbers.push(values.map(v => parseInt(v)));
    }
}

function CalculateResult() {
    for (let i = 0; i < operations.length; i++) {

        const op = operations[i];

        let result = op === '+' ? 0 : 1;
        for (let ii = 0; ii < numbers.length; ii++) {
            result = op === '+' ? result + numbers[ii][i] : result * numbers[ii][i];
        }

        log('Result: ', result);
        sum += result;
    }
}

async function Solve() {
    await ParseLines(filePath, ParseLine);

    CalculateResult();

    console.log(`Sum: ${sum}`);
}

Solve();