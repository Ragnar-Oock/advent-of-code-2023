import { input } from "./input";

const charMap = input
	.split('\n')
	.map(line => line.split(''));

function isGearSymbol(char: string): boolean {
	return char === '*'
}
const symbolMap = charMap
	.map(line => line
		.reduce((symbolIndexes, char, XCoord) => 
			isGearSymbol(char) ? [...symbolIndexes, XCoord] : symbolIndexes,
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
	return {from, to};

}

const kernel = [
	[-1,-1], [-1,0], [-1,1],
	[0,-1],  [0,0],  [0,1],
	[1,-1],  [1,0],  [1,1],
];

function searchNumber(x: number, y: number): Gear[] {
	return kernel
		.map(offset => ({
			pos: {
				x: x + offset[0],
				y: y + offset[1]
			},
			sample: getSample(x + offset[0], y + offset[1])
		}))
		.filter(({sample}) => isNumber(sample))
		.map(sample => {
			const number = propagateNumber(sample?.pos, sample?.pos);
			return ({
				symbolPos: { x, y },
				sample: number,
				value: extractNumber(number.from, number.to)
			});
		});
}
function extractNumber(from: Pos, to: Pos): number {
	
	let result = '';

	for (let i = from.x; i <= to.x; i++) {
		result += getSample(i, from.y);
	}

	return parseInt(result);
}

type Gear = {
	symbolPos: Pos,
	sample: {
		from: Pos,
		to: Pos
	},
	value: number
}

const gearCandidates = symbolMap
	.flatMap((line, YCoord) => 
		line.flatMap(XCoord => searchNumber(XCoord, YCoord))
	);

const gears: Record<`${number},${number}`, Record<number, Gear>> = {};
function addGear(gear: Gear) {
	const slot = gears[`${gear.symbolPos.x},${gear.symbolPos.y}`] ?? {};
	slot[gear.value] = gear;
	gears[`${gear.symbolPos.x},${gear.symbolPos.y}`] = slot;
}

gearCandidates.forEach(gear => addGear(gear));
// gears.forEach(gear => )
console.log(
	Object.values(gears)
		.map(gearCandidate => Object.values(gearCandidate))
		.filter(gearNumbers => gearNumbers.length>=2)
		.map(gearNumbers => gearNumbers[0].value * gearNumbers[1].value)
		// 	index !== arr.findIndex(({symbolPos:{x, y}}) => x === gearCandidate.symbolPos.x && y === gearCandidate.symbolPos.y) )
		// .map(({sample: {from, to}, symbolPos}) => [symbolPos, getSample(symbolPos.x, symbolPos.y), extractNumber(from, to)])
		.reduce((sum, number) => sum + number, 0)
)