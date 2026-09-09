export interface Reply {
  id: number;
  post_id: number;
  user_id: number;
  content: string;
  image_path?: string | null;
  created_at?: string;
  updated_at?: string;
  user?: {
    id: number;
    name?: string;
    username?: string;
  };
}