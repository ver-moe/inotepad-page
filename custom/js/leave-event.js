(() => {
  // 配置部分
  const leaveDelay = 3; // 触发事件的延迟，单位为秒
  const leaveFavicon = null; // 触发事件后的图标路径，设置为 null 表示不替换图标
  const leaveTitle = "{{{(>_<)}}}哦哟，崩溃啦~"; // 触发事件后的标题
  const returnTitle = "(*´∇｀*)欸，又好啦~"; // 回归之后的标题

  // 代码部分
  let originTitle = "";
  const saveTitle = () => { originTitle = document.title; };

  let inactiveTimeout = null;
  const siteFavicon = document.querySelector('[rel="icon"]');
  const originFaviconUrl = siteFavicon.getAttribute("href");
  document.addEventListener("visibilitychange", (ev) => {
    if (ev.target.hidden) {
      // 触发离开事件，开始计时
      inactiveTimeout = setTimeout(() => {
        document.title = leaveTitle;
        if (leaveFavicon) {
          siteFavicon.setAttribute("href", leaveFavicon);
        }
        inactiveTimeout = null;
      }, leaveDelay * 1000);
    } else {
      // 触发回归事件
      if (inactiveTimeout !== null) {
        // 还在计时，（假装）无事发生
        clearTimeout(inactiveTimeout);
        inactiveTimeout = null;
      } else {
        // 回归了，庆祝一下
        document.title = returnTitle;
        if (leaveFavicon) {
          siteFavicon.setAttribute("href", originFaviconUrl);
        }

        // 稍等一等再把标题改回来
        setTimeout(() => {
          document.title = originTitle;
        }, 2000);
      }
    }
  });


  // 保存标题
  saveTitle();
  // 在 PJAX 之后再保存标题
  window.addEventListener('pjax:complete', saveTitle);
})();
