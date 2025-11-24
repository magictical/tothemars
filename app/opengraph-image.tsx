import { ImageResponse } from "next/og";

// Image metadata
export const alt = "Mars Migration Project - Join Humanity's Journey to Mars";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Get the base URL for image
const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    return process.env.NEXT_PUBLIC_BASE_URL;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "https://mars-landing-page-aey0t2ube-ians-projects-2d2fd58b.vercel.app";
};

// Image generation
export default async function Image() {
  const baseUrl = getBaseUrl();
  const starshipImageUrl = `${baseUrl}/starship.png`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* Background Image */}
        <img
          src={starshipImageUrl}
          alt="Starship"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />

        {/* Dark Overlay for better text readability */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(to bottom, rgba(26, 29, 43, 0.7), rgba(10, 13, 26, 0.85))",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "60px",
            zIndex: 1,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 22,
              color: "#a8332e",
              fontWeight: "bold",
              marginBottom: 16,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            PROJECT RED PLANET
          </div>
          <div
            style={{
              fontSize: 64,
              fontWeight: "bold",
              color: "#ffffff",
              marginBottom: 24,
              lineHeight: 1.2,
              textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
            }}
          >
            Humanity's Next Step
          </div>
          <div
            style={{
              fontSize: 64,
              fontWeight: "bold",
              color: "#a8332e",
              marginBottom: 32,
              textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
            }}
          >
            Starts on Mars
          </div>
          <div
            style={{
              fontSize: 24,
              color: "#e0e0e0",
              maxWidth: 850,
              lineHeight: 1.4,
              textShadow: "1px 1px 2px rgba(0,0,0,0.7)",
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
