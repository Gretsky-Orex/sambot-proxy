#!/usr/bin/env bash
set -euo pipefail

PORT="${1:-4173}"

if ! command -v python3 >/dev/null 2>&1; then
  echo "python3 не найден" >&2
  exit 1
fi

echo "[SAMBOT CRM DEMO] Запускаю статический сервер на порту ${PORT}..."
echo "Откройте в браузере: http://localhost:${PORT}"
echo "Для остановки: Ctrl+C"

python3 -m http.server "${PORT}"
