import React from "react";
import { useParams, Navigate } from "react-router-dom";
import { get, upsert } from "../lib/storage";
import { Log } from "../lib/logger";

export default function Redirect() {
  const { code } = useParams();
  React.useEffect(() => {
    (async () => {
      try {
        const rec = get(code);
        if (!rec) {
          await Log.error("handler", `unknown shortcode: ${code}`);
          return;
        }

        const now = Date.now();
        if (rec.expiresAt && now > rec.expiresAt) {
          await Log.warn("handler", `expired shortcode attempted: ${code}`);
          return;
        }

        let locationLabel = "unknown";
        try {
          const geo = await new Promise((res, rej) =>
            navigator.geolocation
              ? navigator.geolocation.getCurrentPosition(res, rej, {
                  enableHighAccuracy: false,
                  timeout: 1500,
                  maximumAge: 60000
                })
              : rej()
          );
          if (geo && geo.coords) {
            const lat = geo.coords.latitude.toFixed(2);
            const lon = geo.coords.longitude.toFixed(2);
            locationLabel = `${lat},${lon}`;
          }
        } catch {}

        const click = {
          ts: now,
          ref: document.referrer || "direct",
          loc: locationLabel
        };
        const updated = { ...rec, clicks: [...(rec.clicks || []), click] };
        upsert(code, updated);
        await Log.info("handler", `redirect ${code} -> ${rec.url}`);
        window.location.replace(rec.url);
      } catch {}
    })();
  }, [code]);

  return <Navigate to="/" replace />;
}