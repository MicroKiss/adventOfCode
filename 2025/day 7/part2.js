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

const grid = [];
let startingBeam = 0;
let width = 0;


function ParseLine(line, index) {


    if (index === 0) {
        width = line.length;
        log(`Width: ${width}`);
        startingBeam = line.indexOf('S');
    }

    grid.push(line);

}

function CalculateResult() {
    let beams = new Map();
    beams.set(startingBeam, 1);
    for (let row = 1; row < grid.length; row++) {
        const newBeams = new Map();
        const beamsToRemove = new Set();
        for (const [beam, count] of beams) {
            if (grid[row][beam] === '^') {
                beamsToRemove.add(beam);
                if (beam > 0) {
                    newBeams.set(beam - 1, (newBeams.get(beam - 1) || 0) + count);
                }
                if (beam < width - 1) {
                    newBeams.set(beam + 1, (newBeams.get(beam + 1) || 0) + count);
                }
            }
        }
        for (const beam of beamsToRemove) {
            beams.delete(beam);
        }
        for (const [beam, count] of newBeams) {
            beams.set(beam, (beams.get(beam) || 0) + count);
        }

        log(`Row ${row}, Beams: ${beams}`);
    }
    return [...beams.values()].reduce((a, b) => a + b, 0);
}

async function Solve() {
    await ParseLines(filePath, ParseLine);


    const timelines = CalculateResult();

    console.log(`timelines: ${timelines}`);
}

Solve();