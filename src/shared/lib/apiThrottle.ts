const RICK_AND_MORTY_API = "rickandmortyapi.com";
const MIN_INTERVAL_MS = 10_000;

let lastRequestTime = 0;

export async function throttledFetch(
  input: string | URL | Request,
  init?: RequestInit
): Promise<Response> {
  const url = typeof input === "string" ? input : input instanceof Request ? input.url : input.toString();
  if (!url.includes(RICK_AND_MORTY_API)) {
    return fetch(input, init);
  }

  const now = Date.now();
  const elapsed = now - lastRequestTime;
  if (elapsed < MIN_INTERVAL_MS) {
    await new Promise((r) => setTimeout(r, MIN_INTERVAL_MS - elapsed));
  }

  const response = await fetch(input, init);
  lastRequestTime = Date.now();
  return response;
}