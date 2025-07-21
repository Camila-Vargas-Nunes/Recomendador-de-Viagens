# 🌍 Travel Recommender - Recomendador Inteligente de Destinos de Viagem

Um sistema inteligente que utiliza Inteligência Artificial para recomendar destinos de viagem personalizados baseados nas preferências do usuário.

## ✨ Características

- 🤖 **IA Integrada**: Utiliza OpenAI GPT para gerar recomendações personalizadas
- 🖼️ **Imagens Automáticas**: Busca imagens dos destinos via Unsplash API
- 🎨 **Interface Moderna**: Design responsivo com Tailwind CSS
- 🔄 **Fallback Inteligente**: Sistema de dados mockados quando API não disponível
- 📱 **Responsivo**: Funciona perfeitamente em desktop e mobile
- ⚡ **Performance**: Aplicação React otimizada com Vite

## 🚀 Tecnologias Utilizadas

- **Frontend**: React 19 + Vite
- **Estilização**: Tailwind CSS
- **IA**: OpenAI GPT-3.5-turbo
- **Imagens**: Unsplash API
- **Linguagem**: JavaScript (ES6+)

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Conta na OpenAI (opcional - para recomendações com IA real)
- Conta no Unsplash (opcional - para imagens reais)

## 🛠️ Instalação

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd travel-recommender
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
# Crie um arquivo .env na raiz do projeto
cp .env.example .env

# Edite o arquivo .env com suas chaves de API
VITE_OPENAI_API_KEY=sua_chave_openai_aqui
VITE_UNSPLASH_API_KEY=sua_chave_unsplash_aqui
```

4. **Execute o projeto**
```bash
npm run dev
```

5. **Acesse a aplicação**
```
http://localhost:5173
```

## 🔑 Configuração das APIs

### OpenAI API
1. Acesse [OpenAI Platform](https://platform.openai.com/api-keys)
2. Crie uma conta e gere uma chave API
3. Adicione a chave no arquivo `.env`

### Unsplash API
1. Acesse [Unsplash Developers](https://unsplash.com/developers)
2. Registre-se como desenvolvedor
3. Crie uma aplicação e obtenha a Access Key
4. Adicione a chave no arquivo `.env`

## 🎯 Como Usar

1. **Preencha suas preferências**:
   - 📅 Data da viagem
   - 🌡️ Clima preferido (quente, frio, temperado, tropical, seco)
   - 🎯 Interesses (natureza, cultura, gastronomia, aventura, praia)

2. **Clique em "Descobrir Destinos Mágicos"**

3. **Aguarde a geração** das recomendações

4. **Visualize os resultados**:
   - 3 destinos personalizados
   - Descrições detalhadas
   - Imagens dos destinos
   - Recomendação final

## 🏗️ Arquitetura do Projeto

```
travel-recommender/
├── src/
│   ├── components/
│   │   ├── FormPreferences.jsx    # Formulário de preferências
│   │   └── DestinationCard.jsx    # Card de destino
│   ├── services/
│   │   ├── openaiService.js       # Integração com OpenAI
│   │   └── unsplashService.js     # Integração com Unsplash
│   ├── App.jsx                    # Componente principal
│   └── main.jsx                   # Ponto de entrada
├── .env                           # Variáveis de ambiente
└── package.json                   # Dependências
```

## 🔧 Funcionalidades Técnicas

### Sistema de Fallback
- **Detecção automática** de erros da API
- **Dados mockados inteligentes** para demonstração
- **Transição suave** entre IA real e dados simulados

### Parser de Respostas
- **Extração inteligente** de destinos da resposta da IA
- **Processamento robusto** de diferentes formatos
- **Validação de dados** antes da exibição

### Interface Responsiva
- **Design mobile-first** com Tailwind CSS
- **Animações suaves** e transições
- **Gradientes modernos** e efeitos visuais

## 🎨 Componentes Principais

### FormPreferences
- Formulário interativo com validação
- Seleção múltipla de interesses
- Estados visuais para feedback

### DestinationCard
- Cards modernos com gradientes
- Imagens com overlay elegante
- Tags de categorização
- Botões de ação

## 🚀 Scripts Disponíveis

```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build de produção
npm run preview      # Visualizar build de produção
npm run lint         # Verificar código
```

## 🔍 Debug e Troubleshooting

### Logs de Debug
O projeto inclui logs detalhados no console para facilitar o debug:
- Status das APIs
- Processamento de dados
- Erros e exceções

### Problemas Comuns

**Erro 429 (OpenAI)**
- Significa que você atingiu o limite de crédito
- O sistema automaticamente usa dados mockados

**Imagens não carregam**
- Verifique a chave do Unsplash
- O sistema usa placeholder quando não há imagem

**Só aparece 1 destino**
- Verifique os logs no console
- Pode ser problema no parser de resposta

## 📊 Funcionalidades de IA

### Prompt Engineering
O sistema utiliza prompts estruturados para:
- Analisar preferências do usuário
- Gerar recomendações contextualizadas
- Fornecer justificativas detalhadas

### Dados Mockados Inteligentes
- **15+ combinações** de clima e interesses
- **45+ destinos** pré-definidos
- **Descrições realistas** e detalhadas

## 🎯 Casos de Uso

### Para Agências de Viagem
- **Recomendações personalizadas** 24/7
- **Redução de tempo** de consultoria
- **Aumento de conversão** com IA

### Para Viajantes
- **Descoberta de destinos** únicos
- **Planejamento inteligente** de viagens
- **Experiência personalizada**

## 🔮 Próximas Funcionalidades

- [ ] **Integração com APIs de preços**
- [ ] **Sistema de favoritos**
- [ ] **Histórico de recomendações**
- [ ] **Exportação de roteiros**
- [ ] **Chatbot conversacional**

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request


## 👨‍💻 Autor

**Camila** - Desenvolvedora Full Stack

## 🙏 Agradecimentos

- OpenAI pela API de IA
- Unsplash pelas imagens
- Tailwind CSS pelo framework de estilos
- Vite pela ferramenta de build

---

**⭐ Se este projeto te ajudou, considere dar uma estrela!**
