import { useBoolean } from 'usehooks-ts';

import { Toggle } from '../components/atoms/Toggle';
import { EmptyLayout } from '../components/layout/EmptyLayout';
import { useI18n } from '../i18n/useI18n';

const Home = () => {
  const { t } = useI18n();

  const { value: isToggleOn, toggle: toggleIsToggleOn } = useBoolean(false);

  return (
    <div className="grid h-full w-full grid-cols-4">
      <p>{t('pages.home.hello')}</p>

      <Toggle value={isToggleOn} onClick={toggleIsToggleOn} id="toggle" />
    </div>
  );
};

Home.Layout = EmptyLayout;

export default Home;
