"use client";

import Image from "next/image";
import { useContext } from "react";
import { Product } from "../data/products";
import { globalDataContext } from "../layout";

export default function Page() {
  const { carts, setCarts, products, setProducts } = useContext(globalDataContext);

  const totalPrice = carts.reduce(
    (total: number, product: Product) => total + product.price,
    0,
  );

  const removeFromCart = (product: Product) => {
    setCarts(carts.filter((item: Product) => item.id !== product.id));
    setProducts([...products, product]);
  };

  return (
    <section className="mx-auto mt-4 w-full max-w-[650px]">
      <div className="h-[350px] overflow-x-hidden overflow-y-auto rounded-lg border border-sky-300 bg-sky-50 p-2">
        {carts.length === 0 ? (
          <p className="grid h-full place-items-center text-sm text-slate-500">
            Your cart is empty.
          </p>
        ) : (
          <div className="grid grid-cols-5 gap-2">
            {carts.map((product: Product) => (
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
                  className="-mt-px block w-full rounded border border-red-400 bg-white px-1 py-1 text-[10px] font-medium leading-none text-red-600 transition hover:bg-red-500 hover:text-white"
                  onClick={() => removeFromCart(product)}
                >
                  Remove
                </button>
              </article>
            ))}
          </div>
        )}
      </div>

      <div className="mt-1 flex items-center justify-center gap-2 text-xs font-semibold text-white">
        <span className="rounded-full bg-amber-400 px-3 py-1 shadow-sm">
          Count: {carts.length} items
        </span>
        <span className="rounded-full bg-rose-500 px-3 py-1 shadow-sm">
          Price: ${totalPrice.toFixed(2)}
        </span>
      </div>
    </section>
  );
}
