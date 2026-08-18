interface Faixa {
	label: string
	min: number
	max: number
	color: string
}

const FAIXAS: Faixa[] = [
	{ label: 'BAIXA', min: 0, max: 3, color: 'var(--color-risk-low-fg)' },
	{ label: 'MODERADA', min: 3, max: 8, color: 'var(--color-risk-moderate-fg)' },
	{ label: 'ALTA', min: 8, max: 12, color: 'var(--color-risk-high-fg)' },
]

interface ScoreMeterProps {
	pontuacao: number
}

export function ScoreMeter({ pontuacao }: ScoreMeterProps) {
	const min = FAIXAS[0].min
	const max = FAIXAS[FAIXAS.length - 1].max
	const total = max - min

	const posicaoPino = `${Math.max(2, Math.min(96, ((pontuacao - min) / total) * 100))}%`

	return (
		<div className="relative flex w-full items-start">
			<div
				className="absolute top-0 z-10 h-0 w-0 -translate-x-1/2 -translate-y-full border-x-4 border-t-6 border-x-transparent border-t-n-600"
				style={{ left: posicaoPino }}
			/>
			{FAIXAS.map((faixa) => (
				<div
					key={faixa.label}
					className="flex flex-col items-center gap-1"
					style={{ width: `${((faixa.max - faixa.min) / total) * 100}%` }}
				>
					<div className="h-[5px] w-full" style={{ backgroundColor: faixa.color }} />
					<span className="text-caption font-semibold text-n-500">{faixa.label}</span>
				</div>
			))}
		</div>
	)
}
