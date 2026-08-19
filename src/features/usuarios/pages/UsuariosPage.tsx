import { useState } from 'react'

import { Page } from '@/components/Layout/Page'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { Input } from '@/components/ui/input'
import { Pagination } from '@/components/ui/pagination'
import { UsuarioSheet } from '@/features/usuarios/components/UsuarioSheet'
import { createUsuariosColumns } from '@/features/usuarios/components/usuariosDataTable/columns'
import { useUsuariosListagem } from '@/features/usuarios/composables/useUsuariosListagem'
import { useUsuarios, type UsuarioFormValues } from '@/features/usuarios/composables/useUsuariosStore'
import type { Usuario } from '@/features/usuarios/types/usuario'

export function UsuariosPage() {
	const { usuarios, addUsuario, updateUsuario } = useUsuarios()
	const { termoBusca, setTermoBusca, aplicarBusca, page, setPage, totalPages, usuariosPagina } =
		useUsuariosListagem(usuarios)

	const [usuarioEmEdicao, setUsuarioEmEdicao] = useState<Usuario | undefined>(undefined)
	const [dialogOpen, setDialogOpen] = useState(false)

	function abrirCriacao() {
		setUsuarioEmEdicao(undefined)
		setDialogOpen(true)
	}

	function handleSubmit(dados: UsuarioFormValues) {
		if (usuarioEmEdicao) {
			updateUsuario(usuarioEmEdicao.id, dados)
		} else {
			addUsuario(dados)
		}
		setDialogOpen(false)
	}

	const columns = createUsuariosColumns({
		onEdit: (usuario) => {
			setUsuarioEmEdicao(usuario)
			setDialogOpen(true)
		},
	})

	return (
		<>
			<Page
				title="Usuários"
				description="Gerencie os usuários cadastrados no sistema."
				withButton
				buttonText="Criar usuário"
				buttonProps={{ onClick: abrirCriacao }}
			>
				<div className="flex items-center gap-3">
					<Input
						placeholder="Digite..."
						value={termoBusca}
						onChange={(event) => setTermoBusca(event.target.value)}
						onKeyDown={(event) => {
							if (event.key === 'Enter') aplicarBusca()
						}}
						className="flex-1"
					/>
					<Button type="button" onClick={aplicarBusca}>
						Buscar
					</Button>
					<Button type="button" variant="outline">
						Filtros
					</Button>
				</div>

				<DataTable
					columns={columns}
					data={usuariosPagina}
					emptyStateTitle="Nenhum usuário encontrado."
					emptyStateDescription="Cadastre usuários para dar acesso ao sistema."
				/>

				<Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
			</Page>

			<UsuarioSheet
				usuario={usuarioEmEdicao}
				open={dialogOpen}
				onOpenChange={setDialogOpen}
				onSubmit={handleSubmit}
			/>
		</>
	)
}
