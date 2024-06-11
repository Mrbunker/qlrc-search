import { createCanvas } from "canvas";

export async function GET(request: Request) {
  const time = new Date().toLocaleString();
  // const { searchParams } = new URL(request.url);
  // const API_KEY = searchParams.get("API_KEY") || "";

  const img = draw(time);
  return new Response(img, {
    status: 200,
    headers: {
      "content-type": "image/png",
      // API_KEY,
    },
  });
}

const draw = (time: string) => {
  const canvas = createCanvas(400, 200);
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "black";
  ctx.font = "40px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.fillText(time, canvas.width / 2, canvas.height / 2);

  const buffer = canvas.toBuffer("image/png");
  return buffer;
};
