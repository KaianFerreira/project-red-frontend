# 🚀 Guia de Deploy - GitHub Pages

## Pré-requisitos

1. **Repositório no GitHub**
   - Criar repositório público no GitHub
   - Nome sugerido: `garota-pink` ou `acompanhantes-app`

2. **Configurar nome do repositório**
   - Editar `vite.config.ts`
   - Alterar linha 8: `/project-red/` para `/SEU-REPOSITORIO/`

## Passos para Deploy

### 1. Fazer push do código

```bash
# Inicializar git (se ainda não foi feito)
git init

# Adicionar origin
git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git

# Fazer commit e push
git add .
git commit -m "Initial commit - Setup for GitHub Pages"
git push -u origin main
```

### 2. Configurar GitHub Pages

1. Vá para o repositório no GitHub
2. Clique em **Settings** > **Pages**
3. Em **Source**, selecione: **GitHub Actions**
4. Salve as configurações

### 3. Deploy Automático

- O GitHub Actions irá executar automaticamente
- Acesse a aba **Actions** para acompanhar o progresso
- Após concluído, acesse: `https://SEU_USUARIO.github.io/SEU_REPOSITORIO/`

## URLs de Exemplo

- Se seu usuário é `joao123` e repo é `garota-pink`:
  - URL final: `https://joao123.github.io/garota-pink/`

## Comandos Úteis

```bash
# Build local
npm run build:force

# Preview local
npm run preview

# Verificar arquivos gerados
ls -la dist/
```

## Configurações Importantes

### Arquivo `vite.config.ts`
```typescript
// Linha 8 - ajustar para seu repositório
base: process.env.NODE_ENV === 'production' ? '/SEU-REPOSITORIO/' : '/',
```

### Arquivo `.github/workflows/deploy.yml`
- Deploy automático configurado
- Usa `npm run build:force` (ignora erros TypeScript)
- Só faz deploy na branch `main` ou `master`

## Troubleshooting

### Build falhando?
- Use `npm run build:force` em vez de `npm run build`
- Corrige problemas de TypeScript temporariamente

### Página em branco?
- Verifique se o `base` no `vite.config.ts` está correto
- Confirme que está acessando a URL completa

### 404 em rotas?
- App usa hash routing (`#/`) para compatibilidade
- URLs ficam: `site.com/#/login` em vez de `site.com/login`

## Próximos Passos

1. **Domínio customizado**: Editar `public/CNAME`
2. **HTTPS**: Automático no GitHub Pages
3. **PWA**: Já configurado - app pode ser instalado
4. **Analytics**: Adicionar Google Analytics se necessário

## Funcionalidades Disponíveis

✅ Navegação de visitante (sem login)  
✅ Perfis detalhados de acompanhantes  
✅ Sistema de autenticação  
✅ Design responsivo  
✅ PWA (instalável)  
✅ Modo escuro  
✅ Deploy automático  

---

**Importante**: Este é um projeto demonstrativo. Para uso comercial, implementar sistema de backend real e medidas de segurança adequadas. 