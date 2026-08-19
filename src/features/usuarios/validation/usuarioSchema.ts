import { z } from 'zod'

export const usuarioSchema = z
	.object({
		nome: z.string().min(1, 'Informe o nome.'),
		email: z.string().min(1, 'Informe o e-mail.').email('E-mail inválido.'),
		cpf: z.string().min(1, 'Informe o CPF.'),
		categoriaProfissional: z.enum(['medico', 'enfermeiro', 'administrador'], {
			error: 'Selecione a categoria profissional.',
		}),
		registroUf: z.string(),
		registroDigitos: z.string(),
		regiaoUf: z.string(),
		regiaoMunicipio: z.string(),
		ubsAtendimento: z.array(z.string()),
	})
	.superRefine((dados, ctx) => {
		if (dados.categoriaProfissional === 'administrador') return

		if (!dados.registroUf) ctx.addIssue({ code: 'custom', path: ['registroUf'], message: 'Selecione a UF.' })
		if (!dados.registroDigitos)
			ctx.addIssue({ code: 'custom', path: ['registroDigitos'], message: 'Informe os dígitos.' })
		if (!dados.regiaoUf) ctx.addIssue({ code: 'custom', path: ['regiaoUf'], message: 'Selecione a UF.' })
		if (!dados.regiaoMunicipio)
			ctx.addIssue({ code: 'custom', path: ['regiaoMunicipio'], message: 'Selecione o município.' })
		if (dados.ubsAtendimento.length === 0)
			ctx.addIssue({ code: 'custom', path: ['ubsAtendimento'], message: 'Selecione ao menos uma UBS.' })
	})

export type UsuarioFormValues = z.infer<typeof usuarioSchema>
