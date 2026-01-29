#!/bin/bash

ESC=$(printf '\033')
BIGREEN="${ESC}[1;92m"
BGRED="${ESC}[37;41;5m"

echo "devcontainerのセットアップを開始します..."
echo "${BGRED} - 環境変数を追加する処理があります。          - ${ESC}[m"
echo "${BGRED} - 実行終了まではbashを立ち上げないでください。 - ${ESC}[m"

# sudo chown -R node:node /workspaces/$LOCAL_WORKSPACE_FOLDER_BASENAME/frontend/node_modules
# sudo chown -R node:node /workspaces/$LOCAL_WORKSPACE_FOLDER_BASENAME/backend/node_modules

echo "${BIGREEN}\$sudo npm install --global pnpm${ESC}[m"
sudo npm install --global pnpm

echo "${BIGREEN}\$pnpm config set store-dir /workspaces/.pnpm-store${ESC}[m"
pnpm config set store-dir /workspaces/.pnpm-store

export SHELL="/bin/bash"
echo "${BIGREEN}\$pnpm setup${ESC}[m"
pnpm setup

# .bashrcは対話型シェルでないと内部処理が行われないため、setupで.bashrcに追加される行を直接実行する
# 本来はsetup実行前後の差分をちゃんととってきたほうがいいけどとりあえずベタ書き
export PNPM_HOME="/home/node/.local/share/pnpm"
case ":$PATH:" in
  *":$PNPM_HOME:"*) ;;
  *) export PATH="$PNPM_HOME:$PATH" ;;
esac

# NestJS CLIのインストール
echo "${BIGREEN}\$pnpm add -g @nestjs/cli${ESC}[m"
pnpm add -g @nestjs/cli

echo "devcontainerのセットアップが完了しました。"