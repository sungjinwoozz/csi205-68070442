"use client";

import { useContext } from "react";
import { globalDataContext } from "../layout";
import { Product } from "../data/products";
import Image from "next/image";

export default function Page() {
  const { products, setProducts , setCarts , carts } = useContext(globalDataContext);

  const addToCart = (product: Product) => {

    setProducts(products.filter((p : Product) => p.id !== product.id));
    setCarts([...carts, product]);
  }

  return (
    <div className="mx-auto mt-4 h-88 w-full max-w-2xl overflow-x-hidden overflow-y-auto rounded-lg border border-sky-300 bg-sky-50 p-2">
      <div className="grid grid-cols-5 gap-2">
        {products.map((product: Product) => (
          <article key={product.id} className="flex min-w-0 flex-col">
            <div className="relative aspect-square overflow-hidden rounded-md bg-slate-200">
              <Image
                src={product.thumbnailUrl}
                alt={product.title}
                fill
                sizes="(max-width: 500px) 20vw, 90px"
                className="object-cover"
              />
              <div className="absolute right-0.5 top-0.5 rounded bg-black/70 px-1 py-0.5 text-[9px] font-semibold leading-none text-white">
                ${product.price.toFixed(2)}
              </div>
              <div className="absolute inset-x-0 bottom-0 line-clamp-2 bg-black/60 px-1 py-0.5 text-[9px] leading-tight text-white">
                {product.title}
              </div>
            </div>

            <button
              type="button"
              className="-mt-px block w-full rounded border border-green-500 bg-white px-1 py-1 text-[10px] font-medium leading-none text-green-700 transition hover:bg-green-500 hover:text-white"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
