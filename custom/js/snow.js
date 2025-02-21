(() => {
  // 设置雪花参数
  const snowConf = {
    flakeCount: 100,
    minDist: 150,
    color: "255, 255, 255",
    size: 2,
    speed: 0.5,
    opacity: 0.3,
    stepsize: 0.5,
  };

  // 记录下雪状态
  let isSnowing = true;

  const requestAnimationFrame =
    window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };
  window.requestAnimationFrame = requestAnimationFrame;
  const canvas = document.getElementById("snow");
  const ctx = canvas.getContext("2d");
  const flakeCount = snowConf.flakeCount;
  let mX = -100,
    mY = -100;
  let flakes = [];
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const snow = () => {
    if (!isSnowing) {
      return; // 结束
    }

    // 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const minDist = snowConf.minDist;
    for (let i = 0; i < flakeCount; i++) {
      let flake = flakes[i];
      const x = mX,
        y = mY;
      const x2 = flake.x,
        y2 = flake.y;
      const dist = Math.sqrt((x - x2) * (x - x2) + (y - y2) * (y - y2));
      if (dist < minDist) {
        const force = minDist / (dist * dist);
        const xcomp = (x - x2) / dist;
        const ycomp = (y - y2) / dist;
        const deltaV = force / 2;
        flake.velX -= deltaV * xcomp;
        flake.velY -= deltaV * ycomp;
      } else {
        flake.velX *= 0.98;
        if (flake.velY < flake.speed && flake.speed - flake.velY > 0.01) {
          flake.velY += (flake.speed - flake.velY) * 0.01;
        }
        flake.velX += Math.cos((flake.step += 0.05)) * flake.stepSize;
      }
      ctx.fillStyle = "rgba(" + snowConf.color + ", " + flake.opacity + ")";
      flake.y += flake.velY;
      flake.x += flake.velX;
      if (flake.y >= canvas.height || flake.y <= 0) {
        reset(flake);
      }
      if (flake.x >= canvas.width || flake.x <= 0) {
        reset(flake);
      }
      ctx.beginPath();
      ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(snow);
  };
  const reset = (flake) => {
    flake.x = Math.floor(Math.random() * canvas.width);
    flake.y = 0;
    flake.size = Math.random() * 3 + 2;
    flake.speed = Math.random() * 1 + 0.5;
    flake.velY = flake.speed;
    flake.velX = 0;
    flake.opacity = Math.random() * 0.5 + 0.3;
  };
  // 初始化函数
  const init = () => {
    // 判断当前是否应该下雪
    const isSnowDisabled = localStorage.getItem('kr-disable-snow') !== null;
    if (isSnowDisabled || window.kr?.notMobile === false) {
      // 用户禁用了或者是移动端，就不下雪了
      isSnowing = false;
      canvas.classList.add('disabled');
      return;
    }

    startSnow();
  };
  const startSnow = () => {
    // 生成初始雪花
    for (let i = 0; i < flakeCount; i++) {
      const x = Math.floor(Math.random() * canvas.width);
      const y = Math.floor(Math.random() * canvas.height);
      const size = Math.random() * 3 + snowConf.size;
      const speed = Math.random() * 1 + snowConf.speed;
      const opacity = Math.random() * 0.5 + snowConf.opacity;
      flakes.push({
        speed: speed,
        velX: 0,
        velY: speed,
        x: x,
        y: y,
        size: size,
        stepSize: (Math.random() / 30) * snowConf.stepsize,
        step: 0,
        angle: 180,
        opacity: opacity,
      });
    }
    // 开始下雪
    snow();
  };
  // 雪花避让鼠标
  document.addEventListener("mousemove", (e) => {
    (mX = e.clientX), (mY = e.clientY);
  });
  // 窗口大小调整
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  // 切换雪花按钮
  const darkSwicth = document.getElementById("theme-toggle");
  darkSwicth.insertAdjacentHTML('afterend', `<div class="box theme-box" id="snow-switch"><span class="fa fa-snowflake-o"></span></div>`)
  document.getElementById("snow-switch")?.addEventListener("click", () => {
    if (isSnowing) {
      setTimeout(() => { isSnowing = false; }, 600);
      localStorage.setItem('kr-disable-snow', true);
      canvas.classList.add('disabled');
    } else {
      isSnowing = true;
      localStorage.removeItem('kr-disable-snow');
      canvas.classList.remove('disabled');
      startSnow();
    }
  });

  // 初始化
  init();
})();
