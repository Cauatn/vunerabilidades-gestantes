import { parseAsInteger, useQueryState } from 'nuqs'
import { useMemo, useState } from 'react'

import type { Gestante } from '@/features/gestantes/types/gestante'

const TAMANHO_PAGINA = 10

export function useGestantesListagem(gestantes: Gestante[]) {
	const [busca, setBusca] = useQueryState('busca')
	const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
	const [termoBusca, setTermoBusca] = useState(busca ?? '')

	const gestantesFiltradas = useMemo(() => {
		if (!busca) return gestantes
		const termo = busca.toLowerCase()
		return gestantes.filter((gestante) => gestante.nome.toLowerCase().includes(termo))
	}, [gestantes, busca])

	const totalPages = Math.max(1, Math.ceil(gestantesFiltradas.length / TAMANHO_PAGINA))
	const gestantesPagina = gestantesFiltradas.slice((page - 1) * TAMANHO_PAGINA, page * TAMANHO_PAGINA)

	function aplicarBusca() {
		setBusca(termoBusca.trim() || null)
		setPage(1)
	}

	return {
		termoBusca,
		setTermoBusca,
		aplicarBusca,
		page,
		setPage,
		totalPages,
		gestantesPagina,
	}
}
