import Object from "@rbxts/object-utils";

type WeightObject = Record<string, number>

function skew(baseRates: WeightObject, luckFactor: number) {
	// [-1,1]
	luckFactor = math.min(1, math.max(-1, luckFactor));

    const skewedRates: Record<string, number> = {};
	const totalWeight = Object.values(skewedRates).reduce((sum, rate) => sum + rate, 0); // Total weight of all entries
	const adjustmentFactor = luckFactor ** 2; // Calculate the factor to adjust the probabilities
	const keys = Object.keys(baseRates)
  
	keys.forEach((key) => {
		const originalRate = baseRates[key];
		const newRate = originalRate * (1 + luckFactor);
		skewedRates[key] = math.max(0, newRate); // Ensure rates are non-negative
	})
  
	// Normalize the probabilities to ensure they still sum up to 1
    const totalRate = Object.values(skewedRates).reduce((total, rate) => total + rate, 0);
	keys.forEach((entry) => {
		skewedRates[entry] /= totalRate / totalWeight;
	})
  
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

export {random, getRandomEntries, skew};
