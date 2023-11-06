/**
 * Filter an array of items based on their probability using a threshold.
 * @param {Array<[string, { probability: number }]>} itemsWithProbability - An array of items with their associated probabilities.
 * @param {RandomGenerator} random - An instance of a random number generator.
 * @returns {Array<[string, { probability: number }]>} - Filtered array of items.
 */
function filterByThreshold(probabilities: Array<[string, number]>, random: Random) {
	return probabilities.filter((_key,probability) => random.NextNumber(0, probability) > probability);
}

export {filterByThreshold}