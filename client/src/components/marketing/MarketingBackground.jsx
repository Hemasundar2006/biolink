import { Biolink3DDecor } from './Biolink3DDecor.jsx'

export function MarketingBackground({ children }) {
  return (
    <div className="relative min-h-screen overflow-x-clip text-slate-800">
      <div className="marketing-bg" aria-hidden />
      <Biolink3DDecor />
      <div className="relative z-10 min-w-0">{children}</div>
    </div>
  )
}
