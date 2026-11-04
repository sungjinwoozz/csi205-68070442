"use client";

import "./globals.css";
import "./calculator/calculator.css";

import Link from "next/link";
import { usePathname } from "next/navigation";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/tailgrids/core/button";

export default function RootLayout({ children }: LayoutProps<"/">) {
  const pathname = usePathname();
  return (
    <html>
      <body>
        <Header />
        <nav
          aria-label="Main navigation"
          className="mt-4 flex justify-center gap-4"
        >
          <Link href="/">
            <Button
              variant="primary"
              appearance={pathname === "/" ? "fill" : "outline"}
            >
              Home
            </Button>
          </Link>
          <Link href="/calculator">
            <Button
              variant="primary"
              appearance={pathname === "/calculator" ? "fill" : "outline"}
            >
              Calculator
            </Button>
          </Link>
          <Link href="/animation">
            <Button
              variant="primary"
              appearance={pathname === "/animation" ? "fill" : "outline"}
            >
              Animation
            </Button>
          </Link>
          <Link href="/todos">
            <Button
              variant="primary"
              appearance={pathname === "/todos" ? "fill" : "outline"}
            >
              Todos
            </Button>
          </Link>
        </nav>
        {children}
        <Footer />
      </body>
    </html>
  );
}
