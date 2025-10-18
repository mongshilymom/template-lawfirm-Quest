import React from "react";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ContactPage() {
  const { language } = useLanguage();

  const offices = [
    {
      nameKo: "서울 본사",
      nameEn: "Seoul HQ",
      addressKo: "서울특별시 강남구 언주로 000",
      addressEn: "Eonju-ro, Gangnam-gu, Seoul, Korea",
      phone: "+82-2-000-0000",
    },
    {
      nameKo: "부산 지사",
      nameEn: "Busan Office",
      addressKo: "부산광역시 해운대구 센텀중앙로 97",
      addressEn: "97, Centum jungang-ro, Haeundae-gu, Busan, Korea",
      phone: "+82-51-742-0505",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-7xl px-6 lg:px-8 py-20">
        <h1 className="text-3xl md:text-4xl font-serif font-semibold mb-8">
          {language === "ko" ? "문의" : "Contact"}
        </h1>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {offices.map((o, idx) => (
            <li key={idx} className="rounded-lg border bg-white p-6">
              <h3 className="font-semibold text-foreground">
                {language === "ko" ? o.nameKo : o.nameEn}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {language === "ko" ? o.addressKo : o.addressEn}
              </p>
              <p className="text-sm mt-2">{o.phone}</p>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  );
}
