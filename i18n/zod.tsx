import * as z from 'zod';
import { zodRosettyMap } from 'zod-rosetty';

z.setErrorMap(zodRosettyMap);

export default z;
