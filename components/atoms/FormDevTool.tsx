import { isDevelopmentEnv } from 'env-vars-validator';
import dynamic from 'next/dynamic';
import { useSsr } from 'usehooks-ts';

const DevTool = dynamic(() => import('@hookform/devtools').then((mod) => mod.DevTool), { ssr: false });

export const FormDevTools = ({ control }) => {
  const { isBrowser } = useSsr();
  return <>{isDevelopmentEnv() && isBrowser && <DevTool control={control} />}</>;
};
