export interface Id {
  id: number;
}

export interface Image {
  fileName: string;
  authorName: string;
  platformLink: string;
  authorLink: string;
  platformName: string;
}
export interface Services extends Id {
  name: string;
  durationInMinutes: number;
  image: Image;
  description: string;
}

export interface Staff extends Id {
  name: string;
  serviceNames: string[];
  image: Image;
}

export interface NewUser {
  email: string;
  name?: string;
  address?: string;
  phone?: string;
  token?: string;
}

export type User = Id & NewUser;
