# 🐙 Configuração do Repositório GitHub - MedSearch AI

## 📋 Instruções para Criar o Repositório

### 1. Criar Repositório no GitHub

1. Acesse [GitHub](https://github.com)
2. Clique em "New repository"
3. Configure:
   - **Repository name:** `medsearch-ai`
   - **Description:** `Sistema Inteligente de Análise de Evoluções Médicas com IA para Faturamento`
   - **Visibility:** Public (ou Private conforme necessário)
   - **Initialize:** ❌ Não marque nenhuma opção (já temos os arquivos)

### 2. Comandos para Upload

Execute estes comandos na pasta do projeto:

```bash
# Inicializar repositório Git
git init

# Adicionar todos os arquivos
git add .

# Primeiro commit
git commit -m "🎉 Initial commit: MedSearch AI - Sistema de Análise Médica com IA"

# Adicionar origem remota (substitua SEU_USUARIO pelo seu username)
git remote add origin https://github.com/SEU_USUARIO/medsearch-ai.git

# Enviar para GitHub
git push -u origin main
```

### 3. Configurar Branch Principal

Se necessário, configure a branch principal:

```bash
# Renomear branch para main (se estiver como master)
git branch -M main
```

## 🎯 Estrutura Final no GitHub

Após o upload, seu repositório terá:

```
medsearch-ai/
├── 📁 src/                    # Código fonte
├── 📁 public/                 # Arquivos públicos
├── 📁 .github/               # Configurações GitHub (opcional)
├── 📄 README.md              # Documentação principal
├── 📄 LICENSE                # Licença MIT
├── 📄 .gitignore            # Arquivos ignorados
├── 📄 package.json          # Dependências
├── 📄 vite.config.js        # Configuração Vite
└── 📄 GITHUB_SETUP.md       # Este arquivo
```

## 🚀 Para Usuários Finais

### Como Baixar e Executar

1. **Clone o repositório:**
```bash
git clone https://github.com/SEU_USUARIO/medsearch-ai.git
cd medsearch-ai
```

2. **Instale dependências:**
```bash
npm install
```

3. **Execute a aplicação:**
```bash
npm run dev
```

4. **Acesse:** `http://localhost:5173/`

### Download Direto (sem Git)

1. Acesse o repositório no GitHub
2. Clique em "Code" → "Download ZIP"
3. Extraia o arquivo
4. Siga os passos 2-4 acima

## 🔧 Configurações Opcionais

### GitHub Actions (CI/CD)

Crie `.github/workflows/deploy.yml` para deploy automático:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm install
      
    - name: Build
      run: npm run build
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

### Issues Templates

Crie `.github/ISSUE_TEMPLATE/bug_report.md`:

```markdown
---
name: Bug report
about: Create a report to help us improve
title: '[BUG] '
labels: bug
assignees: ''
---

**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear and concise description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment:**
 - OS: [e.g. Windows, macOS, Linux]
 - Browser [e.g. chrome, safari]
 - Node.js version [e.g. 18.0.0]

**Additional context**
Add any other context about the problem here.
```

## 📊 Badges para README

Adicione badges ao README.md:

```markdown
![GitHub stars](https://img.shields.io/github/stars/SEU_USUARIO/medsearch-ai)
![GitHub forks](https://img.shields.io/github/forks/SEU_USUARIO/medsearch-ai)
![GitHub issues](https://img.shields.io/github/issues/SEU_USUARIO/medsearch-ai)
![GitHub license](https://img.shields.io/github/license/SEU_USUARIO/medsearch-ai)
```

## 🎉 Pronto!

Após seguir estes passos, seu repositório estará configurado e pronto para uso!

### Vantagens do GitHub:

- ✅ **Fácil download** via `git clone`
- ✅ **Controle de versão** automático
- ✅ **Colaboração** facilitada
- ✅ **Issues e Pull Requests** para melhorias
- ✅ **GitHub Pages** para deploy gratuito
- ✅ **Documentação** centralizada

