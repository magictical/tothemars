"use server"

export async function submitToNotion(formData: FormData) {
  const name = formData.get("name")
  const email = formData.get("email")

  if (!name || !email) {
    return { success: false, message: "Name and email are required" }
  }

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const NOTION_API_KEY = process.env.NOTION_API_KEY
  const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID

  // If env vars are missing, we just mock the success for the demo
  if (!NOTION_API_KEY || !NOTION_DATABASE_ID) {
    console.log("Mocking Notion submission:", { name, email })
    return { success: true, message: "Successfully registered (Mock)" }
  }

  try {
    const response = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${NOTION_API_KEY}`,
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28",
      },
      body: JSON.stringify({
        parent: { database_id: NOTION_DATABASE_ID },
        properties: {
          Name: {
            title: [
              {
                text: {
                  content: name,
                },
              },
            ],
          },
          Email: {
            email: email,
          },
        },
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to submit to Notion")
    }

    return { success: true, message: "Successfully registered" }
  } catch (error) {
    console.error("Notion submission error:", error)
    return { success: false, message: "Failed to register. Please try again." }
  }
}
