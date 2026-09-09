import { NextResponse } from "next/server";
import { testMetaCredentials } from "@/lib/metaGraphApi";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { facebookPageId, facebookAccessToken, instagramBusinessId } = body || {};

    const activeToken = (facebookAccessToken?.trim() || process.env.META_FACEBOOK_ACCESS_TOKEN || "").trim();
    const activePageId = (facebookPageId?.trim() || process.env.META_FACEBOOK_PAGE_ID || "").trim();
    const activeIgId = (instagramBusinessId?.trim() || process.env.META_INSTAGRAM_BUSINESS_ID || "").trim();

    if (!activeToken) {
      return NextResponse.json(
        {
          success: false,
          message: "Meta Page Access Token is required to test the connection (or configure META_FACEBOOK_ACCESS_TOKEN in .env.local).",
        },
        { status: 400 }
      );
    }

    const result = await testMetaCredentials(
      activePageId,
      activeToken,
      activeIgId
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
