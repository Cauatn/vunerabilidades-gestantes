import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

function App() {
  return (
    <div className="flex min-h-svh items-center justify-center p-8">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Vulnerabilidades Gestantes</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="nome">Nome</Label>
            <Input id="nome" placeholder="Digite o nome" />
          </div>
          <div className="flex items-center gap-2">
            <Badge>Padrão</Badge>
            <Badge variant="green">Sucesso</Badge>
            <Badge variant="red">Alerta</Badge>
            <Badge variant="neutral">Neutro</Badge>
            <Badge variant="outline">Contorno</Badge>
          </div>
          <Button>Continuar</Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default App
