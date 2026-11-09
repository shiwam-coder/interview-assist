import { memo } from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary';
  className?: string;
  text?: string;
  icon?: React.ReactNode;
  HandleClick?: () => void;
  image?: string;
}

const Button = ({
  variant = 'primary',
  className = '',
  text,
  icon,
  HandleClick,
  image,
}: ButtonProps) => {
  return (
    <button 
      type="button"
      onClick={HandleClick} 
      data-variant={variant}
      className={`cursor-pointer ${className} flex items-center justify-center text-center`}
    >
      {image && <img src={image} alt="" className="w-4 h-4 object-contain" />}
      {!image && icon && <span className="inline-flex items-center shrink-0">{icon}</span>}
      {text && <span>{text}</span>}
    </button>
  );
};

export default memo(Button);
