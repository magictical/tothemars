import { ImageResponse } from "next/og";

// Image metadata
export const alt = "Mars Migration Project - Join Humanity's Journey to Mars";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 60,
          background: "linear-gradient(to bottom, #1a1d2b, #0a0d1a)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* Background Pattern */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(circle at 50% 50%, rgba(168, 51, 46, 0.2) 0%, transparent 70%)",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "80px",
            zIndex: 1,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 24,
              color: "#a8332e",
              fontWeight: "bold",
              marginBottom: 20,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            PROJECT RED PLANET
          </div>
          <div
            style={{
              fontSize: 72,
              fontWeight: "bold",
              color: "#ffffff",
              marginBottom: 30,
              lineHeight: 1.2,
            }}
          >
            Humanity's Next Step
          </div>
          <div
            style={{
              fontSize: 72,
              fontWeight: "bold",
              color: "#a8332e",
              marginBottom: 40,
            }}
          >
            Starts on Mars
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#cccccc",
              maxWidth: 900,
              lineHeight: 1.5,
            }}
          >
            Join the Mars migration project led by Elon Musk. Secure your place
            in history as one of the first settlers on the Red Planet.
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
