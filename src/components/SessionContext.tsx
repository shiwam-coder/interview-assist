import { memo, useState } from 'react';
import Chips from './Chips';

const tabs = [
  "Candidate Summary",
  "Job Description",
  "Q&A History",
];

// --- Subcomponent 1: Candidate AI Summary ---
export interface CandidateAiSummaryProps {
  name?: string;
  summary?: string;
}

export const CandidateAiSummary = memo(({
  name = "Anurag Bardhan",
  summary = "Product Designer with 3+ years of experience crafting intuitive SaaS and B2B technology products. Skilled in user research, interaction design, and turning complex workflows into simple, user-centered experiences. Collaborative and detail-oriented, balancing user needs with business goals to deliver thoughtful, scalable solutions.",
}: CandidateAiSummaryProps) => {
  return (
    <div className="xl:px-4 lg:px-2 pt-3.5 pb-4 flex flex-col gap-3.5">
      {/* Candidate Name */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 text-[13px] text-[#5C5C5C] font-normal">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="text-[#6B7280] shrink-0">
            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
          </svg>
          <span>Candidate Name</span>
        </div>
        <p className="text-[15px] font-semibold text-[#18181B] mt-0.5">
          {name}
        </p>
      </div>

      {/* AI Summary */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 text-[13px] text-[#5C5C5C] font-normal">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="text-[#6B7280] shrink-0">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
          </svg>
          <span>AI Summary</span>
        </div>
        <p className="text-[13px] text-[#4B5563] font-normal leading-[1.6] mt-1.5">
          {summary}
        </p>
      </div>
    </div>
  );
});

// --- Subcomponent 2: Skills ---
export interface SkillsProps {
  skills?: string[];
  onSkillClick?: (skill: string) => void;
  onClickToAsk?: () => void;
}

const defaultSkills = [
  "Collaboration",
  "Attention to detail",
  "Creativity",
  "Feedback acceptance",
  "Figma",
  "Adobe Photoshop",
  "Adobe Illustrator",
  "HTML",
  "CSS",
];

export const Skills = memo(({
  skills = defaultSkills,
  onSkillClick,
  onClickToAsk,
}: SkillsProps) => {
  return (
    <div className="xl:p-4 lg:p-2 border-t border-[#E1E4EA] flex flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[13px] text-[#5C5C5C] font-normal">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="text-[#6B7280] shrink-0">
            <path d="M7 2v11h3v9l7-12h-4l4-8z" />
          </svg>
          <span>Skills</span>
        </div>
        <button
          type="button"
          onClick={onClickToAsk}
          className="text-[12px] text-[#6B7280] border-b border-dotted border-[#9CA3AF] hover:text-[#18181B] transition-colors cursor-pointer select-none"
        >
          Click to ask
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mt-1">
        {skills.map((skill, idx) => (
          <Chips
            key={idx}
            label={skill}
            onClick={() => onSkillClick?.(skill)}
          />
        ))}
      </div>
    </div>
  );
});

// --- Subcomponent 3: Strength and Weakness ---
export interface StrengthAndWeaknessProps {
  strengths?: string[];
  gapAreas?: string[];
  recommendedFocusAreas?: string[];
}

const defaultStrengths = [
  "User-centered problem solving",
  "Simplifying complex B2B workflows",
  "Research-driven design decisions",
  "Cross-functional collaboration",
];

const defaultGapAreas = [
  "Measuring design impact with product metrics",
  "Designing for accessibility and inclusion",
  "Handling complex edge cases and states",
  "Influencing product strategy and priorities",
];

const defaultFocusAreas = [
  "Deepen user research and usability testing",
  "Connect design decisions to business outcomes",
  "Build accessible, scalable design systems",
  "Strengthen storytelling and stakeholder alignment",
];

export const StrengthAndWeakness = memo(({
  strengths = defaultStrengths,
  gapAreas = defaultGapAreas,
  recommendedFocusAreas = defaultFocusAreas,
}: StrengthAndWeaknessProps) => {
  return (
    <div className="xl:p-4 lg:p-2 border-t border-[#E1E4EA] flex flex-col gap-5">
      {/* Strengths */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2 text-[14px] font-semibold text-[#059669]">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-[#059669] shrink-0">
            <path d="M20.57 14.86c-.14-.41-.45-.73-.86-.87-.41-.14-.86-.09-1.22.14l-1.78 1.13c-.27-.75-.76-1.39-1.4-1.84l1.1-1.76c.24-.37.28-.82.14-1.23-.14-.41-.45-.73-.86-.87-.41-.14-.86-.09-1.22.14l-1.5 1c-.8-1.07-2.07-1.7-3.47-1.7-1.6 0-3.04.85-3.83 2.19l-3.35 4.3c-.6.77-.6 1.84 0 2.61l1.45 1.86c.6.77 1.63 1.05 2.54.7l4.98-1.92c.62-.24 1.17-.65 1.57-1.19l3.52-2.22c.36-.23.63-.58.73-1l.7-2.12c.11-.32.06-.67-.12-.96z" />
          </svg>
          <span>Strengths</span>
        </div>
        <ul className="list-disc list-outside ml-4 mt-2 space-y-1.5 text-[13px] text-[#4B5563]">
          {strengths.map((item, idx) => (
            <li key={idx} className="leading-snug">
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Gap Areas */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2 text-[14px] font-semibold text-[#DC2626]">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="text-[#DC2626] shrink-0">
            <path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z" />
          </svg>
          <span>Gap Areas</span>
        </div>
        <ul className="list-disc list-outside ml-4 mt-2 space-y-1.5 text-[13px] text-[#4B5563]">
          {gapAreas.map((item, idx) => (
            <li key={idx} className="leading-snug">
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Recommended Focus Area */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2 text-[14px] font-semibold text-[#D97706]">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#D97706] shrink-0">
            <path d="M9 18h6" />
            <path d="M10 22h4" />
            <path d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7z" />
            <line x1="12" y1="9" x2="12" y2="13" />
          </svg>
          <span>Recommended Focus Area</span>
        </div>
        <ul className="list-disc list-outside ml-4 mt-2 space-y-1.5 text-[13px] text-[#4B5563]">
          {recommendedFocusAreas.map((item, idx) => (
            <li key={idx} className="leading-snug">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});

// --- Subcomponent 4: Work History ---
export const WorkHistory = memo(() => {
  return (
    <div className="xl:p-4 lg:p-2 border-t border-[#E1E4EA] flex flex-col gap-2">
      <div className="flex items-center gap-2 text-[14px] font-semibold text-[#18181B]">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="text-[#6B7280] shrink-0">
          <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" />
        </svg>
        <span>Work History</span>
      </div>
      <div className="flex flex-col gap-0.5 text-[13px] text-[#4B5563] ml-5">
        <p className="font-medium text-[#18181B]">Senior Product Designer</p>
        <p className="text-[12px] text-[#6B7280]">VAS Technologies • 2021 – Present</p>
      </div>
    </div>
  );
});

// --- Subcomponent 5: Job Description ---
export interface JobDescriptionProps {
  brief?: string;
  responsibilities?: string[];
  requirements?: string[];
}

const defaultResponsibilities = [
  "Identify opportunities for new products",
  "Analyze how a new product ties in with market needs and consumer preferences",
  "Set design requirements based on briefs from internal teams and external partners",
  "Research materials and techniques",
  "Sketch drafts on paper or digitally (for example, using CAD)",
  "Use 3D modeling software to design products and components",
  "Produce prototypes and test functionality",
  "Improve the design of existing products",
  "Gather feedback from product users",
];

const defaultRequirements = [
  "Work experience as a Product Designer or similar role",
  "Experience in industrial design",
  "Creativity in mixing up colors, shapes and techniques",
  "Hands-on experience with computer-aided design (CAD) tools",
  "Good knowledge of 3D modeling software",
  "Experience with design programs (like Illustrator and Sketch)",
  "Time-management skills",
  "Adaptability",
  "BSc/MSc in Product Design, Manufacturing Design Engineering or relevant field",
];

export const JobDescription = memo(({
  brief = "We are looking for a Product Designer to work on various products we develop for our customers. Product Designer responsibilities include defining product specifications, creating digital or print drawings and designing fully-functional products. To be successful in this role, you should have an eye for color and shape and be able to translate requirements into practical product features. Ultimately, you will help us build products that are easy to use and visually appealing to our potential customers.",
  responsibilities = defaultResponsibilities,
  requirements = defaultRequirements,
}: JobDescriptionProps) => {
  return (
    <div className="p-4 border-t border-[#E1E4EA] flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-1.5 text-[13px] text-[#5C5C5C] font-normal">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="text-[#6B7280] shrink-0">
          <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" />
        </svg>
        <span>Job Description</span>
      </div>

      {/* Job brief */}
      <div className="flex flex-col mt-2">
        <h4 className="text-[14px] font-semibold text-[#18181B]">Job brief</h4>
        <p className="text-[13px] text-[#4B5563] font-normal leading-relaxed mt-1">
          {brief}
        </p>
      </div>

      {/* Responsibilities */}
      <div className="flex flex-col mt-3.5">
        <h4 className="text-[14px] font-semibold text-[#18181B]">Responsibilities</h4>
        <ul className="list-disc list-outside ml-4 mt-1.5 space-y-1 text-[13px] text-[#4B5563]">
          {responsibilities.map((item, idx) => (
            <li key={idx} className="leading-snug">
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Requirements and skills */}
      <div className="flex flex-col mt-3.5 pb-2">
        <h4 className="text-[14px] font-semibold text-[#18181B]">Requirements and skills</h4>
        <ul className="list-disc list-outside ml-4 mt-1.5 space-y-1 text-[13px] text-[#4B5563]">
          {requirements.map((item, idx) => (
            <li key={idx} className="leading-snug">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});

// --- Subcomponent 6: Q&A History ---
export interface QAItem {
  id: number;
  questionNumber: number;
  question: string;
  answer: string;
  aiAnalysis: string;
  score: string;
  scoreVariant?: 'amber' | 'blue' | 'green';
}

const defaultQAItems: QAItem[] = [
  {
    id: 1,
    questionNumber: 1,
    score: "4/10",
    scoreVariant: "amber",
    question: "Okay. So, Anurag, have you ever faced. challenges while using PowerPoint for reporting? How do you tackle it?",
    answer: "Yes, I have often faced challenges with resizing elements in PowerPoint. I manage these issues by carefully adjusting their size.",
    aiAnalysis: "Answer is narrow and only addresses resizing, with no broader reporting process.",
  },
  {
    id: 2,
    questionNumber: 2,
    score: "6/10",
    scoreVariant: "blue",
    question: "How do you ensure design consistency across reporting deliverables?",
    answer: "I establish design tokens and layout guides to ensure every chart and element aligns with team standards.",
    aiAnalysis: "Demonstrates practical knowledge of systematic design frameworks.",
  },
];

export const QAHistory = memo(() => {
  const [expandedIds, setExpandedIds] = useState<number[]>([1]);

  const toggleExpand = (id: number) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="p-4 border-t border-[#E1E4EA] flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center gap-1.5 text-[13px] text-[#5C5C5C] font-normal">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="text-[#6B7280] shrink-0">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
        </svg>
        <span>Q&A History</span>
      </div>

      {/* Cards List */}
      <div className="flex flex-col gap-3">
        {defaultQAItems.map((qa) => {
          const isExpanded = expandedIds.includes(qa.id);
          return (
            <div
              key={qa.id}
              className="border border-[#E5E7EB] rounded-xl p-2.5 bg-white shadow-xs transition-all flex flex-col gap-2.5"
            >
              {/* Question Card Header */}
              <div
                onClick={() => toggleExpand(qa.id)}
                className="flex items-center justify-between cursor-pointer select-none"
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-[14px] font-semibold text-[#18181B]">
                    Question {qa.questionNumber}
                  </span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`text-[#6B7280] transition-transform duration-200 ${
                      isExpanded ? '' : 'rotate-180'
                    }`}
                  >
                    <path d="m18 15-6-6-6 6" />
                  </svg>
                </div>
                <span
                  className={`text-[12px] font-semibold px-2.5 py-0.5 rounded-full border ${
                    qa.scoreVariant === 'blue'
                      ? 'bg-[#EFF6FF] border-[#BFDBFE] text-[#2563EB]'
                      : 'bg-[#FFF7ED] border-[#FED7AA] text-[#EA580C]'
                  }`}
                >
                  {qa.score}
                </span>
              </div>

              {/* Expanded Q&A and AI Analysis */}
              {isExpanded && (
                <div className="flex flex-col gap-2.5 pt-1">
                  <p className="text-[13px] text-[#374151] leading-relaxed">
                    <span className="font-semibold text-[#18181B]">Q:</span>{' '}
                    {qa.question}
                  </p>
                  <p className="text-[13px] text-[#374151] leading-relaxed">
                    <span className="font-semibold text-[#18181B]">A:</span>{' '}
                    {qa.answer}
                  </p>

                  {/* AI Analysis Box */}
                  <div className="rounded-xl bg-[#FAF5FF] p-3 border-l-4 border-l-[#9333EA] flex flex-col gap-1.5 mt-1">
                    <div className="flex items-center gap-1.5 text-[13px] font-semibold text-[#9333EA]">
                      <div className="w-4 h-4 rounded-full bg-[#9333EA] text-white flex items-center justify-center shrink-0">
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                        </svg>
                      </div>
                      <span>AI Analysis</span>
                    </div>
                    <p className="text-[13px] font-medium text-[#18181B] leading-snug">
                      {qa.aiAnalysis}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
});

// --- Main SessionContext Component ---
export interface SessionContextProps {
  onSkillClick?: (skill: string) => void;
}

const SessionContext = ({ onSkillClick }: SessionContextProps) => {
  const [activeTab, setActiveTab] = useState<string>(tabs[0]);

  return (
    <div className="w-full h-full rounded-lg border bg-[#FFFFFF] border-[#E1E4EA] overflow-hidden flex flex-col">
      {/* Session Context Header & Tabs */}
      <div className="xl:p-4 lg:p-2 pb-0 flex flex-col gap-3 shrink-0">
        <p className="text-[14px] font-medium text-[#5C5C5C] tracking-[-0.14px]">Session Context</p>

        <div className="bg-[#F3F4F6] rounded-lg  p-1 mb-3 flex justify-between items-center xl:gap-1.5 lg:gap-1 gap-0.5">
          {tabs.map((item, idx) => (
            <button
              onClick={() => setActiveTab(item)}
              className={`text-[#5C5C5C] text-[13px] font-medium border w-fit xl:px-2.5 lg:px-1 py-1.5 cursor-pointer transition-all
                ${activeTab === item ? 'bg-[#FFFFFF] border-[#E1E4EA] rounded-md shadow-xs text-[#252525]' : 'border-transparent '}`}
              key={idx}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Panels */}
      {activeTab === "Candidate Summary" && (
        <div className="flex-1 min-h-0 overflow-y-auto scrollbar-thin flex flex-col">
          <CandidateAiSummary />
          <Skills onSkillClick={onSkillClick} />
          <StrengthAndWeakness />
          <WorkHistory />
        </div>
      )}

      {activeTab === "Job Description" && (
        <div className="flex-1 min-h-0 overflow-y-auto scrollbar-thin">
          <JobDescription />
        </div>
      )}

      {activeTab === "Q&A History" && (
        <div className="flex-1 min-h-0 overflow-y-auto scrollbar-thin">
          <QAHistory />
        </div>
      )}
    </div>
  );
};

export default memo(SessionContext);
