# Hero Section 이미지 준비

Hero Section이 업그레이드되었습니다.

## 필요한 이미지

다음 이미지 파일을 준비해주세요:

### 1. 메인 히어로 이미지
- **경로**: `/public/images/hero/hero-main.jpg`
- **권장 크기**: 1920x1440px (4:3 비율)
- **용량**: 200KB 이하 (최적화 필수)
- **내용**: 상담 공간, 회의실, 또는 전문적인 오피스 전경

### 임시 대체 방법

개발 중 이미지가 없을 경우:

1. 기존 `hero-bg.jpg`를 복사:
```bash
copy public\images\hero-bg.jpg public\images\hero\hero-main.jpg
```

2. 또는 무료 이미지 사이트 활용:
   - Unsplash: https://unsplash.com/s/photos/office-meeting
   - Pexels: https://www.pexels.com/search/law%20office/

### 이미지 최적화 팁

1. **포맷**: WebP 또는 최적화된 JPEG
2. **압축**: TinyPNG (https://tinypng.com) 사용
3. **블러 플레이스홀더**: Next.js의 자동 블러 생성 활용

### LCP 최적화 체크리스트

- ✅ 히어로 이미지 1개만 `priority` 속성 사용
- ✅ 다른 섹션의 이미지는 `loading="lazy"`
- ✅ 적절한 `sizes` 속성 설정
- ✅ 이미지 크기 최적화 (<200KB)

## 배포 전 확인사항

```bash
# 1. 이미지 파일 존재 확인
ls public/images/hero/hero-main.jpg

# 2. 개발 서버에서 테스트
npm run dev

# 3. Lighthouse 테스트
# Chrome DevTools > Lighthouse > Performance
# LCP 점수 90+ 목표
```
