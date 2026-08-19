import { Route, Routes } from 'react-router-dom'

import { AppShell } from '@/components/AppShell'
import { FormularioPage } from '@/features/avaliacao/pages/FormularioPage'
import { HistoricoPage } from '@/features/avaliacao/pages/HistoricoPage'
import { ResultadoPage } from '@/features/avaliacao/pages/ResultadoPage'
import { ConfiguracaoFormularioPage } from '@/features/avaliacao/pages/ConfiguracaoFormularioPage'
import { GestantesPage } from '@/features/gestantes/pages/GestantesPage'
import { LoginPage } from '@/features/auth/pages/LoginPage'
import { UsuariosPage } from '@/features/usuarios/pages/UsuariosPage'

export function AppRoutes() {
	return (
		<Routes>
			<Route path="/login" element={<LoginPage />} />
			<Route element={<AppShell />}>
				<Route path="/" element={<GestantesPage />} />
				<Route path="/usuarios" element={<UsuariosPage />} />
				<Route path="/formulario" element={<FormularioPage />} />
				<Route path="/historico" element={<HistoricoPage />} />
				<Route path="/resultado" element={<ResultadoPage />} />
				<Route path="/configuracao" element={<ConfiguracaoFormularioPage />} />
			</Route>
		</Routes>
	)
}
