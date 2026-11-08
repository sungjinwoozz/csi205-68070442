"use client";

import { useEffect, useState } from "react";
import type { Credential } from "@/app/data/credentials";

export default function UserInfo() {
  const [credential, setCredential] = useState<Credential | null>(null);

  useEffect(() => {
    const readCredential = () => {
      const savedCredential = localStorage.getItem("credential");

      if (!savedCredential) {
        setCredential(null);
        return;
      }

      try {
        const parsedCredential = JSON.parse(savedCredential) as Credential;

        if (
          typeof parsedCredential.token === "string" &&
          typeof parsedCredential.email === "string" &&
          typeof parsedCredential.name === "string" &&
          typeof parsedCredential.role === "string"
        ) {
          setCredential(parsedCredential);
        } else {
          localStorage.removeItem("credential");
          setCredential(null);
        }
      } catch {
        localStorage.removeItem("credential");
        setCredential(null);
      }
    };

    readCredential();
    window.addEventListener("credential-changed", readCredential);

    return () => window.removeEventListener("credential-changed", readCredential);
  }, []);

  if (!credential) return null;

  return (
    <div className="mx-auto mt-2 flex w-fit max-w-full flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-md px-3 py-1 text-xs">
      <span className="font-bold">ROLE:</span>

      <span className="rounded-full bg-red-100 px-2 py-0.5 font-semibold text-red-600">
        {credential.role.toUpperCase()}
      </span>

      <span className="font-bold">NAME:</span>

      <span className="rounded-full bg-green-100 px-2 py-0.5 font-semibold text-green-700">
        {credential.name}
      </span>

      <span className="font-bold">EMAIL:</span>

      <span className="rounded-full bg-gray-100 px-2 py-0.5 text-gray-600">
        {credential.email}
      </span>
    </div>
  );
}
