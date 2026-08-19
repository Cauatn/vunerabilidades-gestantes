import type { ColumnDef } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'
import { calcularIdade, formatarDataBr } from '@/features/core/utils/date'
import { VULNERABILIDADE_BADGE_VARIANT, VULNERABILIDADE_LABEL } from '@/features/gestantes/constants/vulnerabilidade'
import type { Gestante } from '@/features/gestantes/types/gestante'
import { GestanteActionsCell } from './actionsCell'

interface CreateGestantesColumnsParams {
	onEdit: (gestante: Gestante) => void
	onVerDetalhes: (gestante: Gestante) => void
}

export function createGestantesColumns({
	onEdit,
	onVerDetalhes,
}: CreateGestantesColumnsParams): ColumnDef<Gestante>[] {
	return [
		{
			accessorKey: 'nome',
			header: 'Nome',
			cell: ({ getValue }) => <span className="font-medium text-n-700">{getValue() as string}</span>,
		},
		{
			id: 'idade',
			header: 'Idade',
			cell: ({ row }) => calcularIdade(row.original.dataNascimento),
		},
		{
			accessorKey: 'dataNascimento',
			header: 'Data de nascimento',
			cell: ({ getValue }) => formatarDataBr(getValue() as string),
		},
		{
			accessorKey: 'cpf',
			header: 'CPF',
		},
		{
			accessorKey: 'cns',
			header: 'CNS',
		},
		{
			accessorKey: 'vulnerabilidade',
			header: 'Vulnerabilidade',
			cell: ({ getValue }) => {
				const vulnerabilidade = getValue() as Gestante['vulnerabilidade']
				return (
					<Badge variant={VULNERABILIDADE_BADGE_VARIANT[vulnerabilidade]}>
						{VULNERABILIDADE_LABEL[vulnerabilidade]}
					</Badge>
				)
			},
		},
		{
			id: 'actions',
			cell: ({ row }) => (
				<GestanteActionsCell gestante={row.original} onEdit={onEdit} onVerDetalhes={onVerDetalhes} />
			),
		},
	]
}
