export type Language = "en" | "ko";

export const translations = {
  en: {
    hero: {
      subtitle: "Project Red Planet",
      title: "Humanity's Next Step",
      titleHighlight: "Starts on Mars.",
      description:
        "Join the Mars migration project led by Elon Musk. Secure your place in history as one of the first settlers on the Red Planet.",
      cta: "🚀 Apply for Mars Migration",
      premiumNote: "Premium Membership coming soon ($5-10/mo)",
    },
    overview: {
      title: "Mars Migration Becomes Reality",
      description:
        "Everything you need to prepare for the most important journey of your life.",
      features: [
        {
          title: "Migration Application",
          description:
            "Simple application process to join the Mars colonization program.",
        },
        {
          title: "Preparation Checklist",
          description:
            "Comprehensive guide from survival kits to mental training.",
        },
        {
          title: "Message from Elon",
          description:
            "Exclusive interviews on the vision and journey to Mars.",
        },
        {
          title: "Settler Community",
          description:
            "Connect with fellow future Martians in our open community.",
        },
        {
          title: "Future Scenarios",
          description:
            "Experience Mars life simulations before you depart.",
        },
      ],
      quote:
        "The first city on Mars will be the most incredible thing humans have ever built.",
    },
    scenario: {
      title: "Your Day on Mars",
      description:
        "A glimpse into your future daily life on the Red Planet.",
      scenarios: [
        {
          title: "Mars Morning",
          description:
            "Wake up to the sunrise between two suns. The start of a new day on a new world.",
        },
        {
          title: "Oxygen Farm Harvest",
          description:
            "Experience the joy of breathing air you helped create in our hydroponic gardens.",
        },
        {
          title: "Community Lounge",
          description:
            "Evening conversations connecting Earth and Mars under the starry dome.",
        },
      ],
      quote:
        "The first step of this journey begins with your click today.",
      cta: "Register for Waiting List 🚀",
    },
    pricing: {
      title: "Start Free, Expand to the Future",
      description:
        "Choose how you want to participate in the colonization of Mars.",
      tiers: {
        explorer: {
          name: "Explorer",
          price: "Free",
          description: "For those curious about the journey.",
          features: [
            "Mars Migration Application",
            "Basic Information Access",
            "Newsletter Updates",
          ],
          cta: "Get Started",
        },
        pioneer: {
          name: "Pioneer",
          price: "$5-10",
          priceUnit: "/mo",
          description: "Serious about leaving Earth.",
          badge: "Recommended",
          features: [
            "All Explorer features",
            "Exclusive Video Content",
            "VR Mars Simulations",
            "Priority Community Access",
          ],
          cta: "Join Waitlist",
        },
        colonist: {
          name: "Colonist",
          price: "TBD",
          description: "The actual ticket to Mars.",
          features: [
            "One-way ticket to Mars",
            "Habitat Assignment",
            "Life Support Systems",
          ],
          cta: "Learn More",
        },
      },
    },
    modal: {
      title: "Join the Mars Mission",
      description:
        "Enter your details to join the waiting list for the first human settlement on Mars.",
      nameLabel: "Full Name",
      namePlaceholder: "Elon Musk",
      emailLabel: "Email Address",
      emailPlaceholder: "elon@spacex.com",
      submit: "Apply for Mars Migration",
      processing: "Processing...",
      success: {
        title: "Registration Complete! 🎉",
        message:
          "You've been added to the waiting list. We'll notify you when the next launch window opens.",
        close: "Close",
      },
    },
    footer: {
      title: "Mars Migration Project",
      subtitle: "feat. Elon Musk",
      copyright: "© 2025 Mars Migration Project. All rights reserved.",
    },
  },
  ko: {
    hero: {
      subtitle: "프로젝트 레드 플래닛",
      title: "인류의 다음 단계",
      titleHighlight: "화성에서 시작됩니다.",
      description:
        "일론 머스크가 이끄는 화성 이주 프로젝트에 참여하세요. 화성의 첫 정착민 중 한 명으로 역사에 이름을 남기세요.",
      cta: "🚀 화성 이주 신청하기",
      premiumNote: "프리미엄 멤버십 곧 출시 예정 ($5-10/월)",
    },
    overview: {
      title: "화성 이주가 현실이 됩니다",
      description: "인생에서 가장 중요한 여정을 준비하는 데 필요한 모든 것.",
      features: [
        {
          title: "이주 신청",
          description: "화성 식민지 프로그램에 참여하는 간단한 신청 절차.",
        },
        {
          title: "준비 체크리스트",
          description: "생존 키트부터 정신 훈련까지 포괄적인 가이드.",
        },
        {
          title: "일론 머스크의 메시지",
          description: "화성으로의 비전과 여정에 대한 독점 인터뷰.",
        },
        {
          title: "정착민 커뮤니티",
          description: "열린 커뮤니티에서 미래의 화성인들과 연결하세요.",
        },
        {
          title: "미래 시나리오",
          description: "출발 전 화성 생활 시뮬레이션을 경험하세요.",
        },
      ],
      quote:
        "화성의 첫 도시는 인류가 지금까지 건설한 것 중 가장 놀라운 것이 될 것입니다.",
    },
    scenario: {
      title: "화성에서의 하루",
      description: "붉은 행성에서의 미래 일상 생활을 엿보세요.",
      scenarios: [
        {
          title: "화성의 아침",
          description:
            "두 개의 태양 사이로 떠오르는 일출과 함께 깨어나세요. 새로운 세계에서 새로운 하루의 시작입니다.",
        },
        {
          title: "산소 농장 수확",
          description:
            "수경 재배 정원에서 여러분이 만든 공기를 숨쉬는 기쁨을 경험하세요.",
        },
        {
          title: "커뮤니티 라운지",
          description:
            "별이 가득한 돔 아래에서 지구와 화성을 연결하는 저녁 대화.",
        },
      ],
      quote: "이 여정의 첫 걸음은 오늘 여러분의 클릭으로 시작됩니다.",
      cta: "대기자 명단 등록하기 🚀",
    },
    pricing: {
      title: "무료로 시작하고 미래로 확장하세요",
      description: "화성 식민지화에 참여하는 방법을 선택하세요.",
      tiers: {
        explorer: {
          name: "탐험가",
          price: "무료",
          description: "여정에 호기심이 있는 분들을 위해.",
          features: [
            "화성 이주 신청",
            "기본 정보 접근",
            "뉴스레터 업데이트",
          ],
          cta: "시작하기",
        },
        pioneer: {
          name: "개척자",
          price: "$5-10",
          priceUnit: "/월",
          description: "지구를 떠나는 것에 진지한 분들을 위해.",
          badge: "추천",
          features: [
            "탐험가 기능 모두 포함",
            "독점 비디오 콘텐츠",
            "VR 화성 시뮬레이션",
            "우선 커뮤니티 접근",
          ],
          cta: "대기자 명단 등록",
        },
        colonist: {
          name: "정착민",
          price: "추후 공개",
          description: "화성으로 가는 실제 티켓.",
          features: [
            "화성 편도 티켓",
            "거주지 배정",
            "생명 유지 시스템",
          ],
          cta: "자세히 알아보기",
        },
      },
    },
    modal: {
      title: "화성 미션에 참여하세요",
      description:
        "화성의 첫 인간 정착지 대기자 명단에 참여하려면 세부 정보를 입력하세요.",
      nameLabel: "성명",
      namePlaceholder: "홍길동",
      emailLabel: "이메일 주소",
      emailPlaceholder: "hong@example.com",
      submit: "화성 이주 신청하기",
      processing: "처리 중...",
      success: {
        title: "등록 완료! 🎉",
        message:
          "대기자 명단에 추가되었습니다. 다음 발사 창이 열리면 알려드리겠습니다.",
        close: "닫기",
      },
    },
    footer: {
      title: "화성 이주 프로젝트",
      subtitle: "feat. 일론 머스크",
      copyright: "© 2025 화성 이주 프로젝트. 모든 권리 보유.",
    },
  },
} as const;

