import { useState } from 'react'

import { Page } from '@/components/Layout/Page'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Pergunta {
	id: string
	texto: string
	opcoes: string[]
}

const PERGUNTAS: Pergunta[] = [
	{
		id: 'renda',
		texto: '1. A renda familiar é suficiente para atender às necessidades básicas?',
		opcoes: ['Sim', 'Parcialmente', 'Não'],
	},
	{
		id: 'vinculo',
		texto: '2. A gestante possui vínculo empregatício?',
		opcoes: ['Sim', 'Não', 'Trabalho informal'],
	},
]

function RadioOption({
	label,
	selected,
	onSelect,
}: {
	label: string
	selected: boolean
	onSelect: () => void
}) {
	return (
		<button
			type="button"
			onClick={onSelect}
			className="flex items-center gap-3 py-1 text-left text-[15px] text-n-700"
		>
			<span
				className={cn(
					'flex size-6 shrink-0 items-center justify-center rounded-full border-2 border-n-100',
					selected && 'border-p-500',
				)}
			>
				{selected && <span className="size-3 rounded-full bg-p-500" />}
			</span>
			{label}
		</button>
	)
}

interface FormularioExemploProps {
	onProximo?: (respostas: Record<string, string>) => void
}

export function FormularioExemplo({ onProximo }: FormularioExemploProps) {
	const [respostas, setRespostas] = useState<Record<string, string>>({})

	const respondidas = PERGUNTAS.filter((p) => respostas[p.id]).length
	const progresso = Math.round((respondidas / PERGUNTAS.length) * 100)

	return (
		<Page title="Aplicação da Escala" description="Preencha as informações básicas.">
			<div className="max-w-4xl space-y-8">
				<div className="h-2 w-full max-w-2xl rounded-full bg-n-30">
					<div
						className="h-2 rounded-full bg-p-400 transition-all"
						style={{ width: `${Math.max(progresso, 12)}%` }}
					/>
				</div>

				<div className="flex flex-col gap-4">
					<p className="text-lg font-semibold text-p-600">Condições socioeconômicas</p>

					<div className="grid grid-cols-1 gap-x-12 gap-y-8 sm:grid-cols-2">
						{PERGUNTAS.map((pergunta) => (
							<div key={pergunta.id} className="flex flex-col gap-1">
								<p className="mb-1 text-[15px] font-medium text-n-700">{pergunta.texto}</p>
								{pergunta.opcoes.map((opcao) => (
									<RadioOption
										key={opcao}
										label={opcao}
										selected={respostas[pergunta.id] === opcao}
										onSelect={() => setRespostas((r) => ({ ...r, [pergunta.id]: opcao }))}
									/>
								))}
							</div>
						))}
					</div>
				</div>

				<p className="sr-only">
					Exemplo de uma dimensão da escala — as demais dimensões seguem o mesmo padrão de
					pergunta e resposta.
				</p>
			</div>

			<div className="mt-auto flex items-center justify-between border-t border-n-30 pt-6">
				<Button variant="outline" className="border-p-500 text-p-500 hover:bg-p-50">
					VOLTAR
				</Button>
				<Button disabled={respondidas < PERGUNTAS.length} onClick={() => onProximo?.(respostas)}>
					PRÓXIMA →
				</Button>
			</div>
		</Page>
	)
}
