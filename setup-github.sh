#!/bin/bash
# Script de setup do ClawHouse no GitHub
# Rode na pasta do projeto local

REPO_NAME="ClawHouse"

echo "🐾 Configurando ClawHouse no GitHub..."

# Verificar se está na pasta certa
if [ ! -f "package.json" ]; then
  echo "❌ package.json não encontrado. Rode este script na pasta clawhouse-repo/"
  exit 1
fi

# Adicionar remote (substitua carlosrobertofilho9 pelo seu usuário)
git remote add origin https://github.com/carlosrobertofilho9/ClawHouse.git

# Criar repo via gh CLI (se instalado)
if command -v gh &> /dev/null; then
  echo "📦 Criando repo via GitHub CLI..."
  gh repo create "$REPO_NAME" --public --source=. --push
  echo "✅ Repo criado e push feito!"
  exit 0
fi

# Alternativa: instruções manuais
echo ""
echo "📋 Instruções manuais:"
echo "1. Acesse https://github.com/new"
echo "2. Nome: $REPO_NAME"
echo "3. Deixe público ou privado (como preferir)"
echo "4. NÃO inicialize com README (já temos)"
echo "5. Clique Create repository"
echo ""
echo "6. Depois, rode estes comandos:"
echo "   git remote add origin https://github.com/carlosrobertofilho9/$REPO_NAME.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "🐾 Pronto! Seu ClawHouse estará no GitHub."
