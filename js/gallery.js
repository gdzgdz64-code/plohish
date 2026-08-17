/* =========================================================
   gallery.js — shared fullscreen lightbox viewer
   ========================================================= */
(function () {
  "use strict";

  var lb = document.getElementById("lightbox");
  if (!lb) return;

  var img = document.getElementById("lightboxImg");
  var cap = document.getElementById("lightboxCap");
  var items = [];
  var index = 0;
  var lastFocused = null;
  var touchX = null;

  function render() {
    var item = items[index] || { src: "", cap: "" };
    img.src = item.src;
    img.alt = item.cap || "Фотография федерации каратэ";
    cap.textContent = item.cap || "";
  }

  function open(list, startIndex) {
    items = list && list.length ? list : [];
    if (!items.length) return;
    index = startIndex || 0;
    lastFocused = document.activeElement;
    render();
    lb.hidden = false;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(function () { lb.classList.add("open"); });
    lb.querySelector(".lightbox-close").focus();
    document.addEventListener("keydown", onKey);
  }

  function close() {
    lb.classList.remove("open");
    document.removeEventListener("keydown", onKey);
    if (!document.querySelector(".modal.open")) document.body.style.overflow = "";
    setTimeout(function () {
      lb.hidden = true;
      img.src = "";
    }, 360);
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  function next() { index = (index + 1) % items.length; render(); }
  function prev() { index = (index - 1 + items.length) % items.length; render(); }

  function onKey(e) {
    if (e.key === "Escape") close();
    else if (e.key === "ArrowRight") next();
    else if (e.key === "ArrowLeft") prev();
    else if (e.key === "Tab") {
      var f = lb.querySelectorAll("button");
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }

  lb.querySelectorAll("[data-lb-close]").forEach(function (el) { el.addEventListener("click", close); });
  lb.querySelector("[data-lb-next]").addEventListener("click", next);
  lb.querySelector("[data-lb-prev]").addEventListener("click", prev);

  lb.addEventListener("touchstart", function (e) { touchX = e.changedTouches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", function (e) {
    if (touchX === null) return;
    var dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) { dx < 0 ? next() : prev(); }
    touchX = null;
  }, { passive: true });

  // expose for modal & grid usage
  window.WKC = window.WKC || {};
  window.WKC.openLightbox = open;
  window.WKC.closeLightbox = close;
})();
