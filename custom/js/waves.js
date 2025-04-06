(()=>{document.querySelector("#kratos-page #kratos-blog-post").insertAdjacentHTML("beforebegin",`<div class="preview-overlay">
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
        </div>`);const t=document.getElementById("dark-waves-css"),s=document.getElementById("gentle-wave-svg"),a=()=>{document.documentElement.getAttribute("data-theme")==="dark"?t.setAttribute("media","all"):t.setAttribute("media","(prefers-color-scheme: dark)"),s.classList.remove("hide-wave"),s.classList.add("wave-colors")},e=()=>{document.removeEventListener("load",e),document.querySelector("#theme-toggle").addEventListener("click",a),a()};document.readyState==="complete"?setTimeout(e):(document.addEventListener("DOMContentLoaded",e),window.addEventListener("load",e))})();
