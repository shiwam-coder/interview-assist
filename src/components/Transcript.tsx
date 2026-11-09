import { memo, useState, useEffect, useRef } from 'react';
import TranscriptCard, { TranscriptCardProps } from './TranscriptCard';
import QuestionCard from './QuestionCard';
import sent from "../../public/sent.svg"
export interface QuestionItem {
  id: string | number;
  text: string;
  tag?: string;
}

export interface TranscriptProps {
  newSkillTrigger?: string | null;
  customQuestionTrigger?: string | null;
  className?: string;
}

const initialTranscript: TranscriptCardProps[] = [
  {
    speaker: "HR",
    role: "interviewer",
    time: "11:25 PM",
    message: "Okay. So, Anurag, have you ever faced. challenges while using PowerPoint for reporting? How do you tackle it?",
  },
  {
    speaker: "Anurag Bardhan",
    role: "candidate",
    time: "11:26 PM",
    message: "Yes, I have often faced challenges with resizing elements in PowerPoint. I manage these issues by carefully adjusting their size.",
  },
];

const initialQuestions: QuestionItem[] = [
  {
    id: 1,
    text: "How do you plan your daily work?",
  },
  {
    id: 2,
    text: "When you reported daily metrics at VAS, how did you prioritize what to focus on?",
  },
  {
    id: 3,
    text: "What specific leadership challenges did you face while training your team at VAS?",
  },
  {
    id: 4,
    tag: "Figma",
    text: "How do you use auto layout in Figma?",
  },
  {
    id: 5,
    tag: "Figma",
    text: "How do you organize components in Figma?",
  },
  {
    id: 6,
    tag: "Figma",
    text: "How do you prototype user flows in Figma?",
  },
];

export const getSkillQuestions = (skill: string): QuestionItem[] => {
  const timestamp = Date.now();
  switch (skill.toLowerCase()) {
    case 'figma':
      return [
        { id: `${timestamp}-1`, tag: 'Figma', text: 'How do you use auto layout in Figma?' },
        { id: `${timestamp}-2`, tag: 'Figma', text: 'How do you organize components in Figma?' },
        { id: `${timestamp}-3`, tag: 'Figma', text: 'How do you prototype user flows in Figma?' },
      ];
    case 'collaboration':
      return [
        { id: `${timestamp}-1`, tag: 'Collaboration', text: 'How do you handle disagreements on design decisions with engineers?' },
        { id: `${timestamp}-2`, tag: 'Collaboration', text: 'Can you describe your handoff process to development teams?' },
        { id: `${timestamp}-3`, tag: 'Collaboration', text: 'How do you incorporate stakeholder feedback while preserving UX integrity?' },
      ];
    case 'attention to detail':
      return [
        { id: `${timestamp}-1`, tag: 'Attention to detail', text: 'How do you maintain visual consistency across large-scale design systems?' },
        { id: `${timestamp}-2`, tag: 'Attention to detail', text: 'Can you walk through a time you caught a critical edge case before release?' },
        { id: `${timestamp}-3`, tag: 'Attention to detail', text: 'What methods do you use to ensure accessibility compliance in your designs?' },
      ];
    case 'creativity':
      return [
        { id: `${timestamp}-1`, tag: 'Creativity', text: 'How do you approach brainstorming when starting a feature from scratch?' },
        { id: `${timestamp}-2`, tag: 'Creativity', text: 'Can you share an unconventional design solution you devised for a complex problem?' },
        { id: `${timestamp}-3`, tag: 'Creativity', text: 'How do you balance creative visual exploration with tight project constraints?' },
      ];
    case 'feedback acceptance':
      return [
        { id: `${timestamp}-1`, tag: 'Feedback acceptance', text: 'How do you navigate critical feedback from senior leadership or clients?' },
        { id: `${timestamp}-2`, tag: 'Feedback acceptance', text: 'Can you share an experience where user testing invalidated your initial hypothesis?' },
        { id: `${timestamp}-3`, tag: 'Feedback acceptance', text: 'How do you prioritize competing feedback from multiple stakeholders?' },
      ];
    case 'adobe photoshop':
      return [
        { id: `${timestamp}-1`, tag: 'Adobe Photoshop', text: 'How do you integrate Photoshop into your UI and asset creation workflow?' },
        { id: `${timestamp}-2`, tag: 'Adobe Photoshop', text: 'What techniques do you use for photo manipulation and composite imagery?' },
        { id: `${timestamp}-3`, tag: 'Adobe Photoshop', text: 'How do you optimize raster graphic assets for production web and mobile apps?' },
      ];
    case 'adobe illustrator':
      return [
        { id: `${timestamp}-1`, tag: 'Adobe Illustrator', text: 'How do you create and export scalable vector assets for responsive interfaces?' },
        { id: `${timestamp}-2`, tag: 'Adobe Illustrator', text: 'Can you explain your process for designing custom iconography in Illustrator?' },
        { id: `${timestamp}-3`, tag: 'Adobe Illustrator', text: 'How do you manage complex vector illustrations and layer structures?' },
      ];
    case 'html':
      return [
        { id: `${timestamp}-1`, tag: 'HTML', text: 'How does your understanding of semantic HTML influence your design decisions?' },
        { id: `${timestamp}-2`, tag: 'HTML', text: 'How do you structure component states and accessibility attributes in mockups?' },
        { id: `${timestamp}-3`, tag: 'HTML', text: 'How do you collaborate with front-end developers on responsive DOM structures?' },
      ];
    case 'css':
      return [
        { id: `${timestamp}-1`, tag: 'CSS', text: 'How do you account for CSS Grid and Flexbox capabilities when creating layouts?' },
        { id: `${timestamp}-2`, tag: 'CSS', text: 'How do you specify responsive breakpoints and design tokens for CSS implementation?' },
        { id: `${timestamp}-3`, tag: 'CSS', text: 'How do you design animations and transitions with CSS performance in mind?' },
      ];
    default:
      return [
        { id: `${timestamp}-1`, tag: skill, text: `How do you apply ${skill} in your daily design process?` },
        { id: `${timestamp}-2`, tag: skill, text: `Can you share a project where ${skill} played a crucial role?` },
        { id: `${timestamp}-3`, tag: skill, text: `What best practices do you follow regarding ${skill}?` },
      ];
  }
};

