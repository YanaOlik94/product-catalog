export const useHttp = () => {

    const request = async <T> (
        url: string,
        method: string = 'GET',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        body?: any,
        headers: Record<string, string> = { 'Content-Type': 'application/json' }) => {

        try {
            const response = await fetch(url, {method, body, headers});

            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            const data = await response.json() as T;

            return data;
        } catch(e) {
            throw e;
        }
    };

    return {request}
}
