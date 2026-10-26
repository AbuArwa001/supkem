export interface VideoBriefingItem {
  id: string;
  title: string;
  description: string;
  video_file: string;
  stream_url?: string;
  download_url?: string;
  thumbnail?: string;
  thumbnail_url?: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface VideoFormData {
  title: string;
  description: string;
  is_published: boolean;
  video_file: File | null;
}
