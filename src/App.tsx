import { useState } from "react";
import "./App.css";
import InterviewHeader from "./components/Interview-header";
import SessionContext from "./components/SessionContext";
import Transcript from "./components/Transcript";
import AiInsights from "./components/AiInsights";

function App() {
  const [clickedSkill, setClickedSkill] = useState<string | null>(null);
  const [usedQuestion, setUsedQuestion] = useState<string | null>(null);
  const [startInterview, setStartInterview] = useState<boolean>(false);

  const handleSkillClick = (skill: string) => {
    // Generate new questions whenever clicked (even for the same skill repeatedly)
    setClickedSkill(`${skill}-${Date.now()}`);
  };

  const handleUseQuestion = (questionText: string) => {
    // Add suggested question to question bank
    setUsedQuestion(`${questionText}-${Date.now()}`);
  };

  return (
    <main className="h-[calc(100vh-20px)] flex flex-col overflow-hidden">
      <div className="shrink-0">
        <InterviewHeader startInterview={startInterview} setStartInterview={setStartInterview} />
      </div>
      <section className="mt-2.5 grid min-h-0 xl:grid-cols-[minmax(395px,431px)_minmax(0,1fr)_minmax(280px,400px)] lg:grid-cols-[minmax(365px,370px)_minmax(0,1fr)_minmax(265px,310px)]
grid-cols-[minmax(383px,380px)_minmax(0,1fr)_minmax(273px,300px)]
xl:gap-3 lg:gap-1 w-full min-w-0">
        <div className="h-full min-h-0 min-w-0 overflow-hidden">
          <SessionContext onSkillClick={handleSkillClick} />
        </div>
        <div className="h-full min-h-0 min-w-0 overflow-hidden">
          <Transcript
            newSkillTrigger={clickedSkill}
            customQuestionTrigger={usedQuestion}
          />
        </div>
        <div className="h-full min-h-0 min-w-0 overflow-hidden">
          <AiInsights onUseQuestion={handleUseQuestion} />
        </div>
      </section>
    </main>
  );
}

export default App;
