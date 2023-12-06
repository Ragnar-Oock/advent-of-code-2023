// import { input } from "./input";

// const [[_, [compressedSeeds]], ...compressedAlmanach] = 
// 	input
// 		.split(/\n\n/)
// 		.map(map => map.split(/\s*:\s*/))
// 		.map(([key, values]) => [
// 			key, 
// 			values
// 				.split(/\n/)
// 				.map(mapItem => mapItem.split(/\s/).map(Number))
// 		] as const)

// const seeds = compressedSeeds
// 	// .flatMap((seedOrNumber, index, array) => {
// 	// 	return index % 2 ? Array.from({length: seedOrNumber}, (_, k) => array[index - 1] + k) : [];
// 	// })

// type MapRow = [number, number, number];
// type CleandedMap = [
// 	{
// 		readonly source: string;
// 		readonly destination: string;
// 	},
// 	MapRow[]
// ];
// type Almanach = CleandedMap[];
// const almanach = compressedAlmanach
// 	.map(([name, values]) => {
// 		const [source, destination] = name.replace(' map', '').split('-to-');
// 		return [
// 			{source, destination},
// 			values.sort(([_a, sourceA], [_b, sourceB]) => sourceA - sourceB)
// 		] as CleandedMap;
// 	})

// function findMap(almanach: Almanach, from: string): CleandedMap | undefined {
// 	return almanach.find(([{source}]) => source === from);
// }

// function findRow([_, values]: CleandedMap, id: number): MapRow {
// 	return values.find(([_, source, range]) => source <= id && id < source + range) ?? [id, id, 1];
// }

// function findDestination([destination, source]: MapRow, id: number): number {
// 	return id - source + destination;
// }

// function getNextDestinationId(sourceId: number, from = 'seed'): number {
// 	const map = findMap(almanach, from);
// 	if (typeof map === 'undefined') {
// 		return sourceId;
// 	}
	
// 	const row = findRow(map, sourceId);
// 	const destination = findDestination(row, sourceId);
// 	console.log(`${map[0].source}:${sourceId} => ${map[0].destination}:${destination}`);
// 	return getNextDestinationId(destination, map[0].destination);
// }

// const nbSeeds = seeds
// 	.reduce((sum, range, index) => index % 2 ? sum + range : sum, 0)
// 	.toLocaleString();

// console.log(seeds, nbSeeds, almanach, 
// 	seeds
// 		.filter((_, index) => index % 2)
// 		// .map(seed => {
// 		// 	console.groupCollapsed(seed);
// 		// 	const location = getNextDestinationId(seed);
// 		// 	console.groupEnd();
// 		// 	return location;
// 		// })
// 		// .reduce((min, locationId) => min < locationId ? min : locationId, Number.POSITIVE_INFINITY)
// );


// // part 2 needs to run in reverse 
// // search each location from 0
// // mapping in reverse toward the seed and stop at the first seed id that is in
// // the defined ranges of compressedSeeds)


console.error('fuck this shit, i\'m not doing it!')