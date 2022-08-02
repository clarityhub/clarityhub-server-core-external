import { FREE, STANDARD, PREMIUM } from './Plans';

export default {
	schema: {
		id: {
			type: String,
			hashKey: true,
		},

		creatorId: {
			type: String,
			rangeKey: true,
		},

		createdAt: {
			type: String,
		},
		updatedAt: {
			type: String,
		},

		name: {
			type: String,
		},
		description: {
			type: String,
		},

		plan: {
			type: String,
			default: FREE,
			enum: [FREE, STANDARD, PREMIUM],
		},
	},
	options: {
		timestamps: true,
		throughput: 'ON_DEMAND',
	},
};
