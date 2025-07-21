# 🚀 Configuração Automática do Vercel

Este projeto está configurado para atualizar automaticamente as variáveis de ambiente no Vercel quando você fizer push.

## 📋 Pré-requisitos

1. **Vercel CLI instalado** (já instalado globalmente)
2. **Conta no Vercel** e projeto configurado
3. **Chaves de API**:
   - OpenAI API Key
   - Unsplash API Key

## 🔧 Configuração Inicial

### 1. Criar arquivo .env

Crie um arquivo `.env` na raiz do projeto com suas chaves de API:

```bash
# API Keys
VITE_OPENAI_API_KEY=sua_chave_openai_aqui
VITE_UNSPLASH_API_KEY=sua_chave_unsplash_aqui

# Configurações
VITE_USE_MOCK=false
```

### 2. Fazer login no Vercel

```bash
vercel login
```

### 3. Configurar variáveis no Vercel (primeira vez)

```bash
npm run setup-env
```

Este comando irá:
- Ler as variáveis do arquivo `.env`
- Configurar automaticamente no Vercel
- Perguntar se você quer fazer deploy

## 🔄 Atualização Automática

### Git Hook (Recomendado)

O projeto está configurado com um Git hook que executa automaticamente antes de cada push:

1. **Verifica** se o arquivo `.env` existe
2. **Valida** se as chaves de API estão configuradas
3. **Atualiza** as variáveis no Vercel automaticamente
4. **Permite** o push apenas se tudo estiver correto

Para usar, simplesmente faça:

```bash
git add .
git commit -m "sua mensagem"
git push
```

O hook irá executar automaticamente e atualizar o Vercel!

### Comando Manual

Se preferir fazer manualmente:

```bash
npm run vercel-env
```

## 🚀 Deploy

### Deploy Automático

Após o push, o Vercel fará deploy automaticamente com as novas variáveis.

### Deploy Manual

```bash
npm run vercel-deploy
```

## 🔍 Verificação

Para verificar se as variáveis estão configuradas no Vercel:

```bash
vercel env ls
```

## 🛠️ Scripts Disponíveis

- `npm run setup-env` - Configura variáveis no Vercel
- `npm run vercel-deploy` - Faz deploy para produção
- `npm run vercel-env` - Alias para setup-env

## ⚠️ Troubleshooting

### Erro: "Arquivo .env não encontrado"
- Crie o arquivo `.env` na raiz do projeto
- Adicione suas chaves de API

### Erro: "Você precisa estar logado no Vercel"
- Execute: `vercel login`

### Erro: "Chaves de API não configuradas"
- Verifique se as chaves no `.env` não são os valores padrão
- Certifique-se de que as chaves são válidas

### Git Hook não funciona
- Verifique se o arquivo `.git/hooks/pre-push` existe e é executável
- Execute: `chmod +x .git/hooks/pre-push`

## 📝 Estrutura dos Scripts

- `scripts/setup-vercel-env.js` - Script principal para configuração
- `scripts/pre-push.js` - Script executado pelo Git hook
- `.git/hooks/pre-push` - Git hook que executa automaticamente

## 🔐 Segurança

- O arquivo `.env` está no `.gitignore` e não será commitado
- As variáveis são configuradas apenas no ambiente de produção do Vercel
- As chaves de API nunca são expostas no código 