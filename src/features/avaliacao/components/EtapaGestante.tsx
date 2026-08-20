import { useState } from 'react'

import { Combobox } from '@/components/ui/combobox'
import { Divider } from '@/components/ui/divider'
import { Field, FieldContent, FieldLabel } from '@/components/ui/field'
import { GestanteResumoCard } from '@/features/avaliacao/components/GestanteResumoCard'
import { GestanteSheet } from '@/features/gestantes/components/GestanteSheet'
import { useGestantes } from '@/features/gestantes/composables/useGestantesStore'
import type { Gestante } from '@/features/gestantes/types/gestante'
import type { GestanteFormValues } from '@/features/gestantes/validation/gestanteSchema'

interface EtapaGestanteProps {
	gestantes: Gestante[]
	gestanteId: string | null
	onGestanteChange: (id: string) => void
}

export function EtapaGestante({ gestantes, gestanteId, onGestanteChange }: EtapaGestanteProps) {
	const { addGestante } = useGestantes()
	const [sheetAberto, setSheetAberto] = useState(false)
	const [nomeBuscado, setNomeBuscado] = useState('')

	const gestanteSelecionada = gestantes.find((gestante) => gestante.id === gestanteId)

	function handleCriarGestante(dados: GestanteFormValues) {
		const id = addGestante(dados)
		onGestanteChange(id)
		setSheetAberto(false)
	}

	return (
		<div className="flex flex-col gap-3">
			<Divider text="Dados da gestante" />

			<Field className="max-w-[534px]">
				<FieldLabel htmlFor="avaliacao-gestante" required>
					Gestante
				</FieldLabel>
				<FieldContent>
					<Combobox
						id="avaliacao-gestante"
						options={gestantes.map((gestante) => ({ value: gestante.id, label: gestante.nome }))}
						value={gestanteId ?? undefined}
						onValueChange={onGestanteChange}
						emptyMessage="Nenhuma gestante encontrada."
						createNewLabel="Cadastrar nova gestante"
						onCreateNew={(query) => {
							setNomeBuscado(query)
							setSheetAberto(true)
						}}
					/>
				</FieldContent>
			</Field>

			{gestanteSelecionada && <GestanteResumoCard gestante={gestanteSelecionada} />}

			<GestanteSheet
				open={sheetAberto}
				onOpenChange={setSheetAberto}
				onSubmit={handleCriarGestante}
				nomeInicial={nomeBuscado}
			/>
		</div>
	)
}
