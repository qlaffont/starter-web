import { useBoolean } from 'usehooks-ts';

import { Button } from '../components/atoms/Button';
import Checkbox from '../components/atoms/Checkbox';
import { Toggle } from '../components/atoms/Toggle';
import { EmptyLayout } from '../components/layout/EmptyLayout';
import { PasswordSection } from '../components/modules/demo/password/PasswordSection';
import { PhoneSection } from '../components/modules/demo/phoneSection/PhoneSection';
import { useI18n } from '../i18n/useI18n';

const Home = () => {
  const { t } = useI18n();

  const { value: isToggleOn, toggle: toggleIsToggleOn } = useBoolean(false);
  const { value: isChecked, toggle: toggleIsChecked } = useBoolean(false);

  return (
    <div className="grid h-full w-full grid-cols-4 gap-3">
      <Button variant="info" onClick={() => alert(t('components.atoms.alert.success'))} isLoading={isToggleOn}>
        {t('components.atoms.alert.success')}
      </Button>

      <div className="flex items-center justify-start gap-2">
        <Toggle value={isToggleOn} onClick={toggleIsToggleOn} id="toggle" />
        {t('pages.demo.isButtonLoading')}
      </div>

      <PhoneSection />

      <PasswordSection />

      <Checkbox value={isChecked} onChange={toggleIsChecked} />
    </div>
  );
};

Home.Layout = EmptyLayout;

export default Home;
