import { env } from "~/env";

const ENDPOINT = "https://course-api-280200773515.us-west1.run.app/";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    const classId = url.searchParams.get("class_id");

    if (!id || !classId) {
      return new Response(
        JSON.stringify({
          error: "Missing required query params: id, class_id",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    const upstream = new URL("course", ENDPOINT);
    upstream.searchParams.set("id", id);
    upstream.searchParams.set("class_id", classId);

    const res = await fetch(upstream.toString(), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${env.COURSE_API_KEY}`,
      },
      // You can add cache: 'no-store' if the upstream is highly dynamic
    });

    const text = await res.text();

    return new Response(text, {
      status: res.status,
      headers: {
        "Content-Type": res.headers.get("content-type") ?? "application/json",
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
