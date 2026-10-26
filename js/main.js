(function () {
  "use strict";

  var root = document.documentElement;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  var reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var wide = matchMedia("(min-width: 900px)");

  /* ---------- Links: fill from js/links.js, mark empty ones as "soon" ---------- */
  var links = window.SITE_LINKS || {};
  $$("[data-link]").forEach(function (a) {
    var url = links[a.dataset.link];
    if (url) {
      a.href = url;
      if (/^https?:/.test(url)) { a.target = "_blank"; a.rel = "noopener noreferrer"; }
    } else {
      a.classList.add("is-soon");
      a.setAttribute("role", "link");
      a.setAttribute("aria-disabled", "true");
      a.title = "Link coming soon";
      a.addEventListener("click", function (e) { e.preventDefault(); });
    }
  });

  /* ---------- Confetti ---------- */
  if (!reduceMotion) {
    var holder = $(".confetti");
    for (var i = 0; i < 28; i++) {
      var c = document.createElement("span");
      var size = 6 + Math.random() * 10;
      c.style.cssText =
        "width:" + size + "px;height:" + (i % 3 ? size : size * 0.45) + "px;left:" + Math.random() * 100 + "%;" +
        "animation-duration:" + (18 + Math.random() * 24) + "s;" +
        "animation-delay:-" + Math.random() * 40 + "s;" +
        "--sway:" + (Math.random() * 120 - 60) + "px;--spin:" + (Math.random() * 720 - 360) + "deg";
      holder.appendChild(c);
    }
  }

  /* ---------- Clock ---------- */
  var clock = $("#clock");
  function tick() {
    clock.textContent = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
  tick();
  setInterval(tick, 20000);

  /* ---------- Start menu ---------- */
  var startBtn = $("#start-btn"), startMenu = $("#start-menu");
  function setMenu(open) {
    startMenu.hidden = !open;
    startBtn.setAttribute("aria-expanded", String(open));
  }
  startBtn.addEventListener("click", function (e) { e.stopPropagation(); setMenu(startMenu.hidden); });
  document.addEventListener("click", function (e) { if (!startMenu.contains(e.target)) setMenu(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });

  /* ---------- Windows ---------- */
  var wins = $$(".win");
  var tasks = $("#tasks");
  var taskBtns = {};
  var zTop = 10;
  var placed = false;

  function winById(id) { return document.getElementById(id); }

  function bringToFront(win) {
    wins.forEach(function (w) { w.classList.remove("is-front"); });
    win.classList.add("is-front");
    win.style.zIndex = ++zTop;
    syncTasks();
  }

  function syncTasks() {
    wins.forEach(function (w) {
      var btn = taskBtns[w.id];
      btn.hidden = w.classList.contains("is-closed");
      btn.setAttribute("aria-pressed", String(w.classList.contains("is-front")));
    });
  }

  function clampToStage(win) {
    var stage = $("#desktop");
    var maxX = stage.clientWidth - win.offsetWidth - 8;
    var maxY = stage.clientHeight - 40;
    win.style.left = Math.max(8, Math.min(maxX, win.offsetLeft)) + "px";
    win.style.top = Math.max(8, Math.min(maxY, win.offsetTop)) + "px";
  }

  function placeWindows() {
    var stage = $("#desktop");
    wins.forEach(function (w) {
      w.style.setProperty("--w", w.dataset.w + "px");
      w.style.left = (stage.clientWidth * w.dataset.x / 100) + "px";
      w.style.top = (stage.clientHeight * w.dataset.y / 100) + "px";
      clampToStage(w);
    });
    placed = true;
  }

  function openWindow(id) {
    var win = winById(id);
    if (!win) return;
    if (!root.classList.contains("desktop-mode")) {
      win.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      return;
    }
    win.classList.remove("is-closed");
    clampToStage(win);
    bringToFront(win);
  }

  function closeWindow(win) {
    win.classList.add("is-closed");
    win.classList.remove("is-front");
    syncTasks();
  }

  wins.forEach(function (win) {
    var bar = $(".win__bar", win);
    var title = $(".win__title", win).textContent;

    // window buttons (only visible in desktop mode)
    var ctl = document.createElement("div");
    ctl.className = "win__ctl";
    ctl.innerHTML =
      '<button type="button" class="min" aria-label="Minimise ' + title + '">–</button>' +
      '<button type="button" class="close" aria-label="Close ' + title + '">✕</button>';
    bar.appendChild(ctl);
    $(".min", ctl).addEventListener("click", function () { closeWindow(win); });
    $(".close", ctl).addEventListener("click", function () { closeWindow(win); });

    // taskbar button
    var btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = title;
    btn.addEventListener("click", function () {
      if (win.classList.contains("is-closed")) openWindow(win.id);
      else if (win.classList.contains("is-front")) closeWindow(win);
      else bringToFront(win);
    });
    tasks.appendChild(btn);
    taskBtns[win.id] = btn;

    win.addEventListener("pointerdown", function () { if (root.classList.contains("desktop-mode")) bringToFront(win); });

    // dragging
    bar.addEventListener("pointerdown", function (e) {
      if (!root.classList.contains("desktop-mode") || e.target.closest("button")) return;
      var startX = e.clientX, startY = e.clientY, left = win.offsetLeft, top = win.offsetTop;
      win.classList.add("is-dragging");
      bar.setPointerCapture(e.pointerId);
      function move(ev) {
        win.style.left = left + ev.clientX - startX + "px";
        win.style.top = top + ev.clientY - startY + "px";
      }
      function up() {
        bar.removeEventListener("pointermove", move);
        bar.removeEventListener("pointerup", up);
        bar.removeEventListener("pointercancel", up);
        win.classList.remove("is-dragging");
        clampToStage(win);
      }
      bar.addEventListener("pointermove", move);
      bar.addEventListener("pointerup", up);
      bar.addEventListener("pointercancel", up);
    });
  });

  // anything with data-open opens that window (icons, buttons, start menu)
  $$("[data-open]").forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      setMenu(false);
      openWindow(el.dataset.open);
    });
  });

  /* ---------- Mode switch: stacked page vs. 3D desktop ---------- */
  function applyMode() {
    if (wide.matches) {
      root.classList.add("desktop-mode");
      if (!placed) {
        placeWindows();
        wins.forEach(function (w) { if (w.id !== "win-about" && w.id !== "win-podcast") w.classList.add("is-closed"); });
        bringToFront(winById("win-about"));
      } else {
        wins.forEach(clampToStage);
      }
    } else {
      root.classList.remove("desktop-mode");
      wins.forEach(function (w) { w.classList.remove("is-closed", "is-front"); w.style.zIndex = ""; w.style.left = w.style.top = ""; });
      placed = false;
    }
    syncTasks();
  }
  wide.addEventListener("change", applyMode);
  window.addEventListener("resize", function () { if (placed) wins.forEach(clampToStage); });
  applyMode();

  /* ---------- 3D tilt that follows the pointer ---------- */
  if (!reduceMotion) {
    var tilt = $("#tilt"), raf = 0, nx = 0, ny = 0;
    document.addEventListener("pointermove", function (e) {
      if (e.pointerType === "touch") return;
      nx = (e.clientX / window.innerWidth) * 2 - 1;
      ny = (e.clientY / window.innerHeight) * 2 - 1;
      if (!raf) raf = requestAnimationFrame(function () {
        raf = 0;
        tilt.style.setProperty("--mx", nx.toFixed(3));
        tilt.style.setProperty("--my", ny.toFixed(3));
      });
    });
  }

  /* ---------- Photo viewer ---------- */
  var box = $("#lightbox"), boxImg = $("#lightbox-img");
  var shots = $$("#gallery button");
  var current = 0;
  function show(i) {
    current = (i + shots.length) % shots.length;
    var s = shots[current];
    boxImg.src = s.dataset.full;
    boxImg.alt = $("img", s).alt;
  }
  shots.forEach(function (s, i) {
    s.addEventListener("click", function () { show(i); box.showModal(); });
  });
  $("#lb-prev").addEventListener("click", function () { show(current - 1); });
  $("#lb-next").addEventListener("click", function () { show(current + 1); });
  box.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") show(current - 1);
    if (e.key === "ArrowRight") show(current + 1);
  });
  box.addEventListener("click", function (e) { if (e.target === box) box.close(); });
})();
