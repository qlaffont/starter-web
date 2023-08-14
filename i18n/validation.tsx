import { parsePhoneNumber } from 'awesome-phonenumber';
import * as yup from 'yup';

yup.setLocale({
  mixed: {
    default: 'yup.mixed.default',
    required: 'yup.mixed.required',
    oneOf: ({ values }) => `yup.mixed.oneOf - ${JSON.stringify({ values })}`,
    notOneOf: ({ values }) => `yup.mixed.notOneOf - ${JSON.stringify({ values })}`,
    defined: 'yup.mixed.defined',
  },
  string: {
    length: ({ length }) => `yup.string.length - ${JSON.stringify({ length })}`,
    min: ({ min }) => `yup.string.min - ${JSON.stringify({ min })}`,
    max: ({ max }) => `yup.string.max - ${JSON.stringify({ max })}`,
    matches: ({ regex }) => `yup.string.matches - ${JSON.stringify({ regex })}`,
    email: 'yup.string.email',
    url: 'yup.string.url',
    uuid: 'yup.string.uuid',
    trim: 'yup.string.trim',
    lowercase: 'yup.string.lowercase',
    uppercase: 'yup.string.uppercase',
  },
  number: {
    min: ({ min }) => `yup.number.min - ${JSON.stringify({ min })}`,
    max: ({ max }) => `yup.number.max - ${JSON.stringify({ max })}`,
    lessThan: ({ less }) => `yup.number.less - ${JSON.stringify({ less })}`,
    moreThan: ({ more }) => `yup.number.more - ${JSON.stringify({ more })}`,
    positive: 'yup.number.positive',
    negative: 'yup.number.negative',
    integer: 'yup.number.integer',
  },
  date: {
    min: ({ min }) => `yup.date.min - ${JSON.stringify({ min })}`,
    max: ({ max }) => `yup.date.max - ${JSON.stringify({ max })}`,
  },
  boolean: {
    isValue: ({ value }) => `yup.boolean.isValue - ${JSON.stringify({ value })}`,
  },
  object: {
    noUnknown: `yup.boolean.noUnknown`,
  },
  array: {
    min: ({ min }) => `yup.array.min - ${JSON.stringify({ min })}`,
    max: ({ max }) => `yup.array.max - ${JSON.stringify({ max })}`,
    length: ({ length }) => `yup.array.length - ${JSON.stringify({ length })}`,
  },
});

export const yupI18n = yup;

/**
 * Enables passing params to i18n dictionnary keys in the same string
 * Example: 'my.key.in.i18n-{"key": "value"}'
 */
export const translateErrorMessage = (error: { message: string } | undefined, t) => {
  if (!error?.message || !t) {
    return undefined;
  }

  const [key, valuesString] = error.message.split('-').map((i) => i.trim());

  if (!valuesString) {
    return t(key);
  }

  const values = JSON.parse(valuesString);

  for (const [k, v] of Object.entries(values)) {
    if (typeof v === 'boolean') {
      values[k] = v ? 1 : 0;
    }

    if (Array.isArray(values[k])) {
      values[k] = values[k].join(', ');
    }
  }

  return t(key, values);
};

export const useValidation = () => {
  /** @see: https://stackoverflow.com/a/66817895 */
  const onlyAlphabet = yupI18n
    .string()
    .matches(/^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s-]*)$/gi, 'yup.string.alphabet');

  const onlyNumbers = yupI18n.string().matches(/(^\d+$)|^$/gi, 'yup.string.digits');

  return {
    onlyAlphabet,
    onlyNumbers,
  };
};

export const yupValidatePhone = (schema: yup.StringSchema<string, yup.AnyObject, string>) => {
  //@ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return schema.test('checkPhoneFormat', 'yup.string.phone', (value, { parent }) => {
    return parsePhoneNumber(value).regionCode !== undefined;
  });
};

export const yupValidatePhoneStrict = (schema: yup.StringSchema<string, yup.AnyObject, string>) => {
  //@ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return schema.test('checkPhoneFormat', 'yup.string.phone', (value, { parent }) => {
    if (parsePhoneNumber(value).valid) {
      return true;
    }
    return false;
  });
};
