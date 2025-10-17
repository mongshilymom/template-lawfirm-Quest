import Image from "next/image";
import fs from "node:fs";
import path from "node:path";

type Member = {
  id: number;
  name: string;
  title: string;
  practice: string;
  // 확장자(.png/.jpg)까지 포함한 최종 경로로 치환됨
  photoBase: string; // "/images/attorneys/attorney-01"
  photo?: string;    // 런타임에서 실제 파일 존재하면 채워짐
};

const rawMembers: Member[] = [
  { id: 1, name: "배영민", title: "파트너변호사", practice: "기업지배구조, M&A", photoBase: "/images/attorneys/attorney-01" },
  { id: 2, name: "김현성", title: "대표변호사", practice: "지배구조, 소송", photoBase: "/images/attorneys/attorney-02" },
  { id: 3, name: "이정윤", title: "변호사",     practice: "지적재산권, 규제자문", photoBase: "/images/attorneys/attorney-03" },
  { id: 4, name: "박지현", title: "파트너변호사", practice: "노동, 분쟁",          photoBase: "/images/attorneys/attorney-04" },
  { id: 5, name: "최민호", title: "파트너변호사", practice: "국제분쟁, 건설",       photoBase: "/images/attorneys/attorney-05" },
  { id: 6, name: "정수연", title: "변호사",     practice: "기업법무, 공정거래",     photoBase: "/images/attorneys/attorney-06" },
  { id: 7, name: "홍서윤", title: "변호사",     practice: "개인정보, 컴플라이언스", photoBase: "/images/attorneys/attorney-07" },
  { id: 8, name: "오지훈", title: "파트너변호사", practice: "형사, 위기대응",        photoBase: "/images/attorneys/attorney-08" },
];

// 서버 환경에서 public 디렉토리 실제 파일을 찾아 확장자 보정
function resolvePhotos(members: Member[]): Member[] {
  const publicDir = path.join(process.cwd(), "public");
  return members.map((m) => {
    const base = m.photoBase.startsWith("/") ? m.photoBase.slice(1) : m.photoBase; // images/attorneys/attorney-01
    const png = path.join(publicDir, base + ".png");
    const jpg = path.join(publicDir, base + ".jpg");
    const webp = path.join(publicDir, base + ".webp");
    let final: string | undefined;
    if (fs.existsSync(png)) final = `/${base}.png`;
    else if (fs.existsSync(jpg)) final = `/${base}.jpg`;
    else if (fs.existsSync(webp)) final = `/${base}.webp`;
    return { ...m, photo: final };
  });
}

const members = resolvePhotos(rawMembers);

export default function AttorneysGrid() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Attorneys</h2>
      <p className="mt-2 text-sm text-muted-foreground">전문 분야별 주요 변호사</p>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {members.map((m) => (
          <article key={m.id} className="rounded-2xl border bg-background/50 backdrop-blur-sm p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-muted">
              {m.photo ? (
                <Image
                  src={m.photo}
                  alt={`${m.name} 프로필`}
                  fill
                  priority={m.id <= 4}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 grid place-items-center text-sm text-muted-foreground">
                  NO PHOTO
                </div>
              )}
            </div>
            <div className="mt-4">
              <h3 className="text-base font-medium">{m.name}</h3>
              <p className="text-sm text-muted-foreground">{m.title}</p>
              <p className="mt-1 text-sm">{m.practice}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
