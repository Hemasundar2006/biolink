import { useState } from 'react'

function publishedLinks(links = []) {
  return [...links]
    .filter((l) => !l.status || l.status === 'published')
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
}

/* TEMPLATE 11 – NIGHTCLUB DARK RAVE */
export function Template11NightClub({ user, links }) {
  const published = publishedLinks(links)
  return (
    <div style={{ minHeight: '100vh', background: '#06000e', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, fontFamily: "'Bebas Neue',sans-serif", position: 'relative', overflow: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;600&display=swap');
        @keyframes t11pulse{0%,100%{opacity:.6;transform:scale(1)}50%{opacity:1;transform:scale(1.05)}}
        @keyframes t11up{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
        .t11-btn:hover{background:linear-gradient(135deg,#7c3aed,#db2777)!important;transform:skewX(-3deg)!important;box-shadow:0 0 30px rgba(124,58,237,.4)!important}
      `}</style>
      <div style={{ position: 'fixed', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle,rgba(124,58,237,.15),transparent 70%)', top: -200, left: -100, animation: 't11pulse 4s ease infinite' }} />
      <div style={{ position: 'fixed', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle,rgba(219,39,119,.12),transparent 70%)', bottom: -150, right: -100, animation: 't11pulse 6s ease infinite .5s' }} />

      <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 420, animation: 't11up .7s ease both' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
          <div style={{ background: '#ef4444', color: '#fff', padding: '3px 14px', fontSize: '0.65rem', letterSpacing: '0.3em', display: 'flex', alignItems: 'center', gap: 6, fontFamily: "'Barlow',sans-serif", fontWeight: 600 }}>
            <span style={{ width: 6, height: 6, background: '#fff', borderRadius: '50%', animation: 't11pulse 1s ease infinite' }} />
            LIVE NOW
          </div>
        </div>
        <div style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(124,58,237,.3)', borderRadius: 4, padding: '36px 28px', backdropFilter: 'blur(20px)' }}>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <div style={{ position: 'relative', width: 90, height: 90, margin: '0 auto 16px' }}>
              <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'conic-gradient(#7c3aed,#db2777,#f59e0b,#7c3aed)', animation: 't11pulse 3s ease infinite' }} />
              <div style={{ position: 'absolute', inset: 3, borderRadius: '50%', background: '#06000e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.4rem' }}>
                {user?.profilePicture ? <img src={user.profilePicture} alt="" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} /> : '🎧'}
              </div>
            </div>
            <h1 style={{ fontSize: '2.5rem', color: '#fff', letterSpacing: '0.08em', textShadow: '0 0 40px rgba(124,58,237,.8)', marginBottom: 4 }}>{(user?.creatorName || 'CREATOR').toUpperCase()}</h1>
            <p style={{ fontFamily: "'Barlow',sans-serif", fontSize: '0.78rem', color: 'rgba(200,180,255,.6)', letterSpacing: '0.1em', marginBottom: 12 }}>@{user?.username}</p>
            <p style={{ fontFamily: "'Barlow',sans-serif", fontSize: '0.88rem', color: 'rgba(255,255,255,.5)', lineHeight: 1.7 }}>{user?.bio}</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {published.map((link) => (
              <a key={link._id} href={link.url} target="_blank" rel="noreferrer" className="t11-btn" style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 20px', background: 'rgba(124,58,237,.1)', border: '1px solid rgba(124,58,237,.25)', borderRadius: 4, textDecoration: 'none', color: '#fff', fontSize: '1rem', letterSpacing: '0.08em', transition: 'all .3s ease', cursor: 'pointer' }}>
                <span style={{ fontSize: '1.2rem' }}>{link.icon || '🔗'}</span>
                <span style={{ flex: 1, fontFamily: "'Barlow',sans-serif", fontWeight: 600, fontSize: '0.9rem' }}>{link.title}</span>
                <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,.4)' }}>→</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* TEMPLATE 12 – NEWSPAPER EDITORIAL */
export function Template12Newspaper({ user, links }) {
  const published = publishedLinks(links)
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  return (
    <div style={{ minHeight: '100vh', background: '#f4f1e8', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, fontFamily: "'Libre Baskerville',serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Libre+Franklin:wght@300;400;700&display=swap');
        @keyframes t12in{from{opacity:0}to{opacity:1}}
        .t12-link:hover{background:#1a1a1a!important;color:#f4f1e8!important}
      `}</style>
      <div style={{ width: '100%', maxWidth: 480, animation: 't12in .8s ease both', background: '#f4f1e8' }}>
        <div style={{ borderTop: '4px solid #1a1a1a', borderBottom: '1px solid #1a1a1a', textAlign: 'center', padding: '6px 0', marginBottom: 2 }}>
          <div style={{ fontFamily: "'Libre Franklin',sans-serif", fontSize: '0.55rem', letterSpacing: '0.3em', color: '#666', marginBottom: 3, textTransform: 'uppercase' }}>{today}</div>
        </div>
        <div style={{ textAlign: 'center', borderBottom: '4px double #1a1a1a', padding: '12px 0', marginBottom: 16 }}>
          <h1 style={{ fontFamily: "'Libre Baskerville',serif", fontSize: '3rem', fontWeight: 700, color: '#1a1a1a', lineHeight: 1, letterSpacing: '-0.02em' }}>{user?.creatorName || 'The Creator'}</h1>
          <p style={{ fontFamily: "'Libre Franklin',sans-serif", fontSize: '0.65rem', letterSpacing: '0.2em', color: '#666', textTransform: 'uppercase', marginTop: 4 }}>@{user?.username}</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2px 2fr', gap: 16, marginBottom: 16 }}>
          <div>
            <div style={{ width: '100%', aspectRatio: '1', background: '#e8e4d8', border: '1px solid #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', marginBottom: 8 }}>
              {user?.profilePicture ? <img src={user.profilePicture} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : '📰'}
            </div>
            <p style={{ fontFamily: "'Libre Franklin',sans-serif", fontSize: '0.62rem', color: '#666', lineHeight: 1.5, fontStyle: 'italic' }}>@{user?.username}</p>
          </div>
          <div style={{ background: '#1a1a1a', width: 1 }} />
          <div>
            <div style={{ fontFamily: "'Libre Franklin',sans-serif", fontSize: '0.55rem', letterSpacing: '0.15em', color: '#666', textTransform: 'uppercase', marginBottom: 6, borderBottom: '1px solid #ccc', paddingBottom: 4 }}>Profile</div>
            <p style={{ fontSize: '0.88rem', lineHeight: 1.8, color: '#2a2a2a', fontStyle: 'italic' }}>{user?.bio}</p>
          </div>
        </div>
        <div style={{ borderTop: '2px solid #1a1a1a', paddingTop: 12 }}>
          <div style={{ fontFamily: "'Libre Franklin',sans-serif", fontSize: '0.55rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#666', marginBottom: 10 }}>LINKS & DESTINATIONS</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {published.map((link, i) => (
              <a key={link._id} href={link.url} target="_blank" rel="noreferrer" className="t12-link" style={{ display: 'flex', alignItems: 'center', gap: 12, borderBottom: i < published.length - 1 ? '1px solid #ddd' : 'none', textDecoration: 'none', color: '#1a1a1a', transition: 'all .2s', cursor: 'pointer', padding: '10px 8px' }}>
                <span style={{ fontSize: '1rem' }}>{link.icon || '›'}</span>
                <span style={{ flex: 1, fontSize: '0.88rem', fontWeight: 700 }}>{link.title}</span>
                <span style={{ fontFamily: "'Libre Franklin',sans-serif", fontSize: '0.62rem', color: '#666', fontStyle: 'italic' }}>{link.buttonText || 'Read'} →</span>
              </a>
            ))}
          </div>
        </div>
        <div style={{ borderTop: '4px double #1a1a1a', marginTop: 16, paddingTop: 6, fontFamily: "'Libre Franklin',sans-serif", fontSize: '0.55rem', textAlign: 'center', color: '#999', letterSpacing: '0.2em' }}>PUBLISHED BY NANILINKS</div>
      </div>
    </div>
  )
}

/* TEMPLATE 13 – STICKERS POP ART */
export function Template13StickersPop({ user, links }) {
  const published = publishedLinks(links)
  const colors = ['#FFD700', '#FF6B9D', '#00D4AA', '#5B7FFF', '#FF8C42', '#A78BFA']
  const rotations = [-2, 1, -1, 2, -1.5, 1.5]
  return (
    <div style={{ minHeight: '100vh', background: '#fff8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, fontFamily: "'Fredoka One',cursive" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@300;400;700;800&display=swap');
        @keyframes t13in{from{opacity:0;transform:scale(.85)}to{opacity:1;transform:scale(1)}}
        .t13-card:hover{transform:rotate(0deg) scale(1.04) !important;z-index:10}
      `}</style>
      <div style={{ width: '100%', maxWidth: 400, animation: 't13in .7s cubic-bezier(.34,1.56,.64,1) both' }}>
        <div style={{ background: '#FFD700', border: '3px solid #000', borderRadius: 20, padding: '24px 20px', textAlign: 'center', marginBottom: 12, boxShadow: '6px 6px 0 #000', transform: 'rotate(-1deg)' }}>
          <div style={{ width: 80, height: 80, border: '3px solid #000', borderRadius: '50%', background: '#fff', margin: '0 auto 14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', boxShadow: '3px 3px 0 #000' }}>
            {user?.profilePicture ? <img src={user.profilePicture} alt="" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} /> : '🎨'}
          </div>
          <h1 style={{ fontSize: '1.8rem', color: '#000', marginBottom: 4 }}>{user?.creatorName || 'Creator'}</h1>
          <p style={{ fontFamily: "'Nunito',sans-serif", fontSize: '0.8rem', color: '#333', marginBottom: 6 }}>@{user?.username}</p>
          <p style={{ fontFamily: "'Nunito',sans-serif", fontSize: '0.82rem', color: '#555', lineHeight: 1.6 }}>{user?.bio}</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {published.map((link, i) => (
            <a key={link._id} href={link.url} target="_blank" rel="noreferrer" className="t13-card" style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', background: colors[i % colors.length], border: '3px solid #000', borderRadius: 16, boxShadow: `4px 4px 0 #000`, transform: `rotate(${rotations[i % rotations.length]}deg)`, textDecoration: 'none', color: '#000', fontSize: '1rem', transition: 'transform .2s cubic-bezier(.34,1.56,.64,1)', cursor: 'pointer' }}>
              <span style={{ fontSize: '1.4rem' }}>{link.icon || '🔗'}</span>
              <span style={{ flex: 1, fontFamily: "'Nunito',sans-serif", fontWeight: 800 }}>{link.title}</span>
              <span style={{ background: '#000', color: colors[i % colors.length], padding: '3px 10px', borderRadius: 20, fontSize: '0.7rem', fontFamily: "'Nunito',sans-serif", fontWeight: 700 }}>{link.buttonText || 'GO!'}</span>
            </a>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 16, fontFamily: "'Nunito',sans-serif", fontSize: '0.72rem', color: '#999' }}>✌️ nanilinks</div>
      </div>
    </div>
  )
}

/* TEMPLATE 14 – WOOD CRAFT */
export function Template14WoodCraft({ user, links }) {
  const published = publishedLinks(links)
  return (
    <div style={{ minHeight: '100vh', background: '#2c1a0e', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, fontFamily: "'Merriweather',serif", position: 'relative', overflow: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,700;1,300&family=Oswald:wght@300;400;500&display=swap');
        @keyframes t14in{from{opacity:0}to{opacity:1}}
        .t14-btn:hover{background:#8b4513!important;color:#f5deb3!important;border-color:#cd853f!important}
      `}</style>
      <div style={{ position: 'fixed', inset: 0, backgroundImage: 'repeating-linear-gradient(90deg,transparent,transparent 80px,rgba(255,255,255,.015) 80px,rgba(255,255,255,.015) 81px)', pointerEvents: 'none' }} />
      <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 400, animation: 't14in 1s ease both' }}>
        <div style={{ background: '#3d2010', border: '2px solid #8b4513', borderRadius: 4, overflow: 'hidden', boxShadow: '0 12px 40px rgba(0,0,0,.5)' }}>
          <div style={{ background: '#5c2e0a', borderBottom: '2px solid #8b4513', padding: '28px 24px', textAlign: 'center', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 8, left: 12, right: 12, bottom: 8, border: '1px solid rgba(205,133,63,.3)', borderRadius: 2, pointerEvents: 'none' }} />
            <div style={{ width: 82, height: 82, border: '3px solid #cd853f', borderRadius: '50%', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', background: '#2c1a0e', boxShadow: 'inset 0 4px 12px rgba(0,0,0,.5), 0 0 0 6px rgba(205,133,63,.1)' }}>
              {user?.profilePicture ? <img src={user.profilePicture} alt="" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} /> : '🪵'}
            </div>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#f5deb3', letterSpacing: '0.05em', marginBottom: 4 }}>{user?.creatorName || 'Creator'}</h1>
            <p style={{ fontFamily: "'Oswald',sans-serif", fontSize: '0.65rem', color: '#cd853f', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 10 }}>{user?.username}</p>
            <p style={{ fontSize: '0.85rem', color: 'rgba(245,222,179,.65)', lineHeight: 1.7, fontStyle: 'italic' }}>{user?.bio}</p>
          </div>
          <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {published.map((link) => (
              <a key={link._id} href={link.url} target="_blank" rel="noreferrer" className="t14-btn" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', background: 'rgba(205,133,63,.08)', border: '1px solid rgba(205,133,63,.2)', borderRadius: 4, textDecoration: 'none', color: '#f5deb3', fontFamily: "'Oswald',sans-serif", fontSize: '0.85rem', letterSpacing: '0.08em', transition: 'all .3s ease', cursor: 'pointer' }}>
                <span style={{ fontSize: '1.1rem' }}>{link.icon || '🪵'}</span>
                <span style={{ flex: 1 }}>{link.title}</span>
                <span style={{ color: '#cd853f', fontSize: '0.9rem' }}>›</span>
              </a>
            ))}
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: 14, fontFamily: "'Oswald',sans-serif", fontSize: '0.6rem', color: 'rgba(205,133,63,.4)', letterSpacing: '0.2em' }}>CRAFTED BY NANILINKS</div>
      </div>
    </div>
  )
}

/* TEMPLATE 15 – TECH TERMINAL */
export function Template15TechTerminal({ user, links }) {
  const published = publishedLinks(links)
  return (
    <div style={{ minHeight: '100vh', background: '#0d1117', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, fontFamily: "'Fira Code',monospace" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;700&display=swap');
        @keyframes t15cursor{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes t15in{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        .t15-row:hover{background:rgba(0,255,65,.06)!important;color:#00ff41!important}
        .t15-row:hover .t15-prompt{color:#00ff41!important}
      `}</style>
      <div style={{ width: '100%', maxWidth: 500, animation: 't15in .6s ease both' }}>
        <div style={{ background: '#161b22', border: '1px solid #30363d', borderRadius: 10, overflow: 'hidden', boxShadow: '0 16px 48px rgba(0,0,0,.5)' }}>
          <div style={{ background: '#21262d', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid #30363d' }}>
            {['#ff5f57', '#ffbd2e', '#28c840'].map((c) => <span key={c} style={{ width: 12, height: 12, borderRadius: '50%', background: c, display: 'block' }} />)}
            <span style={{ flex: 1, textAlign: 'center', fontSize: '0.75rem', color: '#6e7681' }}>nani@biolink:~</span>
          </div>
          <div style={{ padding: '24px 20px' }}>
            <div style={{ marginBottom: 20 }}>
              <div style={{ color: '#00ff41', fontSize: '0.82rem', marginBottom: 8 }}>
                <span style={{ color: '#58a6ff' }}>~/links</span> <span style={{ color: '#ff7b72' }}>$</span> cat profile.json
              </div>
              <div style={{ background: '#0d1117', border: '1px solid #21262d', borderRadius: 6, padding: '12px 16px', fontSize: '0.75rem' }}>
                <div style={{ color: '#6e7681' }}>{'{'}</div>
                <div style={{ paddingLeft: 16 }}><span style={{ color: '#79c0ff' }}>{'"name"'}</span><span style={{ color: '#fff' }}>: </span><span style={{ color: '#a5d6ff' }}>{`"${user?.creatorName || 'Creator'}"`}</span><span style={{ color: '#6e7681' }}>,</span></div>
                <div style={{ paddingLeft: 16 }}><span style={{ color: '#79c0ff' }}>{'"handle"'}</span><span style={{ color: '#fff' }}>: </span><span style={{ color: '#a5d6ff' }}>{`"@${user?.username}"`}</span><span style={{ color: '#6e7681' }}>,</span></div>
                <div style={{ paddingLeft: 16 }}><span style={{ color: '#79c0ff' }}>{'"bio"'}</span><span style={{ color: '#fff' }}>: </span><span style={{ color: '#a5d6ff' }}>{`"${user?.bio ?? ''}"`}</span></div>
                <div style={{ color: '#6e7681' }}>{'}'}</div>
              </div>
            </div>
            <div style={{ color: '#00ff41', fontSize: '0.82rem', marginBottom: 12 }}>
              <span style={{ color: '#58a6ff' }}>~/links</span> <span style={{ color: '#ff7b72' }}>$</span> ls -la ./links/
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {published.map((link, i) => (
                <a key={link._id} href={link.url} target="_blank" rel="noreferrer" className="t15-row" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', borderRadius: 4, textDecoration: 'none', color: '#8b949e', fontSize: '0.78rem', transition: 'all .2s ease', cursor: 'pointer' }}>
                  <span className="t15-prompt" style={{ color: '#3fb950', transition: 'color .2s' }}>→</span>
                  <span style={{ color: '#79c0ff', width: 80, flexShrink: 0 }}>{link.category}/</span>
                  <span style={{ flex: 1 }}>{link.icon} {link.title}</span>
                  <span style={{ color: '#6e7681', fontSize: '0.65rem' }}>[{link.buttonText || 'open'}]</span>
                  <span style={{ opacity: 0.5 }}>{String(i + 1).padStart(2, '0')}</span>
                </a>
              ))}
            </div>
            <div style={{ marginTop: 20, color: '#00ff41', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ color: '#58a6ff' }}>~/links</span> <span style={{ color: '#ff7b72' }}>$</span>
              <span style={{ animation: 't15cursor 1s steps(1) infinite', borderRight: '2px solid #00ff41', paddingRight: 2 }}>&nbsp;</span>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: 12, fontSize: '0.65rem', color: '#6e7681' }}>powered by nanilinks</div>
      </div>
    </div>
  )
}

/* TEMPLATE 16 – MIDNIGHT BLOOM */
export function Template16MidnightBloom({ user, links }) {
  const published = publishedLinks(links)
  return (
    <div style={{ minHeight: '100vh', background: '#0a0f1e', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, fontFamily: "'Italiana',serif", position: 'relative', overflow: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Italiana&family=Raleway:wght@200;300;400;500&display=swap');
        @keyframes t16bloom{0%,100%{opacity:.4;transform:scale(1)}50%{opacity:.7;transform:scale(1.08)}}
        @keyframes t16in{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        .t16-btn:hover{border-color:rgba(255,182,193,.5)!important;background:rgba(255,182,193,.08)!important;transform:translateX(4px)!important}
      `}</style>
      <div style={{ position: 'fixed', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,100,150,.08),transparent 70%)', top: -200, right: -200, animation: 't16bloom 8s ease infinite' }} />
      <div style={{ position: 'fixed', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle,rgba(100,150,255,.06),transparent 70%)', bottom: -150, left: -150, animation: 't16bloom 10s ease infinite 2s' }} />
      <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 400, animation: 't16in .9s ease both' }}>
        <div style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,182,193,.12)', borderRadius: 24, padding: '40px 28px', backdropFilter: 'blur(16px)' }}>
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <div style={{ position: 'relative', width: 96, height: 96, margin: '0 auto 18px' }}>
              {'🌸🌺🌼🌸'.split('').map((p, i) => (
                <span key={i} style={{ position: 'absolute', fontSize: '1rem', opacity: .5, top: i < 2 ? (i === 0 ? -12 : 'auto') : '50%', left: i === 3 ? -12 : (i === 1 ? 'auto' : '50%'), right: i === 1 ? -12 : 'auto', bottom: i === 2 ? -12 : 'auto', transform: 'translate(-50%,-50%)' }}>{p}</span>
              ))}
              <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'conic-gradient(rgba(255,182,193,.3),rgba(147,197,253,.3),rgba(255,182,193,.3))', padding: 2 }}>
                <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#0a0f1e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem' }}>
                  {user?.profilePicture ? <img src={user.profilePicture} alt="" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} /> : '🌙'}
                </div>
              </div>
            </div>
            <h1 style={{ fontSize: '2rem', color: '#f8f0f5', letterSpacing: '0.05em', marginBottom: 4 }}>{user?.creatorName || 'Creator'}</h1>
            <p style={{ fontFamily: "'Raleway',sans-serif", fontSize: '0.72rem', color: 'rgba(255,182,193,.6)', letterSpacing: '0.2em', marginBottom: 12 }}>@{user?.username}</p>
            <p style={{ fontFamily: "'Raleway',sans-serif", fontSize: '0.86rem', color: 'rgba(255,255,255,.5)', lineHeight: 1.75, fontWeight: 300 }}>{user?.bio}</p>
          </div>
          <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,rgba(255,182,193,.3),transparent)', marginBottom: 24 }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {published.map((link) => (
              <a key={link._id} href={link.url} target="_blank" rel="noreferrer" className="t16-btn" style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '13px 18px', border: '1px solid rgba(255,182,193,.12)', borderRadius: 14, background: 'rgba(255,182,193,.04)', textDecoration: 'none', color: 'rgba(248,240,245,.8)', fontFamily: "'Raleway',sans-serif", fontSize: '0.86rem', fontWeight: 400, transition: 'all .3s ease', cursor: 'pointer' }}>
                <span style={{ fontSize: '1.1rem' }}>{link.icon || '🌸'}</span>
                <span style={{ flex: 1 }}>{link.title}</span>
                <span style={{ color: 'rgba(255,182,193,.5)', fontSize: '0.8rem' }}>→</span>
              </a>
            ))}
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: 16, fontFamily: "'Raleway',sans-serif", fontSize: '0.62rem', color: 'rgba(255,182,193,.25)' }}>nanilinks · bloom & grow</div>
      </div>
    </div>
  )
}

/* TEMPLATE 17 – SPORTS BOLD */
export function Template17SportsBold({ user, links }) {
  const published = publishedLinks(links)
  return (
    <div style={{ minHeight: '100vh', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, fontFamily: "'Oswald',sans-serif", position: 'relative', overflow: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&family=Barlow+Condensed:wght@300;400;600;700&display=swap');
        @keyframes t17in{from{opacity:0;transform:skewX(-3deg) scale(.97)}to{opacity:1;transform:skewX(0) scale(1)}}
        .t17-btn:hover{background:#dc2626!important;transform:skewX(-3deg)!important;border-left-color:#dc2626!important}
      `}</style>
      <div style={{ position: 'fixed', inset: 0, backgroundImage: 'repeating-linear-gradient(60deg,transparent,transparent 30px,rgba(255,255,255,.01) 30px,rgba(255,255,255,.01) 31px)', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: 6, background: 'linear-gradient(90deg,#dc2626,#ef4444,#dc2626)' }} />
      <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 440, animation: 't17in .6s ease both' }}>
        <div style={{ background: '#dc2626', padding: '20px 24px', clipPath: 'polygon(0 0,100% 0,96% 100%,0 100%)', marginBottom: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', border: '3px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.2rem', background: '#900', flexShrink: 0 }}>
              {user?.profilePicture ? <img src={user.profilePicture} alt="" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} /> : '🏆'}
            </div>
            <div>
              <h1 style={{ fontSize: '2rem', color: '#fff', letterSpacing: '0.05em', lineHeight: 1 }}>{(user?.creatorName || 'CREATOR').toUpperCase()}</h1>
              <p style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: '0.75rem', color: 'rgba(255,255,255,.7)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>@{user?.username}</p>
            </div>
          </div>
        </div>
        <div style={{ background: '#1a1a1a', padding: '16px 24px 24px' }}>
          <p style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: '0.9rem', color: '#999', lineHeight: 1.6, marginBottom: 20 }}>{user?.bio}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {published.map((link) => (
              <a key={link._id} href={link.url} target="_blank" rel="noreferrer" className="t17-btn" style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', background: '#222', borderLeft: '4px solid #444', textDecoration: 'none', color: '#fff', fontSize: '0.95rem', fontWeight: 600, letterSpacing: '0.06em', transition: 'all .25s ease', cursor: 'pointer' }}>
                <span style={{ fontSize: '1.2rem' }}>{link.icon || '⚡'}</span>
                <span style={{ flex: 1 }}>{link.title.toUpperCase()}</span>
                <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: '0.7rem', color: '#666' }}>{link.buttonText?.toUpperCase() || 'GO'} ›</span>
              </a>
            ))}
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: 12, fontFamily: "'Barlow Condensed',sans-serif", fontSize: '0.65rem', color: '#444', letterSpacing: '0.2em' }}>POWERED BY NANILINKS</div>
      </div>
    </div>
  )
}

