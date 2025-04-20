// // types/dataTypes.ts

// export type Address = {
//     id: number;
//     title: string;
//     location: string;
//     icon: string | null;
//     img: string | null;
//     created_at: string;
//     updated_at: string;
//   };
  
//   export type Banner = {
//     id: number;
//     heading: string;
//     title: string;
//     subtitle: string | null;
//     description: string;
//     button_name: string;
//     button_url: string;
//     back_img: string;
//     created_at: string;
//     updated_at: string;
//   };
  
//   export type Navbar = {
//     id: number;
//     logo: string;
//     back_img: string;
//     itemname1: string;
//     itemlink1: string;
//     itemname2: string;
//     itemlink2: string;
//     itemname3: string;
//     itemlink3: string;
//     itemname4: string;
//     itemlink4: string;
//     created_at: string;
//     updated_at: string;
//   };
  
//   export type About = {
//     id: number;
//     title: string;
//     subtitle: string;
//     description: string;
//     button_name: string;
//     button_url: string;
//     created_at: string;
//     updated_at: string;
//   };

//  export type aboutSecondPartDataType = {
//     id: number;
//     title1: string;
//     description1: string;
//     icon1: string;
//     title2: string;
//     description2: string;
//     icon2: string;
//     title3: string;
//     description3: string;
//     icon3: string;
//     title4: string;
//     description4: string;
//     icon4: string;
//     title5: string;
//     description5: string;
//     icon5: string;
//     img: string;
//     video: string;
//     created_at: string; // ISO date string
//     updated_at: string; // ISO date string
//   };
  
  
//   export type AllHomeDataResponse = {
//     // home: any[];
//     aboutsec2: aboutSecondPartDataType[]; 
//     address: Address[];
//     banner: Banner[];
//     // body1: any[];
//     // body2: any[];
//     // hero: any[];
//     navbar: Navbar[];
//     // possible: any[];
//     // whychooseus: any[];
//     about: About[];
//     // contact: any[];
//     // menu: any[];
//     // ourcorevalue: any[];
//     // service: any[];
//   };
  

export type Timestamp = string;

// Root
export type AllHomeDataResponse = {
  navbar: Navbar[];
  home: HomeItem[];
  about: AboutSection[];
  aboutsec2: aboutSecondPartDataType[];
  banner: BannerItem[];
  services_background: ServicesBackground[];
  services_heading: ServicesHeading[];
  services_projectmanagement: ProjectManagement[];
  services_delivery : ServiceDeliveryDataType[];
  services_support: ServicesSupport[];
  // possible: any[];
  ourcorevalue: CoreValue[];
  whychooseus: WhyChooseUsItem[];
  poweredbymrpc: PoweredByMRPC[];
  service: ServiceItem[];
  contact: ContactSection[];
  review: ReviewItem[];
  ourcontact: OurContact[];
  footer: FooterItem[];
  // contactmessage: any[];
  reviewcontent: ReviewContent[];
  address: AddressItem[];
};

// Navbar
export type Navbar = {
  id: number;
  logo: string;
  back_img: string;
  itemname1: string;
  itemlink1: string;
  itemname2: string;
  itemlink2: string;
  itemname3: string;
  itemlink3: string;
  itemname4: string;
  itemlink4: string;
  created_at: Timestamp;
  updated_at: Timestamp;
};

// Home
export type HomeItem = {
  id: number;
  heading: string;
  title1: string;
  description1: string;
  img1: string;
  title2: string;
  description2: string | null;
  img2: string | null;
  title3: string;
  description3: string;
  img3: string;
  title4: string;
  description4: string;
  img4: string;
  created_at: Timestamp;
  updated_at: Timestamp;
};

// About
export type AboutSection = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  button_name: string;
  button_url: string;
  created_at: Timestamp;
  updated_at: Timestamp;
};

