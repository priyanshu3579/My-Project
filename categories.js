
// Nav bar
function startNavbarAnimation() {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    tl.from(".navbar", { duration: 1, y: -100, opacity: 0 })
      .from(".logo img", { duration: 1, rotation: 360 })
      .from(".logo span", { duration: 0.5, opacity: 0, x: -20 }, "-=0.5")
      .from(".nav-links li", { duration: 0.4, opacity: 0, y: -20, stagger: 0.2 }, "-=0.3")
      .from(".search-container", { duration: 0.5, opacity: 0, x: 20 })
      .from(".slider-container", { duration: 1, opacity: 0, y: 50 });
}

// ===== Call navbar animation on page load =====
document.addEventListener("DOMContentLoaded", () => {
    startNavbarAnimation();
});

document.addEventListener("DOMContentLoaded", () => {
  const exploreBtn = document.querySelector(".explore-btn");
  const hero = document.querySelector(".hero");
  const mainContent = document.querySelector(".main-content");

  if (exploreBtn && hero && mainContent) {
    exploreBtn.addEventListener("click", () => {
      gsap.to(hero, { 
        duration: 1, 
        opacity: 0, 
        y: -100, 
        ease: "power2.inOut",
        onComplete: () => {
          hero.style.display = "none";
          mainContent.style.display = "block";
          gsap.fromTo(mainContent, 
            { opacity: 0, y: 100 }, 
            { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
          );
        }
      });
    });
  }
});


document.addEventListener("DOMContentLoaded", () => {
  const card = document.querySelector(".destination-card-horizontal");
  if(card){
    const dir = card.dataset.direction;
    const xStart = dir === "left" ? -100 : 100;

    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none none"
      },
      opacity: 0,
      x: xStart,
      duration: 1,
      ease: "power2.out"
    });
  }
});


// ========== DESTINATION CARD + ITINERARY TOGGLE ==========
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".destination-card-horizontal");
  const itineraries = document.querySelectorAll(".itinerary-box");

  // Default hide sabhi itineraries
  itineraries.forEach(itinerary => {
    itinerary.style.display = "none";
  });

  cards.forEach((card, index) => {
    const exploreBtn = card.querySelector(".explore-btn");
    const itinerary = itineraries[index];
    const backBtn = itinerary.querySelector(".back-btn");

    if (exploreBtn && itinerary && backBtn) {
      // Explore button click
      exploreBtn.addEventListener("click", () => {
        // Sabhi cards hide karo except clicked one
        cards.forEach((c, i) => {
          if (i !== index) {
            gsap.to(c, { 
              duration: 0.5, 
              opacity: 0, 
              y: 50, 
              onComplete: () => (c.style.visibility = "hidden") // ✅ display:none ki jagah
            });
          }
        });

        // Show selected itinerary under this card
        itinerary.style.display = "block";  
        gsap.fromTo(itinerary,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        );
      });

      // Back button click
      backBtn.addEventListener("click", () => {
        // Hide itinerary
        gsap.to(itinerary, {
          duration: 0.5,
          opacity: 0,
          y: 50,
          onComplete: () => {
            itinerary.style.display = "none";

            // Wapas sabhi cards show karo
            cards.forEach(c => {
              c.style.visibility = "visible";   // ✅ ab properly wapas dikhega
              gsap.fromTo(c,
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
              );
            });
          }
        });
      });
    }
  });
});