/* TEMPLATE 18 – STUDIO PORTFOLIO */
export function Template18StudioPortfolio({ user, links }) {
  const published = publishedLinks(links)
  const [hovered, setHovered] = useState(null)
  return (
    <div style={{ minHeight: '100vh', background: '#f7f5f2', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, fontFamily: "'Manrope',sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Manrope:wght@200;300;400;600&display=swap');
      `}</style>
      <div style={{ width: '100%', maxWidth: 460 }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 20, marginBottom: 40 }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#e8e4de', border: '2px solid #1a1a1a', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.2rem' }}>
            {user?.profilePicture ? <img src={user?.profilePicture} alt="" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} /> : '🎯'}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '0.6rem', letterSpacing: '0.3em', color: '#999', textTransform: 'uppercase', marginBottom: 4 }}>Creator</div>
            <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: '1.8rem', fontWeight: 800, color: '#1a1a1a', lineHeight: 1.1, marginBottom: 4 }}>{user?.creatorName || 'Creator'}</h1>
            <p style={{ fontSize: '0.78rem', color: '#999', fontWeight: 300 }}>@{user?.username}</p>
          </div>
        </div>
        <p style={{ fontSize: '0.9rem', color: '#555', lineHeight: 1.75, fontWeight: 300, marginBottom: 40, paddingBottom: 40, borderBottom: '1px solid #e0ddd8' }}>{user?.bio}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {published.map((link, i) => (
            <a key={link._id} href={link.url} target="_blank" rel="noreferrer" onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '18px 0', borderBottom: '1px solid #e0ddd8', textDecoration: 'none', color: hovered === i ? '#1a1a1a' : '#555', transition: 'all .25s ease', cursor: 'pointer' }}>
              <span style={{ width: 40, height: 40, borderRadius: '50%', background: hovered === i ? '#1a1a1a' : '#e8e4de', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0, transition: 'all .25s' }}>{link.icon || '→'}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: '0.88rem', marginBottom: 2 }}>{link.title}</div>
                <div style={{ fontSize: '0.72rem', color: '#aaa', fontWeight: 300 }}>{link.description || link.category}</div>
              </div>
              <span style={{ fontFamily: "'Syne',sans-serif", fontSize: '0.65rem', color: hovered === i ? '#1a1a1a' : '#ccc', letterSpacing: '0.1em', transition: 'all .25s' }}>{link.buttonText || 'View'} →</span>
            </a>
          ))}
        </div>
        <div style={{ marginTop: 40, fontSize: '0.62rem', color: '#ccc', fontWeight: 300, letterSpacing: '0.15em' }}>nanilinks / 2025</div>
      </div>
    </div>
  )
}

/* TEMPLATE 19 – TROPICAL VIBRANT */
export function Template19TropicalVibrant({ user, links }) {
  const published = publishedLinks(links)
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg,#0d9488 0%,#0891b2 40%,#7c3aed 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, fontFamily: "'Poppins',sans-serif", position: 'relative', overflow: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800&display=swap');
        @keyframes t19wave{0%,100%{transform:translateX(0)}50%{transform:translateX(-20px)}}
        @keyframes t19up{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        .t19-btn:hover{transform:translateY(-3px) scale(1.02)!important;box-shadow:0 12px 32px rgba(0,0,0,.25)!important}
      `}</style>
      <div style={{ position: 'fixed', bottom: -40, left: -20, right: -20, height: 120, background: 'rgba(255,255,255,.06)', borderRadius: '60% 60% 0 0', animation: 't19wave 8s ease-in-out infinite' }} />
      <div style={{ position: 'fixed', bottom: -60, left: -20, right: -20, height: 100, background: 'rgba(255,255,255,.04)', borderRadius: '60% 60% 0 0', animation: 't19wave 12s ease-in-out infinite reverse' }} />
      <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 400, animation: 't19up .8s ease both' }}>
        <div style={{ background: 'rgba(255,255,255,.12)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,.25)', borderRadius: 28, padding: '40px 28px', boxShadow: '0 16px 48px rgba(0,0,0,.2)' }}>
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <div style={{ width: 92, height: 92, border: '4px solid rgba(255,255,255,.7)', borderRadius: '50%', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.8rem', background: 'rgba(255,255,255,.15)', boxShadow: '0 8px 32px rgba(0,0,0,.2)' }}>
              {user?.profilePicture ? <img src={user.profilePicture} alt="" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} /> : '🌴'}
            </div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', textShadow: '0 2px 10px rgba(0,0,0,.2)', marginBottom: 4 }}>{user?.creatorName || 'Creator'}</h1>
            <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,.7)', marginBottom: 10 }}>@{user?.username}</p>
            <p style={{ fontSize: '0.86rem', color: 'rgba(255,255,255,.8)', lineHeight: 1.7, fontWeight: 300 }}>{user?.bio}</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {published.map((link, i) => (
              <a key={link._id} href={link.url} target="_blank" rel="noreferrer" className="t19-btn" style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 20px', background: i % 2 === 0 ? 'rgba(255,255,255,.2)' : 'rgba(255,255,255,.12)', border: '1px solid rgba(255,255,255,.3)', borderRadius: 18, textDecoration: 'none', color: '#fff', fontSize: '0.9rem', fontWeight: 600, transition: 'all .3s ease', cursor: 'pointer', backdropFilter: 'blur(8px)' }}>
                <span style={{ fontSize: '1.3rem' }}>{link.icon || '🌊'}</span>
                <span style={{ flex: 1 }}>{link.title}</span>
                <span style={{ background: 'rgba(255,255,255,.25)', padding: '4px 10px', borderRadius: 20, fontSize: '0.7rem' }}>{link.buttonText || 'Go'}</span>
              </a>
            ))}
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: 16, fontSize: '0.68rem', color: 'rgba(255,255,255,.4)' }}>nanilinks · ride the wave 🌊</div>
      </div>
    </div>
  )
}

