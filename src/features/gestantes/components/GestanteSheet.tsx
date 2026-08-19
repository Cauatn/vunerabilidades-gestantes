import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { VULNERABILIDADE_LABEL, VULNERABILIDADE_OPCOES } from '@/features/gestantes/constants/vulnerabilidade'
import type { Gestante } from '@/features/gestantes/types/gestante'
import { gestanteSchema, type GestanteFormValues } from '@/features/gestantes/validation/gestanteSchema'

const VALORES_VAZIOS: GestanteFormValues = {
	nome: '',
	dataNascimento: '',
	cpf: '',
	cns: '',
	vulnerabilidade: 'baixa',
}

interface GestanteSheetProps {
	gestante?: Gestante
	open: boolean
	onOpenChange: (open: boolean) => void
	onSubmit: (dados: GestanteFormValues) => void
}

export function GestanteSheet({ gestante, open, onOpenChange, onSubmit }: GestanteSheetProps) {
	const isEdit = !!gestante
	const {
		register,
		handleSubmit,
		reset,
		control,
		formState: { errors },
	} = useForm<GestanteFormValues>({
		resolver: zodResolver(gestanteSchema),
		defaultValues: VALORES_VAZIOS,
	})

	useEffect(() => {
		if (open) {
			reset(
				gestante
					? {
							nome: gestante.nome,
							dataNascimento: gestante.dataNascimento,
							cpf: gestante.cpf,
							cns: gestante.cns,
							vulnerabilidade: gestante.vulnerabilidade,
						}
					: VALORES_VAZIOS,
			)
		}
	}, [open, gestante, reset])

	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetContent side="right" className="flex flex-col">
				<SheetHeader className="gap-0 p-0">
					<SheetTitle>{isEdit ? 'Editar gestante' : 'Nova gestante'}</SheetTitle>
				</SheetHeader>

				<form id="gestante-form" className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
					<div className="space-y-1.5">
						<Label htmlFor="gestante-nome">Nome</Label>
						<Input
							id="gestante-nome"
							placeholder="Nome da gestante"
							aria-invalid={!!errors.nome}
							{...register('nome')}
						/>
						{errors.nome ? <p className="text-caption text-danger">{errors.nome.message}</p> : null}
					</div>

					<div className="space-y-1.5">
						<Label htmlFor="gestante-data-nascimento">Data de nascimento</Label>
						<Input
							id="gestante-data-nascimento"
							type="date"
							aria-invalid={!!errors.dataNascimento}
							{...register('dataNascimento')}
						/>
						{errors.dataNascimento ? (
							<p className="text-caption text-danger">{errors.dataNascimento.message}</p>
						) : null}
					</div>

					<div className="space-y-1.5">
						<Label htmlFor="gestante-cpf">CPF</Label>
						<Input
							id="gestante-cpf"
							placeholder="000.000.000-00"
							aria-invalid={!!errors.cpf}
							{...register('cpf')}
						/>
						{errors.cpf ? <p className="text-caption text-danger">{errors.cpf.message}</p> : null}
					</div>

					<div className="space-y-1.5">
						<Label htmlFor="gestante-cns">CNS</Label>
						<Input
							id="gestante-cns"
							placeholder="0000 0000 0000 000"
							aria-invalid={!!errors.cns}
							{...register('cns')}
						/>
						{errors.cns ? <p className="text-caption text-danger">{errors.cns.message}</p> : null}
					</div>

					<div className="space-y-1.5">
						<Label htmlFor="gestante-vulnerabilidade">Vulnerabilidade</Label>
						<Controller
							name="vulnerabilidade"
							control={control}
							render={({ field }) => (
								<Select value={field.value} onValueChange={field.onChange}>
									<SelectTrigger id="gestante-vulnerabilidade" className="w-full" aria-invalid={!!errors.vulnerabilidade}>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										{VULNERABILIDADE_OPCOES.map((opcao) => (
											<SelectItem key={opcao} value={opcao}>
												{VULNERABILIDADE_LABEL[opcao]}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							)}
						/>
						{errors.vulnerabilidade ? (
							<p className="text-caption text-danger">{errors.vulnerabilidade.message}</p>
						) : null}
					</div>
				</form>

				<SheetFooter className="p-0">
					<Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
						Cancelar
					</Button>
					<Button type="submit" form="gestante-form">
						Confirmar
					</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	)
}
