import { NextResponse } from "next/server";
import { useStyle } from "..";

export async function requestStyles(request: Request) {
  try {
    const { data } = await request.json();
    useStyle(data);

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
