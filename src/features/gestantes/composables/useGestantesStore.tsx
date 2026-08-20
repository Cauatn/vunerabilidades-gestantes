import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'

import type { Gestante } from '@/features/gestantes/types/gestante'
import type { GestanteFormValues } from '@/features/gestantes/validation/gestanteSchema'

const GESTANTES_INICIAIS: Gestante[] = [
	{
		id: 'g1',
		nome: 'Antonietta Silva',
		dataNascimento: '2001-04-01',
		cpf: '000.000.000-00',
		cns: '1234 5678 9012 345',
		vulnerabilidade: 'baixa',
	},
	{
		id: 'g2',
		nome: 'Patricia Ferreira',
		dataNascimento: '2002-12-27',
		cpf: '000.000.000-00',
		cns: '1234 5678 9012 345',
		vulnerabilidade: 'alta',
	},
	{
		id: 'g3',
		nome: 'Claudiana Cruz',
		dataNascimento: '2000-01-01',
		cpf: '000.000.000-00',
		cns: '1234 5678 9012 345',
		vulnerabilidade: 'moderada',
	},
]

export type { GestanteFormValues }

interface GestantesContextValue {
	gestantes: Gestante[]
	addGestante: (dados: GestanteFormValues) => string
	updateGestante: (id: string, dados: GestanteFormValues) => void
}

const GestantesContext = createContext<GestantesContextValue | null>(null)

export function GestantesProvider({ children }: { children: ReactNode }) {
	const [gestantes, setGestantes] = useState<Gestante[]>(GESTANTES_INICIAIS)

	const value = useMemo<GestantesContextValue>(
		() => ({
			gestantes,
			addGestante: (dados) => {
				const id = crypto.randomUUID()
				setGestantes((atual) => [...atual, { id, ...dados }])
				return id
			},
			updateGestante: (id, dados) =>
				setGestantes((atual) => atual.map((gestante) => (gestante.id === id ? { ...gestante, ...dados } : gestante))),
		}),
		[gestantes],
	)

	return <GestantesContext.Provider value={value}>{children}</GestantesContext.Provider>
}

export function useGestantes() {
	const context = useContext(GestantesContext)
	if (!context) throw new Error('useGestantes deve ser usado dentro de um GestantesProvider')
	return context
}
