import { memo, useState } from 'react';
import Button from './Button';

interface InterviewProps {
  startInterview?: boolean;
  setStartInterview?: React.Dispatch<React.SetStateAction<boolean>> | ((fn: (prev: boolean) => boolean) => void) | Function;
}

const InterviewHeader = ({
  startInterview,
  setStartInterview,
}: InterviewProps) => {
  const [internalStarted, setInternalStarted] = useState<boolean>(false);

  const isStarted = startInterview !== undefined ? startInterview : internalStarted;

  const handleToggle = () => {
    if (setStartInterview) {
      setStartInterview((prev: boolean) => !prev);
    } else {
      setInternalStarted((prev) => !prev);
    }
  };

  return (
    <div className="bg-[#FFFFFF] text-[#252525] py-4 px-4 gap-2.5 border border-[#E1E4EA] rounded-[10px] flex justify-between items-center">
      <div>
        <p className="font-semibold text-[16px] tracking-[-0.01em]">Anurag Bardhan</p>
        <span className="text-[14px] text-[#5C5C5C]">Product Designer</span>
      </div>

      <div className="flex gap-2.5 items-center">
        <Button 
          image={isStarted ? "/pause.svg" : "/play.svg"}
          HandleClick={handleToggle}
          variant="primary"
          text={isStarted ? "Pause Interview" : "Start Interview"}
          className="text-white bg-gradient-to-b from-[#3388FF] to-[#6DAAFF] shadow-[0px_1.65px_3.3px_0px_rgba(198,198,198,0.15),inset_0px_-1.65px_1.65px_0px_rgba(147,192,255,1)] h-[36px] px-3.5 gap-2 rounded-[10px] font-semibold text-[14px]"
        />
        <Button 
          HandleClick={() => console.log("End Interview button clicked")}
          variant="secondary"
          text="End Session" 
          className="text-[#989898] border border-[#98989880] h-[36px] px-3.5 gap-2 rounded-[10px] font-semibold text-[14px]"
        />
      </div>
    </div>
  );
};

export default memo(InterviewHeader);
