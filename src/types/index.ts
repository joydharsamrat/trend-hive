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

export type TCartItem = {
  createdAt: string;
  updatedAt: string;
  product: {
    _id: string;
    category: string;
    createdAt: string;
    description: string;
    image: string;
    name: string;
    price: number;
    quantity: number;
    updatedAt: string;
    __v: number;
  };
  quantity: number;
  user: {
    _id: string;
    name: string;
    email: string;
    role: "user" | "admin";
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
    __v: number;
  };
  __v: number;
  _id: string;
};
