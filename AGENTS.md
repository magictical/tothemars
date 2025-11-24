# Mars Landing Page - 프로젝트 분석 문서

## 📋 프로젝트 개요

Mars Landing Page는 Next.js 16과 React 19를 기반으로 한 랜딩 페이지 애플리케이션입니다. 화성 이주 프로젝트를 주제로 한 마케팅 페이지로, 사용자 등록 기능과 Notion API 연동을 포함하고 있습니다.

## 🏗️ 프로젝트 구조

```
mars-landing-page/
├── app/                          # Next.js App Router 디렉토리
│   ├── actions.ts               # 서버 액션 (Notion API 연동)
│   ├── globals.css              # 글로벌 스타일
│   ├── layout.tsx               # 루트 레이아웃 컴포넌트
│   └── page.tsx                 # 메인 페이지 컴포넌트
├── components/                   # 재사용 가능한 컴포넌트
│   ├── ui/                      # UI 컴포넌트 라이브러리 (Radix UI 기반)
│   ├── footer.tsx               # 푸터 컴포넌트
│   ├── hero-section.tsx         # 히어로 섹션 컴포넌트
│   ├── overview-section.tsx     # 개요 섹션 컴포넌트
│   ├── pricing-section.tsx      # 가격 섹션 컴포넌트
│   ├── registration-modal.tsx   # 등록 모달 컴포넌트
│   ├── scenario-section.tsx     # 시나리오 섹션 컴포넌트
│   └── theme-provider.tsx       # 테마 프로바이더 컴포넌트
├── hooks/                        # 커스텀 훅
│   ├── use-mobile.ts           # 모바일 감지 훅
│   └── use-toast.ts            # 토스트 알림 훅
├── lib/                          # 유틸리티 함수
│   └── utils.ts                 # 유틸리티 함수 (cn 함수 등)
├── public/                       # 정적 파일
│   ├── *.jpg                    # 이미지 파일들
│   ├── *.png                    # 아이콘 파일들
│   └── *.svg                    # SVG 파일들
├── styles/                       # 스타일 파일
│   └── globals.css              # 글로벌 스타일 (중복)
├── package.json                 # 프로젝트 의존성 및 스크립트
├── pnpm-lock.yaml               # pnpm 잠금 파일
├── next.config.mjs              # Next.js 설정
├── postcss.config.mjs           # PostCSS 설정
└── tsconfig.json                # TypeScript 설정
```

## 🚀 애플리케이션 시작 방법

### 필수 요구사항

- Node.js (권장: 최신 LTS 버전)
- pnpm 패키지 매니저

### 설치 및 실행

1. **패키지 설치**

   ```bash
   pnpm install
   ```

2. **개발 서버 시작**

   ```bash
   pnpm dev
   ```

   - 기본 포트: `http://localhost:3000`
   - 핫 리로드 지원

3. **프로덕션 빌드**

   ```bash
   pnpm build
   ```

4. **프로덕션 서버 시작**

   ```bash
   pnpm start
   ```

5. **린트 실행**
   ```bash
   pnpm lint
   ```

### 환경 변수 설정 (선택사항)

Notion API 연동을 사용하려면 `.env.local` 파일을 생성하고 다음 변수를 설정하세요:

```env
NOTION_API_KEY=your_notion_api_key
NOTION_DATABASE_ID=your_notion_database_id
```

환경 변수가 없어도 애플리케이션은 정상 작동하며, 등록 기능은 모의(Mock) 모드로 동작합니다.

## 🔄 상태 관리

이 프로젝트는 **복잡한 상태 관리 라이브러리를 사용하지 않고**, React의 기본 기능만 사용합니다.

### 상태 관리 방식

1. **로컬 상태 (Local State)**

   - `useState` 훅을 사용한 컴포넌트 내부 상태 관리
   - 예시: `app/page.tsx`에서 모달 열림/닫힘 상태 관리

   ```typescript
   const [isModalOpen, setIsModalOpen] = useState(false);
   ```

2. **서버 액션 (Server Actions)**

   - Next.js의 서버 액션을 통한 서버 사이드 로직 처리
   - 파일: `app/actions.ts`
   - Notion API와의 통신을 서버 액션으로 처리
   - 클라이언트에서 직접 호출 가능

