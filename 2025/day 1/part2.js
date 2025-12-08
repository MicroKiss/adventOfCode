import fs from 'fs';
import readline from 'readline';
import path from 'path';

function mod ( n, m ) {
	return ( ( n % m ) + m ) % m;
}

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

class Day1Part2Solver {
	constructor( debug = false ) {
		this.currentState = 50;
		this.password = 0;
		this.debug = debug;
	}

	async Solve ( filePath ) {
		await ParseLines( filePath, this.Calcuate.bind( this ) );

		console.log( 'The password is: ', this.password );
	}

	Calcuate ( line ) {
		const direction = line[0];
		const amountToMove = parseInt( line.slice( 1 ), 10 );
		const nextState = this.GetNextState( this.currentState, direction, amountToMove );


		this.Log( line );


		const fullRotations = this.FullRotations( amountToMove );
		if ( fullRotations > 0 ) {
			this.Log( 'full rotations:', fullRotations );
			this.password += fullRotations;
		}

		const remainderRotations = mod( amountToMove, 100 );


		if ( this.WouldGoThroughZero( this.currentState, direction, remainderRotations ) ) {
			this.Log( 'went through zero', 1 );
			this.password++;
		}

		this.currentState = nextState;
	}

	GetNextState ( currentState, direction, amount ) {
		if ( direction === 'L' ) {
			return ( mod( currentState - amount, 100 ) );
		} else {
			return ( mod( currentState + amount, 100 ) );
		}
	}

	WouldGoThroughZero ( currentState, direction, amount ) {
		if ( amount > 99 ) {
			throw new Error( 'Amount should be less than 100' );
		}

		if ( direction === 'L' ) {
			return currentState - amount <= 0 && currentState !== 0;
		} else {
			return currentState + amount > 99;
		}
	}

	FullRotations ( amount ) {
		return Math.floor( amount / 100 );
	}

	Log ( str ) {
		if ( this.debug ) {
			console.log( str );
		}
	}
}


const solver = new Day1Part2Solver();
await solver.Solve( path.resolve( './realInput.txt' ) );