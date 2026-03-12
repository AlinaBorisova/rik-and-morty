import { useState, useRef, useCallback, useTransition } from "react";
import { throttledFetch } from "./apiThrottle";

export interface PaginatedResponse<T> {
  results: T[];
  info: { count: number; next: string | null; pages: number };
}

export function useInfiniteScroll<T>(initialItems: T[], initialNextUrl: string | null) {
  const [items, setItems] = useState<T[]>(initialItems);
  const [nextUrl, setNextUrl] = useState<string | null>(initialNextUrl);
  const [isPending, startTransition] = useTransition();
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const isLoadingRef = useRef(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const loadMore = useCallback(async () => {
    if (!nextUrl || isLoadingRef.current || isPending || loadError) return;
    isLoadingRef.current = true;
    setLoadError(null);
    setIsLoadingMore(true);

    try {
      const response = await throttledFetch(nextUrl);
      if (!response.ok) {
        if (response.status === 429) {
          setLoadError("Слишком много запросов. Подождите немного и нажмите «Повторить».");
        } else {
          setLoadError(`Ошибка загрузки: ${response.status}`);
        }
        isLoadingRef.current = false;
        return;
      }

      const data: PaginatedResponse<T> = await response.json();

      startTransition(() => {
        setItems((prev) => [...prev, ...data.results]);
        setNextUrl(data.info.next);
      });
    } catch {
      setLoadError("Не удалось загрузить. Проверьте интернет или попробуйте позже.");
    } finally {
      isLoadingRef.current = false;
      setIsLoadingMore(false);
    }
  }, [nextUrl, isPending, loadError]);

  const lastNodeRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node) {
        observerRef.current?.disconnect();
        observerRef.current = null;
        return;
      }
      observerRef.current?.disconnect();
      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries.length === 0) return;
          if (entries[0].isIntersecting) loadMore();
        },
        { rootMargin: "0px 0px 500px 0px" }
      );
      observerRef.current.observe(node);
    },
    [loadMore]
  );

  return { items, lastNodeRef, isPending, isLoadingMore, loadError, setLoadError };
}