export async function POST(req: Request) {
  const { title, description } = await req.json();

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a professional Indian news journalist. Expand the given news into a detailed 800-word article in clear simple English. Add background, impact, possible future developments, and public reaction."
        },
        {
          role: "user",
          content: `Title: ${title}\n\nSummary: ${description}`
        }
      ],
      temperature: 0.7,
    }),
  });

  const data = await response.json();

  return Response.json({
    content: data.choices[0].message.content,
  });
}