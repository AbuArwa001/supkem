import { SocialPost } from "@/components/social/types";
import { mapTweetToSocialPost } from "./twitterMapper";

/**
 * Fetch tweets from X (Twitter) API v2 by username.
 * Requires a Bearer Token with read access.
 */
export async function fetchTwitterFeed(
  bearerToken: string,
  username: string,
  limit: number = 6
): Promise<SocialPost[]> {
  try {
    const userRes = await fetch(
      `https://api.twitter.com/2/users/by/username/${username}?user.fields=profile_image_url`,
      {
        headers: { Authorization: `Bearer ${bearerToken}` },
        next: { revalidate: 3600 },
      }
    );

    if (!userRes.ok) {
      throw new Error(`Twitter User API failed: ${userRes.statusText}`);
    }

    const userData = await userRes.json();
    if (!userData?.data?.id) {
      throw new Error(`User @${username} not found on Twitter.`);
    }

    const userId = userData.data.id;
    const authorName = userData.data.name;
    const authorProfileImageUrl = userData.data.profile_image_url?.replace("_normal", "");

    const tweetsRes = await fetch(
      `https://api.twitter.com/2/users/${userId}/tweets?max_results=${Math.min(limit, 100)}&expansions=attachments.media_keys&media.fields=url,preview_image_url,type&tweet.fields=created_at,public_metrics,entities`,
      {
        headers: { Authorization: `Bearer ${bearerToken}` },
        next: { revalidate: 60 * 5 },
      }
    );

    if (!tweetsRes.ok) {
      throw new Error(`Twitter Tweets API failed: ${tweetsRes.statusText}`);
    }

    const tweetsData = await tweetsRes.json();
    const tweets = tweetsData.data || [];
    const includesMedia = tweetsData.includes?.media || [];

    return tweets.map((tweet: any) =>
      mapTweetToSocialPost(tweet, username, authorName, authorProfileImageUrl, includesMedia)
    );
  } catch (error) {
    console.error("Error fetching Twitter feed:", error);
    throw error;
  }
}
