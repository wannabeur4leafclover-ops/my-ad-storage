export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // 기본 접속 시 표시될 메시지
    if (url.pathname === "/") {
      return new Response("광고 저장소 Worker가 작동 중입니다. GitHub 연동 완료!", {
        headers: { "Content-Type": "text/plain; charset=utf-8" }
      });
    }

    // 예: /ads/00_default/01.webp 경로로 접속 시 처리 (필요 시 로직 확장 가능)
    return new Response(`${url.pathname} 경로에 접근 시도 중입니다.`, {
      headers: { "Content-Type": "text/plain; charset=utf-8" }
    });
  },
};
