import { input } from "./input";

console.log(
	input
		.split('\n')
		.map(line => 
			line
				.split(/[:|]/gm, 3)
				.map(segment=>segment.trim())
			)
		.map(([cardId, winningNumbers, ownNumbers]) => {
			const winningNumbersArray = winningNumbers.split(/\s+/);
			return {
				nbNumbers: ownNumbers
				.split(/\s+/)
				.reduce(
					(nbNumbers, number) => winningNumbersArray.includes(number) ? nbNumbers + 1 : nbNumbers, 
					0
				),
				id: cardId.replace(/Card\s*/, ''),
				winningNumbers, 
				ownNumbers
			}
		})
		.map(({nbNumbers}) => {
			// return nbNumbers;
			if (nbNumbers === 0) {
				return 0;
			}
			let acc = 1;
			for (let i = 1; i < nbNumbers; i++) {
				acc *= 2;
			}
			return acc;
		})
		.reduce((acc, score) => acc + score, 0)
		
)