import { CircleNotch } from "phosphor-react";

export function Loading() {
  return (
    <div className="flex items-center justify-center overflow-hidden">
      <CircleNotch weight="bold" className="w-6 h-6 animate-spin text-zinc-800 dark:text-zinc-100"/>
    </div>
  )
}
