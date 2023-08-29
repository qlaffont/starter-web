import cx from 'classix';
import { useCallback } from 'react';

import { useI18n } from '../../../../i18n/useI18n';
import { PhoneInput } from '../../../atoms/PhoneInput';
import { Toggle } from '../../../atoms/Toggle';
import { usePhoneForm } from './usePhoneForm';

export const PhoneSection = () => {
  const { t } = useI18n();

  const { infoForm, isValid } = usePhoneForm();
  const {
    formState: { errors: infoErrors },
    control: infoControl,
    watch,
    setValue,
  } = infoForm;

  const doesntHaveWhatsapp = watch('doesntHaveWhatsapp');
  const phoneNumber = watch('phoneNumber');

  const onSameClick = useCallback(() => {
    setValue('whatsAppNumber', phoneNumber);
  }, [phoneNumber, setValue]);

  const onDoesntHaveWhatsAppCLick = useCallback(() => {
    const newValue = doesntHaveWhatsapp === true ? false : true;
    setValue('doesntHaveWhatsapp', newValue);

    if (newValue) {
      setValue('whatsAppNumber', undefined, { shouldDirty: true, shouldValidate: true });
    }
  }, [doesntHaveWhatsapp, setValue]);

  return (
    <div className={cx('space-y-2', !isValid && 'bg-error bg-opacity-30')}>
      <div className="flex items-center justify-start gap-2">
        <Toggle value={doesntHaveWhatsapp} onClick={onDoesntHaveWhatsAppCLick} id="toggleSecondPhone" />
        <p>{t('pages.demo.dontHaveSecondPhone')}</p>
      </div>

      <PhoneInput
        control={infoControl}
        name="phoneNumber"
        placeholder={t('pages.demo.phone1')}
        label={t('pages.demo.phone1')}
        error={infoErrors?.phoneNumber}
        required
      />

      {!doesntHaveWhatsapp && (
        <>
          <div className="flex items-center justify-between">
            <button className="text-dark-blue text-sm font-medium underline" onClick={onSameClick}>
              {t('pages.demo.fillSame')}
            </button>
          </div>
          <PhoneInput
            control={infoControl}
            name="whatsAppNumber"
            label={t('pages.demo.phone2')}
            placeholder={t('pages.demo.phone2')}
            error={infoErrors?.whatsAppNumber}
            required
          />
        </>
      )}
    </div>
  );
};