/* TEMPLATE 20 – MONOCHROME MAGAZINE */
export function Template20Monochrome({ user, links }) {
  const published = publishedLinks(links)
  const [hovered, setHovered] = useState(null)
  return (
    <div style={{ minHeight: '100vh', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, fontFamily: "'Big Shoulders Display',cursive" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@300;400;600;700;900&family=Source+Serif+4:ital,opsz,wght@0,8..60,300;1,8..60,300&display=swap');
        @keyframes t20in{from{opacity:0}to{opacity:1}}
      `}</style>
      <div style={{ width: '100%', maxWidth: 440, animation: 't20in .8s ease both' }}>
        <div style={{ background: '#000', padding: '36px 28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{ width: 76, height: 76, borderRadius: '50%', border: '3px solid #fff', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.2rem', background: '#222' }}>
              {user?.profilePicture ? <img src={user.profilePicture} alt="" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} /> : '★'}
            </div>
            <div>
              <h1 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#fff', lineHeight: 1, letterSpacing: '0.03em' }}>{(user?.creatorName || 'CREATOR').toUpperCase()}</h1>
              <p style={{ fontFamily: "'Source Serif 4',serif", fontSize: '0.78rem', color: 'rgba(255,255,255,.5)', fontStyle: 'italic', marginTop: 4 }}>@{user?.username}</p>
            </div>
          </div>
        </div>
        <div style={{ background: '#f5f5f5', padding: '16px 28px', borderBottom: '2px solid #000' }}>
          <p style={{ fontFamily: "'Source Serif 4',serif", fontSize: '0.9rem', color: '#333', lineHeight: 1.7, fontWeight: 300, fontStyle: 'italic' }}>{user?.bio}</p>
        </div>
        <div>
          {published.map((link, i) => (
            <a key={link._id} href={link.url} target="_blank" rel="noreferrer" onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)} style={{ display: 'flex', alignItems: 'center', gap: 0, textDecoration: 'none', borderBottom: '1px solid #e5e5e5', transition: 'all .2s ease', cursor: 'pointer', background: hovered === i ? '#000' : '#fff', color: hovered === i ? '#fff' : '#000' }}>
              <div style={{ width: 56, minHeight: 56, background: hovered === i ? '#fff' : '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0, transition: 'background .2s' }}>
                <span style={{ filter: hovered === i ? 'invert(1)' : 'none' }}>{link.icon || '→'}</span>
              </div>
              <div style={{ flex: 1, padding: '14px 16px' }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, letterSpacing: '0.05em' }}>{link.title.toUpperCase()}</div>
                <div style={{ fontFamily: "'Source Serif 4',serif", fontSize: '0.7rem', opacity: .5, fontStyle: 'italic' }}>{link.description || link.category}</div>
              </div>
              <div style={{ padding: '0 20px', fontSize: '0.7rem', letterSpacing: '0.2em', opacity: .4, fontFamily: "'Source Serif 4',serif", flexShrink: 0 }}>
                {link.buttonText || 'VIEW'} →
              </div>
            </a>
          ))}
        </div>
        <div style={{ padding: '12px 28px', background: '#000', textAlign: 'center' }}>
          <span style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,.3)', letterSpacing: '0.3em', fontFamily: "'Source Serif 4',serif" }}>NANILINKS</span>
        </div>
      </div>
    </div>
  )
}

/* TEMPLATE 21 – RAINBOW GRADIENT FLOW */
export function Template21RainbowFlow({ user, links }) {
  const published = publishedLinks(links)
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, fontFamily: "'Plus Jakarta Sans',sans-serif", position: 'relative', overflow: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;300;400;600;700;800&display=swap');
        @keyframes t21flow{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        @keyframes t21up{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        .t21-btn:hover{transform:translateY(-2px)!important;box-shadow:0 8px 28px rgba(0,0,0,.12)!important;background:#fff!important}
      `}</style>
      <div style={{ position: 'fixed', inset: 0, background: 'linear-gradient(135deg,#ff6b6b,#ffd93d,#6bcb77,#4d96ff,#ff6bcd,#ff6b6b)', backgroundSize: '400% 400%', animation: 't21flow 10s ease infinite' }} />
      <div style={{ position: 'fixed', inset: 0, backdropFilter: 'blur(0px)', background: 'rgba(255,255,255,.08)' }} />
      <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 400, animation: 't21up .8s ease both' }}>
        <div style={{ background: 'rgba(255,255,255,.95)', backdropFilter: 'blur(20px)', borderRadius: 28, padding: '36px 28px', marginBottom: 16, boxShadow: '0 16px 48px rgba(0,0,0,.15)', textAlign: 'center' }}>
          <div style={{ width: 88, height: 88, borderRadius: '50%', background: 'linear-gradient(135deg,#ff6b6b,#ffd93d,#6bcb77,#4d96ff)', padding: 3, margin: '0 auto 16px' }}>
            <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem' }}>
              {user?.profilePicture ? <img src={user.profilePicture} alt="" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} /> : '🌈'}
            </div>
          </div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#1a1a2e', marginBottom: 4 }}>{user?.creatorName || 'Creator'}</h1>
          <p style={{ fontSize: '0.78rem', color: '#888', marginBottom: 8 }}>@{user?.username}</p>
          <p style={{ fontSize: '0.86rem', color: '#555', lineHeight: 1.7, fontWeight: 300 }}>{user?.bio}</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {published.map((link, i) => {
            const gradients = ['#ff6b6b,#ffd93d', '#6bcb77,#4d96ff', '#ff6bcd,#a855f7', '#f59e0b,#ef4444', '#06b6d4,#3b82f6', '#10b981,#6366f1']
            return (
              <a key={link._id} href={link.url} target="_blank" rel="noreferrer" className="t21-btn" style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', background: 'rgba(255,255,255,.85)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,.9)', borderRadius: 20, textDecoration: 'none', color: '#1a1a2e', fontSize: '0.9rem', fontWeight: 600, transition: 'all .3s ease', cursor: 'pointer', boxShadow: '0 4px 16px rgba(0,0,0,.08)' }}>
                <div style={{ width: 38, height: 38, borderRadius: 12, background: `linear-gradient(135deg,${gradients[i % gradients.length]})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>{link.icon || '🔗'}</div>
                <span style={{ flex: 1 }}>{link.title}</span>
                <span style={{ fontSize: '0.7rem', color: '#aaa' }}>→</span>
              </a>
            )
          })}
        </div>
        <div style={{ textAlign: 'center', marginTop: 16, fontSize: '0.68rem', color: 'rgba(255,255,255,.6)', fontWeight: 300 }}>nanilinks · made with color 🌈</div>
      </div>
    </div>
  )
}

/* TEMPLATE 22 – GEOMETRIC ISLAMIC */
export function Template22GeometricIslamic({ user, links }) {
  const published = publishedLinks(links)
  return (
    <div style={{ minHeight: '100vh', background: '#0a2a2a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, fontFamily: "'Cairo',sans-serif", position: 'relative', overflow: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;600;700;900&display=swap');
        @keyframes t22spin{to{transform:rotate(360deg)}}
        @keyframes t22in{from{opacity:0}to{opacity:1}}
        .t22-btn:hover{background:rgba(0,178,137,.12)!important;border-color:rgba(0,178,137,.5)!important;color:#00b289!important}
      `}</style>
      <div style={{ position: 'fixed', inset: 0, opacity: .08 }}>
        <svg width="100%" height="100%"><defs><pattern id="geo" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse"><polygon points="30,2 58,17 58,43 30,58 2,43 2,17" fill="none" stroke="#d4af37" strokeWidth="1"/><polygon points="30,14 46,23 46,37 30,46 14,37 14,23" fill="none" stroke="#00b289" strokeWidth=".5"/></pattern></defs><rect width="100%" height="100%" fill="url(#geo)"/></svg>
      </div>
      <div style={{ position: 'fixed', top: '10%', right: '5%', opacity: .1, animation: 't22spin 30s linear infinite' }}>
        <svg width="120" height="120" viewBox="0 0 120 120"><polygon points="60,4 74,48 120,48 84,76 98,120 60,94 22,120 36,76 0,48 46,48" fill="#d4af37"/></svg>
      </div>
      <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 420, animation: 't22in .9s ease both' }}>
        <div style={{ textAlign: 'center', marginBottom: 4 }}>
          <svg width="200" height="12" viewBox="0 0 200 12" style={{ display: 'block', margin: '0 auto' }}>
            <line x1="0" y1="6" x2="80" y2="6" stroke="#d4af37" strokeWidth="1" opacity=".5"/>
            <rect x="90" y="2" width="8" height="8" fill="#d4af37" transform="rotate(45 94 6)"/>
            <rect x="96" y="4" width="4" height="4" fill="none" stroke="#d4af37" strokeWidth=".5" transform="rotate(45 98 6)" opacity=".5"/>
            <line x1="110" y1="6" x2="200" y2="6" stroke="#d4af37" strokeWidth="1" opacity=".5"/>
          </svg>
        </div>
        <div style={{ background: 'rgba(10,42,42,.85)', border: '1px solid rgba(212,175,55,.2)', borderRadius: 4, padding: '36px 28px', backdropFilter: 'blur(16px)' }}>
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <div style={{ position: 'relative', width: 92, height: 92, margin: '0 auto 18px' }}>
              <svg width="92" height="92" viewBox="0 0 92 92" style={{ position: 'absolute', inset: 0 }}>
                <polygon points="46,2 74,10 90,36 90,56 74,82 46,90 18,82 2,56 2,36 18,10" fill="none" stroke="#d4af37" strokeWidth="1.5" opacity=".5"/>
                <polygon points="46,10 70,17 84,38 84,54 70,75 46,82 22,75 8,54 8,38 22,17" fill="none" stroke="#00b289" strokeWidth=".5" opacity=".3"/>
              </svg>
              <div style={{ position: 'absolute', inset: 14, borderRadius: '50%', background: '#0a2a2a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.2rem', border: '2px solid rgba(212,175,55,.3)' }}>
                {user?.profilePicture ? <img src={user.profilePicture} alt="" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} /> : '🌙'}
              </div>
            </div>
            <div style={{ fontSize: '0.6rem', letterSpacing: '0.4em', color: '#d4af37', opacity: .6, marginBottom: 8 }}>بسم الله</div>
            <h1 style={{ fontSize: '1.7rem', fontWeight: 700, color: '#e8d5a0', marginBottom: 4 }}>{user?.creatorName || 'Creator'}</h1>
            <p style={{ fontSize: '0.72rem', color: '#00b289', letterSpacing: '0.15em', marginBottom: 12 }}>@{user?.username}</p>
            <p style={{ fontSize: '0.86rem', color: 'rgba(232,213,160,.55)', lineHeight: 1.75 }}>{user?.bio}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
            <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,transparent,rgba(212,175,55,.4))' }} />
            <span style={{ color: '#d4af37', fontSize: '0.6rem' }}>✦</span>
            <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,rgba(212,175,55,.4),transparent)' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {published.map((link) => (
              <a key={link._id} href={link.url} target="_blank" rel="noreferrer" className="t22-btn" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 18px', border: '1px solid rgba(212,175,55,.15)', borderRadius: 4, background: 'rgba(212,175,55,.04)', textDecoration: 'none', color: '#e8d5a0', fontSize: '0.9rem', fontWeight: 600, transition: 'all .3s ease', cursor: 'pointer' }}>
                <span style={{ color: '#d4af37', fontSize: '0.7rem' }}>◈</span>
                <span style={{ flex: 1 }}>{link.title}</span>
                <span style={{ fontSize: '0.7rem', color: '#d4af37', opacity: .5 }}>›</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* TEMPLATE 23 – Y2K CHROME */
