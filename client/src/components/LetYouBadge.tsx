import { useEffect, useMemo, useState } from 'react';

export default function LetYouBadge() {
  const [hidden, setHidden] = useState(false);
  const [source, setSource] = useState<string>('demo');

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        if (localStorage.getItem('letyouBadgeClosed') === '1') setHidden(true);
        setSource(window.location.hostname || 'demo');
      }
    } catch {}
  }, []);

  const backHref = useMemo(
    () =>
      `https://letyou.kr/?utm_source=${encodeURIComponent(source)}&utm_medium=demo_bar&utm_campaign=portfolio`,
    [source]
  );

  if (hidden) return null;

  return (
    <>
      {/* ?˜ë‹¨ ê³ ì • ë°°ì? */}
      <div
        id="letyou-badge"
        style={{ position:'fixed', left:0, right:0, bottom:0, zIndex:2147483647, pointerEvents:'none' }}
      >
        <div
          style={{
            maxWidth:1200, margin:'0 auto',
            padding:'10px 16px calc(10px + env(safe-area-inset-bottom))',
            display:'flex', alignItems:'center', justifyContent:'space-between', gap:12,
            background:'rgba(0,0,0,.85)', color:'#fff', fontSize:14,
            backdropFilter:'saturate(180%) blur(6px)', borderTop:'1px solid rgba(255,255,255,.12)', borderRadius:10,
          }}
        >
          {/* ì¢Œì¸¡: ë¡œê³  + ?ˆë‚´ë¬?*/}
          <div style={{ display:'flex', alignItems:'center', gap:10, pointerEvents:'none' }}>
            <img
              src="/brand/letyou-logo-48.png"
              alt="LetYou"
              width={24}
              height={24}
              loading="lazy"
              style={{ display:'block', opacity:.95, borderRadius:4 }}
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/brand/letyou-logo-24.png'; }}
            />
            <span>???˜ì´ì§€??<strong>LetYou ?œí”Œë¦??¬íŠ¸?´ë¦¬??/strong> ?…ë‹ˆ??/span>
          </div>

          {/* ?°ì¸¡: ë°©ë¬¸ ë²„íŠ¼ + ?«ê¸° ë²„íŠ¼ */}
          <div style={{ display:'flex', gap:8 }}>
            <a
              href={backHref}
              style={{
                pointerEvents:'auto', background:'#fff', color:'#111',
                padding:'8px 14px', borderRadius:999, textDecoration:'none', fontWeight:700,
                display:'inline-flex', alignItems:'center', gap:6,
              }}
              aria-label="LetYou.kr ë°©ë¬¸"
            >
              LetYou.kr ë°©ë¬¸ <span aria-hidden>{'\u203A'}</span>
            </a>

            <button
              onClick={() => { setHidden(true); try { localStorage.setItem('letyouBadgeClosed','1'); } catch {} }}
              style={{
                pointerEvents:'auto', background:'rgba(255,255,255,.12)', color:'#ddd',
                width:36, height:36, borderRadius:999, border:'1px solid rgba(255,255,255,.25)',
                display:'inline-flex', alignItems:'center', justifyContent:'center', fontSize:18, lineHeight:1,
              }}
              aria-label="ë°°ì? ?«ê¸°"
              title="?«ê¸°"
            >
              Ã—
            </button>
          </div>
        </div>
      </div>

      {/* ì»¨í…ì¸ ê? ê°€?¤ì?ì§€ ?Šë„ë¡??˜ë‹¨ ?¬ë°± */}
      <div style={{ height:64 }} />
    </>
  );
}
