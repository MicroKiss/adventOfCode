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
	let firstBankIndex = 0;
	for ( let i = 1; i < bankLine.length - 1; i++ ) {
		if ( bankLine[i] > bankLine[firstBankIndex] ) {
			firstBankIndex = i;
		}
	}

	let secondBankIndex = firstBankIndex + 1;
	for ( let i = firstBankIndex + 1; i < bankLine.length; i++ ) {
		if ( bankLine[i] > bankLine[secondBankIndex] ) {
			secondBankIndex = i;
		}
	}
	sum += parseInt( bankLine[firstBankIndex] ) * 10 + parseInt( bankLine[secondBankIndex] );
}

async function Solve () {
	await ParseLines( filePath, ParseLine );
	console.log( `Sum: ${sum}` );
}

Solve();