# Garota Pink - Plataforma de Acompanhantes

Uma plataforma moderna e profissional para acompanhantes verificadas, desenvolvida com Vue 3, TypeScript e Tailwind CSS.

## 🚀 Funcionalidades

- **Navegação como visitante** - Explore perfis sem necessidade de cadastro
- **Perfis detalhados** - Biografias, galerias de fotos e serviços
- **Sistema de autenticação** - Login e registro para interações
- **Design responsivo** - Otimizado para mobile e desktop
- **PWA Ready** - Aplicação progressiva com suporte offline
- **Modo escuro** - Interface adaptável ao tema preferido

## 🛠️ Tecnologias

- **Vue 3** - Framework reativo moderno
- **TypeScript** - Tipagem estática para maior segurança
- **Tailwind CSS** - Framework CSS utilitário
- **Pinia** - Gerenciamento de estado
- **Vue Router** - Roteamento SPA
- **Vite** - Build tool otimizada

## 🔧 Desenvolvimento

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Instalação
```bash
git clone https://github.com/SEU_USUARIO/project-red.git
cd project-red
npm install
```

### Executar em desenvolvimento
```bash
npm run dev
```

### Build para produção
```bash
npm run build
```

### Preview da build
```bash
npm run preview
```

## 🚀 Deploy no GitHub Pages

### Configuração Automática

1. **Configure o repositório**:
   - Vá em `Settings > Pages`
   - Source: `GitHub Actions`

2. **Ajuste o nome do repositório**:
   - Edite `vite.config.ts`
   - Altere `/project-red/` para `/SEU-REPOSITORIO/`

3. **Faça push**:
   ```bash
   git add .
   git commit -m "Deploy setup"
   git push origin main
   ```

4. **Deploy automático**:
   - O GitHub Actions irá build e deploy automaticamente
   - Acesse: `https://SEU_USUARIO.github.io/SEU-REPOSITORIO/`

### Deploy Manual (alternativo)

```bash
npm run build
npm run deploy
```

## 📱 PWA

A aplicação é uma Progressive Web App que pode ser instalada em dispositivos móveis:

- Funciona offline
- Ícones customizados
- Splash screen
- Notificações push (futuro)

## 🎨 Design

- **Airbnb-style** - Cards e layout inspirados no Airbnb
- **Material Design** - Componentes seguindo guidelines
- **Responsivo** - Adaptado para todos os tamanhos de tela
- **Acessível** - Suporte a leitores de tela

## 🔒 Privacidade

- Dados mock para demonstração
- Sem coleta de dados reais
- Criptografia em produção (implementar)

## 📄 Licença

Este projeto é para fins educacionais e demonstrativos.

---

Desenvolvido com ❤️ usando Vue 3 + TypeScript
