import { kv } from "@vercel/kv";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");
  const value = searchParams.get("value");
  if (!key || !value) {
    return Response.json(
      { code: 400, error: "key and value are required" },
      { status: 400 }
    );
  }
  await kv.set(key, value);
  return Response.json({ code: 0 }, { status: 200 });
}
