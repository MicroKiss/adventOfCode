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

const freshRanges = [];

let wasThereEmptyLine = false;;
let sum = 0;


function ParseRangeLine(line) {
    const range = line.split('-');
    const begin = parseInt(range[0]);
    const end = parseInt(range[1]);
    freshRanges.push([begin, end]);
};

function DoRangesOverlap(range1, range2) {
    if (range1[0] <= range2[1] && range2[0] <= range1[1]) {
        return true;
    }
    return false;
}

function MergeRanges(range1, range2) {
    console.log('Merging ranges: ', range1, range2);

    const begin = Math.min(range1[0], range2[0]);
    const end = Math.max(range1[1], range2[1]);
    log('Merged range: ', begin, end);
    return [begin, end];
}


function ReduceRanges() {
    let merged = true;
    while (merged) {
        merged = false;
        for (let i = 0; i < freshRanges.length && !merged; i++) {
            const range1 = freshRanges[i];
            for (let j = i + 1; j < freshRanges.length; j++) {
                const range2 = freshRanges[j];
                if (DoRangesOverlap(range1, range2)) {
                    const mergedRange = MergeRanges(range1, range2);
                    freshRanges[i] = mergedRange;
                    freshRanges.splice(j, 1);
                    merged = true;
                    break;
                }
            }
        }
    }
}

function CountRanges() {
    console.log('original ranges', freshRanges);

    ReduceRanges();


    console.log(freshRanges);


    for (const range of freshRanges) {
        sum += (range[1] - range[0] + 1);
    }

}

function ParseLine(line) {

    if (line.length === 0) {
        wasThereEmptyLine = true;
        return;
    }

    if (wasThereEmptyLine) {
        return;
    } else {
        ParseRangeLine(line);
    }

}

async function Solve() {
    await ParseLines(filePath, ParseLine);
    CountRanges();
    console.log(`Sum: ${sum}`);
}

Solve();