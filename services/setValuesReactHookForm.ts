import { SelectOption } from '../components/atoms/Select/Select';

export const setValuesReactHookForm = (
  setValue,
  data,
  options?: { selectOptionsObject?: Record<keyof typeof data, SelectOption[]>; ignoreKeys?: (keyof typeof data)[] },
) => {
  for (const [k, v] of Object.entries(data)) {
    if (options?.ignoreKeys && options?.ignoreKeys.find((item) => item === k)) {
      continue;
    }

    setValue(
      k,
      options?.selectOptionsObject && k in options.selectOptionsObject
        ? options.selectOptionsObject[k].find((item) => item.value === v)
        : v,
      {
        shouldValidate: true,
        shouldTouch: true,
        shouldDirty: true,
      },
    );
  }
};
