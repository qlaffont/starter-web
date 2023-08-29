import * as z from 'zod';
import { ZodLocaleMap, zodRosettyMap } from 'zod-rosetty';

export type ZodMessages = ZodLocaleMap & {
  zod: {
    password: {
      lenght: string;
      mismatch: string;
    };
  };
};

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

z.setErrorMap(zodRosettyMap);

export default z;
