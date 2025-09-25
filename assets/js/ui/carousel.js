// Simple horizontal carousel with optional continuous scrolling
export function initCarousel(container, options = {}) {
  const el = typeof container === 'string' ? document.querySelector(container) : container;
  if (!el) return;

  const continuous = options.continuous ?? true; // default to continuous for smoother experience
  const speed = Math.max(5, options.speed ?? 30); // px per second (slow, consistent)

  // Ensure there is enough content for seamless looping by duplicating once if needed
  function ensureLoopContent() {
    if (el.dataset.loopReady) return;
    const initialWidth = el.scrollWidth;
    // Duplicate children once to enable seamless wrap
    if (initialWidth <= el.clientWidth * 1.5) {
      el.innerHTML += el.innerHTML;
    }
    el.dataset.loopReady = '1';
  }

  // Continuous linear scroll using requestAnimationFrame over scrollLeft
  if (continuous) {
    ensureLoopContent();
    let rafId;
    let last = performance.now();

    function stepFrame(now) {
      const dt = Math.min(64, now - last); // clamp delta time to avoid jumps
      last = now;
      const dx = (speed * dt) / 1000; // pixels to move this frame
      const maxScroll = el.scrollWidth - el.clientWidth;

      if (el.scrollLeft >= maxScroll - 1) {
        el.scrollLeft = 0;
      } else {
        el.scrollLeft += dx;
      }
      rafId = requestAnimationFrame(stepFrame);
    }

    rafId = requestAnimationFrame(stepFrame);

    function next() {}
    function prev() {}
    function destroy() { if (rafId) cancelAnimationFrame(rafId); }
    return { next, prev, destroy };
  }

  // Fallback: stepped auto-advance
  let auto = options.auto ?? 5000;
  function next() { el.scrollBy({ left: el.clientWidth * 0.8, behavior: 'smooth' }); }
  function prev() { el.scrollBy({ left: -el.clientWidth * 0.8, behavior: 'smooth' }); }
  let timer;
  if (auto) {
    timer = setInterval(next, auto);
  }
  return { next, prev, stop: () => clearInterval(timer) };
}

// Smooth marquee using transform on a track element for maximum smoothness
export function initMarquee(container, options = {}) {
  const el = typeof container === 'string' ? document.querySelector(container) : container;
  if (!el) return;
  const speed = Math.max(5, options.speed ?? 24); // px per second

  // Ensure a track exists and duplicate children for seamless loop
  let track = el.querySelector('.carousel-track');
  if (!track) {
    const t = document.createElement('div');
    t.className = 'carousel-track';
    while (el.firstChild) t.appendChild(el.firstChild);
    el.appendChild(t);
    track = t;
  }

  // If not already duplicated, duplicate once
  if (!track.dataset.duplicated) {
    track.innerHTML += track.innerHTML;
    track.dataset.duplicated = '1';
  }

  // Animation state
  let x = 0;
  let rafId;
  let last = performance.now();

  function widthOfHalf() {
    return track.scrollWidth / 2; // relies on exact duplicate
  }

  function frame(now) {
    const dt = Math.min(64, now - last);
    last = now;
    const dx = (speed * dt) / 1000;
    x -= dx; // move left
    const half = widthOfHalf();
    if (half > 0 && -x >= half) {
      x += half; // wrap seamlessly by shifting by one set width
    }
    track.style.transform = `translateX(${x}px)`;
    rafId = requestAnimationFrame(frame);
  }

  // Start
  track.style.willChange = 'transform';
  rafId = requestAnimationFrame(frame);

  return {
    destroy() { if (rafId) cancelAnimationFrame(rafId); },
    setSpeed(v) { /* optional setter */ },
  };
}