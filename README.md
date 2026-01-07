<div align="center">

# 🌑 VELARIUM

### *Um Portal para o Horror Psicológico*

[![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.23.26-FF0055?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Three.js](https://img.shields.io/badge/Three.js-0.182.0-000000?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

*Uma experiência web imersiva e sombria para um RPG de mesa focado em horror psicológico e observação.*

[Demo](https://velarium-6yad.vercel.app) • [Reportar Bug](../../issues) • [Solicitar Feature](../../issues)

</div>

---

## 📖 Sobre o Projeto

**VELARIUM** é um site interativo que serve como portal imersivo para um RPG de mesa de horror psicológico. O projeto combina design atmosférico, animações sutis e elementos interativos para criar uma experiência que reflete a natureza perturbadora do jogo.

### 🎭 Conceito

O site explora temas de:
- 🧠 **Horror Psicológico**: Atmosfera opressiva e perturbadora
- 👁️ **Observação**: O site "observa" o usuário através de diversos mecanismos
- 🌀 **Paranoia**: Elementos que aumentam com o tempo de permanência
- 🎪 **Easter Eggs**: Segredos escondidos para os mais curiosos

### ✨ Recursos Principais

- **Animações Atmosféricas**: Efeitos de grain, scanlines e vinhetas que intensificam com o scroll
- **Sistema de Observação**: Rastreamento de tempo de permanência e inatividade
- **Efeitos Visuais Dinâmicos**: Transições suaves com Framer Motion
- **Elementos 3D**: Integração com Three.js para efeitos imersivos
- **Easter Eggs Interativos**: 
  - Console Observer (abra o console do navegador)
  - Protocolo VOID (digite "VOID" em qualquer lugar)
  - Separation Anxiety (mude de aba)
- **Design Responsivo**: Otimizado para desktop e mobile
- **Tema Dark**: Paleta de cores sombria e atmosférica

---

## 🚀 Começando

### Pré-requisitos

- **Node.js** (versão 16 ou superior)
- **npm** ou **yarn**

### Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/velarium.git
   cd velarium
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**
   
   Crie um arquivo `.env.local` na raiz do projeto:
   ```env
   GEMINI_API_KEY=sua_chave_api_aqui
   ```
   

4. **Execute o projeto localmente**
   ```bash
   npm run dev
   ```


## 🛠️ Tecnologias Utilizadas

### Core
- **[React 19.2.3](https://reactjs.org/)** - Biblioteca JavaScript para interfaces
- **[TypeScript 5.8.2](https://www.typescriptlang.org/)** - Superset tipado de JavaScript
- **[Vite 6.2.0](https://vitejs.dev/)** - Build tool e dev server ultrarrápido

### Animação & Efeitos
- **[Framer Motion 12.23.26](https://www.framer.com/motion/)** - Biblioteca de animações para React
- **[Three.js 0.182.0](https://threejs.org/)** - Biblioteca 3D para WebGL
- **[@react-three/fiber 9.5.0](https://docs.pmnd.rs/react-three-fiber)** - Renderer React para Three.js
- **[@react-three/drei 10.7.7](https://github.com/pmndrs/drei)** - Helpers úteis para React Three Fiber

### UI
- **[Lucide React 0.562.0](https://lucide.dev/)** - Ícones SVG modernos

---

## 📁 Estrutura do Projeto

```
velarium/
├── components/          # Componentes React
│   ├── Hero.tsx        # Seção hero principal
│   ├── Intro.tsx       # Introdução
│   ├── Manifestation.tsx
│   ├── Archetypes.tsx
│   ├── Mechanics.tsx
│   ├── AmbientSound.tsx
│   ├── ObservationLog.tsx
│   ├── Footer.tsx
│   └── ...             # Outros componentes temáticos
├── hooks/              # Custom React hooks
│   └── useObservation.tsx
├── App.tsx             # Componente principal
├── index.tsx           # Entry point
├── index.html          # HTML template
├── vite.config.ts      # Configuração do Vite
├── tsconfig.json       # Configuração do TypeScript
└── package.json        # Dependências e scripts

```

---

## 🎮 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento

# Build
npm run build        # Cria build de produção

# Preview
npm run preview      # Preview do build de produção
```

---

## 🌐 Deploy

O projeto pode ser facilmente deployado em plataformas como:

- **[Vercel](https://vercel.com/)** (Recomendado)
- **[Netlify](https://www.netlify.com/)**
- **[GitHub Pages](https://pages.github.com/)**

### Deploy rápido com Vercel

```bash
npm install -g vercel
vercel
```

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Veja o arquivo [CONTRIBUTING.md](CONTRIBUTING.md) para mais detalhes.

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👤 Autor

**agent**

- GitHub: [@agent](https://github.com/franciscolopesdev)

---

## 🙏 Agradecimentos

- Inspirado em jogos de horror psicológico e ARGs
- Comunidade React e Three.js
- Todos os contribuidores que ajudaram a tornar este projeto possível

---

<div align="center">

**⚠️ AVISO ⚠️**

*Este projeto contém temas de horror psicológico e pode não ser adequado para todos os públicos.*

---

Feito por [agent](https://github.com/franciscolopesdev)

</div>
