import { META_BASE_URL } from "./metaUtils";

export async function testMetaCredentials(
  pageId: string,
  accessToken: string,
  igUserId?: string
): Promise<{
  success: boolean;
  message: string;
  page?: { id: string; name: string; username?: string; fanCount?: number };
  instagram?: { id: string; username: string; name?: string };
}> {
  if (!accessToken.trim()) {
    return {
      success: false,
      message: "Access Token is missing. Please provide a Meta Page Access Token.",
    };
  }

  try {
    const pageFields = "id,name,username,fan_count,instagram_business_account{id,username,name}";
    const pageUrl = pageId.trim()
      ? `${META_BASE_URL}/${encodeURIComponent(pageId.trim())}?fields=${pageFields}&access_token=${encodeURIComponent(accessToken.trim())}`
      : `${META_BASE_URL}/me?fields=${pageFields}&access_token=${encodeURIComponent(accessToken.trim())}`;

    const pageRes = await fetch(pageUrl, { headers: { Accept: "application/json" } });
    const pageData = await pageRes.json();

    if (!pageRes.ok || pageData.error) {
      return {
        success: false,
        message: `Meta API Error: ${pageData?.error?.message || "Invalid credentials or unauthorized."}`,
      };
    }

    const connectedIg = pageData.instagram_business_account;
    let igInfo = undefined;

    const targetIgId = igUserId?.trim() || connectedIg?.id;
    if (targetIgId) {
      const igUrl = `${META_BASE_URL}/${encodeURIComponent(targetIgId)}?fields=id,username,name&access_token=${encodeURIComponent(accessToken.trim())}`;
      const igRes = await fetch(igUrl, { headers: { Accept: "application/json" } });
      const igData = await igRes.json();
      if (igRes.ok && !igData.error) {
        igInfo = {
          id: igData.id,
          username: igData.username,
          name: igData.name,
        };
      }
    }

    return {
      success: true,
      message: "Successfully connected to Meta Graph API!",
      page: {
        id: pageData.id,
        name: pageData.name,
        username: pageData.username,
        fanCount: pageData.fan_count,
      },
      instagram: igInfo || (connectedIg ? { id: connectedIg.id, username: connectedIg.username, name: connectedIg.name } : undefined),
    };
  } catch (err: any) {
    return {
      success: false,
      message: `Connection failed: ${err?.message || "Network error"}`,
    };
  }
}
