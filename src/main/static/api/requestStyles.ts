import { NextResponse } from "next/server";
import { st, stDark } from "..";

export async function requestStyles(request: Request) {
  try {
    const { data, mode } = await request.json();

    if (mode === "default") {
      st(data);
    } else if (mode === "dark") {
      stDark(data);
    }

    return NextResponse.json({
      result: data,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process POST request" },
      { status: 400 }
    );
  }
}
