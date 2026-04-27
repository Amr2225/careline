import { z } from 'zod';

const envSchema = z.object({
    DATABASE_URL: z.string(),
    WEB_ORIGIN: z.string(),
    PORT: z.string().optional().refine((port) => {
        if (!port) return false;
        return parseInt(port) > 0 && parseInt(port) < 65536
    }, { message: 'PORT must be a number between 1 and 65535' }),
    NODE_ENV: z.enum(['development', 'production', 'test']).optional().default('development'),
});

export type envSchemaType = z.infer<typeof envSchema>;

export function validate(config: Record<string, unknown>) {
    const env = envSchema.safeParse(config);

    if (env.error) {
        const errorString = z.prettifyError(env.error);
        throw new Error('\n\x1b[31m Invalid environment variables: ' + errorString);
    }

    // this will be the key in the configSerive.get(<name>) the key that is returned from here
    return env.data;
}
