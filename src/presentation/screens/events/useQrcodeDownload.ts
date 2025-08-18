import { useCallback, useRef } from "react";

type Options = {
  filename?: string;
  size?: number;
  backgroundColor?: string;
  scale?: number;
};

export function useQrCodeDownload(svgId: string, opts?: Options) {
  const isDownloadingRef = useRef(false);

  const downloadPng = useCallback(async () => {
    if (isDownloadingRef.current) return;
    isDownloadingRef.current = true;

    try {
      const svgEl = document.getElementById(svgId) as SVGSVGElement | null;
      if (!svgEl) {
        throw new Error(`SVG with id "${svgId}" not found`);
      }

      const clone = svgEl.cloneNode(true) as SVGSVGElement;
      clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      clone.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");

      const baseSize =
        opts?.size ??
        (() => {
          const vb = clone.getAttribute("viewBox");
          if (vb) {
            const parts = vb.split(/\s+/).map(Number);
            if (parts.length === 4) {
              return Math.max(parts[2], parts[3]);
            }
          }
          const w = parseInt(clone.getAttribute("width") || "256", 10);
          const h = parseInt(clone.getAttribute("height") || "256", 10);
          return Math.max(w, h);
        })();

      const scale = opts?.scale ?? 2;
      const outSize = baseSize * scale;

      const svgData = new XMLSerializer().serializeToString(clone);
      const svgBlob = new Blob([svgData], {
        type: "image/svg+xml;charset=utf-8",
      });
      const svgUrl = URL.createObjectURL(svgBlob);

      const canvas = document.createElement("canvas");
      canvas.width = outSize;
      canvas.height = outSize;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas 2D context not available");

      const bg = opts?.backgroundColor ?? "#ffffff";
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const img = new Image();
      img.crossOrigin = "anonymous";

      await new Promise<void>((resolve, reject) => {
        img.onload = () => {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          resolve();
        };
        img.onerror = reject;
        img.src = svgUrl;
      });

      URL.revokeObjectURL(svgUrl);

      await new Promise<void>((resolve, reject) => {
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Failed to create PNG blob"));
              return;
            }
            const blobUrl = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = blobUrl;
            a.download = (opts?.filename ?? "qr-code") + ".png";
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(blobUrl);
            resolve();
          },
          "image/png",
          1.0
        );
      });
    } finally {
      isDownloadingRef.current = false;
    }
  }, [svgId, opts?.size, opts?.filename, opts?.backgroundColor, opts?.scale]);

  return { downloadPng };
}
