import { useBoolean } from 'usehooks-ts';

import { Button } from '../components/atoms/Button';
import { Toggle } from '../components/atoms/Toggle';
import { EmptyLayout } from '../components/layout/EmptyLayout';
import { useI18n } from '../i18n/useI18n';

const Home = () => {
  const { t } = useI18n();

  const { value: isToggleOn, toggle: toggleIsToggleOn } = useBoolean(false);

  return (
    <div className="grid h-full w-full grid-cols-4 gap-3">
      <p>{t('pages.home.hello')}</p>

      <Button variant="info" onClick={() => alert(t('components.atoms.alert.success'))} isLoading={isToggleOn}>
        {t('components.atoms.alert.success')}
      </Button>

      <div className="flex items-center justify-start gap-2">
        <Toggle value={isToggleOn} onClick={toggleIsToggleOn} id="toggle" />
        {t('pages.exhibition.isButtonLoading')}
      </div>
    </div>
  );
};

Home.Layout = EmptyLayout;

export default Home;
