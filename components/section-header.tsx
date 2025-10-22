import { Flame, Sparkles } from "lucide-react"

interface SectionHeaderProps {
  title: string
  icon?: "hot" | "new"
}

export function SectionHeader({ title, icon }: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-2 mb-6">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
        {icon === "hot" && <Flame className="h-4 w-4 text-primary" />}
        {icon === "new" && <Sparkles className="h-4 w-4 text-primary" />}
      </div>
      <h2 className="text-lg font-bold text-foreground">{title}</h2>
    </div>
  )
}
