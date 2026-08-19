import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Text } from '@/components/typography'
import { loginSchema, type LoginFormValues } from '@/features/auth/validation/loginSchema'

export function LoginForm() {
	const navigate = useNavigate()
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: { cpf: '', senha: '' },
	})

	function onSubmit() {
	  //todo: aqui ta so mockup tem qeu redirecionar depois corretamente
		navigate('/', { replace: true })
	}

	return (
		<form className="flex w-full flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
			<div className="flex flex-col gap-6">
				<div className="space-y-1.5">
					<Label htmlFor="login-cpf">CPF</Label>
					<Input
						id="login-cpf"
						autoComplete="username"
						placeholder="Digite..."
						aria-invalid={!!errors.cpf}
						{...register('cpf')}
					/>
					{errors.cpf ? <p className="text-caption text-danger">{errors.cpf.message}</p> : null}
				</div>

				<div className="space-y-1.5">
					<Label htmlFor="login-senha">Senha</Label>
					<Input
						id="login-senha"
						type="password"
						autoComplete="current-password"
						placeholder="Digite..."
						aria-invalid={!!errors.senha}
						{...register('senha')}
					/>
					{errors.senha ? <p className="text-caption text-danger">{errors.senha.message}</p> : null}
				</div>
			</div>

			<Text as="a" href="#" variant="link" className="-mt-2 self-start">
				Esqueceu a senha?
			</Text>

			<Button type="submit" size="lg" className="w-full" isLoading={isSubmitting}>
				Login
			</Button>
		</form>
	)
}
