# Notion DB 연결 설정 가이드

## 오류 원인

현재 오류 메시지: `Server configuration error. Please contact support.`

이 오류는 **환경 변수가 설정되지 않아서** 발생합니다.

## 해결 방법

### 1. Vercel 배포 환경 설정 (프로덕션)

1. **Vercel 대시보드 접속**
   - https://vercel.com/dashboard
   - 프로젝트 선택

2. **환경 변수 설정**
   - Settings → Environment Variables
   - 다음 변수 추가:

   ```
   NOTION_API_KEY = secret_xxxxxxxxxxxxx
   NOTION_DATABASE_ID = xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

3. **재배포**
   - 환경 변수 추가 후 자동 재배포 또는 수동 재배포

### 2. 로컬 개발 환경 설정

1. **`.env.local` 파일 생성** (프로젝트 루트에)

2. **환경 변수 추가**:
   ```env
   NOTION_API_KEY=secret_xxxxxxxxxxxxx
   NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

3. **개발 서버 재시작**:
   ```bash
   pnpm dev
   ```

## Notion API 키 발급 방법

1. **Notion Integration 생성**
   - https://www.notion.so/my-integrations 접속
   - "+ New integration" 클릭
   - 이름 입력 (예: "Mars Landing Page")
   - "Submit" 클릭

2. **API Key 복사**
   - 생성된 Integration 페이지에서
   - "Internal Integration Token" 또는 "Secret" 복사
   - 형식: `secret_xxxxxxxxxxxxx`

3. **데이터베이스에 Integration 연결**
   - 노션 데이터베이스 페이지 열기
   - 우측 상단 "..." 메뉴 클릭
   - "Connections" → 생성한 Integration 선택

## Notion Database ID 찾는 방법

1. **데이터베이스 URL에서 추출**
   - 노션 데이터베이스 페이지 URL 예시:
     ```
     https://www.notion.so/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx?v=...
     ```
   - `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` 부분이 Database ID

2. **URL 형식 변환**
   - 하이픈(-) 제거
   - 32자리 문자열

## 확인 방법

환경 변수가 제대로 설정되었는지 확인:

1. **브라우저 콘솔 확인**
   - 폼 제출 후 콘솔에서 다음 로그 확인:
   ```
   🔐 Environment variables check:
   hasApiKey: true
   hasDatabaseId: true
   ```

2. **Vercel 로그 확인**
   - Vercel 대시보드 → 프로젝트 → Deployments → Functions
   - 서버 로그에서 환경 변수 확인

## 문제 해결

### 환경 변수가 설정되어도 오류가 발생하는 경우

1. **재배포 확인**
   - 환경 변수 추가 후 반드시 재배포 필요
   - Vercel은 환경 변수 변경 시 자동 재배포하지 않음

2. **환경 변수 이름 확인**
   - 정확히 `NOTION_API_KEY`와 `NOTION_DATABASE_ID`인지 확인
   - 대소문자 구분

3. **API 키 권한 확인**
   - Integration이 데이터베이스에 연결되어 있는지 확인
   - 데이터베이스 페이지에서 "Connections" 확인

4. **Database ID 형식 확인**
   - 32자리 문자열 (하이픈 없음)
   - URL에서 올바르게 추출했는지 확인

