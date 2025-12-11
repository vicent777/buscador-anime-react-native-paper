export interface Anime {
  mal_id: number;
  title: string;
  type: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
}