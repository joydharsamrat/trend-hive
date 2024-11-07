export type TProduct = {
  name: string;
  price: number;
  quantity: number;
  description: string;
  image: string;
  category: string;
  _id: string;
};

export type TCategory = {
  _id: string;
  title: string;
};

export type TUserAuth = {
  _id: string;
  email: string;
  name: string;
  role: string;
  iat: number;
  exp: number;
};
