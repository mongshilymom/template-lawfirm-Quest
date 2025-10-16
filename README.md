# QUEST Legal - ZENTA LawFirm WebSite

프로페셔널 로펌 웹사이트 솔루션 - AI-First Legal Site, Ready to Launch

## 🚀 로컬 개발 환경 실행

### 필수 요구사항
- Node.js 18 이상
- npm 또는 yarn

### 1️⃣ 의존성 설치
```bash
npm install
```

### 2️⃣ 개발 서버 실행 (권장)
**서버와 클라이언트를 동시에 실행:**
```bash
npm run dev:all
```

이 명령어는 다음을 동시에 실행합니다:
- Express API 서버 (http://localhost:5000)
- Vite 개발 서버 (http://localhost:5173)

**브라우저에서 열기:** http://localhost:5173

---

### 또는 개별 실행
터미널 2개를 열어서 각각 실행:

**터미널 1 - Express 서버:**
```bash
npm run dev
```

**터미널 2 - Vite 클라이언트:**
```bash
npm run dev:client
```

---

## 📦 프로덕션 빌드

```bash
npm run build
```

빌드 결과:
- 정적 파일: `dist/public/`
- 서버 파일: `dist/index.js`

---

## 🌐 Vercel 배포

### 자동 배포
GitHub에 푸시하면 Vercel이 자동으로 배포합니다.

### 배포 확인
- **메인 사이트:** https://youalta.site/
- **API 테스트:** https://youalta.site/api/practice-areas

---

## 🔧 주요 스크립트

| 명령어 | 설명 |
|--------|------|
| `npm run dev:all` | 서버 + 클라이언트 동시 실행 |
| `npm run dev` | Express 서버만 실행 |
| `npm run dev:client` | Vite 클라이언트만 실행 |
| `npm run build` | 프로덕션 빌드 |
| `npm run vercel-build` | Vercel 배포용 빌드 |

---

## 📁 프로젝트 구조

```
QUEST-Legal-Website/
├── client/              # 프론트엔드 (React + Vite)
│   ├── src/
│   │   ├── components/  # UI 컴포넌트
│   │   ├── pages/       # 페이지
│   │   ├── lib/         # 유틸리티 (API, queryClient 등)
│   │   └── contexts/    # Context (언어, 테마)
├── server/              # 백엔드 (Express)
│   ├── index.ts         # 서버 진입점
│   ├── routes.ts        # API 라우트
│   └── storage.ts       # 데이터 저장소
├── api/                 # Vercel Serverless 함수
│   └── index.ts
└── shared/              # 공유 타입/스키마
```

---

## 🔑 환경 변수

### 로컬 개발 (`.env.development`)
```
VITE_API_BASE=/api
```

### 프로덕션 (`.env.production`)
```
VITE_API_BASE=/api
```

---

## 🐛 문제 해결

### "데이터가 안 나옵니다"
✅ **해결:** `npm run dev:all`로 서버와 클라이언트를 **모두** 실행하세요.

### "CORS 오류"
✅ **해결:** 서버가 http://localhost:5000에서 실행 중인지 확인하세요.

### "모듈을 찾을 수 없습니다"
✅ **해결:** `npm install`을 다시 실행하세요.

---

## 📄 라이선스

MIT License
