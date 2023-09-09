import Object from "@rbxts/object-utils";

export = {
	random: (values: Record<string, number> | Map<string, number>) => {
		let randomNumber = new Random().NextNumber()

		for (const [key, weight] of Object.entries(values as Record<string, number> )) {
			randomNumber -= weight;

			if (randomNumber <= 0) {
				return key;
			}
		}
	},
};
