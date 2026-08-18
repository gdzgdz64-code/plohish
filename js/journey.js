/* ПУТЬ СПОРТСМЕНА — calm scroll-spy. No scroll-jacking, no auto-advance. */
(function () {
  "use strict";

  var steps = Array.prototype.slice.call(document.querySelectorAll(".j-step"));
  var photos = Array.prototype.slice.call(document.querySelectorAll(".jp-photo"));
  var progress = document.querySelector(".j-progress");
  var line = document.querySelector(".j-line");
  var stepsEl = document.querySelector(".journey-steps");
  if (!steps.length || !stepsEl) return;

  var active = 0;

  function dotCenter(step) {
    var dot = step.querySelector(".j-dot");
    var cr = stepsEl.getBoundingClientRect();
    var dr = dot.getBoundingClientRect();
    return (dr.top + dr.height / 2) - cr.top;
  }

  function layoutLines() {
    if (!steps.length) return;
    var first = dotCenter(steps[0]);
    var last = dotCenter(steps[steps.length - 1]);
    if (line) { line.style.top = first + "px"; line.style.height = Math.max(0, last - first) + "px"; }
    var cur = dotCenter(steps[active]);
    if (progress) { progress.style.top = first + "px"; progress.style.height = Math.max(0, cur - first) + "px"; }
  }

  function setActive(i, scroll) {
    if (i < 0 || i >= steps.length || i === active) {
      if (i === active) { /* still recompute lines */ }
      else return;
    }
    active = i;
    steps.forEach(function (s, idx) { s.classList.toggle("j-active", idx === i); });
    photos.forEach(function (p, idx) { p.classList.toggle("is-active", idx === i); });
    layoutLines();
    if (scroll) {
      var step = steps[i];
      if (step && typeof step.scrollIntoView === "function") {
        step.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }

  steps.forEach(function (step, idx) {
    step.addEventListener("click", function () { setActive(idx, true); });
    step.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setActive(idx, true); }
    });
  });

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var idx = steps.indexOf(entry.target);
          if (idx > -1) setActive(idx, false);
        }
      });
    }, { rootMargin: "-45% 0px -45% 0px", threshold: 0 });
    steps.forEach(function (s) { io.observe(s); });
  }

  setActive(0, false);
  layoutLines();
  window.addEventListener("resize", layoutLines);
  window.addEventListener("load", layoutLines);
})();
