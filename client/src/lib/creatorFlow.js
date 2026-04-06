const KEY = 'biolink_creator_flow'
/** Redundant plain UTR string so register can always recover checkout UTR even if JSON merge fails. */
const UTR_BACKUP_KEY = 'biolink_checkout_utr'

function persistCheckoutUtr(v) {
  const s = String(v || '').trim()
  if (s.length < 8) return
  try {
    sessionStorage.setItem(UTR_BACKUP_KEY, s)
  } catch {
    /* ignore */
  }
  try {
    localStorage.setItem(UTR_BACKUP_KEY, s)
  } catch {
    /* ignore */
  }
}

/** @returns {string} */
export function readCheckoutUtrBackup() {
  try {
    return String(sessionStorage.getItem(UTR_BACKUP_KEY) || localStorage.getItem(UTR_BACKUP_KEY) || '').trim()
  } catch {
    return ''
  }
}

function clearCheckoutUtrBackup() {
  try {
    sessionStorage.removeItem(UTR_BACKUP_KEY)
  } catch {
    /* ignore */
  }
  try {
    localStorage.removeItem(UTR_BACKUP_KEY)
  } catch {
    /* ignore */
  }
}

function flowWeight(f) {
  if (!f) return 0
  let w = 0
  if (f.templateId) w += 1
  if (f.checkoutPaid) w += 10
  if (String(f.utrNumber || '').trim().length >= 8) w += 100
  return w
}

/** @returns {{ templateId?: string, templateName?: string, priceCents?: number, checkoutPaid?: boolean, utrNumber?: string, checkoutAt?: string } | null} */
export function readCreatorFlow() {
  try {
    let session = null
    let local = null
    try {
      const s = sessionStorage.getItem(KEY)
      if (s) session = JSON.parse(s)
    } catch {
      /* ignore */
    }
    try {
      const l = typeof localStorage !== 'undefined' ? localStorage.getItem(KEY) : null
      if (l) local = JSON.parse(l)
    } catch {
      /* ignore */
    }
    if (!session && !local) return null
    if (!session) return local
    if (!local) return session
    // Merge so we never drop UTR/checkout when one storage is stale (e.g. new tab vs old session)
    const merged =
      flowWeight(session) >= flowWeight(local)
        ? { ...local, ...session }
        : { ...session, ...local }
    // Copy stronger flow into the weaker storage so the two stay aligned
    const serialized = JSON.stringify(merged)
    try {
      sessionStorage.setItem(KEY, serialized)
    } catch {
      /* ignore */
    }
    try {
      localStorage.setItem(KEY, serialized)
    } catch {
      /* ignore */
    }
    return merged
  } catch {
    return null
  }
}

export function writeCreatorFlow(partial) {
  const cur = readCreatorFlow() || {}
  const next = { ...cur, ...partial }
  const serialized = JSON.stringify(next)
  try {
    sessionStorage.setItem(KEY, serialized)
  } catch {
    /* ignore */
  }
  try {
    localStorage.setItem(KEY, serialized)
  } catch {
    /* ignore */
  }
  if (String(next.utrNumber || '').trim().length >= 8) {
    persistCheckoutUtr(next.utrNumber)
  }
}

export function clearCreatorFlow() {
  try {
    sessionStorage.removeItem(KEY)
  } catch {
    /* ignore */
  }
  try {
    localStorage.removeItem(KEY)
  } catch {
    /* ignore */
  }
  clearCheckoutUtrBackup()
}
