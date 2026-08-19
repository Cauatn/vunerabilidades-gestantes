import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'

import type { Usuario } from '@/features/usuarios/types/usuario'
import type { UsuarioFormValues } from '@/features/usuarios/validation/usuarioSchema'

const USUARIOS_INICIAIS: Usuario[] = [
	{
		id: 'u1',
		nome: 'Ana Clara Damasceno',
		email: 'a.damasceno@gmail.com',
		cpf: '000.000.000-00',
		categoriaProfissional: 'medico',
		registroUf: 'BA',
		registroDigitos: '123456',
		regiaoUf: 'BA',
		regiaoMunicipio: 'Juazeiro',
		ubsAtendimento: ['UBS Country Club', 'UBS Jardim das Flores'],
	},
	{
		id: 'u2',
		nome: 'José Victor Cruz Rebouças',
		email: 'j.victor@gmail.com',
		cpf: '000.000.000-00',
		categoriaProfissional: 'enfermeiro',
		registroUf: 'BA',
		registroDigitos: '123456',
		regiaoUf: 'BA',
		regiaoMunicipio: 'Juazeiro',
		ubsAtendimento: ['UBS Vila Nova'],
	},
	{
		id: 'u3',
		nome: 'Danielle Fialho',
		email: 'd.fialho@gmail.com',
		cpf: '000.000.000-00',
		categoriaProfissional: 'administrador',
		registroUf: '',
		registroDigitos: '',
		regiaoUf: '',
		regiaoMunicipio: '',
		ubsAtendimento: [],
	},
]

export type { UsuarioFormValues }

interface UsuariosContextValue {
	usuarios: Usuario[]
	addUsuario: (dados: UsuarioFormValues) => void
	updateUsuario: (id: string, dados: UsuarioFormValues) => void
}

const UsuariosContext = createContext<UsuariosContextValue | null>(null)

export function UsuariosProvider({ children }: { children: ReactNode }) {
	const [usuarios, setUsuarios] = useState<Usuario[]>(USUARIOS_INICIAIS)

	const value = useMemo<UsuariosContextValue>(
		() => ({
			usuarios,
			addUsuario: (dados) => setUsuarios((atual) => [...atual, { id: crypto.randomUUID(), ...dados }]),
			updateUsuario: (id, dados) =>
				setUsuarios((atual) => atual.map((usuario) => (usuario.id === id ? { ...usuario, ...dados } : usuario))),
		}),
		[usuarios],
	)

	return <UsuariosContext.Provider value={value}>{children}</UsuariosContext.Provider>
}

export function useUsuarios() {
	const context = useContext(UsuariosContext)
	if (!context) throw new Error('useUsuarios deve ser usado dentro de um UsuariosProvider')
	return context
}
