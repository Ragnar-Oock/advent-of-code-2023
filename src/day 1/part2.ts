import { input } from "./input";

const numbers = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const matcher = /(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g;

console.log(
	input
		.split(/\n/)
		.map(segment => [...segment.matchAll(matcher)])
        .map(matches => [matches.at(0)![1], matches.at(-1)![1]]
			.map(digit => {
				const number = numbers.indexOf(digit?.toString());
				return number === -1 ? digit : number;
			})
			.join('')
		)
        .reduce((acc, value) => acc + parseInt(value, 10), 0)
	)