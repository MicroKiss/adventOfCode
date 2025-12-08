import fs from 'fs';
import readline from 'readline';


async function ParseLines ( filePath, callback ) {
	const fileStream = fs.createReadStream( filePath );

	const rl = readline.createInterface(
		{
			input: fileStream,
			crlfDelay: Infinity
		}
	);
	let index = 0;

	for await ( const line of rl ) {
		callback( line, index );
		index++;
	}
}


const filePath = 'real';

let sum = 0;
function ParseLine ( bankLine ) {

	const amountToTake = 12;

	const takenBankIndexes = [];

	for ( let bankIndex = 0; bankIndex < amountToTake; bankIndex++ ) {

		//first available
		let currBankIndex = takenBankIndexes.length === 0 ? 0 : takenBankIndexes[takenBankIndexes.length - 1] + 1;

		let maxIndex = currBankIndex;

		const lastPossibleIndex = bankLine.length - ( amountToTake - bankIndex );
		for ( currBankIndex = currBankIndex + 1; currBankIndex <= lastPossibleIndex; currBankIndex++ ) {
			if ( bankLine[currBankIndex] > bankLine[maxIndex] ) {
				maxIndex = currBankIndex;
			}
		}

		takenBankIndexes.push( maxIndex );

	}
	let mergedNumber = 0;
	takenBankIndexes.forEach( ( takenIndex ) => {
		mergedNumber = mergedNumber * 10 + parseInt( bankLine[takenIndex] );
	} );
	console.log( mergedNumber );

	sum += mergedNumber;

}
async function Solve () {
	await ParseLines( filePath, ParseLine );
	console.log( `Sum: ${sum}` );
}

Solve();