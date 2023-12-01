import { input } from "./input";

console.log(
	input
		.split(/\n/)
		.map(segment => [...segment.matchAll(/\d/g)])
        .map(matches => [matches.at(0), matches.at(-1)].join(''))
        .reduce((acc, value) => acc + parseInt(value, 10), 0)
	)