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
const beams = new Set();
let width = 0;

let splits = 0;



function ParseLine(line, index) {


    if (index === 0) {
        width = line.length;
        log(`Width: ${width}`);
        beams.add(line.indexOf('S'));
    }

    grid.push(line);

}

function CalculateResult() {
    for (let row = 1; row < grid.length; row++) {
        log(`Row ${row}, Beams: ${beams}`);
        const newBeams = new Set();
        const beamsToRemove = new Set();
        for (const beam of beams) {
            if (grid[row][beam] === '^') {
                log(`Beam at ${beam} hit a ^`);
                beamsToRemove.add(beam);
                if (beam > 0) {
                    newBeams.add(beam - 1);
                }
                if (beam < width - 1) {
                    newBeams.add(beam + 1);
                }
                splits++;
            }
        }
        for (const beamToRemove of beamsToRemove) {
            beams.delete(beamToRemove);
        }
        for (const newBeam of newBeams) {
            beams.add(newBeam);
        }
    }
}

async function Solve() {
    await ParseLines(filePath, ParseLine);


    CalculateResult();

    console.log(`Splits: ${splits}`);
}

Solve();