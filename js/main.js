/* =========================================================
   main.js — header state, mobile menu, nav, parents accordion
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Header scroll state ---------- */
  var header = document.getElementById("siteHeader");
  function onScrollHeader() {
    if (!header) return;
    if (window.scrollY > 40) header.setAttribute("data-state", "scrolled");
    else header.setAttribute("data-state", "top");
  }
  window.addEventListener("scroll", onScrollHeader, { passive: true });
  onScrollHeader();

  /* ---------- Mobile menu ---------- */
  var toggle = document.getElementById("menuToggle");
  var menu = document.getElementById("mobileMenu");
  function openMenu() {
    menu.classList.add("open");
    menu.setAttribute("aria-hidden", "false");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Закрыть меню");
    document.body.style.overflow = "hidden";
    var first = menu.querySelector(".mm-link");
    if (first) first.focus();
  }
  function closeMenu() {
    menu.classList.remove("open");
    menu.setAttribute("aria-hidden", "true");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Открыть меню");
    document.body.style.overflow = "";
    toggle.focus();
  }
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      menu.classList.contains("open") ? closeMenu() : openMenu();
    });
    menu.querySelectorAll(".mm-link").forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });
    var mmClose = document.getElementById("mmClose");
    if (mmClose) mmClose.addEventListener("click", closeMenu);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("open")) closeMenu();
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 1200 && menu.classList.contains("open")) closeMenu();
    }, { passive: true });
  }

  /* ---------- Smooth scroll for in-page anchors ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var id = link.getAttribute("href");
      if (id === "#" || id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top: top, behavior: "smooth" });
    });
  });

  /* ---------- Parents accordion (click + keyboard, no autoplay) ---------- */
  var items = document.querySelectorAll(".pl-item");
  items.forEach(function (item) {
    function toggleItem() {
      var expanded = item.getAttribute("aria-expanded") === "true";
      items.forEach(function (other) { other.setAttribute("aria-expanded", "false"); });
      item.setAttribute("aria-expanded", expanded ? "false" : "true");
    }
    item.addEventListener("click", toggleItem);
    item.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleItem(); }
    });
  });

  /* ---------- Gallery grid -> lightbox ---------- */
  var grid = document.getElementById("galleryGrid");
  if (grid && window.WKC && window.WKC.openLightbox) {
    var nodes = grid.querySelectorAll(".g-item");
    var list = Array.prototype.map.call(nodes, function (n) {
      return { src: n.getAttribute("data-full"), cap: n.getAttribute("data-cap") || "" };
    });
    nodes.forEach(function (node, i) {
      node.addEventListener("click", function () { window.WKC.openLightbox(list, i); });
    });
  }

  /* ---------- Today photo -> lightbox ---------- */
  var todayPhoto = document.querySelector(".today .g-item");
  if (todayPhoto && window.WKC && window.WKC.openLightbox) {
    todayPhoto.addEventListener("click", function () {
      window.WKC.openLightbox([{ src: todayPhoto.getAttribute("data-full"), cap: todayPhoto.getAttribute("data-cap") || "" }], 0);
    });
  }

  /* ---------- Trainer modal gallery -> lightbox ---------- */
  document.querySelectorAll(".modal").forEach(function (modal) {
    var mg = modal.querySelectorAll(".mg-item");
    if (!mg.length || !window.WKC || !window.WKC.openLightbox) return;
    var list = Array.prototype.map.call(mg, function (n) {
      return { src: n.getAttribute("data-full"), cap: n.getAttribute("data-cap") || "" };
    });
    mg.forEach(function (node, i) {
      node.addEventListener("click", function () { window.WKC.openLightbox(list, i); });
    });
  });
})();
