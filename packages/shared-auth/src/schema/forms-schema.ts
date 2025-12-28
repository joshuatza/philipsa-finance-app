import z from 'zod';

export const loginSchema = z.object({
	scj_id: z.string().regex(/^\d{8}-\d{5}$/, {
		message: 'Incorrect ID',
	}),
	password: z.string(),
});
