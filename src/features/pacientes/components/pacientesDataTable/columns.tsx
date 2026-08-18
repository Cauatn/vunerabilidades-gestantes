import type { ColumnDef } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'
import type { Paciente } from '@/features/pacientes/types/paciente'
import { PacienteActionsCell } from './actionsCell'

interface CreatePacientesColumnsParams {
	onEdit: (paciente: Paciente) => void
	onToggleStatus: (paciente: Paciente) => void
}

export function createPacientesColumns({
	onEdit,
	onToggleStatus,
}: CreatePacientesColumnsParams): ColumnDef<Paciente>[] {
	return [
		{
			accessorKey: 'nome',
			header: 'Nome',
			cell: ({ getValue }) => <span className="font-medium text-n-700">{getValue() as string}</span>,
		},
		{
			accessorKey: 'idadeGestacional',
			header: 'Idade gestacional',
			cell: ({ getValue }) => <span>{getValue() as number} semanas</span>,
		},
		{
			accessorKey: 'unidade',
			header: 'Unidade',
		},
		{
			id: 'status',
			accessorKey: 'status',
			header: 'Status',
			cell: ({ row }) => {
				const isAtivo = row.original.status === 'ativo'
				return (
					<Badge variant={isAtivo ? 'green' : 'red'} className="capitalize">
						{isAtivo ? 'Ativo' : 'Bloqueado'}
					</Badge>
				)
			},
		},
		{
			id: 'actions',
			cell: ({ row }) => (
				<PacienteActionsCell paciente={row.original} onEdit={onEdit} onToggleStatus={onToggleStatus} />
			),
		},
	]
}
