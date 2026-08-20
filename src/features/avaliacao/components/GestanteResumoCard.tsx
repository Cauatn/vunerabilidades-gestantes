import pregnantIcon from '@/assets/icons/pregnant.svg'
import { calcularIdade, formatarDataBr } from '@/features/core/utils/date'
import type { Gestante } from '@/features/gestantes/types/gestante'
import { cn } from '@/lib/utils'

interface GestanteResumoCardProps {
	gestante: Gestante
	className?: string
}

export function GestanteResumoCard({ gestante, className }: GestanteResumoCardProps) {
	return (
		<div className={cn('flex items-center gap-5 rounded-xl border border-p-200 bg-p-50 p-4', className)}>
			<div className="flex shrink-0 items-center justify-center rounded-full bg-p-100 p-3">
				<img src={pregnantIcon} alt="" className="size-7" />
			</div>
			<div className="grid flex-1 grid-cols-1 gap-x-3 gap-y-3 text-sm text-n-800 sm:grid-cols-3">
				<p>
					<span className="font-semibold">Nome:</span> {gestante.nome}
				</p>
				<p>
					<span className="font-semibold">Data de nascimento:</span> {formatarDataBr(gestante.dataNascimento)}
				</p>
				<p>
					<span className="font-semibold">Idade:</span> {calcularIdade(gestante.dataNascimento)}
				</p>
				<p>
					<span className="font-semibold">CPF:</span> {gestante.cpf}
				</p>
				<p>
					<span className="font-semibold">CNS:</span> {gestante.cns}
				</p>
			</div>
		</div>
	)
}