export type aboutSecondPartDataType = {
  id: number;
  title1: string;
  description1: string;
  icon1: string;
  title2: string;
  description2: string;
  icon2: string;
  title3: string;
  description3: string;
  icon3: string;
  title4: string;
  description4: string;
  icon4: string;
  title5: string;
  description5: string;
  icon5: string;
  img: string;
  video: string;
  created_at: Timestamp;
  updated_at: Timestamp;
};

// Banner
export type BannerItem = {
  id: number;
  heading: string;
  title: string;
  subtitle: string;
  description: string;
  button_name: string;
  button_url: string;
  back_img: string;
  created_at: Timestamp;
  updated_at: Timestamp;
};

// Services
export type ServicesBackground = {
  id: number;
  back_img: string;
  created_at: Timestamp;
  updated_at: Timestamp;
};

export type ServicesHeading = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  button_title: string;
  button_name: string;
  button_url: string;
  created_at: Timestamp;
  updated_at: Timestamp;
};

export type ProjectManagement = {
  id: number;
  heading: string;
  title1: string;
  description1: string;
  title2: string;
  description2: string;
  title3: string;
  description3: string;
  img1: string | null;
  img2: string | null;
  img3: string | null;
  created_at: Timestamp;
  updated_at: Timestamp;
};

export type ServiceDeliveryDataType = {
  id: number;
  heading: string;
  title1: string;
  description1: string;
  img1: string;
  title2: string;
  description2: string;
  img2: string;
  title3: string;
  description3: string;
  img3: string;
  title4: string;
  description4: string;
  img4: string;
  created_at: string;
  updated_at: string;
};

export type ServicesSupport = {
  id: number;
  title: string;
  icon: string | null;
  created_at: Timestamp;
  updated_at: Timestamp;
};

// Core Values
export type CoreValue = {
  id: number;
  title: string;
  description1: string;
  description2: string;
  img: string | null;
  icon1: string | null;
  icon2: string | null;
  created_at: Timestamp;
  updated_at: Timestamp;
};

export type WhyChooseUsItem = {
  id: number;
  title: string;
  description: string;
  button_name: string;
  button_url: string;
  created_at: Timestamp;
  updated_at: Timestamp;
};

// Powered By MRPC
export type PoweredByMRPC = {
  id: number;
  title: string;
  description: string;
  img: string | null;
  logo: string | null;
  created_at: Timestamp;
  updated_at: Timestamp;
};

// Service Items
export type ServiceItem = {
  id: number;
  heading: string;
  icon: string;
  title1: string;
  icon1: string;
  title2: string;
  icon2: string;
  title3: string;
  icon3: string;
  title4: string;
  icon4: string;
  title5: string;
  icon5: string;
  title6: string;
  icon6: string;
  title7: string;
  icon7: string;
  title: string;
  created_at: Timestamp;
  updated_at: Timestamp;
};

// Contact
export type ContactSection = {
  id: number;
  color: string;
  title: string;
  subtitle: string;
  button_name: string;
  button_url: string;
  created_at: Timestamp;
  updated_at: Timestamp;
};

// Review
export type ReviewItem = {
  id: number;
  title: string;
  back_color: string;
  img: string | null;
  created_at: Timestamp;
  updated_at: Timestamp;
};

export type ReviewContent = {
  id: number;
  name: string;
  star: number;
  back_img: string | null;
  content: string;
  created_at: Timestamp;
  updated_at: Timestamp;
};

// Footer / Contact Info
export type OurContact = {
  id: number;
  heading: string;
  email: string;
  phone: string;
  email_icon: string | null;
  phone_icon: string | null;
  copyright: string;
  created_at: Timestamp;
  updated_at: Timestamp;
};

export type FooterItem = {
  id: number;
  title: string;
  sub_title: string;
  back_img: string;
  created_at: Timestamp;
  updated_at: Timestamp;
};

export type AddressItem = {
  id: number;
  title: string;
  location: string;
  icon: string | null;
  created_at: Timestamp;
  updated_at: Timestamp;
};
