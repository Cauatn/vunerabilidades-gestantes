export type Vulnerabilidade = 'baixa' | 'moderada' | 'alta'

export interface Gestante {
	id: string
	nome: string
	dataNascimento: string
	cpf: string
	cns: string
	vulnerabilidade: Vulnerabilidade
}