export function Template23Y2KChrome({ user, links }) {
  const published = publishedLinks(links)
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#1a1a2e,#16213e,#0f3460)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, fontFamily: "'Righteous',cursive", position: 'relative', overflow: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Righteous&family=Exo+2:wght@300;400;600&display=swap');
        @keyframes t23in{from{opacity:0;transform:scale(.95)}to{opacity:1;transform:scale(1)}}
        .t23-btn:hover{background:linear-gradient(135deg,rgba(192,192,255,.15),rgba(100,200,255,.1))!important;border-color:rgba(192,192,255,.5)!important}
      `}</style>
      {[{ s: 300, t: '-10%', r: '-5%', o: .06 }, { s: 200, b: '-5%', l: '5%', o: .04 }].map((c, i) => (
        <div key={i} style={{ position: 'fixed', width: c.s, height: c.s, borderRadius: '50%', border: '1px solid rgba(192,192,255,.2)', top: c.t, right: c.r, bottom: c.b, left: c.l, opacity: c.o }} />
      ))}
      <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 400, animation: 't23in .7s ease both' }}>
        <div style={{ background: 'linear-gradient(135deg,rgba(192,192,255,.15),rgba(100,200,255,.08))', border: '1px solid rgba(192,192,255,.25)', borderRadius: 16, padding: '32px 24px', marginBottom: 12, backdropFilter: 'blur(20px)', textAlign: 'center' }}>
          <div style={{ width: 88, height: 88, margin: '0 auto 16px', borderRadius: '50%', background: 'linear-gradient(135deg,#c0c0c0,#e8e8ff,#a0a0c0,#e0e0ff)', padding: 3 }}>
            <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#16213e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', boxShadow: 'inset 0 4px 20px rgba(0,0,0,.5)' }}>
              {user?.profilePicture ? <img src={user.profilePicture} alt="" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} /> : '💿'}
            </div>
          </div>
          <h1 style={{ fontSize: '1.8rem', background: 'linear-gradient(135deg,#c0c0c0,#ffffff,#a0c8ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 4 }}>{user?.creatorName || 'Creator'}</h1>
          <p style={{ fontFamily: "'Exo 2',sans-serif", fontSize: '0.72rem', color: 'rgba(192,192,255,.6)', letterSpacing: '0.15em', marginBottom: 10 }}>@{user?.username}</p>
          <p style={{ fontFamily: "'Exo 2',sans-serif", fontSize: '0.84rem', color: 'rgba(192,220,255,.6)', lineHeight: 1.7, fontWeight: 300 }}>{user?.bio}</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {published.map((link) => (
            <a key={link._id} href={link.url} target="_blank" rel="noreferrer" className="t23-btn" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 18px', background: 'rgba(192,192,255,.05)', border: '1px solid rgba(192,192,255,.15)', borderRadius: 10, textDecoration: 'none', color: 'rgba(220,220,255,.9)', fontFamily: "'Exo 2',sans-serif", fontSize: '0.88rem', fontWeight: 600, transition: 'all .3s ease', cursor: 'pointer', backdropFilter: 'blur(8px)' }}>
              <span style={{ fontSize: '1.1rem' }}>{link.icon || '💽'}</span>
              <span style={{ flex: 1 }}>{link.title}</span>
              <span style={{ fontSize: '0.65rem', color: 'rgba(192,192,255,.4)' }}>{link.buttonText || 'ENTER'} ›</span>
            </a>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 16, fontSize: '0.62rem', color: 'rgba(192,192,255,.3)', letterSpacing: '0.2em' }}>NANILINKS :: Y2K25</div>
      </div>
    </div>
  )
}

/* TEMPLATE 24 – SUNSET DUOTONE */
export function Template24SunsetDuotone({ user, links }) {
  const published = publishedLinks(links)
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg,#ff6b35 0%,#f7c59f 35%,#9b59b6 65%,#2c3e50 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, fontFamily: "'Bitter',serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bitter:ital,wght@0,300;0,400;0,700;1,300&family=Work+Sans:wght@300;400;600&display=swap');
        @keyframes t24in{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        .t24-btn:hover{transform:translateX(6px)!important;background:rgba(255,255,255,.25)!important}
      `}</style>
      <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 400, animation: 't24in .8s ease both' }}>
        <div style={{ background: 'rgba(255,255,255,.15)', backdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,.3)', borderRadius: 24, padding: '40px 28px', boxShadow: '0 20px 60px rgba(0,0,0,.2)' }}>
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <div style={{ width: 90, height: 90, borderRadius: '50%', border: '3px solid rgba(255,255,255,.7)', margin: '0 auto 18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', background: 'rgba(255,107,53,.3)', boxShadow: '0 8px 32px rgba(0,0,0,.2)' }}>
              {user?.profilePicture ? <img src={user.profilePicture} alt="" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} /> : '🌅'}
            </div>
            <h1 style={{ fontSize: '1.7rem', fontWeight: 700, color: '#fff', textShadow: '0 2px 12px rgba(0,0,0,.3)', marginBottom: 4 }}>{user?.creatorName || 'Creator'}</h1>
            <p style={{ fontFamily: "'Work Sans',sans-serif", fontSize: '0.75rem', color: 'rgba(255,255,255,.7)', marginBottom: 10 }}>@{user?.username}</p>
            <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,.8)', lineHeight: 1.75, fontStyle: 'italic' }}>{user?.bio}</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {published.map((link) => (
              <a key={link._id} href={link.url} target="_blank" rel="noreferrer" className="t24-btn" style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 20px', background: 'rgba(255,255,255,.15)', border: '1px solid rgba(255,255,255,.25)', borderRadius: 16, textDecoration: 'none', color: '#fff', fontFamily: "'Work Sans',sans-serif", fontWeight: 600, fontSize: '0.9rem', transition: 'all .3s ease', cursor: 'pointer' }}>
                <span style={{ fontSize: '1.2rem' }}>{link.icon || '☀️'}</span>
                <span style={{ flex: 1 }}>{link.title}</span>
                <span style={{ opacity: .5, fontSize: '0.8rem' }}>›</span>
              </a>
            ))}
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: 16, fontSize: '0.68rem', color: 'rgba(255,255,255,.4)', fontFamily: "'Work Sans',sans-serif" }}>nanilinks · golden hour</div>
      </div>
    </div>
  )
}

