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


const filePath = 'realInput.txt' //'exampleInput.txt';


let sum = 0;

function ParseLine(line) {
    const ranges = line.split(',');
    ranges.forEach(part => {
        const ids = part.split('-');
        const firstId = parseInt(ids[0]);
        const lastId = parseInt(ids[1]);

        for (let id = firstId; id <= lastId; id++) {
            const idString = id.toString();
            const mid = idString.length / 2;
            for (let subStringLength = 1; subStringLength <= mid; subStringLength++) {
                const part = idString.substring(0, subStringLength);
                const repeatedPart = part.repeat(idString.length / subStringLength);
                if (repeatedPart === idString) {
                    sum += id;
                    break;
                }
            }

        }
    });
}

async function Solve() {
    await ParseLines(filePath, ParseLine);
    console.log(`Sum: ${sum}`);
}

Solve();