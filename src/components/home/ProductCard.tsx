import { TProduct } from "@/types";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }: { product: TProduct }) => {
  return (
    <Link href="">
      <div className="card card-compact h-full bg-white  shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-200 ">
        <figure className="relative  w-full aspect-square">
          <Image fill src={product.image} alt={product.name} />
        </figure>
        <div className="card-body">
          <h2 className="text-sm font-semibold">{product.name}</h2>
          <p className="text-xs">{product?.description.slice(0, 30)}...</p>
          <div className="card-actions text-red-500 font-semibold">
            <p className="text-lg">${product?.price}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
