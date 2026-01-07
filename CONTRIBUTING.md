# Contribuindo para VELARIUM

Obrigado por considerar contribuir para o VELARIUM! 🌑

## 📋 Código de Conduta

Este projeto e todos os participantes estão comprometidos em manter um ambiente respeitoso e acolhedor. Seja gentil e profissional em todas as interações.

## 🐛 Reportando Bugs

Se você encontrou um bug, por favor abra uma [issue](../../issues) incluindo:

- **Descrição clara** do problema
- **Passos para reproduzir** o comportamento
- **Comportamento esperado** vs **comportamento atual**
- **Screenshots** (se aplicável)
- **Ambiente**:
  - Navegador e versão
  - Sistema operacional
  - Versão do Node.js

## 💡 Sugerindo Melhorias

Sugestões de novas features são bem-vindas! Abra uma [issue](../../issues) com:

- **Descrição detalhada** da feature
- **Motivação**: Por que essa feature seria útil?
- **Exemplos** de como funcionaria
- **Alternativas** consideradas

## 🔧 Pull Requests

### Processo

1. **Fork** o repositório
2. **Clone** seu fork localmente
   ```bash
   git clone https://github.com/seu-usuario/velarium.git
   cd velarium
   ```

3. **Crie uma branch** para sua feature
   ```bash
   git checkout -b feature/minha-feature
   ```

4. **Faça suas alterações**
   - Escreva código limpo e bem documentado
   - Siga os padrões de código existentes
   - Teste suas mudanças localmente

5. **Commit suas mudanças**
   ```bash
   git add .
   git commit -m "feat: adiciona nova feature incrível"
   ```

6. **Push para seu fork**
   ```bash
   git push origin feature/minha-feature
   ```

7. **Abra um Pull Request**
   - Descreva claramente suas mudanças
   - Referencie issues relacionadas
   - Aguarde review

### Padrões de Commit

Usamos commits semânticos:

- `feat:` Nova feature
- `fix:` Correção de bug
- `docs:` Mudanças na documentação
- `style:` Formatação, ponto e vírgula, etc
- `refactor:` Refatoração de código
- `test:` Adição de testes
- `chore:` Manutenção, dependências, etc

Exemplos:
```
feat: adiciona novo componente de animação
fix: corrige bug no scroll observer
docs: atualiza README com novas instruções
```

### Padrões de Código

- **TypeScript**: Use tipagem forte, evite `any`
- **Componentes**: Um componente por arquivo
- **Nomenclatura**: 
  - Componentes: `PascalCase`
  - Funções/variáveis: `camelCase`
  - Constantes: `UPPER_SNAKE_CASE`
- **Imports**: Organize em ordem (React, bibliotecas, componentes locais)
- **Comentários**: Escreva comentários claros quando necessário

### Checklist antes do PR

- [ ] O código está funcionando localmente
- [ ] Não há erros no console
- [ ] O código segue os padrões do projeto
- [ ] A documentação foi atualizada (se necessário)
- [ ] Os commits seguem o padrão semântico
- [ ] O PR tem uma descrição clara

## 🎨 Diretrizes de Design

- Mantenha a **atmosfera sombria** e **horror psicológico**
- Use a **paleta de cores** existente (preto, cinza, vermelho sangue)
- **Animações** devem ser sutis e atmosféricas
- **Performance** é importante - otimize animações pesadas

## 🧪 Testando

Antes de submeter um PR:

```bash
# Instale as dependências
npm install

# Execute em modo dev
npm run dev

# Teste o build de produção
npm run build
npm run preview
```

## 📞 Dúvidas?

Se tiver dúvidas sobre como contribuir, sinta-se à vontade para:
- Abrir uma [issue](../../issues) com a tag `question`
- Entrar em contato com os mantenedores

---

**Obrigado por contribuir para tornar VELARIUM ainda mais assustador! 👻**
