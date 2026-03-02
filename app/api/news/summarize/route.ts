export async function POST(req: Request) {
  const { text } = await req.json();

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Summarize in 3 short lines." },
        { role: "user", content: text },
      ],
    }),
  });

  const data = await response.json();

  return Response.json({
    summary: data.choices[0].message.content,
  });
}