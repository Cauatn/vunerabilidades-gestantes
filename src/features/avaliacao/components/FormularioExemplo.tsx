import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
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
			className="flex items-center gap-3 py-2 text-left text-[15px] text-black"
		>
			<span
				className={cn(
					'flex size-6 shrink-0 items-center justify-center rounded-full border-2 border-[#9ca3af]',
					selected && 'border-(--color-cta)',
				)}
			>
				{selected && <span className="size-3 rounded-full bg-(--color-cta)" />}
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
		<>
			<Card className="w-full max-w-2xl gap-6 p-2">
				<div className="px-6 pt-4">
					<h1 className="text-[22px] font-bold text-(--color-heading)">Aplicação da Escala</h1>
					<p className="mt-1 text-[15px] text-(--color-muted-text)">
						Preencha as informações básicas.
					</p>
				</div>

				<div className="px-6">
					<div className="h-2 w-full rounded-full bg-[#e5e7eb]">
						<div
							className="h-2 rounded-full bg-(--color-success) transition-all"
							style={{ width: `${Math.max(progresso, 12)}%` }}
						/>
					</div>
				</div>

				<div className="flex flex-col gap-8 px-6">
					<p className="text-lg font-semibold text-(--color-success)">Condições socioeconômicas</p>

					{PERGUNTAS.map((pergunta) => (
						<div key={pergunta.id} className="flex flex-col gap-1">
							<p className="mb-1 text-[15px] font-medium text-(--color-body)">{pergunta.texto}</p>
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

				<div className="flex items-center justify-between px-6 pb-6">
					<Button
						variant="outline"
						className="border-(--color-cta) text-(--color-cta) hover:bg-(--color-cta)/5"
					>
						VOLTAR
					</Button>
					<Button
						className="bg-(--color-cta) text-(--color-cta-foreground) hover:bg-(--color-cta)/90"
						disabled={respondidas < PERGUNTAS.length}
						onClick={() => onProximo?.(respostas)}
					>
						PRÓXIMA →
					</Button>
				</div>
			</Card>

			<p className="sr-only">
				Exemplo de uma dimensão da escala — as demais dimensões seguem o mesmo padrão de pergunta e
				resposta.
			</p>
		</>
	)
}
