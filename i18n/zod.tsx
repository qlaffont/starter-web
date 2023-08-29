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

z.setErrorMap(zodRosettyMap);

export default z;
