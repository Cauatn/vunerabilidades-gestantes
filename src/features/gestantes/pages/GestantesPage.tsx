import { useState } from 'react'

import { Page } from '@/components/Layout/Page'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { Input } from '@/components/ui/input'
import { Pagination } from '@/components/ui/pagination'
import { GestanteSheet } from '@/features/gestantes/components/GestanteSheet'
import { createGestantesColumns } from '@/features/gestantes/components/gestantesDataTable/columns'
import { useGestantesListagem } from '@/features/gestantes/composables/useGestantesListagem'
import {
	useGestantes,
	type GestanteFormValues,
} from '@/features/gestantes/composables/useGestantesStore'
import type { Gestante } from '@/features/gestantes/types/gestante'

export function GestantesPage() {
	const { gestantes, addGestante, updateGestante } = useGestantes()
	const { termoBusca, setTermoBusca, aplicarBusca, page, setPage, totalPages, gestantesPagina } =
		useGestantesListagem(gestantes)

	const [gestanteEmEdicao, setGestanteEmEdicao] = useState<Gestante | undefined>(undefined)
	const [sheetOpen, setSheetOpen] = useState(false)

	function abrirCriacao() {
		setGestanteEmEdicao(undefined)
		setSheetOpen(true)
	}

	function handleSubmit(dados: GestanteFormValues) {
		if (gestanteEmEdicao) {
			updateGestante(gestanteEmEdicao.id, dados)
		} else {
			addGestante(dados)
		}
		setSheetOpen(false)
	}

	const columns = createGestantesColumns({
		onEdit: (gestante) => {
			setGestanteEmEdicao(gestante)
			setSheetOpen(true)
		},
		onVerDetalhes: (gestante) => {
			setGestanteEmEdicao(gestante)
			setSheetOpen(true)
		},
	})

	return (
		<>
			<Page
				title="Gestantes"
				description="Gerencie as gestantes cadastradas no sistema."
				withButton
				buttonText="Criar gestante"
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
					data={gestantesPagina}
					emptyStateTitle="Nenhuma gestante encontrada."
					emptyStateDescription="Cadastre gestantes para poder acompanhá-las."
				/>

				<Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
			</Page>

			<GestanteSheet
				gestante={gestanteEmEdicao}
				open={sheetOpen}
				onOpenChange={setSheetOpen}
				onSubmit={handleSubmit}
			/>
		</>
	)
}
