"use server";

interface SubmitResult {
  success: boolean;
  message: string;
}

export async function submitToNotion(
  formData: FormData
): Promise<SubmitResult> {
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();

  // Validate input
  if (!name || !email) {
    return { success: false, message: "Name and email are required" };
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, message: "Please enter a valid email address" };
  }

  const NOTION_API_KEY = process.env.NOTION_API_KEY;
  const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

  // Check if environment variables are set
  if (!NOTION_API_KEY || !NOTION_DATABASE_ID) {
    console.error("Notion API credentials are missing");
    return {
      success: false,
      message: "Server configuration error. Please contact support.",
    };
  }

  try {
    // 먼저 데이터베이스의 속성 정보를 가져와서 실제 속성명 확인
    const dbResponse = await fetch(
      `https://api.notion.com/v1/databases/${NOTION_DATABASE_ID}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${NOTION_API_KEY}`,
          "Notion-Version": "2022-06-28",
        },
      }
    );

    if (!dbResponse.ok) {
      const errorData = await dbResponse.json().catch(() => ({}));
      console.error("Failed to fetch database properties:", errorData);
      return {
        success: false,
        message: "Failed to access database. Please check database ID.",
      };
    }

    const dbData = await dbResponse.json();
    const properties = dbData.properties;

    // 속성명 찾기 (대소문자 구분 없이 찾기)
    const namePropertyKey = Object.keys(properties).find(
      (key) =>
        properties[key].type === "title" ||
        key.toLowerCase() === "name" ||
        key.toLowerCase() === "이름"
    );

    const emailPropertyKey = Object.keys(properties).find(
      (key) =>
        properties[key].type === "email" ||
        key.toLowerCase() === "email" ||
        key.toLowerCase() === "이메일"
    );

    if (!namePropertyKey) {
      console.error("Available properties:", Object.keys(properties));
      return {
        success: false,
        message: `Name property not found. Available properties: ${Object.keys(
          properties
        ).join(", ")}`,
      };
    }

    if (!emailPropertyKey) {
      console.error("Available properties:", Object.keys(properties));
      return {
        success: false,
        message: `Email property not found. Available properties: ${Object.keys(
          properties
        ).join(", ")}`,
      };
    }

    // 실제 속성명과 타입에 맞게 데이터 구성
    const nameProperty = properties[namePropertyKey];
    const emailProperty = properties[emailPropertyKey];

    const propertiesPayload: Record<string, any> = {};

    // 이름 속성 설정
    if (nameProperty.type === "title") {
      propertiesPayload[namePropertyKey] = {
        title: [
          {
            text: {
              content: name,
            },
          },
        ],
      };
    } else {
      // 다른 타입의 경우 (rich_text 등)
      propertiesPayload[namePropertyKey] = {
        rich_text: [
          {
            text: {
              content: name,
            },
          },
        ],
      };
    }

    // 이메일 속성 설정
    if (emailProperty.type === "email") {
      propertiesPayload[emailPropertyKey] = {
        email: email,
      };
    } else if (emailProperty.type === "rich_text") {
      propertiesPayload[emailPropertyKey] = {
        rich_text: [
          {
            text: {
              content: email,
            },
          },
        ],
      };
    } else {
      // 다른 타입의 경우
      propertiesPayload[emailPropertyKey] = {
        rich_text: [
          {
            text: {
              content: email,
            },
          },
        ],
      };
    }

    console.log("Using properties:", {
      nameProperty: namePropertyKey,
      emailProperty: emailPropertyKey,
      payload: propertiesPayload,
    });

    const response = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${NOTION_API_KEY}`,
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28",
      },
      body: JSON.stringify({
        parent: {
          database_id: NOTION_DATABASE_ID,
        },
        properties: propertiesPayload,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Notion API error:", {
        status: response.status,
        statusText: response.statusText,
        error: errorData,
      });

      // Handle specific error cases
      if (response.status === 401) {
        return {
          success: false,
          message: "Authentication failed. Please check API key.",
        };
      }

      if (response.status === 404) {
        return {
          success: false,
          message: "Database not found. Please check database ID.",
        };
      }

      // 속성 관련 에러인 경우 더 자세한 정보 제공
      if (response.status === 400 && errorData.message) {
        return {
          success: false,
          message: `Database error: ${errorData.message}. Please check property names.`,
        };
      }

      return {
        success: false,
        message: "Failed to register. Please try again later.",
      };
    }

    const data = await response.json();
    console.log("Successfully submitted to Notion:", data.id);

    return { success: true, message: "Successfully registered" };
  } catch (error) {
    console.error("Notion submission error:", error);
    return {
      success: false,
      message: "Network error. Please check your connection and try again.",
    };
  }
}
