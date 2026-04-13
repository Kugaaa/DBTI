import { useLocation, useNavigate } from "react-router-dom";
import { dimensionNames, type DBTIResult, type DimensionKey } from "../utils/scoring";

const CORE_DIMS: DimensionKey[] = ["D", "E", "S"];
const MOD_DIMS: DimensionKey[] = ["C", "G"];

function DeathStars({ count }: { count: number }) {
  if (count < 0) return <span className="death-val">undefined</span>;
  return (
    <span className="death-stars">
      {"★".repeat(count)}
      {"☆".repeat(5 - count)}
    </span>
  );
}

function DimensionBar({ dimKey, standard, level }: { dimKey: DimensionKey; standard: number; level: string }) {
  const dim = dimensionNames[dimKey];
  return (
    <div className="dim-bar">
      <div className="dim-label">
        <span className="dim-name">{dim.name}</span>
        <span className="dim-level">{dim.levels[level as "H" | "M" | "L"]}</span>
      </div>
      <div className="dim-track">
        <div className="dim-fill" style={{ width: `${standard}%` }} />
      </div>
      <span className="dim-pct">{standard}%</span>
    </div>
  );
}

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const result = (location.state as { result: DBTIResult } | null)?.result;

  if (!result) {
    return (
      <div className="result">
        <p>没有找到测试结果</p>
        <button className="btn-start" onClick={() => navigate("/")}>
          重新开始
        </button>
      </div>
    );
  }

  const { personality: p, scores } = result;

  return (
    <div className="result">
      <div className="result-card" style={{ "--theme": p.themeColor } as React.CSSProperties}>
        <div className="result-hero">
          <h1 className="result-code">{p.code}</h1>
          <p className="result-name">{p.name}</p>
        </div>

        <div className="result-tagline-box">
          <p className="result-tagline">{p.tagline}</p>
        </div>

        <div className="result-section">
          <h3>人格画像</h3>
          {p.portrait.map((text, i) => (
            <p key={i} className="portrait-text">
              {text}
            </p>
          ))}
        </div>

        <div className="result-section quote-section">
          <h3>经典语录</h3>
          <blockquote className="result-quote">"{p.quote}"</blockquote>
        </div>

        <div className="result-section">
          <h3>社死指数</h3>
          <DeathStars count={p.socialDeathIndex} />
        </div>

        <div className="result-section">
          <h3>酒友评价</h3>
          <p className="friend-review">{p.friendReview}</p>
        </div>
      </div>

      <div className="score-panel">
        <h3>核心维度</h3>
        {CORE_DIMS.map((k) => (
          <DimensionBar key={k} dimKey={k} standard={scores[k].standard} level={scores[k].level} />
        ))}

        <h3 style={{ marginTop: 20 }}>修饰维度</h3>
        {MOD_DIMS.map((k) => (
          <DimensionBar key={k} dimKey={k} standard={scores[k].standard} level={scores[k].level} />
        ))}
      </div>

      <div className="result-actions">
        <button className="btn-start" onClick={() => navigate("/")}>
          再测一次
        </button>
      </div>

      <p className="result-footer">
        DBTI · 饮酒人格指标 · 仅供娱乐参考
      </p>
    </div>
  );
}
