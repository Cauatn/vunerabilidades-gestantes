import { useLocation, useNavigate } from 'react-router-dom'

import { ResultadoAvaliacao } from '@/features/avaliacao/components/ResultadoAvaliacao'
import { calcularPontuacao, classificar } from '@/features/avaliacao/utils/calcularPontuacao'

export function ResultadoPage() {
	const navigate = useNavigate()
	const location = useLocation()
	const respostas = (location.state as { respostas?: Record<string, string> } | null)?.respostas ?? {}
	const pontuacao = calcularPontuacao(respostas)

	return (
		<ResultadoAvaliacao
			pontuacao={pontuacao}
			classificacao={classificar(pontuacao)}
			onVoltar={() => navigate('/')}
		/>
	)
}
