import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import aplicacaoIllustration from '@/assets/illustrations/aplicacao-gestante.png'
import { Page } from '@/components/Layout/Page'
import { Button } from '@/components/ui/button'
import { FormularioExemplo } from '@/features/avaliacao/components/FormularioExemplo'

function AvisoInicial({ onIniciar }: { onIniciar: () => void }) {
	return (
		<Page title={'Aplicação da Escala Brasileira de Vulnerabilidade Social no Pré-Natal'} description={'Aplique o formulário da Escala Brasileira de Vulnerabilidade Social no Pré-Natal em sua consulta.'}>
			<div className="flex flex-1 flex-col items-center justify-center gap-10 text-center">
				<img src={aplicacaoIllustration} alt="" className="h-auto w-full max-w-md" />

				<div className="flex max-w-2xl flex-col gap-3">
					<p className="text-xl font-semibold text-n-900">
						Leia cada pergunta juntamente com a gestante e selecione a alternativa que melhor
						representa sua situação atual.
					</p>
					<p className="text-sm text-n-600">
						O formulário aceita somente uma resposta por pergunta. O resultado auxilia na tomada
						de decisão clínica e não substitui o julgamento profissional.
					</p>
				</div>

				<Button size="lg" onClick={onIniciar}>
					Iniciar
				</Button>
			</div>
		</Page>
	)
}

export function FormularioPage() {
	const navigate = useNavigate()
	const [iniciado, setIniciado] = useState(false)

	if (!iniciado) {
		return <AvisoInicial onIniciar={() => setIniciado(true)} />
	}

	return <FormularioExemplo onProximo={(respostas) => navigate('/resultado', { state: { respostas } })} />
}
