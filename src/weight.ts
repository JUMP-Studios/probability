import Object from "@rbxts/object-utils";

export type ProbabilityObject = Record<string, Probability>
type Probability = number | {
	probability: number
}

function getWeight(weightObject: Probability) {
	return typeIs(weightObject, "table") ?  weightObject.probability : weightObject
}

export default {
	random: (entries: ProbabilityObject) => {
		let randomNumber = new Random().NextNumber()

		for (const [key, weight] of Object.entries(entries)) {
			randomNumber -= getWeight(weight);

			if (randomNumber <= 0) {
				return key;
			}
		}
	},
	getRandomEntries: <E extends ProbabilityObject>(entries: E) => {
		const result = [] as Array<keyof E> 
		const random = new Random()

		for (const [key, weight] of Object.entries(entries as ProbabilityObject)) {
			if (random.NextNumber() <= getWeight(weight)) {
				result.push(key as keyof E);
			}
		}

		return result
	}
};
