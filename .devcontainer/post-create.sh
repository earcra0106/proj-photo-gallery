#!/bin/bash

ESC=$(printf '\033')
BIGREEN="${ESC}[1;92m"
BIWHITE="${ESC}[1;97m"
BIGRAY="${ESC}[1;90m"
BGRED="${ESC}[37;41;5m"
NORMAL="${ESC}[m"

echo "devcontainerのセットアップを開始します..."
echo "${BGRED} - 環境変数を追加する処理があります。          - ${NORMAL}"
echo "${BGRED} - 実行終了まではbashを立ち上げないでください。 - ${NORMAL}"

echo "${BIGREEN}.env*.example から .env* ファイルを作成します。${NORMAL}"
find . \
  \( -name "node_modules" -o -name "dist" -o -name ".git" -o -name ".next" -o -name ".turbo" -o -name ".devcontainer" \) -prune -o \
  -type f -name ".env*.example" -print0 |
while IFS= read -r -d '' example_file; do
  target_file="${example_file%.example}"
  relative_path="${target_file#./}"

  if [ -f "$target_file" ]; then
    echo "Existing : $relative_path"
  else
    cp "$example_file" "$target_file"
    echo "${BIGREEN}Created${NORMAL}  : $relative_path"
  fi
done

# シェルをbashに設定
export SHELL="/bin/bash"

# pnpmのインストール
echo "${BIGREEN}\$ sudo npm install --global pnpm@${PNPM_VERSION}${NORMAL}"
sudo npm install --global pnpm@${PNPM_VERSION}

# pnpmのキャッシュディレクトリをワークスペース内に変更
echo "${BIGREEN}\$ pnpm config set store-dir /workspaces/.pnpm-store${NORMAL}"
pnpm config set store-dir /workspaces/.pnpm-store

echo "${BIGREEN}\$ pnpm setup${NORMAL}"
pnpm setup

# pnpmのパスを通す
export PNPM_HOME="/home/node/.local/share/pnpm"
case ":$PATH:" in
  *":$PNPM_HOME:"*) ;;
  *) export PATH="$PNPM_HOME:$PATH" ;;
esac

# NestJS CLIのインストール
echo "${BIGREEN}\$ pnpm add -g @nestjs/cli${NORMAL}"
pnpm add -g @nestjs/cli

echo "devcontainerのセットアップが完了しました。"
echo "一度このターミナルを閉じて、新しいターミナルを開いてください。"
echo "初回起動時は以下を手動で実行してください。"
echo ""
echo "${BIWHITE}\$ pnpm install ${BIGRAY}# 依存関係のインストール${NORMAL}"
echo "${BIWHITE}\$ pnpm build   ${BIGRAY}# ビルド${NORMAL}"
echo "${BIWHITE}\$ pnpm dev     ${BIGRAY}# 開発サーバーの起動${NORMAL}"