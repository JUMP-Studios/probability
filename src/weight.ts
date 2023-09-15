import Object from "@rbxts/object-utils";

type ProbabilityObject = Record<string, number> | Map<string, number>

export = {
	random: (entries: ProbabilityObject) => {
		let randomNumber = new Random().NextNumber()

		for (const [key, weight] of Object.entries(entries as Record<string, number> )) {
			randomNumber -= weight;

			if (randomNumber <= 0) {
				return key;
			}
		}
	},
	getRandomEntries: <E extends ProbabilityObject>(entries: E) => {
		const result = [] as Array<keyof E> 
		const random = new Random()

		for (const [key, weight] of Object.entries(entries as Record<string, number>)) {
			if (random.NextNumber() <= weight) {
				result.push(key as keyof E);
			}
		}

		return result
	}
};
