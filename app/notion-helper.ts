"use server"

/**
 * Notion 데이터베이스의 속성 정보를 가져오는 헬퍼 함수
 * 디버깅 목적으로 사용
 */
export async function getNotionDatabaseProperties() {
  const NOTION_API_KEY = process.env.NOTION_API_KEY
  const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID

  if (!NOTION_API_KEY || !NOTION_DATABASE_ID) {
    return { error: "Environment variables are not set" }
  }

  try {
    const response = await fetch(
      `https://api.notion.com/v1/databases/${NOTION_DATABASE_ID}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${NOTION_API_KEY}`,
          "Notion-Version": "2022-06-28",
        },
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      return { error: errorData }
    }

    const data = await response.json()
    return {
      properties: Object.keys(data.properties),
      propertyDetails: data.properties,
    }
  } catch (error) {
    return { error: String(error) }
  }
}