/* TEMPLATE 25 – STEALTH DARK MINIMAL */
export function Template25StealthDark({ user, links }) {
  const published = publishedLinks(links)
  const [hov, setHov] = useState(null)
  return (
    <div style={{ minHeight: '100vh', background: '#080808', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, fontFamily: "'IBM Plex Mono',monospace" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,100;0,300;0,400;1,300&family=IBM+Plex+Sans:wght@200;300;400&display=swap');
        @keyframes t25in{from{opacity:0}to{opacity:1}}
      `}</style>
      <div style={{ width: '100%', maxWidth: 380, animation: 't25in 1.2s ease both' }}>
        <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,#fff,transparent)', marginBottom: 40, opacity: .15 }} />
        <div style={{ marginBottom: 40 }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', border: '1px solid rgba(255,255,255,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', marginBottom: 20 }}>
            {user?.profilePicture ? <img src={user.profilePicture} alt="" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} /> : '◉'}
          </div>
          <h1 style={{ fontSize: '1.1rem', fontWeight: 300, color: 'rgba(255,255,255,.9)', letterSpacing: '0.1em', marginBottom: 4 }}>{user?.creatorName || 'Creator'}</h1>
          <p style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,.25)', letterSpacing: '0.15em', marginBottom: 16 }}>@{user?.username}</p>
          <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,.35)', lineHeight: 1.8, fontStyle: 'italic', fontFamily: "'IBM Plex Mono',monospace", fontWeight: 100 }}>{user?.bio}</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {published.map((link, i) => (
            <a key={link._id} href={link.url} target="_blank" rel="noreferrer" onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,.05)', textDecoration: 'none', color: hov === i ? 'rgba(255,255,255,.9)' : 'rgba(255,255,255,.3)', fontFamily: "'IBM Plex Sans',sans-serif", fontWeight: 200, fontSize: '0.82rem', letterSpacing: '0.08em', transition: 'color .2s ease', cursor: 'pointer' }}>
              <span style={{ opacity: .3, fontSize: '0.6rem', fontWeight: 100 }}>{String(i + 1).padStart(2, '0')}</span>
              <span style={{ flex: 1 }}>{link.title}</span>
              <span style={{ opacity: hov === i ? .5 : .15, fontSize: '0.7rem', transition: 'opacity .2s' }}>↗</span>
            </a>
          ))}
        </div>
        <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,#fff,transparent)', marginTop: 40, opacity: .08 }} />
        <div style={{ textAlign: 'center', marginTop: 16, fontSize: '0.58rem', color: 'rgba(255,255,255,.1)', letterSpacing: '0.3em' }}>NANILINKS</div>
      </div>
    </div>
  )
}

/* TEMPLATE 26 – WATERCOLOR SOFT */
export function Template26WatercolorSoft({ user, links }) {
  const published = publishedLinks(links)
  const paintColors = ['rgba(255,182,193,.25)', 'rgba(173,216,230,.25)', 'rgba(255,218,185,.25)', 'rgba(216,191,216,.25)', 'rgba(152,251,152,.2)', 'rgba(255,222,173,.25)']
  return (
    <div style={{ minHeight: '100vh', background: '#fefaf5', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, fontFamily: "'Lato',sans-serif", position: 'relative', overflow: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Pacifico&family=Lato:ital,wght@0,300;0,400;1,300&display=swap');
        @keyframes t26float{0%,100%{transform:translate(0,0) rotate(0deg)}50%{transform:translate(10px,-8px) rotate(3deg)}}
        @keyframes t26in{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        .t26-btn:hover{transform:translateY(-3px)!important;box-shadow:0 8px 24px rgba(0,0,0,.06)!important}
      `}</style>
      {[{ w: 300, h: 250, c: 'rgba(255,182,193,.3)', t: -60, r: -60 }, { w: 250, h: 250, c: 'rgba(173,216,230,.25)', b: -40, l: -40 }, { w: 180, h: 180, c: 'rgba(255,218,185,.25)', t: '40%', r: '5%' }].map((b, i) => (
        <div key={i} style={{ position: 'fixed', width: b.w, height: b.h, borderRadius: '60% 40% 70% 30% / 50% 60% 40% 50%', background: b.c, filter: 'blur(30px)', top: b.t, left: b.l, bottom: b.b, right: b.r, animation: `t26float ${10 + i * 3}s ease-in-out infinite` }} />
      ))}
      <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 400, animation: 't26in .8s ease both' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ width: 88, height: 88, borderRadius: '60% 40% 70% 30% / 50% 60% 40% 50%', background: 'rgba(255,182,193,.5)', border: '2px solid rgba(255,182,193,.6)', margin: '0 auto 18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem' }}>
            {user?.profilePicture ? <img src={user.profilePicture} alt="" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} /> : '🎨'}
          </div>
          <h1 style={{ fontFamily: "'Pacifico',cursive", fontSize: '1.7rem', color: '#6b4226', marginBottom: 6 }}>{user?.creatorName || 'Creator'}</h1>
          <p style={{ fontSize: '0.78rem', color: '#b07050', marginBottom: 10 }}>@{user?.username}</p>
          <p style={{ fontSize: '0.87rem', color: '#7a6050', lineHeight: 1.7, fontStyle: 'italic' }}>{user?.bio}</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {published.map((link, i) => (
            <a key={link._id} href={link.url} target="_blank" rel="noreferrer" className="t26-btn" style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 20px', background: paintColors[i % paintColors.length], borderRadius: '12px 24px 12px 24px', border: '1.5px solid rgba(0,0,0,.06)', textDecoration: 'none', color: '#4a3020', fontSize: '0.88rem', fontWeight: 400, transition: 'all .3s ease', cursor: 'pointer', backdropFilter: 'blur(4px)' }}>
              <span style={{ fontSize: '1.2rem' }}>{link.icon || '🌸'}</span>
              <span style={{ flex: 1 }}>{link.title}</span>
              <span style={{ fontSize: '0.78rem', color: '#b07050' }}>→</span>
            </a>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 20, fontFamily: "'Pacifico',cursive", fontSize: '0.72rem', color: 'rgba(107,66,38,.35)' }}>nanilinks</div>
      </div>
    </div>
  )
}

