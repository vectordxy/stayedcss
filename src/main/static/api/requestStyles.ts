import { NextResponse } from "next/server";
import { stayedcss, stayedcssDark } from "..";

export async function requestStyles(request: Request) {
  try {
    const { data, mode } = await request.json();

    if (mode === "default") {
      stayedcss(data);
    } else if (mode === "dark") {
      stayedcssDark(data);
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
