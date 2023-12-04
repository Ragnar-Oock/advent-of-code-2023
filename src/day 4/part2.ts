import { input } from "./input";

console.log(
	input
		.split('\n')
		.map(line => {
			const [cardId, winningNumbers, ownNumbers] = line
				.split(/[:|]/gm, 3)
				.map(segment=>segment.trim());
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
				ownNumbers,
				multiplier: 1
			}
		})
		.map((card, key, list) => {
			for(let i = 1; i <= card.nbNumbers; i++) {
				const multipliedCard = list[key + i];
				multipliedCard.multiplier += card.multiplier;
			}
			return card.multiplier;
		})
		.reduce((acc, multiplier) => acc + multiplier, 0)
		
)