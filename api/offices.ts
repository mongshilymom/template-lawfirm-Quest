import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(_req: VercelRequest, res: VercelResponse) {
  res.status(200).json([
    {
      id: 1,
      nameKo: "서울 본사",
      nameEn: "Seoul Headquarters",
      addressKo: "서울특별시 강남구 테헤란로 152 강남파이낸스센터",
      addressEn: "152, Teheran-ro, Gangnam-gu, Seoul, Korea",
      type: "Headquarters"
    },
    {
      id: 2,
      nameKo: "부산 사무소",
      nameEn: "Busan Office",
      addressKo: "부산광역시 해운대구 센텀중앙로 97",
      addressEn: "97, Centum jungang-ro, Haeundae-gu, Busan, Korea",
      type: "Domestic"
    },
    {
      id: 3,
      nameKo: "베이징",
      nameEn: "Beijing",
      addressKo: "중국 베이징시 차오양구",
      addressEn: "Chaoyang District, Beijing, China",
      type: "International"
    },
    {
      id: 4,
      nameKo: "상하이",
      nameEn: "Shanghai",
      addressKo: "중국 상하이시 푸둥신구",
      addressEn: "Pudong New Area, Shanghai, China",
      type: "International"
    },
    {
      id: 5,
      nameKo: "홍콩",
      nameEn: "Hong Kong",
      addressKo: "홍콩 센트럴",
      addressEn: "Central, Hong Kong",
      type: "International"
    },
    {
      id: 6,
      nameKo: "하노이",
      nameEn: "Hanoi",
      addressKo: "베트남 하노이시",
      addressEn: "Hanoi, Vietnam",
      type: "International"
    },
    {
      id: 7,
      nameKo: "호치민",
      nameEn: "Ho Chi Minh",
      addressKo: "베트남 호치민시",
      addressEn: "Ho Chi Minh City, Vietnam",
      type: "International"
    },
    {
      id: 8,
      nameKo: "두바이",
      nameEn: "Dubai",
      addressKo: "아랍에미리트 두바이",
      addressEn: "Dubai, United Arab Emirates",
      type: "International"
    },
    {
      id: 9,
      nameKo: "뉴욕",
      nameEn: "New York",
      addressKo: "미국 뉴욕주 뉴욕시",
      addressEn: "New York, NY, United States",
      type: "International"
    }
  ]);
}
