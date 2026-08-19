import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Divider } from '@/components/ui/divider'
import { Field, FieldContent, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { MultiSelect } from '@/components/ui/multi-select'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { ESTADOS, getMunicipios } from '@/features/core/constants/localizacao'
import { UNIDADES_SAUDE } from '@/features/core/constants/unidadesSaude'
import {
	CATEGORIA_PROFISSIONAL_LABEL,
	CATEGORIA_PROFISSIONAL_OPCOES,
	REGISTRO_PROFISSIONAL_LABEL,
} from '@/features/usuarios/constants/categoriaProfissional'
import type { Usuario } from '@/features/usuarios/types/usuario'
import { usuarioSchema, type UsuarioFormValues } from '@/features/usuarios/validation/usuarioSchema'

const VALORES_VAZIOS: UsuarioFormValues = {
	nome: '',
	email: '',
	cpf: '',
	categoriaProfissional: 'medico',
	registroUf: '',
	registroDigitos: '',
	regiaoUf: '',
	regiaoMunicipio: '',
	ubsAtendimento: [],
}

interface UsuarioSheetProps {
	usuario?: Usuario
	open: boolean
	onOpenChange: (open: boolean) => void
	onSubmit: (dados: UsuarioFormValues) => void
}

export function UsuarioSheet({ usuario, open, onOpenChange, onSubmit }: UsuarioSheetProps) {
	const isEdit = !!usuario
	const {
		register,
		handleSubmit,
		reset,
		control,
		watch,
		setValue,
		formState: { errors },
	} = useForm<UsuarioFormValues>({
		resolver: zodResolver(usuarioSchema),
		defaultValues: VALORES_VAZIOS,
	})

	const categoriaProfissional = watch('categoriaProfissional')
	const regiaoUf = watch('regiaoUf')
	const isAdministrador = categoriaProfissional === 'administrador'
	const registroLabel = REGISTRO_PROFISSIONAL_LABEL[categoriaProfissional] ?? 'Registro'

	useEffect(() => {
		if (open) reset(usuario ?? VALORES_VAZIOS)
	}, [open, usuario, reset])

	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetContent side="right" className="flex flex-col">
				<SheetHeader className="gap-0 p-0">
					<SheetTitle>{isEdit ? 'Editar usuário' : 'Criar usuário'}</SheetTitle>
				</SheetHeader>

				<form
					id="usuario-form"
					className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto"
					onSubmit={handleSubmit(onSubmit)}
				>
					<Divider text="Informações gerais" />

					<FieldGroup>
						<Field>
							<FieldLabel htmlFor="usuario-nome" required>
								Nome
							</FieldLabel>
							<FieldContent>
								<Input id="usuario-nome" placeholder="Digite..." aria-invalid={!!errors.nome} {...register('nome')} />
								<FieldError errors={[errors.nome]} />
							</FieldContent>
						</Field>

						<Field>
							<FieldLabel htmlFor="usuario-email" required>
								Email
							</FieldLabel>
							<FieldContent>
								<Input
									id="usuario-email"
									type="email"
									placeholder="Digite..."
									aria-invalid={!!errors.email}
									{...register('email')}
								/>
								<FieldError errors={[errors.email]} />
							</FieldContent>
						</Field>

						<Field>
							<FieldLabel htmlFor="usuario-cpf" required>
								CPF
							</FieldLabel>
							<FieldContent>
								<Input id="usuario-cpf" placeholder="Digite..." aria-invalid={!!errors.cpf} {...register('cpf')} />
								<FieldError errors={[errors.cpf]} />
							</FieldContent>
						</Field>

						<Field>
							<FieldLabel htmlFor="usuario-categoria" required>
								Categoria profissional
							</FieldLabel>
							<FieldContent>
								<Controller
									name="categoriaProfissional"
									control={control}
									render={({ field }) => (
										<Select value={field.value} onValueChange={field.onChange}>
											<SelectTrigger id="usuario-categoria" className="w-full">
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												{CATEGORIA_PROFISSIONAL_OPCOES.map((opcao) => (
													<SelectItem key={opcao} value={opcao}>
														{CATEGORIA_PROFISSIONAL_LABEL[opcao]}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									)}
								/>
							</FieldContent>
						</Field>
					</FieldGroup>

					{!isAdministrador && (
						<>
							<Divider text={registroLabel} />

							<FieldGroup className="grid grid-cols-2 gap-3 space-y-0">
								<Field>
									<FieldLabel htmlFor="usuario-registro-uf" required>
										UF
									</FieldLabel>
									<FieldContent>
										<Controller
											name="registroUf"
											control={control}
											render={({ field }) => (
												<Select value={field.value} onValueChange={field.onChange}>
													<SelectTrigger id="usuario-registro-uf" className="w-full" aria-invalid={!!errors.registroUf}>
														<SelectValue placeholder="Selecione" />
													</SelectTrigger>
													<SelectContent>
														{ESTADOS.map((estado) => (
															<SelectItem key={estado.uf} value={estado.uf}>
																{estado.uf}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
											)}
										/>
										<FieldError errors={[errors.registroUf]} />
									</FieldContent>
								</Field>

								<Field>
									<FieldLabel htmlFor="usuario-registro-digitos" required>
										Dígitos
									</FieldLabel>
									<FieldContent>
										<Input
											id="usuario-registro-digitos"
											placeholder="Digite..."
											aria-invalid={!!errors.registroDigitos}
											{...register('registroDigitos')}
										/>
										<FieldError errors={[errors.registroDigitos]} />
									</FieldContent>
								</Field>
							</FieldGroup>

							<Divider text="Região de atuação" />

							<FieldGroup className="grid grid-cols-2 gap-3 space-y-0">
								<Field>
									<FieldLabel htmlFor="usuario-regiao-uf" required>
										UF
									</FieldLabel>
									<FieldContent>
										<Controller
											name="regiaoUf"
											control={control}
											render={({ field }) => (
												<Select
													value={field.value}
													onValueChange={(next) => {
														field.onChange(next)
														setValue('regiaoMunicipio', '')
													}}
												>
													<SelectTrigger id="usuario-regiao-uf" className="w-full" aria-invalid={!!errors.regiaoUf}>
														<SelectValue placeholder="Selecione" />
													</SelectTrigger>
													<SelectContent>
														{ESTADOS.map((estado) => (
															<SelectItem key={estado.uf} value={estado.uf}>
																{estado.uf}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
											)}
										/>
										<FieldError errors={[errors.regiaoUf]} />
									</FieldContent>
								</Field>

								<Field>
									<FieldLabel htmlFor="usuario-regiao-municipio" required>
										Município
									</FieldLabel>
									<FieldContent>
										<Controller
											name="regiaoMunicipio"
											control={control}
											render={({ field }) => (
												<Select value={field.value} onValueChange={field.onChange} disabled={!regiaoUf}>
													<SelectTrigger
														id="usuario-regiao-municipio"
														className="w-full"
														aria-invalid={!!errors.regiaoMunicipio}
													>
														<SelectValue placeholder="Selecione" />
													</SelectTrigger>
													<SelectContent>
														{getMunicipios(regiaoUf).map((municipio) => (
															<SelectItem key={municipio} value={municipio}>
																{municipio}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
											)}
										/>
										<FieldError errors={[errors.regiaoMunicipio]} />
									</FieldContent>
								</Field>
							</FieldGroup>

							<Field>
								<FieldLabel htmlFor="usuario-ubs" required>
									UBSs de atendimento
								</FieldLabel>
								<FieldContent>
									<Controller
										name="ubsAtendimento"
										control={control}
										render={({ field }) => (
											<MultiSelect
												id="usuario-ubs"
												options={UNIDADES_SAUDE}
												value={field.value}
												onValueChange={field.onChange}
											/>
										)}
									/>
									<FieldError errors={[errors.ubsAtendimento]} />
								</FieldContent>
							</Field>
						</>
					)}
				</form>

				<SheetFooter className="p-0">
					<Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
						Cancelar
					</Button>
					<Button type="submit" form="usuario-form">
						Confirmar
					</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	)
}
