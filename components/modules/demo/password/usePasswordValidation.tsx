import { useCallback } from 'react';

import { yupI18n } from '../../../../i18n/validation';

export const usePasswordValidation = () => {
  const passwordValidation = yupI18n.string().min(8, 'yup.password.length').max(20, 'yup.password.length');

  const passwordConfirmValidation = useCallback(
    (schemaKeyToMatch: string, ignoreWhereSchemaKeyValueIsEmpty = false) =>
      passwordValidation.test('checkIfValid', 'yup.password.notIdentical', (value, { parent }) => {
        if (value?.length > 0 && parent[schemaKeyToMatch]?.length > 0) {
          return parent[schemaKeyToMatch] === value;
        }

        return ignoreWhereSchemaKeyValueIsEmpty;
      }),
    [passwordValidation],
  );

  return {
    passwordValidation,
    passwordConfirmValidation,
  };
};
