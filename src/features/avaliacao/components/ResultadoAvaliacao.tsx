import { Info } from 'lucide-react'

import { Page } from '@/components/Layout/Page'
import { Button } from '@/components/ui/button'
import { DashboardCard } from '@/components/ui/dashboard-card'
import { cn } from '@/lib/utils'
import { ScoreMeter } from './ScoreMeter'

type Classificacao = 'BAIXA' | 'MODERADA' | 'ALTA'

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
		<Page title="Resultado da Avaliação" description="Resultado da aplicação da Escala">
			<div className="flex max-w-3xl flex-col items-center gap-6">
				<DashboardCard
					title="Vulnerabilidade Social"
					subtitle="Pontuação estimada com base nas respostas da avaliação"
					footer={<ScoreMeter pontuacao={pontuacao} />}
					className="max-w-md"
				>
					<div className="flex flex-col items-center gap-1">
						<span className={cn('text-5xl font-bold', CLASSIFICACAO_COR[classificacao])}>
							{pontuacao}
						</span>
						<span className="text-caption text-n-500">Pontuação ilustrativa</span>
						<span className={cn('mt-2 text-2xl font-bold', CLASSIFICACAO_COR[classificacao])}>
							{classificacao}
						</span>
					</div>
				</DashboardCard>

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
			</div>
		</Page>
	)
}
