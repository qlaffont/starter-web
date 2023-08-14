import clsx from 'clsx';

type Props = {
  value: boolean;
  onClick: (isChecked: boolean) => void;
  id: string;
};

const checked = 'peer-checked:bg-success';
const uncheckedColor = 'bg-error bg-opacity-60';

export const Toggle = ({ value, id, onClick }: Props) => (
  <div className="flex w-[27px] items-center justify-center">
    <div className="relative h-[15px] w-[27px] cursor-pointer">
      <label htmlFor={id}>
        <input
          type="checkbox"
          id={id}
          className="peer sr-only"
          checked={value}
          onChange={(e) => onClick(e.target.checked)}
        />

        <span
          className={clsx(
            `${checked} absolute inset-0 !cursor-pointer rounded-full ${uncheckedColor} transition`,
            value !== true ? 'opacity-60' : '',
          )}
        />

        <span
          className={clsx(
            `absolute inset-0 m-[2px] h-[11px] w-[11px] !cursor-pointer rounded-full bg-white transition peer-checked:translate-x-[0.8rem]`,
            value !== true ? 'opacity-60' : '',
          )}
        />
      </label>
    </div>
  </div>
);
