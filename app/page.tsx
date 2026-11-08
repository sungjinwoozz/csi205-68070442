"use client";

import { CheckLogin } from "@/utils/login";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter()
  useEffect(() => CheckLogin(router,'/'),[router])
  return (
    <main className="mx-auto mt-6 w-full max-w-5xl px-4">
      <section className="grid overflow-hidden rounded border border-gray-300 bg-white p-1 shadow-lg md:grid-cols-[220px_1fr]">
        <div className="flex flex-col border-b border-gray-300 p-2 md:border-r md:border-b-0">
          <div className="relative aspect-square w-full overflow-hidden rounded border border-gray-200 bg-gray-100">
            <Image
              src="/stdempimg.png"
              alt="Student profile"
              fill
              sizes="(max-width: 768px) 100vw, 220px"
              className="object-cover"
            />
          </div>
          <div className="mt-2 text-xs leading-5 text-gray-700">
            <p className="font-bold">Ponrapat Sukmuang</p>
            <p>68070442</p>
            <p>Computer Science</p>
            <p>School of Information Technology (SIT)</p>
            <p>Sripatum University (SPU)</p>
          </div>
        </div>

        <div className="p-3 text-xs leading-5 text-gray-800">
          <h2 className="font-bold">เป้าหมายสายงานที่ต้องการ</h2>
          <ul className="list-disc pl-5">
            <li>Software Developer นักพัฒนาซอฟต์แวร์และโปรแกรมประยุกต์</li>
            <li>Full Stack Developer นักพัฒนาเว็บไซต์ทั้ง Frontend และ Backend</li>
            <li>Web Developer นักพัฒนาเว็บไซต์</li>
            <li>Data Scientist นักวิเคราะห์และประมวลผลข้อมูล</li>
            <li>Mobile Application Developer นักพัฒนาแอปพลิเคชันบนมือถือ</li>
            <li>Game Developer นักพัฒนาเกม</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
