import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'

import type { Paciente } from '@/features/pacientes/types/paciente'

const PACIENTES_INICIAIS: Paciente[] = [
	{ id: 'p1', nome: 'Maria Souza', idadeGestacional: 24, unidade: 'UBS Jardim das Flores', status: 'ativo' },
	{ id: 'p2', nome: 'Ana Oliveira', idadeGestacional: 12, unidade: 'UBS Vila Nova', status: 'ativo' },
	{ id: 'p3', nome: 'Juliana Costa', idadeGestacional: 32, unidade: 'UBS Jardim das Flores', status: 'bloqueado' },
]

export type PacienteFormValues = Omit<Paciente, 'id' | 'status'>

interface PacientesContextValue {
	pacientes: Paciente[]
	addPaciente: (dados: PacienteFormValues) => void
	updatePaciente: (id: string, dados: PacienteFormValues) => void
	toggleStatus: (id: string) => void
}

const PacientesContext = createContext<PacientesContextValue | null>(null)

export function PacientesProvider({ children }: { children: ReactNode }) {
	const [pacientes, setPacientes] = useState<Paciente[]>(PACIENTES_INICIAIS)

	const value = useMemo<PacientesContextValue>(
		() => ({
			pacientes,
			addPaciente: (dados) =>
				setPacientes((atual) => [...atual, { id: crypto.randomUUID(), status: 'ativo', ...dados }]),
			updatePaciente: (id, dados) =>
				setPacientes((atual) => atual.map((paciente) => (paciente.id === id ? { ...paciente, ...dados } : paciente))),
			toggleStatus: (id) =>
				setPacientes((atual) =>
					atual.map((paciente) =>
						paciente.id === id
							? { ...paciente, status: paciente.status === 'ativo' ? 'bloqueado' : 'ativo' }
							: paciente,
					),
				),
		}),
		[pacientes],
	)

	return <PacientesContext.Provider value={value}>{children}</PacientesContext.Provider>
}

export function usePacientes() {
	const context = useContext(PacientesContext)
	if (!context) throw new Error('usePacientes deve ser usado dentro de um PacientesProvider')
	return context
}
