"use server";

interface SubmitResult {
  success: boolean;
  message: string;
}

export async function submitToNotion(
  formData: FormData
): Promise<SubmitResult> {
  console.log("=== Form Submission Started ===");

  // Extract form data
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const desc = formData.get("desc")?.toString().trim();

  console.log("Form data extracted:", {
    name: name || "(empty)",
    email: email || "(empty)",
    desc: desc || "(empty)",
    descLength: desc?.length || 0,
  });

  // Validate input
  if (!name || !email) {
    console.error("Validation failed: Name or email is missing");
    return { success: false, message: "Name and email are required" };
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    console.error("Validation failed: Invalid email format");
    return { success: false, message: "Please enter a valid email address" };
  }

  const NOTION_API_KEY = process.env.NOTION_API_KEY;
  const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

  console.log("🔐 Environment variables check:", {
    hasApiKey: !!NOTION_API_KEY,
    hasDatabaseId: !!NOTION_DATABASE_ID,
    apiKeyLength: NOTION_API_KEY?.length || 0,
    databaseIdLength: NOTION_DATABASE_ID?.length || 0,
    apiKeyPrefix: NOTION_API_KEY?.substring(0, 10) || "N/A",
    databaseIdPrefix: NOTION_DATABASE_ID?.substring(0, 10) || "N/A",
    nodeEnv: process.env.NODE_ENV,
  });

  // Check if environment variables are set
  if (!NOTION_API_KEY || !NOTION_DATABASE_ID) {
    console.error("❌ Notion API credentials are missing!");
    console.error("Missing variables:", {
      NOTION_API_KEY: !NOTION_API_KEY ? "❌ MISSING" : "✅ SET",
      NOTION_DATABASE_ID: !NOTION_DATABASE_ID ? "❌ MISSING" : "✅ SET",
    });
    console.error("Please set environment variables:");
    console.error(
      "1. For Vercel: Go to Project Settings > Environment Variables"
    );
    console.error(
      "2. For local: Create .env.local file with NOTION_API_KEY and NOTION_DATABASE_ID"
    );
    return {
      success: false,
      message: "Server configuration error. Please contact support.",
    };
  }

  try {
    console.log("📡 Fetching database properties...");
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

    console.log(
      "Database fetch response status:",
      dbResponse.status,
      dbResponse.statusText
    );

    if (!dbResponse.ok) {
      const errorData = await dbResponse.json().catch(() => ({}));
      console.error("❌ Failed to fetch database properties:", {
        status: dbResponse.status,
        statusText: dbResponse.statusText,
        error: errorData,
      });
      return {
        success: false,
        message: "Failed to access database. Please check database ID.",
      };
    }

    const dbData = await dbResponse.json();
    const properties = dbData.properties;

    console.log("✅ Database properties fetched:", {
      totalProperties: Object.keys(properties).length,
      propertyNames: Object.keys(properties),
      propertyDetails: Object.keys(properties).map((key) => ({
        key,
        type: properties[key].type,
      })),
    });

    console.log("🔍 Matching properties...");

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

    // desc 속성 찾기: 키 이름을 우선으로 찾고, 그 다음 타입 확인
    const descPropertyKey =
      Object.keys(properties).find(
        (key) =>
          key.toLowerCase() === "desc" ||
          key.toLowerCase() === "description" ||
          key.toLowerCase() === "설명" ||
          key.toLowerCase() === "comment" ||
          key.toLowerCase() === "코멘트"
      ) ||
      Object.keys(properties).find(
        (key) => properties[key].type === "rich_text"
      );

    console.log("Property matching results:", {
      namePropertyKey: namePropertyKey || "❌ NOT FOUND",
      emailPropertyKey: emailPropertyKey || "❌ NOT FOUND",
      descPropertyKey: descPropertyKey || "❌ NOT FOUND",
    });

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
    const descProperty = descPropertyKey ? properties[descPropertyKey] : null;

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

    // desc 속성 설정 (값이 있는 경우)
    console.log("📝 Setting desc property...", {
      hasDescValue: !!desc,
      descValue: desc || "(empty)",
      descValueLength: desc?.length || 0,
      hasDescPropertyKey: !!descPropertyKey,
      hasDescProperty: !!descProperty,
    });

    if (desc) {
      if (descPropertyKey && descProperty) {
        // desc 속성이 찾아진 경우
        console.log("✅ Desc property found:", {
          key: descPropertyKey,
          type: descProperty.type,
          value: desc,
        });

        if (descProperty.type === "rich_text") {
          propertiesPayload[descPropertyKey] = {
            rich_text: [
              {
                text: {
                  content: desc,
                },
              },
            ],
          };
        } else {
          // 다른 타입이어도 rich_text로 시도 (Notion API는 rich_text를 기본으로 사용)
          console.warn(
            `⚠️ Desc property type is "${descProperty.type}", using rich_text format`
          );
          propertiesPayload[descPropertyKey] = {
            rich_text: [
              {
                text: {
                  content: desc,
                },
              },
            ],
          };
        }
        console.log(
          "✅ Desc property set in payload:",
          propertiesPayload[descPropertyKey]
        );
      } else {
        // desc 속성을 찾지 못한 경우 - 모든 속성 로그 출력
        console.error("❌ Desc property not found!");
        console.error(
          "Available properties:",
          Object.keys(properties).map((key) => ({
            key,
            type: properties[key].type,
          }))
        );
        console.error("Desc value that should be saved:", desc);
        console.error("This means desc will NOT be saved to Notion DB!");
      }
    } else {
      console.log("ℹ️ No desc value provided, skipping desc property");
    }

    console.log("📦 Final payload:", {
      nameProperty: namePropertyKey,
      emailProperty: emailPropertyKey,
      descProperty: descPropertyKey,
      payload: propertiesPayload,
      payloadKeys: Object.keys(propertiesPayload),
    });

    console.log("🚀 Sending request to Notion API...");
    const requestBody = {
      parent: {
        database_id: NOTION_DATABASE_ID,
      },
      properties: propertiesPayload,
    };
    console.log("Request body:", JSON.stringify(requestBody, null, 2));

    const response = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${NOTION_API_KEY}`,
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28",
      },
      body: JSON.stringify(requestBody),
    });

    console.log("📡 Notion API response:", {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("❌ Notion API error:", {
        status: response.status,
        statusText: response.statusText,
        error: errorData,
        fullError: JSON.stringify(errorData, null, 2),
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
    console.log("✅ Successfully submitted to Notion!");
    console.log("Response data:", {
      pageId: data.id,
      url: data.url,
      createdTime: data.created_time,
    });
    console.log("=== Form Submission Completed Successfully ===");

    return { success: true, message: "Successfully registered" };
  } catch (error) {
    console.error("❌ Notion submission error:", error);
    console.error("Error details:", {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
    console.log("=== Form Submission Failed ===");
    return {
      success: false,
      message: "Network error. Please check your connection and try again.",
    };
  }
}

interface ChatMessage {
  role: "user" | "model";
  parts: { text: string }[];
}

interface ChatResult {
  success: boolean;
  message?: string;
  error?: string;
}

export async function chatWithGemini(
  message: string,
  history: ChatMessage[] = [],
  language: "en" | "ko" = "en"
): Promise<ChatResult> {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  if (!GEMINI_API_KEY) {
    console.error("❌ Gemini API key is missing");
    const errorMessages = {
      en: "Server configuration error. Please contact support.",
      ko: "서버 설정 오류입니다. 지원팀에 문의해주세요.",
    };
    return {
      success: false,
      error: errorMessages[language],
    };
  }

  try {
    const { GoogleGenerativeAI } = await import("@google/generative-ai");
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

    // Use Gemini 2.5 Flash model (stable version, not experimental)
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    // Build chat history - ensure first message is from 'user'
    let chatHistory = history.length > 0 ? [...history] : [];

    // Remove any leading 'model' messages - Gemini requires first message to be from 'user'
    while (chatHistory.length > 0 && chatHistory[0].role === "model") {
      chatHistory.shift();
    }

    // Start chat session with history
    const chat = model.startChat({
      history: chatHistory,
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
    });

    // Send message
    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    return {
      success: true,
      message: text,
    };
  } catch (error) {
    console.error("❌ Gemini API error:", error);

    // Error messages based on language
    const errorMessages = {
      en: {
        quotaExceeded:
          "API quota exceeded. Please check your Google AI Studio plan and billing. The free tier may have daily limits. Try again later or upgrade your plan.",
        quotaExceededShort:
          "API quota exceeded. Please check your Google AI Studio account settings or try again later.",
        modelNotFound:
          "Model not found. Please check your API key and model settings.",
        generic: "Failed to get response from AI. Please try again.",
        serverConfig: "Server configuration error. Please contact support.",
      },
      ko: {
        quotaExceeded:
          "API 할당량이 초과되었습니다. Google AI Studio에서 플랜과 결제 정보를 확인해주세요. 무료 티어는 일일 제한이 있을 수 있습니다. 나중에 다시 시도하거나 플랜을 업그레이드해주세요.",
        quotaExceededShort:
          "API 할당량이 초과되었습니다. Google AI Studio 계정 설정을 확인하거나 잠시 후 다시 시도해주세요.",
        modelNotFound:
          "모델을 찾을 수 없습니다. API 키와 모델 설정을 확인해주세요.",
        generic: "AI 응답을 받는 데 실패했습니다. 다시 시도해주세요.",
        serverConfig: "서버 설정 오류입니다. 지원팀에 문의해주세요.",
      },
    };

    const messages = errorMessages[language];

    // Handle quota exceeded error (429)
    if (error instanceof Error && error.message.includes("429")) {
      return {
        success: false,
        error: messages.quotaExceeded,
      };
    }

    // Handle other errors
    if (error instanceof Error) {
      // Check for quota-related errors
      if (
        error.message.includes("quota") ||
        error.message.includes("Quota") ||
        error.message.includes("exceeded")
      ) {
        return {
          success: false,
          error: messages.quotaExceededShort,
        };
      }

      // Handle model not found error
      if (
        error.message.includes("404") ||
        error.message.includes("not found")
      ) {
        return {
          success: false,
          error: messages.modelNotFound,
        };
      }

      return {
        success: false,
        error: error.message || messages.generic,
      };
    }

    return {
      success: false,
      error: messages.generic,
    };
  }
}
