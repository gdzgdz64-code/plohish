/* =========================================================
   modal.js — trainer profile modals (accessible)
   ========================================================= */
(function () {
  "use strict";

  var modals = Array.prototype.slice.call(document.querySelectorAll(".modal[role='dialog']"));
  var openModal = null;
  var lastFocused = null;
  var focusableSel = "a[href], button:not([disabled]), input, [tabindex]:not([tabindex='-1'])";

  function getItems(panel) {
    var nodes = panel.querySelectorAll(".mg-item");
    return Array.prototype.map.call(nodes, function (n) {
      return { src: n.getAttribute("data-full"), cap: n.getAttribute("data-cap") || "" };
    });
  }

  function open(modal) {
    lastFocused = document.activeElement;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(function () { modal.classList.add("open"); });
    var closeBtn = modal.querySelector(".modal-close");
    if (closeBtn) closeBtn.focus();
    document.addEventListener("keydown", onKey);
    openModal = modal;
  }

  function close(modal) {
    modal.classList.remove("open");
    document.removeEventListener("keydown", onKey);
    document.body.style.overflow = "";
    openModal = null;
    setTimeout(function () { modal.hidden = true; }, 460);
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  function onKey(e) {
    if (!openModal) return;
    var lbEl = document.getElementById("lightbox");
    if (lbEl && lbEl.hidden === false) return;
    if (e.key === "Escape") { close(openModal); return; }
    if (e.key === "Tab") {
      var f = Array.prototype.filter.call(
        openModal.querySelectorAll(focusableSel),
        function (el) { return el.offsetParent !== null; }
      );
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      else if (openModal.contains(document.activeElement) === false) { e.preventDefault(); first.focus(); }
    }
  }

  modals.forEach(function (modal) {
    modal.querySelectorAll("[data-close]").forEach(function (el) {
      el.addEventListener("click", function () { close(modal); });
    });

    // open from coach card
    var trigger = document.querySelector(".coach-card[data-trainer='" + modal.id.replace("modal-", "") + "']");
    if (trigger) {
      trigger.addEventListener("click", function () { open(modal); });
    }

    // gallery inside modal -> lightbox
    var items = getItems(modal);
    modal.querySelectorAll(".mg-item").forEach(function (node, i) {
      node.addEventListener("click", function () {
        if (window.WKC && window.WKC.openLightbox) window.WKC.openLightbox(items, i);
      });
    });
  });
})();
