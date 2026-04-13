import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { questions } from "../data/questions";
import { calculateResult } from "../utils/scoring";

function shuffleOptions<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  let s = seed;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 16807 + 0) % 2147483647;
    const j = s % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Quiz() {
  const navigate = useNavigate();
  const location = useLocation();
  const fromWelcome = useRef(location.state?.from === "welcome");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [animating, setAnimating] = useState(false);

  const hasStarted = Object.keys(answers).length > 0;

  useEffect(() => {
    if (!hasStarted) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [hasStarted]);

  const confirmLeave = useCallback(
    (action: () => void) => {
      if (!hasStarted || window.confirm("答题进度将会丢失，确定离开吗？")) {
        action();
      }
    },
    [hasStarted]
  );

  if (!fromWelcome.current && current === 0 && Object.keys(answers).length === 0) {
    navigate("/", { replace: true });
    return null;
  }

  const total = questions.length;
  const question = questions[current];
  const progress = ((current) / total) * 100;

  const shuffledOptions = useMemo(
    () => shuffleOptions(question.options, current * 7 + 42),
    [current, question.options]
  );

  function handleSelect(optionId: string) {
    if (animating) return;
    setSelected(optionId);
    setAnimating(true);

    const newAnswers = { ...answers, [question.id]: optionId };
    setAnswers(newAnswers);

    setTimeout(() => {
      if (current < total - 1) {
        setCurrent(current + 1);
        setSelected(null);
        setAnimating(false);
      } else {
        const result = calculateResult(questions, newAnswers);
        navigate("/result", { state: { result } });
      }
    }, 400);
  }

  function handleBack() {
    if (current > 0 && !animating) {
      setCurrent(current - 1);
      setSelected(null);
    }
  }

  return (
    <div className="quiz">
      <div className="quiz-topbar">
        <button
          className="topbar-home"
          onClick={() => confirmLeave(() => navigate("/"))}
          aria-label="返回首页"
        >
          <span className="logo-d">D</span>
          <span className="logo-b">B</span>
          <span className="logo-t">T</span>
          <span className="logo-i">I</span>
        </button>

        <a
          className="topbar-github"
          href="https://github.com/Kugaaa/DBTI"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            if (hasStarted && !window.confirm("答题进度将会丢失，确定离开吗？")) {
              e.preventDefault();
            }
          }}
          aria-label="GitHub"
        >
          <svg width="20" height="20" viewBox="0 0 98 96" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" fill="currentColor"/>
          </svg>
        </a>
      </div>

      <div className="quiz-header">
        <button
          className="btn-back"
          onClick={handleBack}
          disabled={current === 0}
        >
          ←
        </button>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <span className="progress-text">
          {current + 1}/{total}
        </span>
      </div>

      <div className={`quiz-card ${animating ? "card-exit" : "card-enter"}`}>
        <div className="question-badge">{question.dimension}</div>
        <h2 className="question-text">{question.text}</h2>

        <div className="options">
          {shuffledOptions.map((opt) => (
            <button
              key={`${question.id}-${opt.id}`}
              className={`option-btn ${selected === opt.id ? "option-selected" : ""} ${
                answers[question.id] === opt.id && !selected ? "option-answered" : ""
              }`}
              onClick={() => handleSelect(opt.id)}
              disabled={animating}
            >
              {opt.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
