import { input } from "./input";

type Round = {
	red: number,
	green: number,
	blue: number
}

type Game = {
	id: number,
	rounds: Round[]
}

console.log(
	input
		.split('\n')
		.map(game => {
			const [id, rounds] = game.split(': ', 2);
			return {
				id: parseInt(id.replace('Game ', '')),
				rounds: rounds.split('; ')
					.map(round => Object.fromEntries(
						round
							.split(', ')
							.map(color => {
								const split = color.split(' ');
								return [split[1], parseInt(split[0], 10)];
							})
					)
					)
			} as Game;
		})
		.map(game => ({
			id: game.id,
			rounds: game.rounds
			.reduce((acc, round) => {
				acc.red = Math.max(round.red ?? 0, acc.red);
				acc.green = Math.max(round.green ?? 0, acc.green);
				acc.blue = Math.max(round.blue ?? 0, acc.blue);
				return acc;
			}, { red: 0, green: 0, blue: 0 })
		}))
		.map(game => game.rounds.red * game.rounds.green * game.rounds.blue)
		.reduce((acc, power) => acc + power, 0)
)