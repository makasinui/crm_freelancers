import type { ErrorsType } from '@/shared/types';
import { z, type ZodSafeParseResult } from 'zod';


export const useZod = <T extends Record<string, unknown>>() => {
    type ZodResult = ZodSafeParseResult<Record<string, unknown>>;

    const handleCheckErrors = (result: ZodResult) => {
        if (!result.success) {
            const { properties } = z.treeifyError(result.error);

            if (!properties) {
                return;
            }

            const keys = Object.keys(properties);

            const errorsKeys = keys.map((key) => ([key, properties[key]?.errors]));
            return Object.fromEntries(errorsKeys) as ErrorsType<T>;
        }
    };

    return {
        handleCheckErrors,
    };
};
