import { useRef, useState, useCallback } from "react";
import html2canvas from "html2canvas";
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

interface ResultViewProps {
  result: DBTIResult;
  onRetry: () => void;
}

export default function ResultView({ result, onRetry }: ResultViewProps) {
  const { personality: p, scores } = result;
  const cardRef = useRef<HTMLDivElement>(null);
  const [saving, setSaving] = useState(false);

  const handleSaveImage = useCallback(async () => {
    if (!cardRef.current || saving) return;
    setSaving(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: "#0a0a0f",
        scale: 2,
        useCORS: true,
      });
      const dataUrl = canvas.toDataURL("image/png");

      if (navigator.share && /mobile|android/i.test(navigator.userAgent)) {
        const blob = await (await fetch(dataUrl)).blob();
        const file = new File([blob], `DBTI-${p.code}.png`, { type: "image/png" });
        try {
          await navigator.share({ files: [file], title: `我的 DBTI 是 ${p.code}「${p.name}」` });
        } catch {
          downloadImage(dataUrl);
        }
      } else {
        downloadImage(dataUrl);
      }
    } finally {
      setSaving(false);
    }
  }, [saving, p.code, p.name]);

  function downloadImage(dataUrl: string) {
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `DBTI-${p.code}.png`;
    a.click();
  }

  const handleShare = useCallback(async () => {
    const shareData = {
      title: "DBTI 饮酒人格测试",
      text: `我的 DBTI 是 ${p.code}「${p.name}」—— ${p.tagline}\n来测测你的饮酒人格：`,
      url: window.location.origin,
    };
    if (navigator.share) {
      try { await navigator.share(shareData); } catch { /* cancelled */ }
    } else {
      await navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`);
      alert("链接已复制到剪贴板");
    }
  }, [p.code, p.name, p.tagline]);

  return (
    <div className="result">
      <div ref={cardRef} className="result-snapshot">
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

        <p className="result-watermark">DBTI · 饮酒人格指标 · dbti.vercel.app</p>
      </div>

      <div className="result-actions">
        <button className="btn-action btn-save" onClick={handleSaveImage} disabled={saving}>
          {saving ? "生成中..." : "保存图片"}
        </button>
        <button className="btn-action btn-share" onClick={handleShare}>
          分享给酒友
        </button>
      </div>

      <button className="btn-retry" onClick={onRetry}>
        再测一次
      </button>

      <p className="result-footer">
        DBTI · 饮酒人格指标 · 仅供娱乐参考
      </p>
    </div>
  );
}
