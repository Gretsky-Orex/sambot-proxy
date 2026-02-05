# Публичный деплой демо CRM (Vercel)

## Почему у вас была ошибка `./deploy_vercel.sh: no such file or directory`
Вы запускали команду из домашней директории (`~`), а файл `deploy_vercel.sh` лежит в папке проекта.

## Быстрый рабочий путь (3 команды)
```bash
cd /path/to/sambot-proxy
export VERCEL_TOKEN='ВАШ_НОВЫЙ_ТОКЕН'
./deploy_vercel.sh sambot-crm-demo
```

> Если уже находитесь не в папке проекта, можно запустить так:
```bash
bash /path/to/sambot-proxy/deploy_vercel.sh sambot-crm-demo
```

Скрипт:
- сам деплоит именно из директории репозитория;
- выводит публичную ссылку вида `https://...vercel.app` в конце.

## Где взять токен
Vercel → **Settings** → **Tokens** → **Create Token**.

## Важно по безопасности
Ранее токен был отправлен в открытом виде. Рекомендуется:
1. Revoke старого токена.
2. Создать новый.
3. Использовать только новый токен в командах.

## Если скрипт не нужен
Можно деплоить напрямую:
```bash
cd /path/to/sambot-proxy
npx -y vercel --prod --yes --token "$VERCEL_TOKEN" --name sambot-crm-demo
```
