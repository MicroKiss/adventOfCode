import fs, { read } from 'fs';
import readline from 'readline';
import path from 'path';


function mod ( n, m ) {
	return ( ( n % m ) + m ) % m;
}

let currentState = 50;


function GetNextState ( currentState, direction, amount ) {
	if ( direction === 'L' ) {
		return ( mod( currentState - amount, 100 ) );
	} else {
		return ( mod( currentState + amount, 100 ) );
	}
}

const filePath = path.resolve( './realInput.txt' );

const fileStream = fs.createReadStream( filePath );

const rl = readline.createInterface(
	{
		input: fileStream,
		crlfDelay: Infinity
	}
);

let password = 0;

for await ( const line of rl ) {
	const direction = line[0];
	const amount = parseInt( line.slice( 1 ), 10 );
	currentState = GetNextState( currentState, direction, amount );
	if ( currentState === 0 ) {
		password++;
	}
}

console.log( 'The password is: ', password );
