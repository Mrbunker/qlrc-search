import { kv } from "@vercel/kv";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");
  if (!key) {
    return Response.json(
      { code: 400, error: "key are required" },
      { status: 400 }
    );
  }
  const result = await kv.get(key);
  return Response.json({ data: result });
}
