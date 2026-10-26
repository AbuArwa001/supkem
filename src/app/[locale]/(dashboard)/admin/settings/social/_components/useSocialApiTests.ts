import { useState } from "react";
import { SocialMediaSettings } from "@/lib/socialSettings";
import { testMetaApi, testYouTubeApi } from "./socialApiHelpers";

export function useSocialApiTests(settings: SocialMediaSettings) {
  const [showTwitterToken, setShowTwitterToken] = useState(false);
  const [showMetaToken, setShowMetaToken] = useState(false);
  const [showMetaGuide, setShowMetaGuide] = useState(false);
  const [isTestingMeta, setIsTestingMeta] = useState(false);
  const [metaTestResult, setMetaTestResult] = useState<any>(null);
  const [showYtApiKey, setShowYtApiKey] = useState(false);
  const [isTestingYt, setIsTestingYt] = useState(false);
  const [ytTestResult, setYtTestResult] = useState<any>(null);

  const runMetaTest = async () => {
    setIsTestingMeta(true);
    setMetaTestResult(null);
    try {
      const data = await testMetaApi({
        facebookPageId: settings.metaApi?.facebookPageId || "",
        facebookAccessToken: settings.metaApi?.facebookAccessToken || "",
        instagramBusinessId: settings.metaApi?.instagramBusinessId || "",
      });
      setMetaTestResult(data);
    } catch (err: any) {
      setMetaTestResult({ success: false, message: "Meta test failed: " + err?.message });
    } finally {
      setIsTestingMeta(false);
    }
  };

  const runYouTubeTest = async () => {
    setIsTestingYt(true);
    setYtTestResult(null);
    try {
      const data = await testYouTubeApi({
        apiKey: settings.youtubeApi?.apiKey || "",
        channelId: settings.youtubeApi?.channelId || "",
      });
      setYtTestResult(data);
    } catch (err: any) {
      setYtTestResult({ success: false, message: "YouTube test failed: " + err?.message });
    } finally {
      setIsTestingYt(false);
    }
  };

  return {
    showTwitterToken, setShowTwitterToken, showMetaToken, setShowMetaToken,
    showMetaGuide, setShowMetaGuide, isTestingMeta, metaTestResult,
    showYtApiKey, setShowYtApiKey, isTestingYt, ytTestResult,
    runMetaTest, runYouTubeTest,
  };
}
