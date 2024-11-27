import { NextResponse } from "next/server";

export async function POST(request) {
  const { code } = await request.json();

  if (code === "123456") {
    const response = NextResponse.json({ success: true });
    response.cookies.set("admin-auth", "true", { path: "/", maxAge: 86400 }); // 24시간 유지
    return response;
  }

  return NextResponse.json({ success: false }, { status: 401 });
}
