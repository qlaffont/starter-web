import dynamic from 'next/dynamic';
import { useIsClient } from 'usehooks-ts';

import { isDevelopmentEnv } from '../../services/env-helper';

const DevTool = dynamic(() => import('@hookform/devtools').then((mod) => mod.DevTool), { ssr: false });

export const FormDevTools = ({ control }) => {
  const isBrowser = useIsClient();
  return <>{isDevelopmentEnv() && isBrowser && <DevTool control={control} />}</>;
};
