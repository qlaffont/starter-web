import { yupResolver } from '@hookform/resolvers/yup';
import { isEmpty } from 'lodash';
import { useCallback, useMemo } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import toast from 'react-hot-toast';
import { ObjectSchema } from 'yup';

import { useI18n } from '../../../../i18n/useI18n';
import { yupI18n, yupValidatePhoneStrict } from '../../../../i18n/validation';

type InfoForm = {
  doesntHaveWhatsapp: boolean;
  phoneNumber: string;
  whatsAppNumber?: string;
};

type HookReturn = {
  infoForm: UseFormReturn<InfoForm, any>;
  isValid: boolean;
  onSave: () => Promise<void>;
};

export const usePhoneForm = (): HookReturn => {
  const { t } = useI18n();

  const infoSchema: ObjectSchema<InfoForm> = yupI18n.object().shape({
    phoneNumber: yupValidatePhoneStrict(yupI18n.string()),
    doesntHaveWhatsapp: yupI18n.boolean(),
    whatsAppNumber: yupI18n.string().when('doesntHaveWhatsapp', {
      is: true,
      then: (yup) => yup.nullable(),
      otherwise: (yup) => yupValidatePhoneStrict(yup),
    }),
  });

  const infoForm = useForm<InfoForm>({
    resolver: yupResolver(infoSchema),
    mode: 'all',
  });

  const doesntHaveWhatsapp = infoForm.watch('doesntHaveWhatsapp');

  const isValid = useMemo(() => {
    const hasWhatsAppErrorButWeDontCare = !isEmpty(infoForm.formState.errors.whatsAppNumber) && doesntHaveWhatsapp;

    return infoForm.formState.isValid || hasWhatsAppErrorButWeDontCare;
  }, [doesntHaveWhatsapp, infoForm.formState.errors.whatsAppNumber, infoForm.formState.isValid]);

  const onSave = useCallback(async () => {
    try {
      if (isValid) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { phoneNumber, whatsAppNumber, doesntHaveWhatsapp } = infoForm.getValues();

        // await userUpdate({
        //   payload: {
        //     phoneNumber,
        //     whatsAppNumber: doesntHaveWhatsapp ? null : whatsAppNumber,
        //   },
        // });
        // await invalidate(useGetUserMeQuery.getKey());
      }

      toast.success(t('components.atoms.alert.changesSaved'));
    } catch (e) {
      toast.error(t('components.atoms.alert.errorTryLater'));
      return;
    }
  }, [infoForm, isValid, t]);

  // useEffect(() => {
  //   if (user?.id) {
  //     const { firstName, lastName, email, phoneNumber, whatsAppNumber } = user;

  //     setValuesReactHookForm(infoForm.setValue, {
  //       firstName,
  //       lastName,
  //       email,
  //       phoneNumber,
  //       whatsAppNumber,
  //       doesntHaveWhatsapp: isEmpty(whatsAppNumber),
  //     });
  //   }
  // }, [user?.id]);

  return {
    infoForm,
    isValid,
    onSave,
  };
};
