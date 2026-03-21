/**
 * ユーザー情報を取得するAPI呼び出し
 * バックエンドの GET / エンドポイントからユーザー情報を取得
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export interface User {
  id: string;
  name: string | null;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * バックエンドからユーザー情報を取得する
 * @returns {Promise<string>} ユーザー情報の文字列
 */
export async function fetchUsers(): Promise<string> {
  try {
    const response = await fetch(`${API_BASE_URL}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.text();
    return data;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Failed to fetch users:", errorMessage);
    throw error;
  }
}

/**
 * バックエンドからJSON形式のユーザー情報を取得する
 * （今後のAPI拡張用）
 */
export async function fetchUsersAsJson(): Promise<User[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data: User[] = await response.json();
    return data;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Failed to fetch users as JSON:", errorMessage);
    throw error;
  }
}
