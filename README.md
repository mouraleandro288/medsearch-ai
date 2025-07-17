# 🏥 MedSearch AI

Sistema Inteligente de Análise de Evoluções Médicas com IA para Faturamento

![MedSearch AI](https://img.shields.io/badge/React-19.1.0-blue)
![Vite](https://img.shields.io/badge/Vite-6.3.5-green)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.0-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

## 🎯 Sobre o Projeto

O **MedSearch AI** é uma aplicação web moderna desenvolvida para análise inteligente de evoluções médicas, oferecendo:

- 🔍 **Busca Inteligente** em arquivos médicos
- 🧠 **Análise de IA** para sugestão de procedimentos de faturamento
- 🌐 **Conexão com Rede Local** para carregamento automático de arquivos
- 📊 **Interface Moderna** com animações e feedback visual
- 💰 **Cálculo Automático** de valores de procedimentos

## ✨ Funcionalidades Principais

### 🎨 Interface Moderna
- Título animado com gradientes de cores
- Design responsivo e intuitivo
- Animações suaves e feedback visual
- Tema moderno inspirado em aplicações médicas

### 🔍 Busca Avançada
- Busca por texto em arquivos médicos
- Filtros por paciente, atendimento ou prontuário
- Destaque de termos encontrados
- Filtros por data

### 🧠 Análise de IA
- Processamento de texto médico com IA
- Identificação automática de procedimentos
- Cálculo de valores estimados
- Níveis de confiança para cada sugestão
- Interface de processamento moderna

### 🌐 Conectividade
- Conexão com rede local hospitalar
- Carregamento automático de arquivos
- Suporte a múltiplos formatos (TXT, XLSX)
- Sincronização em tempo real

## 🚀 Como Executar

### Pré-requisitos

- **Node.js** (versão 18 ou superior) - [Download](https://nodejs.org/)
- **npm** (geralmente vem com Node.js)

### Instalação

1. **Clone o repositório:**
```bash
git clone https://github.com/seu-usuario/medsearch-ai.git
cd medsearch-ai
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Execute a aplicação:**
```bash
npm run dev
```

4. **Acesse no navegador:**
```
http://localhost:5173/
```

## 📁 Estrutura do Projeto

```
medsearch-ai/
├── src/
│   ├── components/ui/     # Componentes da interface
│   ├── hooks/            # Hooks customizados
│   ├── lib/              # Utilitários
│   ├── assets/           # Recursos estáticos
│   ├── App.jsx           # Componente principal
│   ├── App.css           # Estilos customizados
│   └── main.jsx          # Ponto de entrada
├── public/               # Arquivos públicos
├── index.html           # Template HTML
├── package.json         # Dependências
├── vite.config.js       # Configuração do Vite
└── README.md           # Este arquivo
```

## 🛠️ Tecnologias Utilizadas

- **Frontend:** React 19.1.0
- **Build Tool:** Vite 6.3.5
- **Styling:** TailwindCSS + CSS customizado
- **Componentes:** shadcn/ui
- **Ícones:** Lucide React
- **Planilhas:** xlsx
- **Animações:** CSS3 + Framer Motion

## 🎨 Principais Componentes

### AnimatedTitle
Título principal com animações de gradiente e efeitos visuais.

### ProcessingModal
Modal moderno para exibição do progresso da análise de IA.

### SearchResults
Componente para exibição dos resultados de busca com destaque.

### NetworkConnection
Interface para conexão com rede local hospitalar.

## 📊 Funcionalidades Implementadas

### ✅ Busca e Filtros
- [x] Busca por texto livre
- [x] Filtro por tipo (paciente, atendimento, prontuário)
- [x] Filtro por data
- [x] Destaque de termos encontrados
- [x] Ordenação por relevância

### ✅ Análise de IA
- [x] Processamento de texto médico
- [x] Identificação de procedimentos
- [x] Cálculo de valores
- [x] Níveis de confiança
- [x] Interface de processamento moderna

### ✅ Conectividade
- [x] Conexão com rede local
- [x] Carregamento automático de arquivos
- [x] Suporte a TXT e XLSX
- [x] Indicadores de status

### ✅ Interface
- [x] Design responsivo
- [x] Título animado
- [x] Tema moderno
- [x] Feedback visual
- [x] Animações suaves

## 🔧 Scripts Disponíveis

```bash
# Executar em modo desenvolvimento
npm run dev

# Construir para produção
npm run build

# Visualizar build de produção
npm run preview

# Linting
npm run lint
```

## 🎯 Configuração de Rede

Para conectar à rede hospitalar, configure o caminho:

```
\\10.2.30.13\Gerencia_Hospitalidade_1A\Coordenador\Leandro\MedSearch AI
```

### Arquivos Suportados:
- **Atendimentos:** `atendimento_*.txt`
- **Procedimentos:** `procedimentoDinamico.xlsx`
- **Compatibilidade:** `Procedimento Compatibilidade.xlsx`
- **Contas:** `contas.xlsx`
- **Protocolos:** `protocolo.xlsx`

## 🐛 Solução de Problemas

### Erro: "command not found: npm"
**Solução:** Instale o Node.js em https://nodejs.org/

### Erro: "Port 5173 is already in use"
**Solução:** 
```bash
npm run dev -- --port 3000
```

### Página em branco
**Solução:** 
1. Verifique se executou `npm install`
2. Limpe o cache: `npm run dev -- --force`
3. Verifique o console do navegador (F12)

## 📈 Roadmap

### Próximas Funcionalidades
- [ ] Integração com API real de IA
- [ ] Autenticação e autorização
- [ ] Conformidade HIPAA
- [ ] PWA (Progressive Web App)
- [ ] Testes automatizados
- [ ] Deploy em produção

### Melhorias Planejadas
- [ ] Cache offline
- [ ] Sincronização em background
- [ ] Relatórios avançados
- [ ] Exportação de dados
- [ ] Integração com sistemas hospitalares

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Equipe

- **Desenvolvimento:** Manus AI
- **Especificações:** Equipe Médica Hospitalar
- **Design:** Interface moderna e intuitiva

## 📞 Suporte

Para suporte técnico ou dúvidas:

1. Abra uma [Issue](https://github.com/seu-usuario/medsearch-ai/issues)
2. Consulte a [Documentação](https://github.com/seu-usuario/medsearch-ai/wiki)
3. Entre em contato com a equipe de desenvolvimento

---

**MedSearch AI** - Transformando a análise médica com inteligência artificial 🚀

