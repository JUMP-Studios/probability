import Object from "@rbxts/object-utils";

export = {
	random: (values: Record<string, number>) => {
		let randomNumber = math.random();

		for (const [key, weight] of Object.entries(values)) {
			randomNumber -= weight;

			if (randomNumber < 0) return key;
		}
	},
};
