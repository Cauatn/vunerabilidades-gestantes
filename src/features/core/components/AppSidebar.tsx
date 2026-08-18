import { CheckCircle2, ClipboardList, PanelLeft, PanelLeftClose, Settings, Users } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

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
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navItems: { url: string; title: string; icon: React.ReactNode }[] = [
	{ url: '/', title: 'Pacientes', icon: <Users className="size-6 shrink-0" /> },
	{ url: '/formulario', title: 'Aplicação da Escala', icon: <ClipboardList className="size-6 shrink-0" /> },
	{ url: '/resultado', title: 'Resultado', icon: <CheckCircle2 className="size-6 shrink-0" /> },
	{ url: '/configuracao', title: 'Configurar Formulário', icon: <Settings className="size-6 shrink-0" /> },
]

function SidebarCollapseTrigger() {
	const { state, toggleSidebar } = useSidebar()
	const collapsed = state === 'collapsed'

	return (
		<Button
			type="button"
			variant="ghost"
			size="icon"
			className="size-11 shrink-0 text-n-700 hover:bg-n-20 md:size-8"
			onClick={toggleSidebar}
			aria-label={collapsed ? 'Expandir menu' : 'Recolher menu'}
		>
			{collapsed ? <PanelLeft className="size-6 md:size-5" /> : <PanelLeftClose className="size-6 md:size-5" />}
		</Button>
	)
}

export function AppSidebar() {
	const location = useLocation()

	return (
		<Sidebar collapsible="icon" className="border-r border-n-40 **:data-[sidebar=sidebar]:border-0">
			<SidebarHeader className="gap-0 border-b border-n-30 p-4">
				<div className="flex w-full items-center justify-between gap-2 group-data-[collapsible=icon]:justify-center">
					<div className="min-w-0 group-data-[collapsible=icon]:hidden">
						<span className="block truncate text-2xl font-bold tracking-tight text-p-600">Pré-Natal</span>
					</div>
					<SidebarCollapseTrigger />
				</div>
			</SidebarHeader>
			<SidebarContent className="gap-0 px-3 py-4 group-data-[collapsible=icon]:px-0">
				<SidebarGroup className="p-0">
					<SidebarMenu>
						{navItems.map((item) => {
							const isActive = location.pathname === item.url
							return (
								<SidebarMenuItem key={item.url}>
									<SidebarMenuButton
										asChild
										isActive={isActive}
										size="lg"
										className={cn(
											'sidebar-nav-item-icon gap-3 px-3 text-base',
											isActive ? 'sidebar-nav-btn-active' : 'sidebar-nav-btn-idle',
										)}
									>
										<Link to={item.url}>
											{item.icon}
											<span className="min-w-0 flex-1 truncate group-data-[collapsible=icon]:hidden">
												{item.title}
											</span>
										</Link>
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
