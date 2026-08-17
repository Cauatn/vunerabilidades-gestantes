import { ClipboardList, CheckCircle2, PanelLeft, PanelLeftClose } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'

export type Tela = 'formulario' | 'resultado'

const navItems: { tela: Tela; title: string; icon: React.ReactNode }[] = [
	{ tela: 'formulario', title: 'Aplicação da Escala', icon: <ClipboardList className="size-5 shrink-0" /> },
	{ tela: 'resultado', title: 'Resultado', icon: <CheckCircle2 className="size-5 shrink-0" /> },
]

function SidebarCollapseTrigger() {
	const { state, toggleSidebar } = useSidebar()
	const collapsed = state === 'collapsed'

	return (
		<Button
			type="button"
			variant="ghost"
			size="icon"
			className="size-9 shrink-0 text-n-700 hover:bg-n-20"
			onClick={toggleSidebar}
			aria-label={collapsed ? 'Expandir menu' : 'Recolher menu'}
		>
			{collapsed ? <PanelLeft className="size-5" /> : <PanelLeftClose className="size-5" />}
		</Button>
	)
}

export function AppSidebar({ activeTela, onNavigate }: { activeTela: Tela; onNavigate: (tela: Tela) => void }) {
	return (
		<Sidebar collapsible="icon" className="border-r border-n-40 **:data-[sidebar=sidebar]:border-0">
			<SidebarHeader className="gap-0 border-b border-n-30 p-4">
				<div className="flex w-full items-center justify-between gap-2 group-data-[collapsible=icon]:justify-center">
					<div className="min-w-0 group-data-[collapsible=icon]:hidden">
						<span className="block truncate text-xl font-bold tracking-tight text-p-600">Pré-Natal</span>
					</div>
					<SidebarCollapseTrigger />
				</div>
			</SidebarHeader>
			<SidebarContent className="gap-0 px-3 py-4 group-data-[collapsible=icon]:px-0">
				<SidebarGroup className="p-0">
					<SidebarMenu>
						{navItems.map((item) => {
							const isActive = item.tela === activeTela
							return (
								<SidebarMenuItem key={item.tela}>
									<SidebarMenuButton
										isActive={isActive}
										onClick={() => onNavigate(item.tela)}
										className={cn('sidebar-nav-item-icon', isActive ? 'sidebar-nav-btn-active' : 'sidebar-nav-btn-idle')}
									>
										{item.icon}
										<span className="min-w-0 flex-1 truncate group-data-[collapsible=icon]:hidden">{item.title}</span>
									</SidebarMenuButton>
								</SidebarMenuItem>
							)
						})}
					</SidebarMenu>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter className="p-4 group-data-[collapsible=icon]:hidden">
				<p className="text-xs text-n-400">Versão 1.0 (Protótipo)</p>
			</SidebarFooter>
		</Sidebar>
	)
}
