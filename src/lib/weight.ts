import Object from "@rbxts/object-utils";

type WeightObject = Record<string, number>

function skew(baseRates: WeightObject, luckFactor: number) {
	const skewedRates = { ...baseRates };
	const totalWeight = Object.values(skewedRates).reduce((sum, rate) => sum + rate, 0); // Total weight of all entries
	const adjustmentFactor = luckFactor ** 2; // Calculate the factor to adjust the probabilities
  
	// Adjust the probabilities of each entry
	for (const entry in skewedRates) {
	  	skewedRates[entry] *= adjustmentFactor;
	}
  
	// Normalize the probabilities to ensure they still sum up to 1
	const normalizedTotalWeight = Object.values(skewedRates).reduce((sum, rate) => sum + rate, 0);
	for (const entry in skewedRates) {
	  skewedRates[entry] /= normalizedTotalWeight / totalWeight;
	}
  
	return skewedRates;
}
  
function random<E extends WeightObject>(entries: E) {
	const totalWeight = Object.values(entries as WeightObject).reduce((sum, rate) => sum + rate, 0);
	let randomNumber = new Random().NextNumber(0, totalWeight)

	for (const [key, weight] of Object.entries(entries as WeightObject)) {
		randomNumber -= weight;

		if (randomNumber <= 0) {
			return key as keyof E;
		}
	}
}

function getRandomEntries<E extends WeightObject>(entries: E) {
	const result = [] as Array<keyof E> 
	const random = new Random()
	const totalWeight = Object.values(entries as WeightObject).reduce((sum, rate) => sum + rate, 0);

	for (const [key, weight] of Object.entries(entries as WeightObject)) {
		if (random.NextNumber(0, totalWeight) <= weight) {
			result.push(key as keyof E);
		}
	}

	return result
}

export default {random, getRandomEntries, skew};
