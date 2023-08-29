import cx from 'classix';
import { useBoolean } from 'usehooks-ts';

import { useI18n } from '../../../../i18n/useI18n';
import { PasswordInput } from '../../../atoms/Input';
import { usePasswordSection } from './usePassword';

export const PasswordSection = () => {
  const { t } = useI18n();

  const { form, isValid, isOldPasswordInvalid } = usePasswordSection();
  const {
    formState: { errors },
    register,
  } = form;

  const { value: isOldPasswordVisible, toggle: togleOldPasswordVisible } = useBoolean(false);
  const { value: isNewPasswordVisible, toggle: togleNewPasswordVisible } = useBoolean(false);
  const { value: isConfirmPasswordVisible, toggle: togleConfirmPasswordVisible } = useBoolean(false);

  return (
    <div className={cx('space-y-2', !isValid && 'bg-error bg-opacity-30')}>
      <PasswordInput
        name="oldPassword"
        isVisible={isOldPasswordVisible}
        onVisibilityClick={togleOldPasswordVisible}
        label={t('pages.demo.oldPassword')}
        register={register('oldPassword')}
        error={isOldPasswordInvalid ? { message: 'pages.demo.invalidOldPassword', type: '' } : errors?.oldPassword}
      />

      <PasswordInput
        name="newPassword"
        isVisible={isNewPasswordVisible}
        onVisibilityClick={togleNewPasswordVisible}
        label={t('pages.demo.newPassword')}
        register={register('newPassword')}
        error={errors?.newPassword}
      />

      <PasswordInput
        name="newPasswordConfirm"
        isVisible={isConfirmPasswordVisible}
        onVisibilityClick={togleConfirmPasswordVisible}
        label={t('pages.demo.confirmPassword')}
        register={register('newPasswordConfirm')}
        error={errors?.newPasswordConfirm}
      />
    </div>
  );
};
