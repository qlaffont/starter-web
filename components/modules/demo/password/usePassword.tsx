import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect, useMemo } from 'react';
import { useForm, UseFormReturn, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useBoolean, useDebounce } from 'usehooks-ts';
import { Schema, z } from 'zod';

import { useI18n } from '../../../../i18n/useI18n';
import { usePasswordValidation } from './usePasswordValidation';

type PasswordForm = {
  oldPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
};

type HookReturn = {
  form: UseFormReturn<PasswordForm, any>;
  isValid: boolean;
  isOldPasswordInvalid: boolean;
  onSave: () => Promise<void>;
};

export const usePasswordSection = (): HookReturn => {
  const { t } = useI18n();
  const { passwordConfirmValidation, passwordValidation } = usePasswordValidation();
  const { value: isOldPasswordInvalid, setValue: setIsOldPasswordInvalid } = useBoolean(false);

  const passwordSchema: Schema<PasswordForm> = passwordConfirmValidation(
    z.object({
      oldPassword: passwordValidation,
      newPassword: passwordValidation,
      newPasswordConfirm: passwordValidation,
    }),
    'newPassword',
    'newPasswordConfirm',
  );

  const form = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
    mode: 'onChange',
  });
  const password = form.watch('newPassword');
  const passwordConfirm = form.watch('newPasswordConfirm');

  const passwordDebounce = useDebounce(password, 300);
  const passwordConfirmDebounce = useDebounce(passwordConfirm, 300);

  useEffect(() => {
    if (passwordDebounce?.length > 0) {
      form.trigger('newPassword');
    }

    if (passwordConfirmDebounce?.length > 0) {
      form.trigger('newPasswordConfirm');
    }
  }, [passwordDebounce, passwordConfirmDebounce, form]);

  const oldPassword = useWatch({ control: form.control, name: 'oldPassword' });

  useEffect(() => {
    if (isOldPasswordInvalid) {
      setIsOldPasswordInvalid(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [oldPassword]);

  const isValid = useMemo(() => form.formState.isValid, [form.formState.isValid]);

  const onSave = useCallback(async () => {
    if (form.formState.isDirty && isValid) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { oldPassword, newPassword } = form.getValues();

        // await changePassword({ oldPassword, newPassword });
      } catch (error) {
        setIsOldPasswordInvalid(true);
        return;
      }
    }

    toast.success(t('components.atoms.alert.changesSaved') as string);
  }, [form, isValid, t, setIsOldPasswordInvalid]);

  return {
    form,
    onSave,
    isValid,
    isOldPasswordInvalid,
  };
};
