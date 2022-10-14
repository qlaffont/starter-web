import { getAccessToken } from 'next-protected-auth';

const base = process.env.NEXT_PUBLIC_API_URL;

class RestAPIService {
  static login = `${base}/auth/login`;

  public static async logout() {
    const res = await fetch(`${base}/auth/logout`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAccessToken()}`,
      },
      body: JSON.stringify({}),
    });

    return res;
  }

  public static async refresh() {
    const res = await fetch(`${base}/auth/refresh`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      credentials: 'include',
    });

    if (res.ok) {
      return res.json();
    }

    throw res.json();
  }
}
export default RestAPIService;
