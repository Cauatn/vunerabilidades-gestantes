import { Route, Routes } from 'react-router-dom'

import { AppShell } from '@/components/AppShell'
import { FormularioPage } from '@/features/avaliacao/pages/FormularioPage'
import { HistoricoPage } from '@/features/avaliacao/pages/HistoricoPage'
import { ResultadoPage } from '@/features/avaliacao/pages/ResultadoPage'
import { ConfiguracaoFormularioPage } from '@/features/avaliacao/pages/ConfiguracaoFormularioPage'
import { AvaliacaoDetalhePage } from '@/features/avaliacao/pages/AvaliacaoDetalhePage'
import { AvaliacaoImprimirVisaoGeralPage } from '@/features/avaliacao/pages/AvaliacaoImprimirVisaoGeralPage'
import { AvaliacaoImprimirVisaoGestantePage } from '@/features/avaliacao/pages/AvaliacaoImprimirVisaoGestantePage'
import { GestantesPage } from '@/features/gestantes/pages/GestantesPage'
import { LoginPage } from '@/features/auth/pages/LoginPage'
import { UsuariosPage } from '@/features/usuarios/pages/UsuariosPage'

export function AppRoutes() {
	return (
		<Routes>
			<Route path="/login" element={<LoginPage />} />
			<Route path="/historico/:id/imprimir/visao-geral" element={<AvaliacaoImprimirVisaoGeralPage />} />
			<Route path="/historico/:id/imprimir/visao-gestante" element={<AvaliacaoImprimirVisaoGestantePage />} />
			<Route element={<AppShell />}>
				<Route path="/" element={<GestantesPage />} />
				<Route path="/usuarios" element={<UsuariosPage />} />
				<Route path="/formulario" element={<FormularioPage />} />
				<Route path="/historico" element={<HistoricoPage />} />
				<Route path="/historico/:id" element={<AvaliacaoDetalhePage />} />
				<Route path="/resultado" element={<ResultadoPage />} />
				<Route path="/configuracao" element={<ConfiguracaoFormularioPage />} />
			</Route>
		</Routes>
	)
}
