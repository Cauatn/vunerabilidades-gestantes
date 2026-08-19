import { z } from 'zod'

export const gestanteSchema = z.object({
	nome: z.string().min(1, 'Informe o nome.'),
	dataNascimento: z.string().min(1, 'Informe a data de nascimento.'),
	cpf: z.string().min(1, 'Informe o CPF.'),
	cns: z.string().min(1, 'Informe o CNS.'),
	vulnerabilidade: z.enum(['baixa', 'moderada', 'alta'], { error: 'Selecione a vulnerabilidade.' }),
})

export type GestanteFormValues = z.infer<typeof gestanteSchema>
