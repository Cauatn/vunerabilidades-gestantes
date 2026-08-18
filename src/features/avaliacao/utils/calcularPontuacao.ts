const PESOS: Record<string, number> = {
	Sim: 0,
	Parcialmente: 6,
	'Trabalho informal': 6,
	Não: 12,
}

export function calcularPontuacao(respostas: Record<string, string>) {
	const valores = Object.values(respostas)
	if (valores.length === 0) return 12
	const soma = valores.reduce((total, resposta) => total + (PESOS[resposta] ?? 0), 0)
	return Math.round(soma / valores.length)
}

export function classificar(pontuacao: number) {
	if (pontuacao <= 3) return 'BAIXA' as const
	if (pontuacao <= 8) return 'MODERADA' as const
	return 'ALTA' as const
}
