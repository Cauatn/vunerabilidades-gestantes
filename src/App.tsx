import { AppRoutes } from '@/appRoutes'
import { PerguntasProvider } from '@/features/avaliacao/composables/usePerguntasStore'
import { PacientesProvider } from '@/features/pacientes/composables/usePacientesStore'

function App() {
	return (
		<PacientesProvider>
			<PerguntasProvider>
				<AppRoutes />
			</PerguntasProvider>
		</PacientesProvider>
	)
}

export default App
