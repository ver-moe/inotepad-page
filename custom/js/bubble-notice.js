(() => {
  var bubbleNum = 0;
  const typeMap = {
    normal: "#cfe2ff",
    problem: "#fff3cd",
    err: "#f8d7da",
    ok: "#d1e7dd",
  };
  const page = document.getElementById("kratos-wrapper");
  page.insertAdjacentHTML("afterbegin", `<div id="bubble-noticer-list"></div>`);
  const bubbleList = document.getElementById("bubble-noticer-list");

  const refreshPosition = () => {
    const bubbles = bubbleList.childNodes;
    let stillCount = 0;
    bubbles.forEach((bubble) => {
      if (!bubble.classList.contains("bubbleNotice-hide")) {
        bubble.style.top = `${60 + stillCount * 40}px`;
        ++stillCount;
      }
    });
  };
  const removeOne = () => {
    const bubbles = bubbleList.childNodes;
    let stillCount = 0;
    let foundRemoved = false;
    bubbles.forEach((bubble) => {
      const hasRemoved = bubble.classList.contains("bubbleNotice-hide");
      if (!foundRemoved && !hasRemoved) {
        bubble.classList.add("bubbleNotice-hide");
        bubble.style.top = "-40px";
        setTimeout(() => {
          bubbleList.removeChild(bubble);
          refreshPosition();
        }, 700);
        foundRemoved = true;
      } else if (!hasRemoved) {
        bubble.style.top = `${60 + stillCount * 40}px`;
        ++stillCount;
      }
    });
  };

  const addBubble = (text, type, time) => {
    const bg = typeMap[type];

    bubbleList.insertAdjacentHTML(
      "beforeend",
      `<div class="bubbleNotice ${type}" style="background-color: ${bg}; top: ${
        60 + bubbleList.childElementCount * 40
      }px;">${text}</div>`
    );
    setTimeout(removeOne, time);
    return bubbleNum;
  };
  window.addEventListener("pjax:before", () => {
    addBubble("请求页面中", "normal", 3000);
  });
  window.addEventListener("pjax:complete", () => {
    addBubble("请求成功", "ok", 3000);
  });
  window.addEventListener("pjax:error", () => {
    addBubble("请求失败，即将刷新", "err", 3000);
  });
})();
