import { input } from "./input";

const charMap = input
	.split('\n')
	.map(line => line.split(''));

const isSymbolRegExp = /[^0-9.]/
function isSymbol(char: string): boolean {
	return isSymbolRegExp.test(char)
}
const symbolMap = charMap
	.map(line => line
		.reduce((symbolIndexes, char, XCoord) => 
			isSymbol(char) ? [...symbolIndexes, XCoord] : symbolIndexes,
			[] as number[]
		)
	);

function getSample(x: number, y: number): string {
	return charMap[y]?.[x] ?? '.';
}

const numbers = Array.from({length: 10}, (_, k)=>k.toString(10));
function isNumber(char: string): boolean {
	return numbers.includes(char);
}

type Pos = {x: number, y: number};
function propagateNumber(from: Pos, to: Pos) {
	if (isNumber(getSample(from.x-1, from.y))) {
		return propagateNumber({x: from.x-1, y: from.y}, to)
	}
	if (isNumber(getSample(to.x+1, to.y))) {
		return propagateNumber(from, {x: to.x+1, y: to.y})
	}
	return [`${from.x},${from.y}-${to.x},${to.y}`, {from, to}];

}

const kernel = [
	[-1,-1], [-1,0], [-1,1],
	[0,-1],  [0,0],  [0,1],
	[1,-1],  [1,0],  [1,1],
];

function searchNumber(x: number, y: number) {
	return kernel
		.map(offset => ({
			pos: {
				x: x + offset[0],
				y: y + offset[1]
			},
			sample: getSample(x + offset[0], y + offset[1])
		}))
		.filter(({sample}) => isNumber(sample))
		.map(sample => propagateNumber(sample?.pos, sample?.pos));
}
function extractNumber(from: Pos, to: Pos): number {
	
	let result = '';

	for (let i = from.x; i <= to.x; i++) {
		result += getSample(i, from.y);
	}

	return parseInt(result);
}

console.log(
	Object.values<{from:Pos, to:Pos}>(Object.fromEntries(symbolMap
		.flatMap((line, YCoord) => 
			line.flatMap(XCoord => searchNumber(XCoord, YCoord))
		)
	))
		.map(({from, to}) => extractNumber(from, to))
		.reduce((sum, number) => sum + number, 0)
)