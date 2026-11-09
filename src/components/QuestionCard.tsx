import { memo } from 'react';

export interface QuestionCardProps {
  number: number;
  text: string;
  tag?: string;
  onRemove?: () => void;
}

const QuestionCard = ({
  number,
  text,
  tag,
  onRemove,
}: QuestionCardProps) => {
  return (
    <div className="px-3.5 py-2.5 bg-white border border-[#E1E4EA] rounded-xl flex items-center justify-between gap-3 hover:border-[#CBD5E1] transition-all group">
      <div className="flex items-center gap-2.5 flex-1 min-w-0">
        <span className="w-6 h-6 rounded-full bg-[#DBEAFE] text-[#2563EB] text-[12px] font-semibold flex items-center justify-center shrink-0">
          {number}
        </span>

        {tag && (
          <span className="bg-[#2563EB] text-white text-[11px] font-medium px-2.5 py-0.5 rounded-full shrink-0">
            {tag}
          </span>
        )}

        <p className="text-[13px] text-[#1F2937] font-normal leading-snug">
          {text}
        </p>
      </div>

      <button
        type="button"
        onClick={onRemove}
        className="text-[#9CA3AF] hover:text-[#4B5563] p-1 rounded-md hover:bg-gray-100 transition-colors cursor-pointer shrink-0"
        title="Remove question"
        aria-label="Remove question"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

export default memo(QuestionCard);
