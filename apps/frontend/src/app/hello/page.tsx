'use client';

import { useEffect, useState } from 'react';
import { fetchUsers } from '@/fetcher/users';

export default function HelloPage() {
  const [users, setUsers] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
        setError(null);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to fetch users';
        setError(errorMessage);
        setUsers('');
        console.error('Error loading users:', err);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            ユーザー情報
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            バックエンドからユーザー情報を取得して表示します。
          </p>
        </div>
        {loading && (
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mt-6">
            ローディング中...
          </p>
        )}

        {error && (
          <div className="mt-6 w-full rounded-lg bg-red-50 dark:bg-red-950 p-4 border border-red-200 dark:border-red-800">
            <p className="text-red-700 dark:text-red-200">
              <strong>エラー:</strong> {error}
            </p>
          </div>
        )}

        {!loading && users && (
          <div className="mt-6 w-full">
            <h2 className="text-lg font-semibold text-black dark:text-zinc-50 mb-4">
              取得結果:
            </h2>
            <pre className="bg-zinc-100 dark:bg-zinc-900 p-4 rounded-lg overflow-x-auto max-h-96 text-xs md:text-sm text-zinc-800 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-700 whitespace-pre-wrap break-words">
              {users}
            </pre>
          </div>
        )}

        {!loading && !users && !error && (
          <p className="text-zinc-600 dark:text-zinc-400 mt-6">
            ユーザー情報がありません
          </p>
        )}
      </main>
    </div>
  );
}
