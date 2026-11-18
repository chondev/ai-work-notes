# 발표 자료 만들기

[공통 작업 기준](../principles/#common)을 먼저 복사한 뒤 아래 순서로 진행하세요.

## 1단계: 슬라이드 구조 및 와이어프레임 기획

```prompt
[역할]
너는 글로벌 전략 컨설팅 펌의 senior slide designer이다.

[주제]
[예시: 2025년 신규 AI SaaS 서비스 시장 진출 전략]

[요구사항]
총 5장 분량의 슬라이드 와이어프레임을 작성해라. 각 슬라이드는 아래 구조를 엄격히 준수할 것.

[슬라이드 1장당 필수 구조]
- Slide No & Title:
- Action Title (핵심 결론 1문장):
- Layout Structure (예: 3단 카드 / 2열 비교 / 프로세스 흐름도):
- Body Text (불릿 포인트 기반 핵심 내용):
- Key Takeaway (하단 하이라이트 박스 내용):
- Speaker Note (발표자 대본 2~3문장):
```

## 2단계: 편집 가능한 .pptx 파일 생성

```prompt
[목표]
앞서 작성된 슬라이드 기획안을 바탕으로 완성된 .pptx 파일로 생성해라.

[디자인 템플릿 규격]

슬라이드 크기: 16:9 와이드스크린 (Inches(13.333), Inches(7.5))
컬러 팔레트:
Primary: #0F172A (Navy/Dark Slate)
Secondary: #0F766E (Teal)
Accent: #F59E0B (Amber)
Background: #FFFFFF (White) 또는 #F8FAFC (Light Gray)
Layout 규칙:
Header: Top 0.6", Left 0.8", Action Title Font Size 20pt (Bold)
본문은 1단계에서 정한 장별 레이아웃을 따른다. 동등한 항목 세 개를 비교할 때는 3단 카드를 사용한다.
Typography: Noto Sans KR (제목 20pt, 본문 12pt, 부연설명 10pt)

[실행]
1단계의 발표 대본을 각 장의 발표자 노트에 넣어라. 모든 슬라이드를 화면에 표시해 글자 잘림과 도형 겹침을 확인하고, 노트가 포함된 .pptx 파일을 제공해라.
```

## 💡 파워포인트 실무 팁

16:9 규격 필수: 기본 설정인 4:3 슬라이드를 방지하기 위해 프롬프트 초반에 16:9 비율(13.333 x 7.5인치)을 명시합니다.

레이아웃 객체 좌표 관리: AI에게 단순히 텍스트 배치가 아닌, left, top, width, height 좌표값을 가진 파이썬 렌더링 카드 객체 생성을 요청하면 템플릿 깨짐 현상이 최소화됩니다.
