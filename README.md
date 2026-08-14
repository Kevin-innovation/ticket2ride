# Railbound Online

Ticket to Ride 규칙을 바탕으로 만든 1차 웹 게임 프로토타입입니다.

## 실행

```bash
npm install
npm run dev
```

## 현재 구현

- 미국 횡단 노선 지도 SVG
- 노선 선택 및 점령 / 점수 계산
- 열차 카드 더미·공개 카드 뽑기
- 목적지 티켓 및 플레이어 패널
- 테스트 플레이어 4명과 `localStorage` 저장
- Vercel 정적 배포용 Vite 구성

현재는 DB 없이 테스트하는 단계이며, 추후 GitHub 연동 후 방 생성·실시간 멀티플레이 서버를 연결합니다.
