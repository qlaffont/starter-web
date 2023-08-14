import clsx from 'clsx';

interface TagProps {
  text: string;
  textClassName?: string;
  bgClassName?: string;
}

const Tag = ({ text, textClassName, bgClassName }: TagProps) => {
  return (
    <div className="flex items-center justify-center">
      <div className={clsx('bg-primary-10 flex h-4 items-center justify-center rounded-md px-3', bgClassName)}>
        <p className={clsx('text-2xs text-primary-100 font-semibold', textClassName)}>{text}</p>
      </div>
    </div>
  );
};

export default Tag;
