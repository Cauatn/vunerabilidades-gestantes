import type { ColumnDef } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'
import { DataTable } from '@/components/ui/data-table'
import { Page } from '@/components/Layout/Page'
import { formatarDataBr } from '@/features/core/utils/date'
import { VULNERABILIDADE_BADGE_VARIANT, VULNERABILIDADE_LABEL } from '@/features/gestantes/constants/vulnerabilidade'
import type { Vulnerabilidade } from '@/features/gestantes/types/gestante'

interface HistoricoAplicacao {
	id: string
	gestante: string
	data: string
	vulnerabilidade: Vulnerabilidade
	aplicadoPor: string
}

const HISTORICO: HistoricoAplicacao[] = [
	{ id: 'h1', gestante: 'Antonietta Silva', data: '2026-08-12', vulnerabilidade: 'baixa', aplicadoPor: 'José Victor' },
	{ id: 'h2', gestante: 'Patricia Ferreira', data: '2026-08-05', vulnerabilidade: 'alta', aplicadoPor: 'José Victor' },
	{ id: 'h3', gestante: 'Claudiana Cruz', data: '2026-07-28', vulnerabilidade: 'moderada', aplicadoPor: 'José Victor' },
]

const columns: ColumnDef<HistoricoAplicacao>[] = [
	{
		accessorKey: 'gestante',
		header: 'Gestante',
		cell: ({ getValue }) => <span className="font-medium text-n-700">{getValue() as string}</span>,
	},
	{
		accessorKey: 'data',
		header: 'Data da aplicação',
		cell: ({ getValue }) => formatarDataBr(getValue() as string),
	},
	{
		accessorKey: 'vulnerabilidade',
		header: 'Vulnerabilidade',
		cell: ({ getValue }) => {
			const vulnerabilidade = getValue() as Vulnerabilidade
			return <Badge variant={VULNERABILIDADE_BADGE_VARIANT[vulnerabilidade]}>{VULNERABILIDADE_LABEL[vulnerabilidade]}</Badge>
		},
	},
	{
		accessorKey: 'aplicadoPor',
		header: 'Aplicado por',
	},
]

export function HistoricoPage() {
	return (
		<Page title="Histórico" description="Aplicações da Escala já realizadas.">
			<DataTable
				columns={columns}
				data={HISTORICO}
				emptyStateTitle="Nenhuma aplicação registrada."
				emptyStateDescription="As aplicações da escala aparecerão aqui."
			/>
		</Page>
	)
}
