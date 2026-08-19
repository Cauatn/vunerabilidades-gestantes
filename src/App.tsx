import { AppRoutes } from '@/appRoutes'
import { PerguntasProvider } from '@/features/avaliacao/composables/usePerguntasStore'
import { GestantesProvider } from '@/features/gestantes/composables/useGestantesStore'
import { UsuariosProvider } from '@/features/usuarios/composables/useUsuariosStore'

function App() {
	return (
		<UsuariosProvider>
			<GestantesProvider>
				<PerguntasProvider>
					<AppRoutes />
				</PerguntasProvider>
			</GestantesProvider>
		</UsuariosProvider>
	)
}

export default App