const Transcript = ({
  newSkillTrigger,
  customQuestionTrigger,
  className = '',
}: TranscriptProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const firstCardRef = useRef<HTMLDivElement>(null);
  const [transcripts] = useState<TranscriptCardProps[]>(initialTranscript);
  const [questions, setQuestions] = useState<QuestionItem[]>(initialQuestions);
  const [customTopic, setCustomTopic] = useState<string>('');
  const [topHeight, setTopHeight] = useState<number>(220);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Handle dynamic question generation when a skill chip is clicked
  useEffect(() => {
    if (!newSkillTrigger) return;
    const lastDash = newSkillTrigger.lastIndexOf('-');
    const baseSkill = lastDash !== -1 ? newSkillTrigger.slice(0, lastDash) : newSkillTrigger;
    const generated = getSkillQuestions(baseSkill);
    setQuestions((prev) => [...prev, ...generated]);
  }, [newSkillTrigger]);

  // Handle suggested question added from AI Copilot
  useEffect(() => {
    if (!customQuestionTrigger) return;
    const lastDash = customQuestionTrigger.lastIndexOf('-');
    const questionText = lastDash !== -1 ? customQuestionTrigger.slice(0, lastDash) : customQuestionTrigger;
    const newQ: QuestionItem = {
      id: Date.now(),
      text: questionText,
    };
    setQuestions((prev) => [...prev, newQ]);
  }, [customQuestionTrigger]);

  // Handle vertical resize dragging between Transcript and Question Bank
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const newHeight = e.clientY - rect.top;

      // Stop at the gap right below 1 full Transcript card:
      // header height + padding-top (14px) + first card height + gap below (10px)
      const headerHeight = headerRef.current?.offsetHeight ?? 45;
      const firstCardHeight = firstCardRef.current?.offsetHeight ?? 108;
      const minHeight = headerHeight + 14 + firstCardHeight + 10;
      const maxHeight = rect.height - 140;
      setTopHeight(Math.max(minHeight, Math.min(maxHeight, newHeight)));
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };

    document.body.style.cursor = 'row-resize';
    document.body.style.userSelect = 'none';
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleRemoveQuestion = (id: string | number) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const handleAddCustomQuestion = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = customTopic.trim();
    if (!trimmed) return;

    const newQ: QuestionItem = {
      id: Date.now(),
      text: trimmed,
    };
    setQuestions((prev) => [...prev, newQ]);
    setCustomTopic('');
  };

  const handleGenerateMore = () => {
    const randomTopics = [
      "How do you approach accessibility and color contrast in early design drafts?",
      "Can you describe your method for conducting qualitative user interviews?",
      "How do you balance rapid delivery deadlines with comprehensive UX research?",
    ];
    const timestamp = Date.now();
    const moreQuestions: QuestionItem[] = randomTopics.map((text, idx) => ({
      id: `${timestamp}-${idx}`,
      text,
    }));
    setQuestions((prev) => [...prev, ...moreQuestions]);
  };

  return (
    <div
      ref={containerRef}
      className={`w-full h-full rounded-lg border bg-[#FFFFFF] border-[#E1E4EA] overflow-hidden flex flex-col relative select-text ${className}`}
    >
      {/* --- Top Section: Transcript --- */}
      <div
        style={{ height: `${topHeight}px` }}
        className="min-h-0 shrink-0 flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div ref={headerRef} className="px-4 py-3 flex items-center justify-between border-b border-[#E1E4EA] shrink-0">
          <span className="text-[14px] font-medium text-[#4B5563]">
            Transcript ({transcripts.length})
          </span>
          <div className="flex items-center gap-1.5 text-[#9333EA] text-[13px] font-medium">
            {/* Audio Waveform Equalizer Icon */}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-[#9333EA] shrink-0"
            >
              <rect x="2" y="9" width="3" height="6" rx="1.5" />
              <rect x="7.5" y="5" width="3" height="14" rx="1.5" />
              <rect x="13.5" y="3" width="3" height="18" rx="1.5" />
              <rect x="19.5" y="8" width="3" height="8" rx="1.5" />
            </svg>
            <span>Listening</span>
          </div>
        </div>

        {/* Message Cards */}
        <div className="p-3.5 flex-1 min-h-0 overflow-y-auto scrollbar-thin flex flex-col gap-2.5">
          {transcripts.map((item, idx) => (
            <div key={idx} ref={idx === 0 ? firstCardRef : undefined}>
              <TranscriptCard
                speaker={item.speaker}
                role={item.role}
                time={item.time}
                message={item.message}
              />
            </div>
          ))}
        </div>
      </div>

      {/* --- Resizable Divider with Centered Pill Handle --- */}
      <div
        onMouseDown={handleMouseDown}
        className="relative w-full h-[1px] bg-[#E1E4EA] cursor-row-resize select-none shrink-0 group z-10"
      >
        {/* Invisible expanded hit area for easier grabbing */}
        <div className="absolute inset-x-0 -top-2.5 -bottom-2.5 z-10 cursor-row-resize" />

        {/* Centered pill handle matching screenshot */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-8 h-3.5 rounded-full bg-white border border-[#D1D5DB] flex flex-col items-center justify-center gap-[2px] shadow-xs group-hover:border-[#9CA3AF] transition-colors cursor-row-resize">
          <div className="w-2.5 h-[1.5px] bg-[#9CA3AF] rounded-full" />
          <div className="w-2.5 h-[1.5px] bg-[#9CA3AF] rounded-full" />
        </div>
      </div>

      {/* --- Bottom Section: Question Bank --- */}
      <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
        {/* Question Bank Header */}
        <div className="px-4 pt-3.5 pb-2 flex items-center justify-between shrink-0">
          <h3 className="text-[15px] font-semibold text-[#18181B]">
            Question Bank
          </h3>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="px-3 py-1 text-[12px] font-medium text-[#374151] bg-white border border-[#E1E4EA] rounded-md hover:bg-gray-50 transition-colors cursor-pointer select-none"
            >
              Analyze Now
            </button>
            <button
              type="button"
              onClick={handleGenerateMore}
              className="px-3 py-1 text-[12px] font-medium text-[#2563EB] bg-[#EFF6FF] border border-[#BFDBFE] rounded-md hover:bg-[#DBEAFE] transition-colors cursor-pointer select-none"
            >
              Generate more
            </button>
          </div>
        </div>

        {/* Scrollable Questions List (thin, barely noticeable scrollbar) */}
        <div className="px-3.5 py-1.5 flex-1 min-h-0 overflow-y-auto scrollbar-thin flex flex-col gap-2.5 pr-1.5">
          {questions.map((q, idx) => (
            <QuestionCard
              key={q.id}
              number={idx + 1}
              text={q.text}
              tag={q.tag}
              onRemove={() => handleRemoveQuestion(q.id)}
            />
          ))}
        </div>

        {/* Bottom AI Custom Question Input */}
        <div className="p-3.5 pt-2 shrink-0">
          <form
            onSubmit={handleAddCustomQuestion}
            className="flex items-center gap-2 p-y-2.5 p-x-4 rounded-[8px] border border-[rgba(51,136,255,0.10)] bg-white shadow-[inset_0_0_12px_-2px_rgba(109,170,255,0.90)] rounded-xl px-3 py-2 bg-white focus-within:ring-2 focus-within:ring-blue-100 focus:outline:0  focus-within:ring-0 focus-within:ring-transparent transition-all"
          >
            <input
              type="text"
              value={customTopic}
              onChange={(e) => setCustomTopic(e.target.value)}
              placeholder="Ask AI for a custom question topic..."
              className="flex-1 text-[13px] text-[#1F2937] focus:outline:0 focus-within:ring-0 focus-within:ring-blue-000  placeholder:text-[#9CA3AF] placeholder:text-[14px] placeholder:font-[500] bg-transparent outline-none border-none p-0 focus:ring-0"
            />
            <button
              type="submit"
              disabled={!customTopic.trim()}
              className="w-8 h-8 rounded-lg rounded-[8px] rounded-lg bg-[radial-gradient(66.33%_100%_at_50%_100%,#6DAAFF_0%,#38F_100%)] shadow-[0_1.651px_3.303px_0_rgba(198,198,198,0.15),inset_0_-1.651px_1.651px_0_#93C0FF] hover:bg-[#1D4ED8] disabled:opacity-50 disabled:hover:bg-[#2563EB] flex items-center justify-center text-white shrink-0 cursor-pointer transition-colors"
              title="Send custom question topic"
              aria-label="Send custom question topic"
            >
              {/* Paper Plane Send Icon */}
              <img src={sent} alt="sent icon" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default memo(Transcript);
