export interface Pergunta {
	id: string
	texto: string
	opcoes: string[]
}

export const PERGUNTAS: Pergunta[] = [
	{
		id: 'renda',
		texto: 'A renda familiar é suficiente para atender às necessidades básicas?',
		opcoes: ['Sim', 'Parcialmente', 'Não'],
	},
	{
		id: 'vinculo',
		texto: 'A gestante possui vínculo empregatício?',
		opcoes: ['Sim', 'Não', 'Trabalho informal'],
	},
]

export const PESOS: Record<string, number> = {
	Sim: 0,
	Parcialmente: 6,
	'Trabalho informal': 6,
	Não: 12,
}

export interface Recomendacao {
	id: string
	texto: string
}

export const RECOMENDACOES: Recomendacao[] = [
	{ id: 'prontuario', texto: 'Registrar os resultados no prontuário.' },
	{ id: 'equipe', texto: 'Discutir o caso com a equipe de saúde.' },
	{ id: 'necessidades', texto: 'Avaliar outras necessidades da gestante.' },
	{ id: 'protocolos', texto: 'Definir as condutas conforme os protocolos da unidade.' },
	{ id: 'julgamento', texto: 'O julgamento clínico do profissional deve prevalecer.' },
]
