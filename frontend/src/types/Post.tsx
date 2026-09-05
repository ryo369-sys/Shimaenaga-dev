export type Post = {
  id: number;
  user_id: number;
  content: string;
  image_path?: string | null; // 💡 string（または null/undefined）でOK！
  label?: string | null;
  accuracy?: number | null;
  user_name?: string;
  userName?: string;
  user?: {
    username: string;
  };
  created_at?: string;
  updated_at?: string;
  is_liked?: boolean;
  likes_count?: number;
};