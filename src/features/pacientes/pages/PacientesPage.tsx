import { useMemo, useState } from 'react'

import { Page } from '@/components/Layout/Page'
import { DataTable } from '@/components/ui/data-table'
import { PacienteSheet } from '@/features/pacientes/components/PacienteSheet'
import { createPacientesColumns } from '@/features/pacientes/components/pacientesDataTable/columns'
import { usePacientes, type PacienteFormValues } from '@/features/pacientes/composables/usePacientesStore'
import type { Paciente } from '@/features/pacientes/types/paciente'

export function PacientesPage() {
	const { pacientes, addPaciente, updatePaciente, toggleStatus } = usePacientes()
	const [pacienteEmEdicao, setPacienteEmEdicao] = useState<Paciente | undefined>(undefined)
	const [sheetOpen, setSheetOpen] = useState(false)

	function abrirCriacao() {
		setPacienteEmEdicao(undefined)
		setSheetOpen(true)
	}

	function handleSubmit(dados: PacienteFormValues) {
		if (pacienteEmEdicao) {
			updatePaciente(pacienteEmEdicao.id, dados)
		} else {
			addPaciente(dados)
		}
		setSheetOpen(false)
	}

	const columns = useMemo(
		() =>
			createPacientesColumns({
				onEdit: (paciente) => {
					setPacienteEmEdicao(paciente)
					setSheetOpen(true)
				},
				onToggleStatus: (paciente) => toggleStatus(paciente.id),
			}),
		[toggleStatus],
	)

	return (
		<>
			<Page
				title="Pacientes"
				description="Gerencie o cadastro das gestantes acompanhadas."
				withButton
				buttonText="Nova paciente"
				buttonProps={{ onClick: abrirCriacao }}
			>
				<DataTable
					columns={columns}
					data={pacientes}
					emptyStateTitle="Nenhuma paciente cadastrada."
					emptyStateDescription="Cadastre pacientes para poder acompanhá-las."
				/>
			</Page>

			<PacienteSheet
				paciente={pacienteEmEdicao}
				open={sheetOpen}
				onOpenChange={setSheetOpen}
				onSubmit={handleSubmit}
			/>
		</>
	)
}
