import { NextResponse } from "next/server";
import { stayedStyle } from "..";

export const postStyles = async (request: Request) => {
  try {
    const body = await request.json();
    stayedStyle(body);
    return NextResponse.json({
      data: body,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process POST request" },
      { status: 400 }
    );
  }
};
