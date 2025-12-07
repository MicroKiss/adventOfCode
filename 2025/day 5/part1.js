import fs from 'fs';
import readline from 'readline';


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


const filePath = 'real'

const freshRanges = [];

let wasThereEmptyLine = false;;
let sum = 0;


function ParseRangeLine(line) {
    const range = line.split('-');
    const begin = parseInt(range[0]);
    const end = parseInt(range[1]);
    freshRanges.push([begin, end]);
};

function ProcessId(line) {
    const id = parseInt(line);

    for (const range of freshRanges) {
        if (id >= range[0] && id <= range[1]) {
            sum += 1;
            return;
        }
    }
}

function ParseLine(line) {

    if (line.length === 0) {
        wasThereEmptyLine = true;
        return;
    }

    if (wasThereEmptyLine) {
        ProcessId(line);
    } else {
        ParseRangeLine(line);
    }
}

async function Solve() {
    await ParseLines(filePath, ParseLine);
    console.log(`Sum: ${sum}`);
}

Solve();