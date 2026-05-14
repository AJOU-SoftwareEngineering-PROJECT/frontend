# Interactive Reader Frontend

상호작용 독서 앱 플랫폼 프론트엔드 예시 프로젝트입니다.

## 핵심 아이디어

기존 독서 플랫폼은 리뷰와 댓글 기능은 있지만, 유저들과 상호작용하는 부분이 부족합니다. 이 프로젝트는 다음 기능을 중심으로 구성했습니다.

1. 각 문장마다 댓글을 달 수 있는 **문장별 댓글 기능**
2. 책을 읽으면서 어울리는 음악을 듣고 추천할 수 있는 **음악 스트리밍 기능**
3. 독자, 작가, 관리자 화면을 분리한 독서 플랫폼 UI

## 사용 기술

- React
- Vite
- Tailwind CSS
- React Router DOM
- Lucide React
- Recharts

## 실행 방법

```bash
npm install
npm run dev
```

브라우저에서 표시되는 주소로 접속하면 됩니다.

## 주요 페이지

- `/` : Login Page
- `/dashboard` : Project Dashboard
- `/books` : Books Page
- `/books/:bookId` : Reader Page, 문장별 댓글 + 추천 음악
- `/mypage` : My Page
- `/author` : Author Dashboard
- `/playlists` : Music Playlist Page
- `/scraps` : Scraps Page
- `/requirements` : Requirements Page
- `/settings` : Settings Page

## 발표 설명 예시

저는 이번 프로젝트에서 프론트엔드 화면 구현을 담당했습니다. 전체 화면은 React와 Tailwind CSS를 사용하여 제작했으며, 로그인 페이지, 대시보드, 도서 목록 페이지, 마이페이지, 작가 대시보드로 구성했습니다.

기존 독서 플랫폼은 리뷰나 댓글 기능은 있지만, 문장 단위로 독자들이 직접 의견을 남기는 기능은 부족하다고 생각했습니다. 그래서 이 프로젝트에서는 각 문장마다 댓글을 작성할 수 있는 구조를 고려하여 사용자 간 상호작용을 강화했습니다.

또한 사용자가 책을 읽으면서 어울리는 음악을 추천하거나 들을 수 있도록 음악 스트리밍 기능을 함께 배치했습니다. 이를 통해 단순한 독서 플랫폼이 아니라, 독서 경험과 감정 공유를 함께 제공하는 인터랙티브 독서 플랫폼을 목표로 했습니다.
