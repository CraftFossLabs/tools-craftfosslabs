import { cn } from '@/lib/utils';

function Skeleton({ text, className, ...props }) {
  return (
    <div
      data-slot="skeleton"
      className={cn('bg-accent animate-pulse rounded-md', className)}
      {...props}
    >
      {text}
    </div>
  );
}

export { Skeleton };