/* TEMPLATE 27 – PIXEL ARCADE */
export function Template27PixelArcade({ user, links }) {
  const published = publishedLinks(links)
  const [selected, setSelected] = useState(0)
  return (
    <div style={{ minHeight: '100vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, fontFamily: "'Press Start 2P',monospace", imageRendering: 'pixelated' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        @keyframes t27blink{0%,49%{opacity:1}50%,100%{opacity:0}}
        @keyframes t27rainbow{0%{color:#ff0}25%{color:#0ff}50%{color:#f0f}75%{color:#0f0}100%{color:#ff0}}
      `}</style>
      <div style={{ width: '100%', maxWidth: 440 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: '0.45rem', color: '#ff0' }}>
          <span>1UP</span><span>HIGH SCORE</span><span>2UP</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20, fontSize: '0.5rem', color: '#fff' }}>
          <span>000100</span><span style={{ color: '#ff0' }}>048500</span><span>000000</span>
        </div>
        <div style={{ border: '4px solid #fff', background: '#001100', padding: 20, position: 'relative', boxShadow: '0 0 0 2px #555, 0 0 0 6px #222' }}>
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <div style={{ width: 64, height: 64, border: '3px solid #fff', background: '#003300', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>
              {user?.profilePicture ? <img src={user.profilePicture} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', imageRendering: 'pixelated' }} /> : '👾'}
            </div>
            <div style={{ fontSize: '0.6rem', animation: 't27rainbow 2s linear infinite', marginBottom: 8, display: 'block' }}>{(user?.creatorName || 'PLAYER 1').toUpperCase()}</div>
            <div style={{ fontSize: '0.45rem', color: '#0f0', marginBottom: 10 }}>@{user?.username}</div>
            <div style={{ fontSize: '0.45rem', color: '#888', lineHeight: 2, marginBottom: 16, maxWidth: 260, margin: '0 auto 16px' }}>{user?.bio}</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {published.map((link, i) => (
              <a key={link._id} href={link.url} target="_blank" rel="noreferrer" onMouseEnter={() => setSelected(i)} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', background: selected === i ? '#0f0' : 'transparent', color: selected === i ? '#000' : '#0f0', textDecoration: 'none', fontSize: '0.45rem', letterSpacing: '0.05em', transition: 'all .1s steps(1)', cursor: 'pointer' }}>
                <span style={{ opacity: selected === i ? 1 : 0, animation: selected === i ? 't27blink .5s steps(1) infinite' : 'none', width: 10 }}>►</span>
                <span style={{ fontSize: '0.8rem' }}>{link.icon || '★'}</span>
                <span style={{ flex: 1 }}>{link.title.toUpperCase()}</span>
                <span style={{ opacity: .5 }}>[{(link.buttonText || 'ENTER').toUpperCase()}]</span>
              </a>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 16, fontSize: '0.4rem', color: '#555', animation: 't27blink 1s steps(1) infinite' }}>INSERT COIN TO CONTINUE</div>
        </div>
        <div style={{ textAlign: 'center', marginTop: 8, fontSize: '0.4rem', color: '#333' }}>© 2025 NANILINKS CORP.</div>
      </div>
    </div>
  )
}

/* TEMPLATE 28 – CONCRETE BRUTALISM 2 */
export function Template28ConcreteBrut({ user, links }) {
  const published = publishedLinks(links)
  return (
    <div style={{ minHeight: '100vh', background: '#b0a898', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, fontFamily: "'Chakra Petch',sans-serif", position: 'relative' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:ital,wght@0,300;0,400;0,600;0,700;1,300&display=swap');
        @keyframes t28in{from{opacity:0}to{opacity:1}}
        .t28-btn:hover{background:#1a1a1a!important;color:#ffd700!important;border-color:#ffd700!important}
      `}</style>
      <div style={{ position: 'fixed', inset: 0, opacity: .4, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat' }} />
      <div style={{ position: 'fixed', top: 20, left: -20, right: -20, height: 24, background: 'repeating-linear-gradient(45deg,#ffd700,#ffd700 16px,#1a1a1a 16px,#1a1a1a 32px)', opacity: .8 }} />
      <div style={{ position: 'fixed', bottom: 20, left: -20, right: -20, height: 24, background: 'repeating-linear-gradient(45deg,#ffd700,#ffd700 16px,#1a1a1a 16px,#1a1a1a 32px)', opacity: .8 }} />
      <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 440, animation: 't28in .6s ease both' }}>
        <div style={{ background: '#d4cfc6', border: '3px solid #1a1a1a', boxShadow: '8px 8px 0 #1a1a1a' }}>
          <div style={{ background: '#1a1a1a', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 72, height: 72, background: '#b0a898', border: '2px solid #ffd700', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', flexShrink: 0 }}>
              {user?.profilePicture ? <img src={user.profilePicture} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : '🏗️'}
            </div>
            <div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ffd700', letterSpacing: '0.05em', lineHeight: 1 }}>{(user?.creatorName || 'BUILDER').toUpperCase()}</h1>
              <p style={{ fontSize: '0.62rem', color: '#888', letterSpacing: '0.15em', marginTop: 4 }}>@{user?.username}</p>
            </div>
          </div>
          <div style={{ padding: '16px 24px', borderBottom: '3px solid #1a1a1a', borderTop: '3px solid #1a1a1a', background: '#c8c2b8' }}>
            <p style={{ fontSize: '0.78rem', color: '#3a3530', lineHeight: 1.7, fontStyle: 'italic' }}>{user?.bio}</p>
          </div>
          <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {published.map((link) => (
              <a key={link._id} href={link.url} target="_blank" rel="noreferrer" className="t28-btn" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', background: '#b0a898', border: '2px solid #1a1a1a', textDecoration: 'none', color: '#1a1a1a', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.05em', transition: 'all .2s ease', cursor: 'pointer', boxShadow: '3px 3px 0 #1a1a1a' }}>
                <span style={{ fontSize: '1.1rem' }}>{link.icon || '⚙️'}</span>
                <span style={{ flex: 1 }}>{link.title.toUpperCase()}</span>
                <span style={{ fontSize: '0.65rem', opacity: .6 }}>{link.buttonText?.toUpperCase() || 'ENTER'} ▶</span>
              </a>
            ))}
          </div>
        </div>
        <div style={{ textAlign: 'right', marginTop: 8, fontSize: '0.58rem', color: 'rgba(0,0,0,.35)', letterSpacing: '0.15em' }}>NANILINKS CONSTRUCTION CO.</div>
      </div>
    </div>
  )
}

/* TEMPLATE 29 – NEON SIGNAGE */
export function Template29NeonSignage({ user, links }) {
  const published = publishedLinks(links)
  const neonColors = ['#ff0080', '#00ffff', '#ffff00', '#ff8000', '#00ff80', '#8000ff']
  return (
    <div style={{ minHeight: '100vh', background: '#1a0a00', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, fontFamily: "'Lobster',cursive", position: 'relative', overflow: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lobster&family=Quicksand:wght@300;400;600&display=swap');
        @keyframes t29flicker{0%,92%,94%,100%{opacity:1;filter:brightness(1)}93%{opacity:.6;filter:brightness(.6)}95%{opacity:.8;filter:brightness(.8)}}
        @keyframes t29in{from{opacity:0}to{opacity:1}}
        .t29-sign:hover{filter:brightness(1.3)!important;transform:scale(1.02)!important}
      `}</style>
      <div style={{ position: 'fixed', inset: 0, backgroundImage: 'repeating-linear-gradient(90deg,transparent,transparent 60px,rgba(255,255,255,.02) 60px,rgba(255,255,255,.02) 61px),repeating-linear-gradient(0deg,transparent,transparent 30px,rgba(255,255,255,.02) 30px,rgba(255,255,255,.02) 31px)' }} />
      <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 400, animation: 't29in .8s ease both' }}>
        <div style={{ textAlign: 'center', marginBottom: 24, padding: '28px 20px', background: 'rgba(0,0,0,.6)', border: '1px solid rgba(255,255,255,.05)', borderRadius: 4 }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', border: '3px solid #ff0080', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', background: 'rgba(255,0,128,.05)', boxShadow: '0 0 20px rgba(255,0,128,.3), inset 0 0 20px rgba(255,0,128,.05)' }}>
            {user?.profilePicture ? <img src={user.profilePicture} alt="" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} /> : '✨'}
          </div>
          <h1 style={{ fontSize: '2.2rem', color: '#ff0080', textShadow: '0 0 10px #ff0080,0 0 20px #ff0080,0 0 40px #ff0080', animation: 't29flicker 8s steps(1) infinite', marginBottom: 6 }}>{user?.creatorName || 'Creator'}</h1>
          <p style={{ fontFamily: "'Quicksand',sans-serif", fontSize: '0.72rem', color: 'rgba(255,255,255,.4)', letterSpacing: '0.15em', marginBottom: 10 }}>@{user?.username}</p>
          <p style={{ fontFamily: "'Quicksand',sans-serif", fontSize: '0.84rem', color: 'rgba(255,255,255,.45)', lineHeight: 1.7 }}>{user?.bio}</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {published.map((link, i) => {
            const c = neonColors[i % neonColors.length]
            return (
              <a key={link._id} href={link.url} target="_blank" rel="noreferrer" className="t29-sign" style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 20px', background: 'rgba(0,0,0,.7)', border: `1px solid ${c}30`, borderLeft: `3px solid ${c}`, borderRadius: 4, textDecoration: 'none', color: c, fontSize: '0.9rem', fontFamily: "'Quicksand',sans-serif", fontWeight: 600, letterSpacing: '0.05em', textShadow: `0 0 8px ${c}80`, boxShadow: `inset 0 0 20px ${c}08`, transition: 'all .3s ease', cursor: 'pointer' }}>
                <span>{link.icon || '★'}</span>
                <span style={{ flex: 1 }}>{link.title}</span>
                <span style={{ fontSize: '0.7rem', opacity: .5 }}>›</span>
              </a>
            )
          })}
        </div>
        <div style={{ textAlign: 'center', marginTop: 20, fontFamily: "'Quicksand',sans-serif", fontSize: '0.62rem', color: 'rgba(255,0,128,.3)' }}>nanilinks · open 24/7</div>
      </div>
    </div>
  )
}

/* TEMPLATE 30 – ROYAL ORNATE */
export function Template30RoyalOrnate({ user, links }) {
  const published = publishedLinks(links)
  return (
    <div style={{ minHeight: '100vh', background: '#1a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, fontFamily: "'UnifrakturMaguntia',cursive", position: 'relative', overflow: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=UnifrakturMaguntia&family=IM+Fell+English:ital@0;1&family=Josefin+Sans:wght@100;300&display=swap');
        @keyframes t30in{from{opacity:0;transform:scale(.96)}to{opacity:1;transform:scale(1)}}
        .t30-btn:hover{background:rgba(139,0,0,.2)!important;border-color:rgba(196,160,80,.6)!important;color:#f5e6c8!important}
      `}</style>
      <div style={{ position: 'fixed', inset: 0, background: 'radial-gradient(ellipse 70% 70% at 50% 50%,transparent,rgba(0,0,0,.7))' }} />
      <div style={{ position: 'fixed', inset: 0, opacity: .05 }}>
        <svg width="100%" height="100%"><defs><pattern id="damask" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse"><circle cx="40" cy="40" r="35" fill="none" stroke="#c4a050" strokeWidth=".5"/><polygon points="40,8 50,30 40,20 30,30" fill="none" stroke="#c4a050" strokeWidth=".5"/><polygon points="40,72 50,50 40,60 30,50" fill="none" stroke="#c4a050" strokeWidth=".5"/></pattern></defs><rect width="100%" height="100%" fill="url(#damask)"/></svg>
      </div>
      <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 420, animation: 't30in .9s ease both' }}>
        <div style={{ background: '#1e0808', border: '2px solid rgba(196,160,80,.3)', borderRadius: 2 }}>
          <div style={{ background: '#8b0000', borderBottom: '2px solid rgba(196,160,80,.3)', padding: '12px 24px', textAlign: 'center' }}>
            <svg width="200" height="24" viewBox="0 0 200 24" style={{ display: 'block', margin: '0 auto' }}>
              <path d="M10,12 Q50,4 100,12 Q150,20 190,12" fill="none" stroke="#c4a050" strokeWidth="1" opacity=".6"/>
              <circle cx="100" cy="12" r="3" fill="#c4a050" opacity=".6"/>
              <path d="M60,12 Q80,6 100,12 Q120,18 140,12" fill="none" stroke="#c4a050" strokeWidth=".5" opacity=".4"/>
            </svg>
          </div>
          <div style={{ padding: '32px 28px', textAlign: 'center' }}>
            <div style={{ position: 'relative', width: 96, height: 96, margin: '0 auto 20px' }}>
              <svg width="96" height="96" viewBox="0 0 96 96" style={{ position: 'absolute', inset: 0, opacity: .4 }}>
                <polygon points="48,2 60,36 96,36 67,58 79,92 48,72 17,92 29,58 0,36 36,36" fill="#8b0000" stroke="#c4a050" strokeWidth="1"/>
              </svg>
              <div style={{ position: 'absolute', inset: 20, borderRadius: '50%', background: '#2a0808', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', border: '2px solid rgba(196,160,80,.3)' }}>
                {user?.profilePicture ? <img src={user.profilePicture} alt="" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} /> : '👑'}
              </div>
            </div>
            <div style={{ fontSize: '0.55rem', fontFamily: "'Josefin Sans',sans-serif", letterSpacing: '0.5em', color: 'rgba(196,160,80,.5)', marginBottom: 8, textTransform: 'uppercase' }}>By Royal Decree</div>
            <h1 style={{ fontSize: '2rem', color: '#f5e6c8', textShadow: '0 0 20px rgba(196,160,80,.3)', marginBottom: 6, lineHeight: 1 }}>{user?.creatorName || 'Creator'}</h1>
            <p style={{ fontFamily: "'IM Fell English',serif", fontStyle: 'italic', fontSize: '0.75rem', color: 'rgba(196,160,80,.6)', letterSpacing: '0.15em', marginBottom: 14 }}>@{user?.username}</p>
            <p style={{ fontFamily: "'IM Fell English',serif", fontSize: '0.88rem', color: 'rgba(245,230,200,.55)', lineHeight: 1.8, fontStyle: 'italic' }}>{user?.bio}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 24px', marginBottom: 20 }}>
            <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,transparent,rgba(196,160,80,.4))' }} />
            <span style={{ color: '#c4a050', fontSize: '0.7rem', opacity: .6 }}>✦ ✦ ✦</span>
            <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,rgba(196,160,80,.4),transparent)' }} />
          </div>
          <div style={{ padding: '0 20px 24px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {published.map((link) => (
              <a key={link._id} href={link.url} target="_blank" rel="noreferrer" className="t30-btn" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: '12px 18px', border: '1px solid rgba(196,160,80,.15)', background: 'rgba(139,0,0,.08)', textDecoration: 'none', color: 'rgba(245,230,200,.7)', fontFamily: "'IM Fell English',serif", fontSize: '0.88rem', letterSpacing: '0.1em', transition: 'all .35s ease', cursor: 'pointer' }}>
                <span style={{ color: '#c4a050', fontSize: '0.6rem' }}>❧</span>
                <span>{link.title}</span>
                <span style={{ color: '#c4a050', fontSize: '0.6rem' }}>❧</span>
              </a>
            ))}
          </div>
          <div style={{ background: '#8b0000', borderTop: '2px solid rgba(196,160,80,.3)', padding: '8px 24px', textAlign: 'center' }}>
            <div style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: '0.5rem', color: 'rgba(196,160,80,.35)', letterSpacing: '0.3em', textTransform: 'uppercase' }}>Nanilinks · Est. MMXXV</div>
          </div>
        </div>
      </div>
    </div>
  )
}

