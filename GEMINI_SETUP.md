# Gemini API 설정 가이드

## 개요

이 프로젝트는 Google Gemini Flash 2.5 모델을 사용하여 챗봇 기능을 제공합니다.

## Gemini API 키 발급 방법

### 1. Google AI Studio 접속

1. **Google AI Studio 접속**
   - https://aistudio.google.com/ 접속
   - Google 계정으로 로그인

2. **API 키 생성**
   - 좌측 메뉴에서 "Get API key" 클릭
   - "Create API key" 클릭
   - 새 프로젝트 생성 또는 기존 프로젝트 선택
   - API 키 복사 (형식: `AIza...`)

### 2. 환경 변수 설정

#### 로컬 개발 환경

프로젝트 루트에 `.env` 파일을 생성하고 다음을 추가:

```env
GEMINI_API_KEY=your_api_key_here
```

#### Vercel 배포 환경

1. **Vercel 대시보드 접속**
   - https://vercel.com/dashboard
   - 프로젝트 선택

2. **환경 변수 추가**
   - Settings → Environment Variables
   - 다음 변수 추가:
     ```
     GEMINI_API_KEY = your_api_key_here
     ```

3. **재배포**
   - 환경 변수 추가 후 자동 재배포 또는 수동 재배포

## 사용 모델

- **모델**: `gemini-2.5-flash` (Gemini 2.5 Flash - 정식 버전)
- **특징**: 빠른 응답 속도, 안정적인 성능
- **용도**: 채팅 애플리케이션, 일반적인 질문 응답
- **참고**: 실험적(exp) 모델이 아닌 정식 버전 사용

## 무료 티어 설정

Gemini 2.5 Flash를 무료 티어에서 사용하려면:

1. **Google AI Studio 확인**
   - https://aistudio.google.com/ 접속
   - API 키가 무료 티어로 설정되어 있는지 확인

2. **할당량 확인**
   - 무료 티어는 일일 요청 수 제한이 있을 수 있습니다
   - 할당량 초과 시 유료 플랜으로 업그레이드 필요

3. **모델 접근 권한**
   - 일부 실험적 모델은 무료 티어에서 제한될 수 있습니다
   - 할당량 오류 발생 시 Google AI Studio에서 확인 필요

## 비용 정보

Gemini Flash 2.5 모델의 비용 (2025년 기준):
- 입력 토큰: 100만 개당 $0.30
- 출력 토큰: 100만 개당 $2.50

## 문제 해결

### API 키가 작동하지 않는 경우

1. **API 키 확인**
   - Google AI Studio에서 API 키가 활성화되어 있는지 확인
   - API 키가 만료되지 않았는지 확인

2. **환경 변수 확인**
   - `.env` 파일이 프로젝트 루트에 있는지 확인
   - 변수 이름이 정확히 `GEMINI_API_KEY`인지 확인
   - 개발 서버를 재시작했는지 확인

3. **Vercel 배포 시**
   - 환경 변수가 올바르게 설정되었는지 확인
   - 재배포가 완료되었는지 확인
   - Vercel 로그에서 오류 메시지 확인

### 챗봇이 응답하지 않는 경우

1. **브라우저 콘솔 확인**
   - 개발자 도구 (F12) → Console 탭
   - 오류 메시지 확인

2. **서버 로그 확인**
   - Vercel 대시보드 → 프로젝트 → Deployments → Functions
   - 서버 측 오류 확인

3. **API 할당량 확인**
   - Google AI Studio에서 API 사용량 확인
   - 할당량 초과 여부 확인

## 보안 주의사항

- **절대 API 키를 코드에 직접 작성하지 마세요**
- `.env.local` 파일은 `.gitignore`에 포함되어 있어 Git에 커밋되지 않습니다
- Vercel 환경 변수는 암호화되어 저장됩니다
- API 키가 노출된 경우 즉시 재생성하세요

## 추가 리소스

- [Google AI Studio 문서](https://aistudio.google.com/)
- [Gemini API 문서](https://ai.google.dev/docs)
- [Gemini 모델 가이드](https://ai.google.dev/models/gemini)

