import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import type { PacienteFormValues } from '@/features/pacientes/composables/usePacientesStore'
import type { Paciente } from '@/features/pacientes/types/paciente'

const VALORES_VAZIOS: PacienteFormValues = { nome: '', idadeGestacional: 0, unidade: '' }

interface PacienteSheetProps {
	paciente?: Paciente
	open: boolean
	onOpenChange: (open: boolean) => void
	onSubmit: (dados: PacienteFormValues) => void
}

export function PacienteSheet({ paciente, open, onOpenChange, onSubmit }: PacienteSheetProps) {
	const isEdit = !!paciente
	const [valores, setValores] = useState<PacienteFormValues>(VALORES_VAZIOS)

	useEffect(() => {
		if (open) {
			setValores(
				paciente
					? { nome: paciente.nome, idadeGestacional: paciente.idadeGestacional, unidade: paciente.unidade }
					: VALORES_VAZIOS,
			)
		}
	}, [open, paciente])

	const podeConfirmar = valores.nome.trim().length > 0 && valores.unidade.trim().length > 0

	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetContent side="right" className="flex flex-col">
				<SheetHeader className="gap-0 p-0">
					<SheetTitle>{isEdit ? 'Editar paciente' : 'Nova paciente'}</SheetTitle>
				</SheetHeader>

				<form
					id="paciente-form"
					className="flex flex-col gap-4"
					onSubmit={(event) => {
						event.preventDefault()
						if (podeConfirmar) onSubmit(valores)
					}}
				>
					<div className="space-y-1.5">
						<Label htmlFor="paciente-nome">Nome</Label>
						<Input
							id="paciente-nome"
							value={valores.nome}
							placeholder="Nome da paciente"
							onChange={(event) => setValores((v) => ({ ...v, nome: event.target.value }))}
						/>
					</div>

					<div className="space-y-1.5">
						<Label htmlFor="paciente-idade-gestacional">Idade gestacional (semanas)</Label>
						<Input
							id="paciente-idade-gestacional"
							type="number"
							min={0}
							max={42}
							value={valores.idadeGestacional}
							onChange={(event) =>
								setValores((v) => ({ ...v, idadeGestacional: Number(event.target.value) }))
							}
						/>
					</div>

					<div className="space-y-1.5">
						<Label htmlFor="paciente-unidade">Unidade de saúde</Label>
						<Input
							id="paciente-unidade"
							value={valores.unidade}
							placeholder="Ex.: UBS Jardim das Flores"
							onChange={(event) => setValores((v) => ({ ...v, unidade: event.target.value }))}
						/>
					</div>
				</form>

				<SheetFooter className="p-0">
					<Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
						Cancelar
					</Button>
					<Button type="submit" form="paciente-form" disabled={!podeConfirmar}>
						Confirmar
					</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	)
}
