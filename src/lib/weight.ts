import Object from "@rbxts/object-utils";

type WeightObject = Record<string, number>

function skew(rates:WeightObject, factor: number) {
	const keys = Object.keys(rates)
	const skewedRates = {} as WeightObject;
  
	// Base factor to adjust the weights
	const baseFactor = 1 + factor;
  
	// Apply the skewing factor to each entry's weight
	Object.entries(rates).forEach(([entry, value]) => {
		const newWeight = value ** baseFactor;
		skewedRates[entry] = newWeight;
	})
  
	// Calculate the new total weight after skewing
	const newTotalWeight = Object.values(skewedRates).reduce((total, rate) => total + rate, 0);
  
	// Normalize the skewed rates to ensure they add up to 1
	keys.forEach((entry) => {
		skewedRates[entry] /= newTotalWeight;
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
