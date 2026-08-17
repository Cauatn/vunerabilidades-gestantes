import { useState } from 'react'

import { AppShell } from '@/components/AppShell'
import { FormularioExemplo } from '@/features/avaliacao/components/FormularioExemplo'
import { ResultadoAvaliacao } from '@/features/avaliacao/components/ResultadoAvaliacao'
import type { Tela } from '@/features/core/components/AppSidebar'

function calcularPontuacao(respostas: Record<string, string>) {
	const pesos: Record<string, number> = {
		Sim: 0,
		Parcialmente: 6,
		'Trabalho informal': 6,
		Não: 12,
	}
	const valores = Object.values(respostas)
	if (valores.length === 0) return 12
	const soma = valores.reduce((total, resposta) => total + (pesos[resposta] ?? 0), 0)
	return Math.round(soma / valores.length)
}

function classificar(pontuacao: number) {
	if (pontuacao <= 3) return 'BAIXA' as const
	if (pontuacao <= 8) return 'MODERADA' as const
	return 'ALTA' as const
}

function App() {
	const [tela, setTela] = useState<Tela>('formulario')
	const [respostas, setRespostas] = useState<Record<string, string>>({})
	const pontuacao = calcularPontuacao(respostas)

	return (
		<AppShell activeTela={tela} onNavigate={setTela}>
			{tela === 'resultado' ? (
				<ResultadoAvaliacao
					pontuacao={pontuacao}
					classificacao={classificar(pontuacao)}
					onVoltar={() => setTela('formulario')}
				/>
			) : (
				<FormularioExemplo
					onProximo={(r) => {
						setRespostas(r)
						setTela('resultado')
					}}
				/>
			)}
		</AppShell>
	)
}

export default App
