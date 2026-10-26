import Cookies from "js-cookie";

export type ProgressCallback = (percent: number) => void;

export function authHeaders(): Record<string, string> {
  const token = Cookies.get("access_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/** Sends a request via XHR so upload progress can be reported (fetch cannot). */
export function xhrRequest<T = unknown>(opts: {
  url: string;
  method: "POST" | "PATCH" | "PUT";
  body: XMLHttpRequestBodyInit;
  headers?: Record<string, string>;
  onProgress?: ProgressCallback;
  signal?: AbortSignal;
  parse?: boolean;
}): Promise<{ data: T; headers: XMLHttpRequest }> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(opts.method, opts.url);
    Object.entries(opts.headers || {}).forEach(([k, v]) => xhr.setRequestHeader(k, v));

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) opts.onProgress?.(Math.round((e.loaded / e.total) * 100));
    };
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        let data: unknown = null;
        if (opts.parse !== false && xhr.responseText) {
          try {
            data = JSON.parse(xhr.responseText);
          } catch {
            data = xhr.responseText;
          }
        }
        opts.onProgress?.(100);
        resolve({ data: data as T, headers: xhr });
      } else {
        let msg = `HTTP Error ${xhr.status}`;
        try {
          const json = JSON.parse(xhr.responseText);
          msg = json.detail || JSON.stringify(json);
        } catch {
          /* keep default message */
        }
        const err = new Error(msg) as Error & { status?: number };
        err.status = xhr.status;
        reject(err);
      }
    };
    xhr.onerror = () => reject(new Error("Network error. Check your connection and try again."));
    xhr.onabort = () => reject(new Error("Upload cancelled."));
    opts.signal?.addEventListener("abort", () => xhr.abort());
    xhr.send(opts.body);
  });
}
