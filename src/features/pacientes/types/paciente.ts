export interface Paciente {
	id: string
	nome: string
	idadeGestacional: number
	unidade: string
	status: 'ativo' | 'bloqueado'
}
