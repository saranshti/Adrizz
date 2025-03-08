// script.js
gsap.registerPlugin(ScrollTrigger);

// Select all pages
const pages = document.querySelectorAll(".page");

// Create animation for each page
pages.forEach((page) => {
  const moon = page.querySelector(".moon");
  const text = page.querySelector(".text");
  const footer = page.querySelector(".footer");
  const extras = page.querySelectorAll(".extra");

  // Create timeline
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: page,
      start: "top center", // Start when page top hits center of viewport
      end: "bottom center", // End when page bottom hits center
      toggleActions: "play reverse play reverse", // Play forward, reverse back
    },
  });

  // Add animations
  tl.from(moon, {
    y: "100vh",
    duration: 1.5,
    ease: "power2.out",
  })
    .from(
      text,
      {
        y: "100vh",
        duration: 2,
        ease: "power2.out",
      },
      "-=1.2"
    )
    .from(
      footer,
      {
        y: "100vh",
        duration: 2.5,
        ease: "power2.out",
      },
      "-=1.8"
    )
    .from(
      extras,
      {
        y: "100vh",
        duration: 1.8,
        stagger: 0.2, // Stagger extra elements
        ease: "power2.out",
      },
      "-=2"
    );
});
