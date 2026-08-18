import { Info } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

type Classificacao = 'BAIXA' | 'MODERADA' | 'ALTA'

const NIVEIS: { label: Classificacao; bg: string; fg: string }[] = [
	{ label: 'BAIXA', bg: 'bg-(--color-risk-low-bg)', fg: 'text-(--color-risk-low-fg)' },
	{ label: 'MODERADA', bg: 'bg-(--color-risk-moderate-bg)', fg: 'text-(--color-risk-moderate-fg)' },
	{ label: 'ALTA', bg: 'bg-(--color-risk-high-bg)', fg: 'text-(--color-risk-high-fg)' },
]

const CLASSIFICACAO_COR: Record<Classificacao, string> = {
	BAIXA: 'text-(--color-risk-low-fg)',
	MODERADA: 'text-(--color-risk-moderate-fg)',
	ALTA: 'text-(--color-risk-high-fg)',
}

interface ResultadoAvaliacaoProps {
	pontuacao?: number
	classificacao?: Classificacao
	onVoltar?: () => void
}

export function ResultadoAvaliacao({
	pontuacao = 12,
	classificacao = 'MODERADA',
	onVoltar,
}: ResultadoAvaliacaoProps) {
	return (
		<Card className="w-full max-w-2xl items-center gap-6 p-10 text-center">
				<div>
					<h1 className="text-[22px] font-bold text-(--color-heading)">Resultado da Avaliação</h1>
					<p className="mt-1 text-[15px] text-(--color-muted-text)">
						Resultado da aplicação da Escala
					</p>
				</div>

				<div className="flex size-[120px] flex-col items-center justify-center rounded-full border-4 border-p-400">
					<span className="text-4xl font-bold text-p-400">{pontuacao}</span>
					<span className="text-[13px] font-bold text-(--color-muted-text)">
						Pontuação
						<br />
						ilustrativa
					</span>
				</div>

				<div>
					<p className="text-base font-bold text-(--color-body)">Vulnerabilidade Social</p>
					<p className={cn('text-2xl font-bold', CLASSIFICACAO_COR[classificacao])}>
						{classificacao}
					</p>
				</div>

				<div className="grid w-full grid-cols-3 gap-3">
					{NIVEIS.map((nivel) => (
						<div
							key={nivel.label}
							className={cn(
								'flex items-center justify-center gap-2 rounded-lg py-3 text-[13px] font-bold',
								nivel.bg,
								nivel.fg,
								nivel.label === classificacao && 'ring-2 ring-offset-1',
							)}
						>
							<span className={cn('size-2 rounded-full', nivel.fg.replace('text-', 'bg-'))} />
							{nivel.label}
						</div>
					))}
				</div>

				<div className="flex w-full max-w-md items-start gap-3 rounded-[10px] border border-(--color-note-border) bg-(--color-note-bg) p-4 text-left">
					<Info className="mt-0.5 size-5 shrink-0 text-(--color-success)" />
					<p className="text-[13px] text-(--color-note-fg)">
						A classificação apresentada é apenas ilustrativa. Os pontos de corte serão definidos
						após a validação da escala.
					</p>
				</div>

				<div className="flex w-full max-w-xs flex-col gap-3">
					<Button>VER RECOMENDAÇÕES →</Button>
					{onVoltar && (
						<Button variant="ghost" onClick={onVoltar}>
							Voltar ao formulário
						</Button>
					)}
				</div>
			</Card>
	)
}
