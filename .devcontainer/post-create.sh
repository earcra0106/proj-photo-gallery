#!/bin/bash

ESC=$(printf '\033')
BIGREEN="${ESC}[1;92m"
BGRED="${ESC}[37;41;5m"

echo "devcontainerのセットアップを開始します..."
echo "${BGRED} - 環境変数を追加する処理があります。          - ${ESC}[m"
echo "${BGRED} - 実行終了まではbashを立ち上げないでください。 - ${ESC}[m"

# シェルをbashに設定
export SHELL="/bin/bash"

# pnpmのインストール
echo "${BIGREEN}\$sudo npm install --global pnpm@${PNPM_VERSION}${ESC}[m"
sudo npm install --global pnpm@${PNPM_VERSION}

# pnpmのキャッシュディレクトリをワークスペース内に変更
echo "${BIGREEN}\$pnpm config set store-dir /workspaces/.pnpm-store${ESC}[m"
pnpm config set store-dir /workspaces/.pnpm-store

echo "${BIGREEN}\$pnpm setup${ESC}[m"
pnpm setup

# pnpmのパスを通す
export PNPM_HOME="/home/node/.local/share/pnpm"
case ":$PATH:" in
  *":$PNPM_HOME:"*) ;;
  *) export PATH="$PNPM_HOME:$PATH" ;;
esac

# NestJS CLIのインストール
echo "${BIGREEN}\$pnpm add -g @nestjs/cli${ESC}[m"
pnpm add -g @nestjs/cli

echo "devcontainerのセットアップが完了しました。"
echo "一度このターミナルを閉じて、新しいターミナルを開いてください。"