# 🚀 Guia Rápido - Configuração do Vercel

## ⚡ Configuração em 3 Passos

### 1. Criar arquivo .env
```bash
npm run init-env
```
Isso criará o arquivo `.env` baseado no `.env.example`.

### 2. Adicionar suas chaves de API
Edite o arquivo `.env` e substitua:
- `your_openai_api_key_here` pela sua chave da OpenAI
- `your_unsplash_api_key_here` pela sua chave do Unsplash

### 3. Configurar no Vercel
```bash
npm run setup-env
```

## 🔄 Atualização Automática

Agora, sempre que você fizer `git push`, as variáveis serão atualizadas automaticamente no Vercel!

## 📋 Comandos Úteis

- `npm run init-env` - Cria arquivo .env
- `npm run setup-env` - Configura variáveis no Vercel
- `npm run vercel-deploy` - Deploy manual
- `vercel env ls` - Lista variáveis configuradas

## 🎯 Pronto!

Seu projeto está configurado para atualizar automaticamente as variáveis de ambiente no Vercel a cada push! 🎉 