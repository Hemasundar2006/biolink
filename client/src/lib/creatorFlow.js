const KEY = 'biolink_creator_flow'

/** @returns {{ templateId?: string, templateName?: string, priceCents?: number, checkoutPaid?: boolean } | null} */
export function readCreatorFlow() {
  try {
    const raw = sessionStorage.getItem(KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function writeCreatorFlow(partial) {
  const cur = readCreatorFlow() || {}
  sessionStorage.setItem(KEY, JSON.stringify({ ...cur, ...partial }))
}

export function clearCreatorFlow() {
  sessionStorage.removeItem(KEY)
}
