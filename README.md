# AI 업무 노트

[AI 업무 노트 사이트 바로가기](https://chondev.github.io/ai-work-notes/)

## 로컬 미리보기

Node.js 20 이상에서 `npm ci`, `npm run dev`를 차례로 실행하고 http://127.0.0.1:8787/ai-work-notes/ 를 연다. 원고를 수정한 뒤 `npm run build`를 실행하고 브라우저를 새로 고친다.

## 원고 추가

일반 업무는 `content/daily/`, 파일 제작은 `content/files/`, 사용기는 `content/notes/`에 영문 소문자와 하이픈으로 이름 붙인 Markdown 파일을 추가한다. 첫 줄의 `# 제목`이 메뉴와 페이지 제목이 된다. 목록은 빌드할 때 생성된다.

복사할 본문만 언어명이 `prompt`인 코드 블록에 넣는다. 설명과 입력 예시는 블록 밖에 쓰고, 연속 작업은 단계별 소제목을 붙인다. 다른 글에서 같은 프롬프트를 보여줄 때는 코드 블록의 언어명 뒤에 식별자를 붙인다(예: `prompt sales-analysis`). 참조하는 글에는 `{{prompt sales-analysis}}`를 쓴다.

## GitHub Pages 배포

미리보기 확인 후 GitHub에 공개 저장소 `ai-work-notes`를 만들고 소스를 `main` 브랜치에 올린다. 저장소 Settings → Pages → Source에서 GitHub Actions를 선택하고 Actions의 Pages 워크플로를 실행한다. 이후 main에 push하면 자동 배포된다.
