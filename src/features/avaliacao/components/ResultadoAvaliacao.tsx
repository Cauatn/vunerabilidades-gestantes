import { Info } from 'lucide-react'

import { Page } from '@/components/Layout/Page'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DashboardCard } from '@/components/ui/dashboard-card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { RECOMENDACOES } from '@/features/avaliacao/constants'
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
			<div className="flex max-w-6xl flex-col gap-6">
				<div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.3fr_1fr]">
					<DashboardCard
						title="Recomendações"
						subtitle="Ações sugeridas com base no resultado da avaliação"
						className="items-stretch"
					>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Recomendação</TableHead>
									<TableHead className="w-32 text-right">Status</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{RECOMENDACOES.map((recomendacao) => (
									<TableRow key={recomendacao.id}>
										<TableCell className="whitespace-normal text-[15px] text-n-700">
											{recomendacao.texto}
										</TableCell>
										<TableCell className="text-right">
											<Badge variant="neutral">Pendente</Badge>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</DashboardCard>

					<div className="flex flex-col gap-4">
						<DashboardCard
							title="Vulnerabilidade Social"
							subtitle="Pontuação estimada com base nas respostas"
							footer={<ScoreMeter pontuacao={pontuacao} />}
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

						<DashboardCard
							title="Dimensões avaliadas"
							locked
							lockedText="Disponível quando as demais dimensões da escala forem implementadas."
							className="min-h-32"
						/>
					</div>
				</div>

				<div className="flex items-start gap-3 rounded-[10px] border border-(--color-note-border) bg-(--color-note-bg) p-4">
					<Info className="mt-0.5 size-5 shrink-0 text-(--color-success)" />
					<p className="text-[13px] text-(--color-note-fg)">
						A classificação apresentada é apenas ilustrativa. Os pontos de corte serão definidos
						após a validação da escala.
					</p>
				</div>

				<div className="flex items-center gap-4">
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
