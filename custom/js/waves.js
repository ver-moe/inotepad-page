(() => {
  const kratos_start = document.querySelector("#kratos-page #kratos-blog-post");
  kratos_start.insertAdjacentHTML('beforebegin', `<div class="preview-overlay">
            <svg id="gentle-wave-svg" class="preview-waves hide-wave" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
              <defs>
                <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"></path>
              </defs>
              <g class="preview-parallax">
                <use xlink:href="#gentle-wave" x="48" y="0" fill="var(--gentle-wave1)"></use>
                <use xlink:href="#gentle-wave" x="48" y="3" fill="var(--gentle-wave2)"></use>
                <use xlink:href="#gentle-wave" x="48" y="5" fill="var(--gentle-wave3)"></use>
                <use xlink:href="#gentle-wave" x="48" y="7" fill="var(--gentle-wave)"></use>
              </g>
            </svg>
        </div>`);

  const darkmodeCss = document.getElementById("dark-waves-css");
  const waveSVG = document.getElementById("gentle-wave-svg")

  const refreshColor = () => {
    if (document.documentElement.getAttribute("data-theme") === "dark") {
      darkmodeCss.setAttribute("media", "all");
    } else {
      darkmodeCss.setAttribute("media", "(prefers-color-scheme: dark)");
    }
    waveSVG.classList.remove("hide-wave");
    waveSVG.classList.add("wave-colors");
  };

  const initColor = () => {
    document.removeEventListener("load", initColor);
    document.querySelector("#theme-toggle").addEventListener("click", refreshColor);
    refreshColor();
  };

  // 适配夜间模式
  if (document.readyState === "complete") {
    setTimeout(initColor);
  } else {
    document.addEventListener("DOMContentLoaded", initColor);
    window.addEventListener("load", initColor);
  }

})();