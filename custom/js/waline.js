import { init, commentCount } from "https://unpkg.com/@waline/client@v3.1.3/dist/waline.js";
import { pageviewCount } from "https://unpkg.com/@waline/client@v3.1.3/dist/pageview.js";

(() => {
  const serverURL = "https://blog-waline.ver.moe/";

  const loadComments = async () => {
    const container = document.getElementById("w-comments");
    if (!!container) {
      // 是文章或页面，完整加载 Waline
      const path = container.getAttribute("data-path");
      init({ el: container, path, dark: 'html[data-theme="dark"]', serverURL, pageview: true, comment: true });
    } else {
      // 是首页，只展示页面访问和评论数量，不渲染评论区
      pageviewCount({ serverURL, update: false });
      commentCount({ serverURL });
    }

    if (localStorage.getItem("firstVisit") === null) {
      // 站点的访问统计，仅生效一次
      localStorage.setItem("firstVisit", false)
      pageviewCount({ serverURL, path: "/" });
    }
  };

  window.loadComments = loadComments;
  window.addEventListener("pjax:success", () => { window.loadComments = loadComments; });
})();
