import clsx from 'clsx';
import { useCallback } from 'react';
import { useBoolean } from 'usehooks-ts';

import { Button } from '../components/atoms/Button';
import { PhoneInput } from '../components/atoms/PhoneInput';
import { Toggle } from '../components/atoms/Toggle';
import { EmptyLayout } from '../components/layout/EmptyLayout';
import { usePhoneForm } from '../components/modules/demo/usePhoneForm';
import { useI18n } from '../i18n/useI18n';

const Home = () => {
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

  const { value: isToggleOn, toggle: toggleIsToggleOn } = useBoolean(false);

  return (
    <div className="grid h-full w-full grid-cols-4 gap-3">
      <Button variant="info" onClick={() => alert(t('components.atoms.alert.success'))} isLoading={isToggleOn}>
        {t('components.atoms.alert.success')}
      </Button>

      <div className="flex items-center justify-start gap-2">
        <Toggle value={isToggleOn} onClick={toggleIsToggleOn} id="toggle" />
        {t('pages.demo.isButtonLoading')}
      </div>

      <div className={clsx('space-y-2', !isValid && 'bg-error bg-opacity-30')}>
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
    </div>
  );
};

Home.Layout = EmptyLayout;

export default Home;
