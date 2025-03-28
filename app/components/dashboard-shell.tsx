import type React from "react"
interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 print:p-0 print:gap-2">
        <div className="mx-auto grid w-full max-w-7xl gap-4 print:gap-2">{children}</div>
      </main>
    </div>
  )
}

