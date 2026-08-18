/* Shared accessible lightbox for gallery, content and trainer photographs. */
(function () {
  "use strict";

  var lb = document.getElementById("lightbox");
  if (!lb) return;
  var img = document.getElementById("lightboxImg");
  var cap = document.getElementById("lightboxCap");
  var count = document.getElementById("lightboxCount");
  var prevButton = lb.querySelector("[data-lb-prev]");
  var nextButton = lb.querySelector("[data-lb-next]");
  var items = [];
  var index = 0;
  var lastFocused = null;
  var touchX = null;

  function render() {
    var item = items[index] || { src: "", cap: "" };
    img.src = item.src;
    img.alt = item.cap || "Фотография федерации каратэ";
    cap.textContent = item.cap || "";
    if (count) count.textContent = String(index + 1).padStart(2, "0") + " / " + String(items.length).padStart(2, "0");
    if (prevButton) prevButton.disabled = items.length < 2;
    if (nextButton) nextButton.disabled = items.length < 2;
  }

  function open(list, startIndex) {
    items = (list || []).filter(function (item) { return item && item.src; });
    if (!items.length) return;
    index = Math.max(0, Math.min(Number(startIndex) || 0, items.length - 1));
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
    window.setTimeout(function () { lb.hidden = true; img.src = ""; }, 360);
    if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus({ preventScroll: true });
  }

  function next() { if (items.length > 1) { index = (index + 1) % items.length; render(); } }
  function prev() { if (items.length > 1) { index = (index - 1 + items.length) % items.length; render(); } }

  function onKey(event) {
    if (event.key === "Escape") { event.preventDefault(); close(); return; }
    if (event.key === "ArrowRight") { event.preventDefault(); next(); return; }
    if (event.key === "ArrowLeft") { event.preventDefault(); prev(); return; }
    if (event.key !== "Tab") return;
    var focusable = Array.prototype.filter.call(lb.querySelectorAll("button"), function (el) { return !el.disabled; });
    if (!focusable.length) return;
    var first = focusable[0], last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }

  function openContentImage(image) {
    var images = Array.prototype.filter.call(document.querySelectorAll("main img, .modal-media img"), function (node) {
      return node !== image && !node.closest(".g-item, .mg-item, .brand, .footer-brand, #lightbox, .coach-card");
    });
    images.unshift(image);
    var unique = [];
    var seen = {};
    images.forEach(function (node) {
      var src = node.currentSrc || node.src;
      if (!src || seen[src]) return;
      seen[src] = true;
      unique.push({ src: src, cap: node.alt || "" });
    });
    var currentSrc = image.currentSrc || image.src;
    var start = unique.findIndex(function (item) { return item.src === currentSrc; });
    open(unique, start);
  }

  function makeContentImagesInteractive() {
    Array.prototype.forEach.call(document.querySelectorAll("main img, .modal-media img"), function (image) {
      if (image.closest(".g-item, .mg-item, .brand, .footer-brand, #lightbox, .coach-card")) return;
      image.classList.add("is-lightbox-trigger");
      image.tabIndex = 0;
      image.setAttribute("role", "button");
      image.setAttribute("aria-label", "Открыть фото: " + (image.alt || "увеличить"));
      image.addEventListener("click", function (event) { event.preventDefault(); event.stopPropagation(); image.focus({ preventScroll: true }); openContentImage(image); });
      image.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") { event.preventDefault(); openContentImage(image); }
      });
    });
  }

  lb.querySelectorAll("[data-lb-close]").forEach(function (el) { el.addEventListener("click", close); });
  nextButton.addEventListener("click", next);
  prevButton.addEventListener("click", prev);
  lb.addEventListener("touchstart", function (event) { touchX = event.changedTouches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", function (event) {
    if (touchX === null) return;
    var distance = event.changedTouches[0].clientX - touchX;
    if (Math.abs(distance) > 50) distance < 0 ? next() : prev();
    touchX = null;
  }, { passive: true });

  window.WKC = window.WKC || {};
  window.WKC.openLightbox = open;
  window.WKC.closeLightbox = close;
  makeContentImagesInteractive();
})();
