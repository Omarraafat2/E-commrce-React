// components/ui/skeleton.tsx
import clsx from 'clsx';

export const Skeleton = ({
  className,
}: {
  className?: string;
}) => {
  return (
    <div
      className={clsx(
        'animate-pulse bg-gray-200 rounded',
        className
      )}
    />
  );
};
