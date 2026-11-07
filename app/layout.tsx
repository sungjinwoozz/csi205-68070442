"use client";

import "./globals.css";
import "./calculator/calculator.css";

import Link from "next/link";
import { usePathname } from "next/navigation";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { buttonStyles } from "@/components/tailgrids/core/button";
import { createContext, useEffect, useState } from "react";
import { fetchProducts, Product } from "./data/products";
import { Badge } from "@/components/tailgrids/core/badge";

export const globalDataContext = createContext<any>(null);

export default function RootLayout({ children }: LayoutProps<"/">) {
  const pathname = usePathname();

  const [products, setProducts] = useState<Product[]>([]);
  const [carts, setCarts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts().then(data => setProducts(data as Product[]))
      .catch((error) => setProducts([] as Product[]));
  }, []);

  useEffect(() => {
    console.log(products);
  }, [products]);

  return (
    <globalDataContext.Provider value={{ products, setProducts, carts, setCarts }}>
      <html>
        <body>
          <Header />
          <nav
            aria-label="Main navigation"
            className="mt-4 flex justify-center gap-4"
          >
            <Link href="/" className={buttonStyles({
              variant: "primary",
              appearance: pathname === "/" ? "fill" : "outline"
            })}>
              Home
            </Link>

            <Link href="/calculator"
              className={buttonStyles({
                variant: "primary",
                appearance: pathname === "/calculator" ? "fill" : "outline"
              })}>
              Calculator
            </Link>

            <Link href="/animation" className={buttonStyles({
              variant: "primary",
              appearance: pathname === "/animation" ? "fill" : "outline"
            })}>
              Animation
            </Link>
            <Link href="/todos"
              className={buttonStyles({
                variant: "primary",
                appearance: pathname === "/todos" ? "fill" : "outline"
              })}>
              Todos
            </Link>
            <Link href="/products"
              className={buttonStyles({
                variant: "primary",
                appearance: pathname === "/products" ? "fill" : "outline"
              })}>
              Products ({products.length})
            </Link>


            <div className="relative"> 
            <Link href="/carts"
              className={buttonStyles({
                variant: "primary",
                appearance: pathname === "/carts" ? "fill" : "outline"
              })}>
              Carts
            </Link>
            
  
            <Badge className='absolute -top-2 -right-2 bg-red-500 text-white'>
              {carts.length}
            </Badge>
            </div>


          </nav>
          {children}
          <Footer />
        </body>
      </html>
    </globalDataContext.Provider>

  );
}
