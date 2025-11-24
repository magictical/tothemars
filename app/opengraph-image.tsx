import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";

export const alt = "Mars Migration Project - Join Humanity's Journey to Mars";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  try {
    // Read the starship.png file from the public directory
    const imagePath = join(process.cwd(), "public", "starship.png");
    const imageBuffer = await readFile(imagePath);
    const base64Image = imageBuffer.toString("base64");

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
            backgroundImage: `url(data:image/png;base64,${base64Image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Dark overlay for text readability */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0, 0, 0, 0.5)",
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
  } catch (error) {
    console.error("Error generating Open Graph image:", error);
    // Fallback: return a simple image without background
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
            background: "linear-gradient(to bottom, #1a1d2b, #0a0d1a)",
            color: "#ffffff",
            padding: "60px",
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
              marginBottom: 24,
              lineHeight: 1.2,
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
            }}
          >
            Join the Mars migration project led by Elon Musk. Secure your place
            in history as one of the first settlers on the Red Planet.
          </div>
        </div>
      ),
      {
        ...size,
      }
    );
  }
}

