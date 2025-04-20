export type Review = {
  id: string;
  name: string;
  star: number;
  content: string;
  created_at: string;
  updated_at: string;
};

export type ReviewResponse = {
  success: boolean;
  data: Review[];
};
