#!/usr/bin/env bash
set -euo pipefail

PROJECT_NAME="${1:-sambot-crm-demo}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [[ -z "${VERCEL_TOKEN:-}" ]]; then
  echo "❌ Ошибка: переменная VERCEL_TOKEN не задана."
  echo "Пример запуска: VERCEL_TOKEN='<token>' $0 ${PROJECT_NAME}"
  exit 1
fi

if ! command -v npx >/dev/null 2>&1; then
  echo "❌ Ошибка: npx не найден. Установите Node.js (LTS)."
  exit 1
fi

echo "🚀 Deploying '${PROJECT_NAME}' from ${SCRIPT_DIR}"
cd "${SCRIPT_DIR}"

OUTPUT="$(npx -y vercel --prod --yes --token "${VERCEL_TOKEN}" --name "${PROJECT_NAME}" 2>&1)"
echo "${OUTPUT}"

URL="$(printf '%s\n' "${OUTPUT}" | rg -o 'https://[^ ]+\.vercel\.app' | tail -n 1 || true)"
if [[ -n "${URL}" ]]; then
  echo "✅ Public URL: ${URL}"
else
  echo "⚠️ Деплой завершён, но URL не распарсился автоматически. Проверьте вывод выше."
fi
