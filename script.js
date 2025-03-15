// // script.js
// gsap.registerPlugin(ScrollTrigger);

// // Select all pages
// const pages = document.querySelectorAll(".page");

// // Create animation for each page
// pages.forEach((page) => {
//   const moon = page.querySelector(".moon");
//   const text = page.querySelector(".text");
//   const footer = page.querySelector(".footer");
//   const extras = page.querySelectorAll(".extra");

//   // Create timeline
//   const tl = gsap.timeline({
//     scrollTrigger: {
//       trigger: page,
//       start: "top center", // Start when page top hits center of viewport
//       end: "bottom center", // End when page bottom hits center
//       toggleActions: "play reverse play reverse", // Play forward, reverse back
//     },
//   });

//   // Add animations
//   tl.from(moon, {
//     y: "100vh",
//     duration: 1.5,
//     ease: "power2.out",
//   })
//     .from(
//       text,
//       {
//         y: "100vh",
//         duration: 2,
//         ease: "power2.out",
//       },
//       "-=1.2"
//     )
//     .from(
//       footer,
//       {
//         y: "100vh",
//         duration: 2.5,
//         ease: "power2.out",
//       },
//       "-=1.8"
//     )
//     .from(
//       extras,
//       {
//         y: "100vh",
//         duration: 1.8,
//         stagger: 0.2, // Stagger extra elements
//         ease: "power2.out",
//       },
//       "-=2"
//     );
// });

gsap.registerPlugin(ScrollTrigger);

// Select all pages and container
const pages = document.querySelectorAll(".page");
const container = document.querySelector(".page-container");
let currentPage = 0;
const totalPages = pages.length;
let isAnimating = false;

// Create individual element animations
function createElementAnimations(page) {
  const moon = page.querySelector(".moon");
  const text = page.querySelector(".text");
  const footer = page.querySelector(".Myfooter");
  const extras = page.querySelectorAll(".extra");

  const tl = gsap.timeline({ paused: true });

  if (moon) {
    tl.from(moon, { y: "100vh", duration: 1.5, ease: "power2.out" });
  }
  if (text) {
    tl.from(text, { y: "100vh", duration: 2, ease: "power2.out" }, "-=1.2");
  }
  if (footer) {
    tl.from(footer, { y: "100vh", duration: 2.5, ease: "power2.out" }, "-=1.8");
  }
  if (extras.length) {
    tl.from(
      extras,
      {
        y: "100vh",
        duration: 1.8,
        stagger: 0.2,
        ease: "power2.out",
      },
      "-=2"
    );
  }

  return tl;
}

// Initialize animations for each page
const pageAnimations = Array.from(pages).map((page) =>
  createElementAnimations(page)
);

// Function to go to specific page
function goToPage(newPage) {
  if (
    isAnimating ||
    newPage < 0 ||
    newPage >= totalPages ||
    newPage === currentPage
  )
    return;

  isAnimating = true;

  const current = pages[currentPage];
  const next = pages[newPage];

  // Animate out current page
  gsap.to(current, {
    y: newPage > currentPage ? "-100vh" : "100vh",
    duration: 0.8,
    ease: "power2.inOut",
    onComplete: () => {
      pageAnimations[currentPage].reverse();
    },
  });

  // Animate in next page
  gsap.fromTo(
    next,
    { y: newPage > currentPage ? "100vh" : "-100vh" },
    {
      y: "0vh",
      duration: 0.8,
      ease: "power2.inOut",
      onStart: () => {
        pageAnimations[newPage].play();
      },
      onComplete: () => {
        currentPage = newPage;
        isAnimating = false;
      },
    }
  );
}

// Handle wheel events
container.addEventListener("wheel", (e) => {
  e.preventDefault();
  if (isAnimating) return;

  if (e.deltaY > 0) {
    goToPage(currentPage + 1); // Scroll down
  } else if (e.deltaY < 0) {
    goToPage(currentPage - 1); // Scroll up
  }
});

// Handle touch events for mobile
let touchStartY = 0;
container.addEventListener("touchstart", (e) => {
  touchStartY = e.touches[0].clientY;
});

container.addEventListener("touchmove", (e) => {
  e.preventDefault();
  if (isAnimating) return;

  const touchEndY = e.touches[0].clientY;
  const diff = touchStartY - touchEndY;

  if (Math.abs(diff) > 50) {
    // Threshold for swipe
    if (diff > 0) {
      goToPage(currentPage + 1); // Swipe up
    } else {
      goToPage(currentPage - 1); // Swipe down
    }
  }
});

// Play first page animation on load
pageAnimations[0].play();