3. **Props를 통한 상태 전달**
   - 부모 컴포넌트에서 자식 컴포넌트로 콜백 함수 전달
   - 예시: `HeroSection`에 `onOpenModal` 콜백 전달

### 상태 관리 예시

**메인 페이지 (`app/page.tsx`)**

```typescript
const [isModalOpen, setIsModalOpen] = useState(false);
```

**등록 모달 (`components/registration-modal.tsx`)**

```typescript
const [isLoading, setIsLoading] = useState(false);
const [isSuccess, setIsSuccess] = useState(false);
```

**서버 액션 (`app/actions.ts`)**

```typescript
"use server";
export async function submitToNotion(formData: FormData) {
  // 서버 사이드 로직 처리
}
```

## 🛠️ 주요 기술 스택

### 프레임워크 및 라이브러리

- **Next.js 16.0.3**: React 프레임워크 (App Router 사용)
- **React 19.2.0**: UI 라이브러리
- **TypeScript 5**: 타입 안정성

### UI 라이브러리

- **Radix UI**: 접근성 있는 UI 컴포넌트 프리미티브
- **Tailwind CSS 4.1.9**: 유틸리티 기반 CSS 프레임워크
- **Lucide React**: 아이콘 라이브러리
- **next-themes**: 다크 모드 지원

### 폼 관리

- **react-hook-form**: 폼 상태 관리
- **zod**: 스키마 검증
- **@hookform/resolvers**: react-hook-form과 zod 통합

### 기타

- **@vercel/analytics**: 분석 도구
- **date-fns**: 날짜 처리
- **recharts**: 차트 라이브러리
- **sonner**: 토스트 알림

## 📁 주요 파일 설명

### `app/page.tsx`

- 메인 랜딩 페이지 컴포넌트
- 클라이언트 컴포넌트 (`"use client"`)
- 모달 상태 관리 및 섹션 컴포넌트 조합

### `app/layout.tsx`

- 루트 레이아웃 컴포넌트
- 메타데이터 설정
- Vercel Analytics 통합

### `app/actions.ts`

- 서버 액션 정의
- Notion API 연동 로직
- 폼 제출 처리

### `components/registration-modal.tsx`

- 사용자 등록 모달 컴포넌트
- 폼 제출 및 로딩 상태 관리
- 서버 액션 호출

## 🎨 스타일링

- **Tailwind CSS**를 사용한 유틸리티 기반 스타일링
- 커스텀 색상 변수 정의 (Mars 테마)
- 반응형 디자인 지원
- 다크 모드 지원 (next-themes)

## 🔧 설정 파일

### `next.config.mjs`

- TypeScript 빌드 에러 무시 설정
- 이미지 최적화 비활성화

### `tsconfig.json`

- TypeScript 컴파일러 설정
- 경로 별칭 설정 (`@/*`)

### `postcss.config.mjs`

- PostCSS 설정 (Tailwind CSS용)

## 📝 개발 가이드라인

1. **컴포넌트 구조**: 단일 파일로 작성 (불필요한 분리 지양)
2. **API 호출**: Next.js 서버 액션 사용
3. **스타일링**: Tailwind CSS 클래스명 사용
4. **상태 관리**: 최소화, 복잡한 상태 관리 라이브러리 사용 지양
5. **타입 정의**: 간단한 타입 또는 인터페이스 사용

## 🔍 주요 기능

1. **랜딩 페이지 섹션**

   - 히어로 섹션
   - 개요 섹션
   - 시나리오 섹션
   - 가격 섹션
   - 푸터

2. **사용자 등록**

   - 모달 기반 등록 폼
   - Notion API 연동 (선택사항)
   - 로딩 및 성공 상태 처리

3. **반응형 디자인**

   - 모바일, 태블릿, 데스크톱 지원

4. **애니메이션**
   - Fade-in 및 slide-in 애니메이션
   - Tailwind CSS 애니메이션 사용

## 🐛 알려진 이슈

- `sharp` 패키지의 빌드 스크립트가 무시됨 (경고만 발생, 기능에는 영향 없음)

## 📚 추가 리소스

- [Next.js 문서](https://nextjs.org/docs)
- [React 문서](https://react.dev)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)
- [Radix UI 문서](https://www.radix-ui.com/docs)
