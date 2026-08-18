import { LockKeyhole, LockKeyholeOpen, SquarePen } from 'lucide-react'

import { IconButton } from '@/components/ui/icon-button'
import type { Paciente } from '@/features/pacientes/types/paciente'

interface PacienteActionsCellProps {
	paciente: Paciente
	onEdit: (paciente: Paciente) => void
	onToggleStatus: (paciente: Paciente) => void
}

export function PacienteActionsCell({ paciente, onEdit, onToggleStatus }: PacienteActionsCellProps) {
	const isAtivo = paciente.status === 'ativo'

	return (
		<div className="flex items-center justify-end gap-1">
			<IconButton icon={SquarePen} tooltipText="Editar paciente" onClick={() => onEdit(paciente)} />
			<IconButton
				icon={isAtivo ? LockKeyhole : LockKeyholeOpen}
				tooltipText={isAtivo ? 'Bloquear paciente' : 'Desbloquear paciente'}
				variant={isAtivo ? 'danger' : 'default'}
				onClick={() => onToggleStatus(paciente)}
			/>
		</div>
	)
}
