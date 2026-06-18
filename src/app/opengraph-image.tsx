import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} · ML / AI engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0e0c0b",
          color: "#ece6dd",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: "#e0875a",
            letterSpacing: 1,
          }}
        >
          {site.role}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 88,
            fontWeight: 700,
            marginTop: 20,
            lineHeight: 1.05,
          }}
        >
          {site.name}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 30,
            color: "#9b9085",
            marginTop: 24,
            maxWidth: 920,
          }}
        >
          Machine learning, NLP, and full-stack, from semantic search to
          production APIs.
        </div>
        <div style={{ display: "flex", marginTop: 44, fontSize: 24, color: "#e0875a" }}>
          github.com/joeln45
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 12,
            display: "flex",
            background: "linear-gradient(90deg, #c2410c, #e0875a)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
