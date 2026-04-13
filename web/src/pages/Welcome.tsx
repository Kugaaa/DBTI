import { useNavigate } from "react-router-dom";

const DIMENSION_TAGS = [
  { label: "酒势", desc: "你和酒的关系" },
  { label: "酒能", desc: "醉后能量方向" },
  { label: "酒魂", desc: "醉后情感深度" },
  { label: "酒量", desc: "物理耐受上限" },
  { label: "酒德", desc: "对周围人的影响" },
];

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="welcome">
      <div className="welcome-hero">
        <h1 className="welcome-title">
          <span className="title-d">D</span>
          <span className="title-b">B</span>
          <span className="title-t">T</span>
          <span className="title-i">I</span>
        </h1>
        <p className="welcome-subtitle">Drinking Behavioral Type Indicator</p>
        <p className="welcome-tagline">饮酒人格指标</p>
      </div>

      <div className="welcome-info">
        <p className="welcome-desc">
          5 大维度 · 27 种人格 · 1 个隐藏结局
        </p>

        <div className="dimension-tags">
          {DIMENSION_TAGS.map((d) => (
            <div key={d.label} className="dimension-tag">
              <span className="tag-label">{d.label}</span>
              <span className="tag-desc">{d.desc}</span>
            </div>
          ))}
        </div>

        <div className="welcome-meta">
          <span>30 题</span>
          <span className="meta-dot" />
          <span>约 5 分钟</span>
          <span className="meta-dot" />
          <span>纯前端计算</span>
        </div>
      </div>

      <button className="btn-start" onClick={() => navigate("/quiz")}>
        开始测试
      </button>

      <p className="welcome-footer">
        不上传任何数据 · 仅供娱乐参考
      </p>
    </div>
  );
}
