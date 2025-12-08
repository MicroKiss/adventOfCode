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


let grid = [];

function printGrid() {
	for ( let y = 0; y < grid.length; y++ ) {
		let line = '';
		for ( let x = 0; x < grid[y].length; x++ ) {
			line += grid[y][x] === 1 ? '@' : '.';
		}
		console.log(line);
	}
}

function ParseLine ( line, index ) {
	grid[index] = [];

	for ( let i = 0; i < line.length; i++ ) {
		grid[index][i] = line[i] === '@' ? 1 : 0;
	}
}

function InsideGrid( x, y ) {
	return x >= 0 && y >= 0 && y < grid.length && x < grid[y].length;
}

function isAccessible( x, y ) {
	let neighbours = -1;
	for ( let i = -1; i <= 1; i++ ) {	
		for ( let ii = -1; ii <= 1; ii++ ) {
			let checkX = x + ii;
			let checkY = y + i;
			if ( !InsideGrid( checkX,checkY ) ) {
				continue;
			}
			
			
			if (grid[checkY][checkX] === 1 ) {
				neighbours++;
			}
		}
	}

	return neighbours < 4;
}

function isPaper (x, y) {
	return InsideGrid( y, x ) && grid[y][x] === 1;
}

function removeAccessible() {
	let indexesToRemove = [];
	let count = 0;
	for ( let y = 0; y < grid.length; y++ ) {
		for ( let x = 0; x < grid[y].length; x++ ) {
			
			if (isPaper( x, y ) && isAccessible( x, y ) ) {
				indexesToRemove.push([x, y]);
				count++;
			}
		}
	}

	for ( const index of indexesToRemove ) {
		const x = index[0];
		const y = index[1];
		grid[y][x] = 0;
	}
	return count;
}

async function Solve () {
	await ParseLines( filePath, ParseLine );
	printGrid();
	
	let totalRemoved = 0;

	let removed = removeAccessible();

	while ( removed > 0 ) {
		totalRemoved += removed;
		removed = removeAccessible();
	}
	
	console.log( `Total removed cells: ${totalRemoved}` );
}

Solve();