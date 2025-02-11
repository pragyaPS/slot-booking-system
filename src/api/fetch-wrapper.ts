import { BASE_URL } from './constants';

export async function fetchWrapper<
	T,
	P = Record<string, string | number | boolean | undefined>,
>(
	endpoint: string,
	params?: P,
	options: RequestInit = { method: 'GET' }
): Promise<T> {
	const defaultHeaders = {
		Accept: 'application/json',
		Authorization: '',
		'Content-Type': 'application/json',
	};

	const finalOptions: RequestInit = {
		...options,
		headers: {
			...defaultHeaders,
			...(options.headers || {}),
		},
	};

	try {
		const url = new URL(`${BASE_URL}/${endpoint}`);
		if (params) {
			Object.entries(params).forEach(([key, value]) => {
				if (value !== undefined) {
					url.searchParams.append(key, (value as string).toString());
				}
			});
		}
		const response = await fetch(url.toString(), finalOptions);
		if (!response.ok) {
			const errorData = (await response.json()) as { message: string };
			throw new Error(`Error: ${response.status} - ${errorData.message}`);
		}
		return (await response.json()) as T;
	} catch (error) {
		console.error('Fetch error:', error);
		throw error;
	}
}
