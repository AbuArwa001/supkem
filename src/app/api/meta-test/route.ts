import { NextResponse } from "next/server";
import { testMetaCredentials } from "@/lib/metaGraphApi";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { facebookPageId, facebookAccessToken, instagramBusinessId } = body || {};

    if (!facebookAccessToken?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Meta Page Access Token is required to test the connection.",
        },
        { status: 400 }
      );
    }

    const result = await testMetaCredentials(
      facebookPageId || "",
      facebookAccessToken || "",
      instagramBusinessId || ""
    );

    return NextResponse.json(result, { status: result.success ? 200 : 400 });
  } catch (error: any) {
    console.error("Meta test API error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Internal server error during Meta API diagnostic test.",
      },
      { status: 500 }
    );
  }
}
