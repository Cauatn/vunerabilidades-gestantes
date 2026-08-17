import type { ReactNode } from 'react'

import { AppSidebar, type Tela } from '@/features/core/components/AppSidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

export function AppShell({
	activeTela,
	onNavigate,
	children,
}: {
	activeTela: Tela
	onNavigate: (tela: Tela) => void
	children: ReactNode
}) {
	return (
		<SidebarProvider>
			<AppSidebar activeTela={activeTela} onNavigate={onNavigate} />
			<SidebarInset className="bg-n-0">
				<div className="flex min-h-svh w-full items-center justify-center p-8">
					<div className="w-full max-w-2xl">{children}</div>
				</div>
			</SidebarInset>
		</SidebarProvider>
	)
}
