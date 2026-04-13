import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
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
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [animating, setAnimating] = useState(false);

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
              key={opt.id}
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
