export type NavbarResponse = {
  success: boolean;
  message: string;
  data: {
    id: number;
    logo: string | undefined;
    back_img?: string | null; // URL to background image
    itemname1: string;
    itemlink1: string;
    itemname2: string;
    itemlink2: string;
    itemname3: string;
    itemlink3: string;
    itemname4: string;
    itemlink4: string;
    created_at: string; // ISO date string
    updated_at: string; // ISO date string
  };
};
