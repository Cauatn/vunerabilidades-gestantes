export type CategoriaProfissional = 'medico' | 'enfermeiro' | 'administrador'

export interface Usuario {
	id: string
	nome: string
	email: string
	cpf: string
	categoriaProfissional: CategoriaProfissional
	registroUf: string
	registroDigitos: string
	regiaoUf: string
	regiaoMunicipio: string
	ubsAtendimento: string[]
}
