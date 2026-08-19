import type { ColumnDef } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'
import { CATEGORIA_PROFISSIONAL_LABEL, REGISTRO_PROFISSIONAL_LABEL } from '@/features/usuarios/constants/categoriaProfissional'
import type { Usuario } from '@/features/usuarios/types/usuario'
import { UsuarioActionsCell } from './actionsCell'

const MAX_UBS_VISIVEIS = 2

interface CreateUsuariosColumnsParams {
	onEdit: (usuario: Usuario) => void
}

export function createUsuariosColumns({ onEdit }: CreateUsuariosColumnsParams): ColumnDef<Usuario>[] {
	return [
		{
			accessorKey: 'nome',
			header: 'Nome',
			cell: ({ getValue }) => <span className="font-medium text-n-700">{getValue() as string}</span>,
		},
		{
			accessorKey: 'email',
			header: 'Email',
		},
		{
			accessorKey: 'cpf',
			header: 'CPF',
		},
		{
			id: 'registro',
			header: 'CRM/Coren',
			cell: ({ row }) => {
				const usuario = row.original
				const label = REGISTRO_PROFISSIONAL_LABEL[usuario.categoriaProfissional]
				if (!label || !usuario.registroDigitos) return <span className="text-n-400">-</span>
				return (
					<span className="whitespace-nowrap">
						{label}/{usuario.registroUf} {usuario.registroDigitos}
					</span>
				)
			},
		},
		{
			accessorKey: 'categoriaProfissional',
			header: 'Categoria profissional',
			cell: ({ getValue }) => CATEGORIA_PROFISSIONAL_LABEL[getValue() as Usuario['categoriaProfissional']],
		},
		{
			id: 'ubsAtendimento',
			header: 'UBS de atendimento',
			cell: ({ row }) => {
				const ubs = row.original.ubsAtendimento
				if (ubs.length === 0) return <span className="text-n-400">-</span>

				const visiveis = ubs.slice(0, MAX_UBS_VISIVEIS)
				const restantes = ubs.length - visiveis.length

				return (
					<div className="flex flex-wrap items-center gap-1">
						{visiveis.map((nome) => (
							<Badge key={nome} variant="neutral">
								{nome}
							</Badge>
						))}
						{restantes > 0 ? <Badge variant="outline">+{restantes}</Badge> : null}
					</div>
				)
			},
		},
		{
			accessorKey: 'regiaoMunicipio',
			header: 'Município',
			cell: ({ row }) => {
				const usuario = row.original
				if (!usuario.regiaoMunicipio) return <span className="text-n-400">-</span>
				return `${usuario.regiaoMunicipio} - ${usuario.regiaoUf}`
			},
		},
		{
			id: 'actions',
			cell: ({ row }) => <UsuarioActionsCell usuario={row.original} onEdit={onEdit} />,
		},
	]
}
