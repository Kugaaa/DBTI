import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import { personalities } from "../data/personalities";
import type { Personality } from "../data/personalities";
import { dimensionNames, type DimensionKey, type Level } from "../utils/scoring";

const DRIVE_GROUPS = [
  { label: "猛系", drive: "H" },
  { label: "稳系", drive: "M" },
  { label: "避系", drive: "L" },
];

function PersonalityCard({ p, onClick }: { p: Personality; onClick: () => void }) {
  return (
    <button className="gallery-card" style={{ "--theme": p.themeColor } as React.CSSProperties} onClick={onClick}>
      <span className="gallery-card-code">{p.code}</span>
      <span className="gallery-card-name">{p.name}</span>
      <span className="gallery-card-dim">{p.dimensionLabel}</span>
    </button>
  );
}

function HiddenCard() {
  return (
    <div className="gallery-card gallery-card-hidden">
      <span className="gallery-card-code">???</span>
      <span className="gallery-card-name">隐藏款</span>
      <span className="gallery-card-dim">通关后解锁</span>
    </div>
  );
}

function DimensionBar({ dimKey, level }: { dimKey: DimensionKey; level: Level }) {
  const dim = dimensionNames[dimKey];
  const pct = level === "H" ? 85 : level === "M" ? 50 : 15;
  return (
    <div className="dim-bar">
      <div className="dim-label">
        <span className="dim-name">{dim.name}</span>
        <span className="dim-level">{dim.levels[level]}</span>
      </div>
      <div className="dim-track">
        <div className="dim-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function PersonalityDetail({ p, onBack }: { p: Personality; onBack: () => void }) {
  const snapshotRef = useRef<HTMLDivElement>(null);
  const [saving, setSaving] = useState(false);

  const handleSaveImage = useCallback(async () => {
    if (!snapshotRef.current || saving) return;
    setSaving(true);
    try {
      const canvas = await html2canvas(snapshotRef.current, {
        backgroundColor: "#0a0a0f",
        scale: 2,
        useCORS: true,
      });
      const dataUrl = canvas.toDataURL("image/png");

      if (navigator.share && /mobile|android/i.test(navigator.userAgent)) {
        const blob = await (await fetch(dataUrl)).blob();
        const file = new File([blob], `DBTI-${p.code}.png`, { type: "image/png" });
        try {
          await navigator.share({ files: [file], title: `DBTI 人格图鉴 · ${p.code}「${p.name}」` });
        } catch {
          downloadImage(dataUrl, p.code);
        }
      } else {
        downloadImage(dataUrl, p.code);
      }
    } finally {
      setSaving(false);
    }
  }, [saving, p.code, p.name]);

  const handleShare = useCallback(async () => {
    const shareData = {
      title: "DBTI 饮酒人格图鉴",
      text: `DBTI 人格图鉴 · ${p.code}「${p.name}」—— ${p.tagline}\n来测测你的饮酒人格：`,
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
      <div ref={snapshotRef} className="result-snapshot">
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
              <p key={i} className="portrait-text">{text}</p>
            ))}
          </div>

          <div className="result-section quote-section">
            <h3>经典语录</h3>
            <blockquote className="result-quote">"{p.quote}"</blockquote>
          </div>

          <div className="result-section">
            <h3>社死指数</h3>
            <span className="death-stars">
              {"★".repeat(Math.max(0, p.socialDeathIndex))}
              {"☆".repeat(Math.max(0, 5 - p.socialDeathIndex))}
            </span>
          </div>

          <div className="result-section">
            <h3>酒友评价</h3>
            <p className="friend-review">{p.friendReview}</p>
          </div>
        </div>

        <div className="score-panel">
          <h3>维度分布</h3>
          {(["D", "E", "S"] as const).map((k) => (
            <DimensionBar key={k} dimKey={k} level={p.dimensions[k] as Level} />
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

      <button className="btn-retry" onClick={onBack}>
        返回图鉴
      </button>
    </div>
  );
}

function downloadImage(dataUrl: string, code: string) {
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = `DBTI-${code}.png`;
  a.click();
}

export default function Gallery() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<Personality | null>(null);

  if (selected) {
    return <PersonalityDetail p={selected} onBack={() => setSelected(null)} />;
  }

  const normalPersonalities = personalities.filter((p) => !p.isHidden);

  return (
    <div className="gallery">
      <div className="gallery-header">
        <button className="btn-back" onClick={() => navigate("/")} aria-label="返回">←</button>
        <h1 className="gallery-title">人格图鉴</h1>
        <span className="gallery-count">{normalPersonalities.length + 1}</span>
      </div>

      {DRIVE_GROUPS.map((group) => {
        const items = normalPersonalities.filter((p) => p.dimensions.D === group.drive);
        return (
          <div key={group.drive} className="gallery-group">
            <h2 className="gallery-group-title">{group.label}</h2>
            <div className="gallery-grid">
              {items.map((p) => (
                <PersonalityCard key={p.code} p={p} onClick={() => setSelected(p)} />
              ))}
            </div>
          </div>
        );
      })}

      <div className="gallery-group">
        <h2 className="gallery-group-title">隐藏</h2>
        <div className="gallery-grid">
          <HiddenCard />
        </div>
      </div>
    </div>
  );
}
