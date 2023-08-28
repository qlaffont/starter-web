import dynamic from 'next/dynamic';
import { useSsr } from 'usehooks-ts';

import { isDevelopmentEnv } from '../../services/env-helper';

const DevTool = dynamic(() => import('@hookform/devtools').then((mod) => mod.DevTool), { ssr: false });

export const FormDevTools = ({ control }) => {
  const { isBrowser } = useSsr();
  return <>{isDevelopmentEnv() && isBrowser && <DevTool control={control} />}</>;
};
