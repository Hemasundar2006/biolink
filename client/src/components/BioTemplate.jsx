import {
  Template01NeonCyberpunk,
  Template02SoftPastel,
  Template03Brutalist,
  Template04LuxuryGold,
  Template05Cosmic,
  Template06RetroVaporwave,
  Template07GlassFrost,
  Template08NatureOrganic,
  Template09MinimalZen,
  Template10ArtDeco,
} from './templates/PremiumTemplates.jsx'
import {
  Template11NightClub,
  Template12Newspaper,
  Template13StickersPop,
  Template14WoodCraft,
  Template15TechTerminal,
  Template16MidnightBloom,
  Template17SportsBold,
  Template18StudioPortfolio,
  Template19TropicalVibrant,
  Template20Monochrome,
  Template21RainbowFlow,
  Template22GeometricIslamic,
  Template23Y2KChrome,
  Template24SunsetDuotone,
  Template25StealthDark,
  Template26WatercolorSoft,
  Template27PixelArcade,
  Template28ConcreteBrut,
  Template29NeonSignage,
  Template30RoyalOrnate,
} from './templates/PremiumTemplates2.jsx'

function Avatar({ url, name, className = '' }) {
  if (url) {
    return (
      <img
        src={url}
        alt=""
        className={`mx-auto h-24 w-24 rounded-full object-cover ring-4 ring-white/10 ${className}`}
      />
    )
  }
  const initial = name?.trim()?.[0]?.toUpperCase() || '?'
  return (
    <div
      className={`mx-auto flex h-24 w-24 items-center justify-center rounded-full text-2xl font-semibold ring-4 ring-white/10 ${className}`}
    >
      {initial}
    </div>
  )
}

