import { useNavigate } from 'react-router-dom'

import { FormularioExemplo } from '@/features/avaliacao/components/FormularioExemplo'

export function FormularioPage() {
	const navigate = useNavigate()

	return (
		<FormularioExemplo onProximo={(respostas) => navigate('/resultado', { state: { respostas } })} />
	)
}
