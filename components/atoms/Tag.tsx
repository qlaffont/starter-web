import cx from 'classix';

interface TagProps {
  text: string;
  textClassName?: string;
  bgClassName?: string;
}

const Tag = ({ text, textClassName, bgClassName }: TagProps) => {
  return (
    <div className="flex items-center justify-center">
      <div className={cx('bg-primary-10 flex h-4 items-center justify-center rounded-md px-3', bgClassName)}>
        <p className={cx('text-2xs text-primary-100 font-semibold', textClassName)}>{text}</p>
      </div>
    </div>
  );
};

export default Tag;
