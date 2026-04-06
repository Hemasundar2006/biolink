function publishedLinks(links = []) {
  return [...links]
    .filter((l) => !l.status || l.status === 'published')
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
}

function Avatar({ user, fallback }) {
  if (user?.profilePicture) {
    return (
      <img
        src={user.profilePicture}
        alt=""
        style={{ width: '100%', height: '100%', borderRadius: 'inherit', objectFit: 'cover' }}
      />
    )
  }
  return fallback
}

export function Template01NeonCyberpunk({ user, links }) {
  const published = publishedLinks(links)
  return (
    <div style={{ minHeight: '100vh', background: '#040311', color: '#fff', padding: 20, fontFamily: 'monospace' }}>
      <div style={{ maxWidth: 420, margin: '0 auto', border: '1px solid #00f5ff66', padding: 24, background: '#000a' }}>
        <h1 style={{ textAlign: 'center', color: '#00f5ff', letterSpacing: 2 }}>{user?.creatorName || 'CREATOR'}</h1>
        <p style={{ textAlign: 'center', color: '#a7faff' }}>{user?.bio}</p>
        <div style={{ display: 'grid', gap: 10, marginTop: 20 }}>
          {published.map((link) => (
            <a key={link._id ?? link.url} href={link.url} target="_blank" rel="noreferrer" style={{ border: '1px solid #00f5ff66', padding: '12px 14px', color: '#fff', textDecoration: 'none', background: '#00f5ff11' }}>
              {link.title}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export function Template02SoftPastel({ user, links }) {
  const published = publishedLinks(links)
  return (
    <div style={{ minHeight: '100vh', background: '#fdf6ff', padding: 20 }}>
      <div style={{ maxWidth: 420, margin: '0 auto', borderRadius: 24, padding: 24, background: '#ffffffcc', backdropFilter: 'blur(8px)' }}>
        <h1 style={{ textAlign: 'center', color: '#56496d' }}>{user?.creatorName || 'Creator'}</h1>
        <p style={{ textAlign: 'center', color: '#8a7ba0' }}>{user?.bio}</p>
        <div style={{ display: 'grid', gap: 10, marginTop: 20 }}>
          {published.map((link, i) => (
            <a key={link._id ?? link.url} href={link.url} target="_blank" rel="noreferrer" style={{ borderRadius: 14, padding: '12px 14px', textDecoration: 'none', color: '#4e4260', background: i % 2 ? '#f5f0ff' : '#fff0f5' }}>
              {link.title}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export function Template03Brutalist({ user, links }) {
  const published = publishedLinks(links)
  return (
    <div style={{ minHeight: '100vh', background: '#f5f0e8', padding: 20 }}>
      <div style={{ maxWidth: 440, margin: '0 auto', border: '3px solid #0a0a0a', background: '#fff' }}>
        <div style={{ background: '#0a0a0a', color: '#f5c800', padding: '8px 14px', fontSize: 12 }}>LINKS DIRECTORY</div>
        <div style={{ padding: 20 }}>
          <h1 style={{ margin: 0, fontSize: 36 }}>{(user?.creatorName || 'CREATOR').toUpperCase()}</h1>
          <p style={{ color: '#444' }}>{user?.bio}</p>
        </div>
        {published.map((link, i) => (
          <a key={link._id ?? link.url} href={link.url} target="_blank" rel="noreferrer" style={{ display: 'flex', justifyContent: 'space-between', borderTop: '2px solid #0a0a0a', textDecoration: 'none', color: '#111', padding: '12px 14px' }}>
            <span>{String(i + 1).padStart(2, '0')}</span>
            <span>{link.title}</span>
            <span>→</span>
          </a>
        ))}
      </div>
    </div>
  )
}

export function Template04LuxuryGold({ user, links }) {
  const published = publishedLinks(links)
  return (
    <div style={{ minHeight: '100vh', background: '#0c0c0e', color: '#e8d3a0', padding: 20 }}>
      <div style={{ maxWidth: 420, margin: '0 auto', border: '1px solid #c9a84c66', padding: 28, background: '#141418' }}>
        <h1 style={{ textAlign: 'center', letterSpacing: 4 }}>{(user?.creatorName || 'Creator').toUpperCase()}</h1>
        <p style={{ textAlign: 'center', opacity: 0.75 }}>{user?.bio}</p>
        <div style={{ display: 'grid', gap: 8, marginTop: 18 }}>
          {published.map((link) => (
            <a key={link._id ?? link.url} href={link.url} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: '#e8d3a0', border: '1px solid #c9a84c33', padding: '12px 14px', textAlign: 'center' }}>
              {link.title.toUpperCase()}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export function Template05Cosmic({ user, links }) {
  const published = publishedLinks(links)
  return (
    <div style={{ minHeight: '100vh', background: 'radial-gradient(circle at 20% 20%, #332266, #040411 60%)', color: '#fff', padding: 20 }}>
      <div style={{ maxWidth: 410, margin: '0 auto', borderRadius: 18, border: '1px solid #8b5cf644', background: '#080522cc', backdropFilter: 'blur(12px)', padding: 24 }}>
        <h1 style={{ textAlign: 'center' }}>{user?.creatorName || 'Creator'}</h1>
        <p style={{ textAlign: 'center', color: '#c9b8ff' }}>{user?.bio}</p>
        <div style={{ display: 'grid', gap: 9, marginTop: 18 }}>
          {published.map((link) => (
            <a key={link._id ?? link.url} href={link.url} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: '#e9e2ff', border: '1px solid #8b5cf644', padding: '12px 14px', borderRadius: 12, background: '#8b5cf61a' }}>
              {link.title}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export function Template06RetroVaporwave({ user, links }) {
  const published = publishedLinks(links)
  return (
    <div style={{ minHeight: '100vh', background: '#20003a', color: '#fff', padding: 20 }}>
      <div style={{ maxWidth: 430, margin: '0 auto', border: '3px solid #01cdfe', background: '#120025' }}>
        <div style={{ background: '#b967ff', color: '#fff', padding: '8px 12px' }}>BIOLINK.EXE</div>
        <div style={{ padding: 20 }}>
          <h1 style={{ color: '#fffb96' }}>{(user?.creatorName || 'CREATOR').toUpperCase()}</h1>
          <p style={{ color: '#05ffa1' }}>{user?.bio}</p>
          <div style={{ display: 'grid', gap: 8, marginTop: 12 }}>
            {published.map((link) => (
              <a key={link._id ?? link.url} href={link.url} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: '#01cdfe', border: '2px solid #01cdfe', padding: '10px 12px', display: 'flex', justifyContent: 'space-between' }}>
                <span>{link.title}</span><span>↗</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function Template07GlassFrost({ user, links }) {
  const published = publishedLinks(links)
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#667eea,#764ba2,#12c2e9)', padding: 20 }}>
      <div style={{ maxWidth: 410, margin: '0 auto', borderRadius: 30, padding: 28, background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.35)', backdropFilter: 'blur(16px)' }}>
        <h1 style={{ textAlign: 'center', color: '#fff' }}>{user?.creatorName || 'Creator'}</h1>
        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.85)' }}>{user?.bio}</p>
        <div style={{ display: 'grid', gap: 10, marginTop: 18 }}>
          {published.map((link) => (
            <a key={link._id ?? link.url} href={link.url} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: '#fff', border: '1px solid rgba(255,255,255,0.35)', borderRadius: 16, padding: '12px 14px', background: 'rgba(255,255,255,0.15)' }}>
              {link.title}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export function Template08NatureOrganic({ user, links }) {
  const published = publishedLinks(links)
  return (
    <div style={{ minHeight: '100vh', background: '#f0f7ee', padding: 20 }}>
      <div style={{ maxWidth: 410, margin: '0 auto', borderRadius: 22, padding: 28, background: '#fff', border: '1px solid #95d5b2', boxShadow: '0 4px 24px rgba(45,106,79,0.12)' }}>
        <h1 style={{ textAlign: 'center', color: '#1b4332' }}>{user?.creatorName || 'Creator'}</h1>
        <p style={{ textAlign: 'center', color: '#4a5568' }}>{user?.bio}</p>
        <div style={{ display: 'grid', gap: 10, marginTop: 18 }}>
          {published.map((link) => (
            <a key={link._id ?? link.url} href={link.url} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: '#1b4332', border: '1px solid #95d5b2', borderRadius: 14, padding: '12px 14px', background: '#f0f7ee' }}>
              {link.title}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export function Template09MinimalZen({ user, links }) {
  const published = publishedLinks(links)
  return (
    <div style={{ minHeight: '100vh', background: '#fafafa', padding: 20 }}>
      <div style={{ maxWidth: 360, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', border: '1px solid #e5e5e5', margin: '0 auto 20px', display: 'grid', placeItems: 'center', fontSize: 28 }}>
          <Avatar user={user} fallback="✦" />
        </div>
        <h1 style={{ letterSpacing: 1, color: '#111' }}>{user?.creatorName || 'Creator'}</h1>
        <p style={{ color: '#777', marginBottom: 30 }}>{user?.bio}</p>
        {published.map((link, i) => (
          <a key={link._id ?? link.url} href={link.url} target="_blank" rel="noreferrer" style={{ display: 'flex', justifyContent: 'space-between', textDecoration: 'none', color: '#444', borderBottom: '1px solid #f0f0f0', padding: '14px 0' }}>
            <span style={{ opacity: 0.5 }}>{String(i + 1).padStart(2, '0')}</span>
            <span>{link.title}</span>
            <span>↗</span>
          </a>
        ))}
      </div>
    </div>
  )
}

export function Template10ArtDeco({ user, links }) {
  const published = publishedLinks(links)
  return (
    <div style={{ minHeight: '100vh', background: '#0d0d0d', color: '#f5e6c8', padding: 20 }}>
      <div style={{ maxWidth: 420, margin: '0 auto', border: '1px solid #d4af3750', padding: 28 }}>
        <h1 style={{ textAlign: 'center', letterSpacing: 2 }}>{user?.creatorName || 'Creator'}</h1>
        <p style={{ textAlign: 'center', color: '#d4af37aa' }}>{user?.bio}</p>
        <div style={{ display: 'grid', gap: 8, marginTop: 18 }}>
          {published.map((link) => (
            <a key={link._id ?? link.url} href={link.url} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: '#f5e6c8', border: '1px solid #d4af3740', textAlign: 'center', padding: '12px 14px' }}>
              ◆ {link.title.toUpperCase()} ◆
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
