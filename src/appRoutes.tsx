import { Route, Routes } from 'react-router-dom'

import { AppShell } from '@/components/AppShell'
import { FormularioPage } from '@/features/avaliacao/pages/FormularioPage'
import { ResultadoPage } from '@/features/avaliacao/pages/ResultadoPage'
import { ConfiguracaoFormularioPage } from '@/features/avaliacao/pages/ConfiguracaoFormularioPage'
import { PacientesPage } from '@/features/pacientes/pages/PacientesPage'

export function AppRoutes() {
	return (
		<Routes>
			<Route element={<AppShell />}>
				<Route path="/" element={<PacientesPage />} />
				<Route path="/formulario" element={<FormularioPage />} />
				<Route path="/resultado" element={<ResultadoPage />} />
				<Route path="/configuracao" element={<ConfiguracaoFormularioPage />} />
			</Route>
		</Routes>
	)
}
