/* ============================================================
   script.js -- Production-ready | RE Newsletter
   Modules:
     1. GSAP + ScrollTrigger registration
     2. Preloader (fires once hero images resolve)
     3. Hero intro animation (original, untouched)
     4. Scroll Indicator bounce
     5. Hero scroll-pin animation (original, untouched)
   ============================================================ */

gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   1. PRELOADER
   ============================================================ */
(function initPreloader() {
  var preloader = document.getElementById('preloader');
  var bar = document.querySelector('.preloader__bar');
  var heroImages = Array.from(document.querySelectorAll('.hero-main-logo, .hero-main-image'));

  if (!preloader) return;

  var progress = 0;

  function setBar(pct, dur) {
    gsap.to(bar, { width: pct + '%', duration: dur || 0.4, ease: 'power2.out' });
  }

  function dismissPreloader() {
    setBar(100, 0.3);
    gsap.delayedCall(0.45, function () {
      preloader.classList.add('preloader--hidden');
      document.body.style.overflowY = 'auto';
      document.body.style.overflowX = 'hidden';
      ScrollTrigger.refresh();
    });
  }

  var ticker = setInterval(function () {
    if (progress < 80) {
      progress += Math.random() * 8;
      progress = Math.min(progress, 80);
      setBar(progress);
    }
  }, 250);

  var loaded = 0;
  var total = heroImages.length || 1;

  function onImageReady() {
    loaded++;
    if (loaded >= total) {
      clearInterval(ticker);
      dismissPreloader();
    }
  }

  if (heroImages.length === 0) {
    window.addEventListener('DOMContentLoaded', dismissPreloader);
    return;
  }

  heroImages.forEach(function (img) {
    if (img.complete && img.naturalWidth > 0) {
      onImageReady();
    } else {
      img.addEventListener('load', onImageReady);
      img.addEventListener('error', onImageReady);
    }
  });

  setTimeout(function () { clearInterval(ticker); dismissPreloader(); }, 6000);
})();


/* ============================================================
   2. HERO INTRO ANIMATION (original -- untouched)
   ============================================================ */

gsap.from(".hero-main-container", {
  scale: 1.45,
  duration: 2.8,
  ease: "power3.out",
});

gsap.to(".overlay", {
  opacity: 0,
  duration: 2.8,
  ease: "power3.out",
  onComplete: function () {
    document.body.style.overflowX = "hidden";
  },
});


/* ============================================================
   3. SCROLL INDICATOR BOUNCE (original -- untouched)
   ============================================================ */

var scrollIndicator = document.querySelector(".scroll-indicator");
var bounceTimeline = gsap.timeline({ repeat: -1, yoyo: true });

bounceTimeline.to(scrollIndicator, {
  y: 20,
  opacity: 0.6,
  duration: 0.8,
  ease: "power1.inOut",
});


/* ============================================================
   4. HERO SCROLL-PIN ANIMATION (original -- untouched)
   ============================================================ */

var tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".container",
    scrub: 2,
    pin: true,
    start: "top top",
    end: "+=2000",
    ease: "none",
  },
});

tl.set(".hero-main-container", { scale: 1.25 });
tl.to(".hero-main-container", { scale: 1, duration: 1 });
tl.to(".hero-main-logo", { opacity: 0, duration: 0.5 }, "<");
tl.to(".hero-main-image", { opacity: 0, duration: 0.9 }, "<+=0.5");
tl.to(".hero-main-container", { backgroundSize: "70vh", duration: 1.5 }, "<+=0.2");

tl.fromTo(
  ".hero-text",
  { backgroundImage: "radial-gradient(circle at 50% 200vh, rgba(255, 214, 135, 0) 0, rgba(157, 47, 106, 0.5) 90vh, rgba(157, 47, 106, 0.8) 120vh, rgba(32, 31, 66, 0) 150vh)" },
  { backgroundImage: "radial-gradient(circle at 50% 3.9575vh, rgb(255, 213, 133) 0vh, rgb(247, 77, 82) 50.011vh, rgb(145, 42, 105) 90.0183vh, rgba(32, 31, 66, 0) 140.599vh)", duration: 3 },
  "<1.2"
);

tl.fromTo(
  ".hero-text-logo",
  { opacity: 0, maskImage: "radial-gradient(circle at 50% 145.835%, rgb(0, 0, 0) 36.11%, rgba(0, 0, 0, 0) 68.055%)" },
  { opacity: 1, maskImage: "radial-gradient(circle at 50% 105.594%, rgb(0, 0, 0) 62.9372%, rgba(0, 0, 0, 0) 81.4686%)", duration: 3 },
  "<0.2"
);

tl.set(".hero-main-container", { opacity: 0 });
tl.to(".hero-1-container", { scale: 0.85, duration: 3 }, "<-=3");
tl.set(".hero-1-container", { maskImage: "radial-gradient(circle at 50% 16.1137vh, rgb(0, 0, 0) 96.1949vh, rgba(0, 0, 0, 0) 112.065vh)" }, "<+=2.1");
tl.to(".hero-1-container", { maskImage: "radial-gradient(circle at 50% -40vh, rgb(0, 0, 0) 0vh, rgba(0, 0, 0, 0) 80vh)", duration: 2 }, "<+=0.2");
tl.to(".hero-text-logo", { opacity: 0, duration: 2 }, "<1.5");
tl.set(".hero-1-container", { opacity: 0 });



