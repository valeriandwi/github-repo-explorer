import { GITHUB_TOKEN } from "@/constants/constants";

export const fetcher = async <T>({
  url,
  headers = {},
}: {
  url: string;
  headers?: HeadersInit;
}): Promise<T> => {
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        ...headers,
      },
    });

    if (!response.ok) {
      const errorMessage = await response.json();
      throw new Error(`Error: ${response.status} ${errorMessage.message}`);
    }

    return response.json();
  } catch (err) {
    throw err;
  }
};