export function BioTemplate({ data, preview }) {
  const { displayName, bio, avatarUrl, links, template } = data
  const p = template.palette
  const v = template.variant

  const sorted = [...links].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  const premiumPayload = {
    user: {
      creatorName: displayName,
      username: data.slug || 'creator',
      bio,
      profilePicture: avatarUrl,
    },
    links: sorted.map((l, i) => ({
      ...l,
      _id: l._id ?? `${l.url}-${i}`,
      status: l.status ?? 'published',
      category: l.category ?? 'useful',
      icon: l.icon ?? '🔗',
      buttonText: l.buttonText ?? 'VISIT',
      description: l.description ?? '',
      order: l.order ?? i,
    })),
  }

  const wrapClass = preview
    ? 'min-h-[520px] overflow-hidden rounded-2xl border border-white/10 shadow-xl'
    : 'min-h-screen'

  if (v === 1) {
    return (
      <div className={wrapClass} style={{ background: p.background, color: p.text }}>
        <div
          className="mx-auto flex max-w-md flex-col gap-6 px-6 py-16"
          style={{ fontFamily: 'ui-sans-serif, system-ui' }}
        >
          <Avatar url={avatarUrl} name={displayName} />
          <div>
            <h1 className="text-center text-2xl font-semibold tracking-tight">{displayName || 'Creator'}</h1>
            {bio ? <p className="mt-2 text-center text-sm" style={{ color: p.muted }}>{bio}</p> : null}
          </div>
          <div className="flex flex-col gap-3">
            {sorted.map((l) => (
              <a
                key={l._id ?? l.url + l.title}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border px-4 py-3 text-sm font-medium"
                style={{
                  borderColor: `${p.primary}55`,
                  background: p.surface,
                  color: p.text,
                }}
              >
                {l.title}
              </a>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (v === 2) {
    return (
      <div
        className={`${wrapClass} relative overflow-hidden`}
        style={{
          background: `linear-gradient(145deg, ${p.background}, ${p.surface})`,
          color: p.text,
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background: `radial-gradient(circle at 20% 20%, ${p.primary}66, transparent 45%), radial-gradient(circle at 80% 30%, ${p.secondary}55, transparent 40%)`,
          }}
        />
        <div className="relative mx-auto max-w-md px-6 py-16 backdrop-blur-sm">
          <div
            className="rounded-3xl border p-8 shadow-2xl"
            style={{
              borderColor: `${p.text}22`,
              background: `${p.surface}cc`,
              boxShadow: `0 25px 80px ${p.primary}22`,
            }}
          >
            <Avatar url={avatarUrl} name={displayName} />
            <h1 className="mt-6 text-center text-2xl font-bold">{displayName || 'Creator'}</h1>
            {bio ? <p className="mt-2 text-center text-sm" style={{ color: p.muted }}>{bio}</p> : null}
            <div className="mt-8 flex flex-col gap-3">
              {sorted.map((l) => (
                <a
                  key={l._id ?? l.url + l.title}
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl px-4 py-3 text-sm font-semibold backdrop-blur"
                  style={{
                    background: `linear-gradient(90deg, ${p.primary}33, ${p.secondary}22)`,
                    border: `1px solid ${p.primary}55`,
                    color: p.text,
                  }}
                >
                  {l.title}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (v === 3) {
    return (
      <div className={wrapClass} style={{ background: p.background, color: p.text }}>
        <div className="mx-auto max-w-lg px-6 py-14">
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="rounded-full p-1" style={{ boxShadow: `0 0 0 3px ${p.primary}55` }}>
              <Avatar url={avatarUrl} name={displayName} />
            </div>
            <h1 className="text-3xl font-black tracking-tight" style={{ color: p.text }}>
              {displayName || 'Creator'}
            </h1>
            {bio ? <p className="max-w-sm text-sm" style={{ color: p.muted }}>{bio}</p> : null}
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {sorted.map((l) => (
              <a
                key={l._id ?? l.url + l.title}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl px-4 py-6 text-center text-sm font-bold shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${p.primary}, ${p.secondary})`,
                  color: '#0b1020',
                }}
              >
                {l.title}
              </a>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (v === 4) {
    return (
      <div className={wrapClass} style={{ background: p.background, color: p.text }}>
        <div className="mx-auto max-w-md border-x px-6 py-16" style={{ borderColor: `${p.muted}33` }}>
          <div className="flex items-start gap-4">
            <div className="shrink-0">
              <Avatar url={avatarUrl} name={displayName} className="mx-0 h-16 w-16 text-lg" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">{displayName || 'Creator'}</h1>
              {bio ? <p className="mt-1 text-sm" style={{ color: p.muted }}>{bio}</p> : null}
            </div>
          </div>
          <div className="mt-10 space-y-2 border-t pt-8" style={{ borderColor: `${p.muted}33` }}>
            {sorted.map((l, i) => (
              <a
                key={l._id ?? l.url + l.title}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-lg border px-4 py-3 text-sm"
                style={{
                  borderColor: `${p.secondary}44`,
                  background: i % 2 === 0 ? `${p.surface}88` : 'transparent',
                }}
              >
                <span>{l.title}</span>
                <span style={{ color: p.muted }}>↗</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (v === 5) {
    return (
      <div
        className={wrapClass}
        style={{
          background: `linear-gradient(180deg, ${p.surface}, ${p.background})`,
          color: p.text,
        }}
      >
        <div className="mx-auto max-w-sm px-6 py-20 text-center">
          <div className="inline-flex rounded-full p-1" style={{ background: `${p.primary}22` }}>
            <Avatar url={avatarUrl} name={displayName} className="h-20 w-20" />
          </div>
          <h1 className="mt-6 text-2xl font-medium">{displayName || 'Creator'}</h1>
          {bio ? <p className="mt-2 text-sm leading-relaxed" style={{ color: p.muted }}>{bio}</p> : null}
          <div className="mt-10 flex flex-col gap-4">
            {sorted.map((l) => (
              <a
                key={l._id ?? l.url + l.title}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full px-6 py-3 text-sm font-semibold shadow-md"
                style={{
                  background: p.text,
                  color: p.background,
                }}
              >
                {l.title}
              </a>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (v === 7) return <Template01NeonCyberpunk {...premiumPayload} />
  if (v === 8) return <Template02SoftPastel {...premiumPayload} />
  if (v === 9) return <Template03Brutalist {...premiumPayload} />
  if (v === 10) return <Template04LuxuryGold {...premiumPayload} />
  if (v === 11) return <Template05Cosmic {...premiumPayload} />
  if (v === 12) return <Template06RetroVaporwave {...premiumPayload} />
  if (v === 13) return <Template07GlassFrost {...premiumPayload} />
  if (v === 14) return <Template08NatureOrganic {...premiumPayload} />
  if (v === 15) return <Template09MinimalZen {...premiumPayload} />
  if (v === 16) return <Template10ArtDeco {...premiumPayload} />
  if (v === 17) return <Template11NightClub {...premiumPayload} />
  if (v === 18) return <Template12Newspaper {...premiumPayload} />
  if (v === 19) return <Template13StickersPop {...premiumPayload} />
  if (v === 20) return <Template14WoodCraft {...premiumPayload} />
  if (v === 21) return <Template15TechTerminal {...premiumPayload} />
  if (v === 22) return <Template16MidnightBloom {...premiumPayload} />
  if (v === 23) return <Template17SportsBold {...premiumPayload} />
  if (v === 24) return <Template18StudioPortfolio {...premiumPayload} />
  if (v === 25) return <Template19TropicalVibrant {...premiumPayload} />
  if (v === 26) return <Template20Monochrome {...premiumPayload} />
  if (v === 27) return <Template21RainbowFlow {...premiumPayload} />
  if (v === 28) return <Template22GeometricIslamic {...premiumPayload} />
  if (v === 29) return <Template23Y2KChrome {...premiumPayload} />
  if (v === 30) return <Template24SunsetDuotone {...premiumPayload} />
  if (v === 31) return <Template25StealthDark {...premiumPayload} />
  if (v === 32) return <Template26WatercolorSoft {...premiumPayload} />
  if (v === 33) return <Template27PixelArcade {...premiumPayload} />
  if (v === 34) return <Template28ConcreteBrut {...premiumPayload} />
  if (v === 35) return <Template29NeonSignage {...premiumPayload} />
  if (v === 36) return <Template30RoyalOrnate {...premiumPayload} />

  return (
    <div className={wrapClass} style={{ background: p.background, color: p.text }}>
      <div
        className="mx-auto max-w-md bg-[length:24px_24px] px-6 py-16"
        style={{
          backgroundImage: `linear-gradient(${p.muted}22 1px, transparent 1px), linear-gradient(90deg, ${p.muted}22 1px, transparent 1px)`,
        }}
      >
        <div className="text-center">
          <Avatar url={avatarUrl} name={displayName} />
          <h1 className="mt-6 font-mono text-xl uppercase tracking-[0.2em]">{displayName || 'Creator'}</h1>
          {bio ? <p className="mt-3 font-mono text-xs" style={{ color: p.muted }}>{bio}</p> : null}
        </div>
        <div className="mt-10 space-y-3 font-mono text-sm">
          {sorted.map((l) => (
            <a
              key={l._id ?? l.url + l.title}
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block border px-4 py-3 transition hover:-translate-y-0.5"
              style={{
                borderColor: p.primary,
                color: p.text,
                boxShadow: `4px 4px 0 ${p.secondary}`,
              }}
            >
              {`> ${l.title}`}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
