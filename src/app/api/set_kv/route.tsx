import { kv } from "@vercel/kv";

export async function POST(request: Request) {
  const { key, value } = await request.json();
  if (!key || !value) {
    return Response.json(
      { code: 400, error: "key and value are required" },
      { status: 400 }
    );
  }

  try {
    await kv.set(key, value);
  } catch (e) {
    return Response.json(
      { code: 500, error: "kv server error" },
      { status: 500 }
    );
  }

  return Response.json({ code: 0 }, { status: 200 });
}
