export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    if (path === "/") {
      return new Response("광고 저장소 연결 성공!", {
        headers: { "Content-Type": "text/plain; charset=utf-8" }
      });
    }

    const githubRawUrl = `https://raw.githubusercontent.com/wannabeur4leafclover-ops/my-ad-storage/main${path}`;

    // 핵심: cf 설정을 통해 Cloudflare 서버에 이미지를 저장(캐싱)합니다.
    const response = await fetch(githubRawUrl, {
      cf: {
        cacheTtl: 3600, // 1시간 동안 GitHub 접속 없이 Cloudflare가 직접 응답
        cacheEverything: true,
      },
    });

    if (!response.ok) {
      return new Response("파일을 찾을 수 없습니다.", { status: 404 });
    }

    // 응답을 복사하여 브라우저에 전달
    const newResponse = new Response(response.body, response);
    newResponse.headers.set("Cache-Control", "public, max-age=3600");
    return newResponse;
  },
};
