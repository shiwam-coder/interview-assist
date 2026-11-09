import { memo } from 'react';

export interface ChipProps {
  label?: string;
  text?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'outline' | 'default';
}

const Chips = ({
  label,
  text,
  children,
  onClick,
  className = '',
  variant = 'default',
}: ChipProps) => {
  const content = label || text || children;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-[13px] font-normal leading-tight transition-colors duration-150 select-none cursor-pointer border ${
        variant === 'outline'
          ? 'border-[#60A5FA] text-[#2563EB] bg-transparent hover:bg-[#EFF6FF]'
          : 'bg-[#EFF6FF] border-[#60A5FA]/80 text-[#2563EB] hover:bg-[#DBEAFE] hover:border-[#3B82F6]'
      } ${className}`}
    >
      {content}
    </button>
  );
};

export default memo(Chips);
