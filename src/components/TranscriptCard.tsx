import { memo } from 'react';

export interface TranscriptCardProps {
  speaker: string;
  time: string;
  message: string;
  role?: 'interviewer' | 'candidate';
}

const TranscriptCard = ({
  speaker,
  time,
  message,
  role,
}: TranscriptCardProps) => {
  const isCandidate = role === 'candidate' || speaker.toLowerCase().includes('anurag') || speaker !== 'HR';

  return (
    <div
      className={`p-3.5 rounded-xl border transition-all duration-150 ${
        isCandidate
          ? 'bg-[#F0FDF4] border-[#DCFCE7]'
          : 'bg-[#FAF5FF] border-[#F3E8FF]'
      }`}
    >
      <div className="flex items-center justify-between mb-1">
        <span
          className={`text-[13px] font-semibold ${
            isCandidate ? 'text-[#16A34A]' : 'text-[#9333EA]'
          }`}
        >
          {speaker}
        </span>
        <span className="text-[12px] text-[#6B7280]">
          {time}
        </span>
      </div>
      <p className="text-[13px] text-[#1F2937] leading-relaxed font-normal">
        {message}
      </p>
    </div>
  );
};

export default memo(TranscriptCard);
