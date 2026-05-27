// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetchWithAuth = async (input: RequestInfo, init: RequestInit = {}): Promise<any> => {

  const token = sessionStorage.getItem('token');
  const isFormData = init.body instanceof FormData;

  const headers = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...(token ? { "Authorization": `Bearer ${token}` } : {}),
    ...(init.headers || {}),
  };

  const response = await fetch(input, { ...init, headers });
  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw {
      status: response.status,
      message: result.message || result.error || "Error desconocido",
    };
  }

  return result;
};
