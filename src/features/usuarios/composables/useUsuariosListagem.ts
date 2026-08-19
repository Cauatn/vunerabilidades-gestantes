import { parseAsInteger, useQueryState } from 'nuqs'
import { useMemo, useState } from 'react'

import type { Usuario } from '@/features/usuarios/types/usuario'

const TAMANHO_PAGINA = 10

export function useUsuariosListagem(usuarios: Usuario[]) {
	const [busca, setBusca] = useQueryState('busca')
	const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
	const [termoBusca, setTermoBusca] = useState(busca ?? '')

	const usuariosFiltrados = useMemo(() => {
		if (!busca) return usuarios
		const termo = busca.toLowerCase()
		return usuarios.filter((usuario) => usuario.nome.toLowerCase().includes(termo))
	}, [usuarios, busca])

	const totalPages = Math.max(1, Math.ceil(usuariosFiltrados.length / TAMANHO_PAGINA))
	const usuariosPagina = usuariosFiltrados.slice((page - 1) * TAMANHO_PAGINA, page * TAMANHO_PAGINA)

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
		usuariosPagina,
	}
}
