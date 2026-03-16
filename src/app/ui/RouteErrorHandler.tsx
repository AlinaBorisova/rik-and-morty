import { useEffect } from "react";
import { useRouteError } from "react-router";

function isOfflineOrChunkError(error: unknown): boolean {
  if (typeof navigator !== "undefined" && !navigator.onLine) return true;
  const msg = error instanceof Error ? error.message : String(error ?? "");
  return (
    msg.includes("Failed to fetch dynamically imported module") ||
    msg.includes("ChunkLoadError") ||
    msg.includes("Loading chunk")
  );
}

export function RouteErrorHandler() {
  const error = useRouteError();

  useEffect(() => {
    if (isOfflineOrChunkError(error)) {
      window.location.href = "/offline.html";
    }
  }, [error]);

  if (isOfflineOrChunkError(error)) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <p>Нет соединения. Перенаправление на страницу офлайн…</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h4>Что-то пошло не так</h4>
      <p>{error instanceof Error ? error.message : String(error)}</p>
    </div>
  );
}
