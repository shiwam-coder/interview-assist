import { memo, useState } from 'react';

export interface SuggestedQuestion {
  id: string | number;
  category: 'Next Topic' | 'Dig Deeper' | 'Probe Further' | string;
  text: string;
  highlighted?: boolean;
}

export interface AiInsightsProps {
  onUseQuestion?: (questionText: string) => void;
  className?: string;
}

const defaultSuggestedQuestions: SuggestedQuestion[] = [
  {
    id: 1,
    category: "Next Topic",
    text: "Which part of your work best matches this project role?",
    highlighted: true,
  },
  {
    id: 2,
    category: "Dig Deeper",
    text: "What other report issues did you handle besides resizing?",
    highlighted: false,
  },
  {
    id: 3,
    category: "Probe Further",
    text: "How did you make sure the final slides were clear for others?",
    highlighted: false,
  },
];

const AiInsights = ({ onUseQuestion, className = '' }: AiInsightsProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [questions] = useState<SuggestedQuestion[]>(defaultSuggestedQuestions);

  return (
    <div
      className={`w-full h-full rounded-lg border bg-[#FFFFFF] border-[#E1E4EA] overflow-hidden flex flex-col ${className}`}
    >
      {/* --- Top Section: AI Insights --- */}
      <div className="flex-1 min-h-0 flex flex-col">
        {/* Header */}
        <div className="px-3.5 xl:px-4 py-2.5 xl:py-3 flex items-center justify-between border-b border-[#E1E4EA] shrink-0">
          <span className="text-[14px] font-medium text-[#5C5C5C]">
            AI Insights
          </span>
        </div>

        {/* Content */}
        <div className="p-3 xl:p-4 pt-3.5 mb-2 flex-1 min-h-0 overflow-y-auto scrollbar-thin">
          <div className="rounded-xl border border-[#FDE68A] bg-[#FFFDF7] p-3.5 border-l-2 border-l-[#F59E0B] shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[14px] font-semibold text-[#D97706]">
                {/* Lightbulb Icon */}
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#D97706] shrink-0"
                >
                  <path d="M9 18h6" />
                  <path d="M10 22h4" />
                  <path d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                </svg>
                <span>AI Insight</span>
              </div>
              <button
                type="button"
                onClick={() => setCollapsed(!collapsed)}
                className="text-[#9CA3AF] hover:text-[#4B5563] cursor-pointer transition-colors p-0.5"
                aria-label="Toggle AI Insight details"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`transition-transform duration-200 ${
                    collapsed ? 'rotate-180' : ''
                  }`}
                >
                  <path d="m18 15-6-6-6 6" />
                </svg>
              </button>
            </div>

            {!collapsed && (
              <div className="flex flex-col gap-2 mt-2">
                <p className="text-[13px] font-medium text-[#18181B] leading-relaxed">
                  Mentions a real PowerPoint formatting issue and a basic fix but
                  the answer is very limited and lacks reporting workflow detail.
                </p>
                <p className="text-[12.5px] font-normal text-[#5C5C5C] leading-relaxed">
                  Listen for practical repotting habits not just one formatting
                  fix.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- Bottom Section: AI Interview Copilot --- */}
      <div className="border-t border-[#E1E4EA] flex-1 min-h-0 flex flex-col">
        {/* Header */}
        <div className="px-3.5 xl:px-4 py-2.5 xl:py-3 border-b border-[#E1E4EA] shrink-0">
          <span className="text-[14px] font-medium text-[#5C5C5C]">
            AI Interview Copilot
          </span>
        </div>

        {/* Suggested Questions Subheader */}
        <div className="px-3.5 xl:px-4 pt-3 pb-2 flex items-center justify-between gap-1.5 shrink-0">
          <h3 className="text-[14px] xl:text-[15px] font-semibold text-[#18181B] truncate">
            Suggested Questions
          </h3>
          <span className="text-[11px] xl:text-[12px] text-[#6B7280] border-b border-dotted border-[#9CA3AF] cursor-pointer select-none hover:text-[#18181B] transition-colors whitespace-nowrap shrink-0">
            Click to use
          </span>
        </div>

        {/* Suggested Questions List */}
        <div className="px-3 xl:px-4 mb-2 flex-1 min-h-0 overflow-y-auto scrollbar-thin flex flex-col gap-2.5">
          {questions.map((q) => (
            <div
              key={q.id}
              onClick={() => onUseQuestion?.(q.text)}
              className={`p-3 rounded-xl border transition-all cursor-pointer ${
                q.highlighted
                  ? 'bg-[#EFF6FF] border-[#BFDBFE] hover:border-[#60A5FA]'
                  : 'bg-[#F9FAFB] border-[#E5E7EB] hover:border-[#CBD5E1]'
              }`}
            >
              <span
                className={`text-[13px] font-semibold ${
                  q.highlighted ? 'text-[#2563EB]' : 'text-[#4B5563]'
                }`}
              >
                {q.category}
              </span>
              <p className="text-[13px] text-[#1F2937] font-normal leading-snug mt-1">
                {q.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(AiInsights);
