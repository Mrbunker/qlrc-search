import { kv } from "@vercel/kv";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");
  const value = searchParams.get("value");
  console.log("|key", key);
  if (!key || !value) {
    return Response.json(
      { code: 400, error: "key and value are required" },
      { status: 400 }
    );
  }
  const r = await kv.set(key, value);
  console.log("|r", r);
  return Response.json({ code: 0 }, { status: 200 });
}
