import { useCallback } from 'react';
import { Schema } from 'zod';
import z from '../../../../i18n/zod';

export const usePasswordValidation = () => {
  const passwordValidation = z.string().min(8, 'zod.password.length').max(20, 'zod.password.length');

  const passwordConfirmValidation = useCallback(
    <T extends object>(
      zodSchemaObject: Schema<T>,
      basePasswordKey: keyof z.infer<typeof zodSchemaObject>,
      confirmPasswordKey: keyof z.infer<typeof zodSchemaObject>,
    ) => {
      zodSchemaObject.superRefine((data, ctx) => {
        if (data[basePasswordKey] !== data[confirmPasswordKey]) {
          ctx.addIssue({
            code: 'custom',
            message: 'zod.password.mismatch',
          });
        }
      });

      return zodSchemaObject;
    },
    [],
  );

  return {
    passwordValidation,
    passwordConfirmValidation,
  };
};
