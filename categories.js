
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

// ===== Hero Section Explore Button =====
document.addEventListener("DOMContentLoaded", () => {
  const exploreBtn = document.querySelector(".hero .explore-btn");
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

// ===== Destination Card Scroll Animation =====
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".destination-card-horizontal");
  cards.forEach(card => {
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
  });
});

// ===== Destination Card + Itinerary Toggle + WhatsApp Query =====
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".destination-card-horizontal");
  const itineraries = document.querySelectorAll(".itinerary-box");

  // Sabhi itineraries ko default hide
  itineraries.forEach(itinerary => {
    itinerary.style.display = "none";
  });

  cards.forEach((card, index) => {
    const exploreBtn = card.querySelector(".explore-btn");
    const itinerary = itineraries[index];
    if (!itinerary) return; // safety

    const backBtn = itinerary.querySelector(".back-btn");
    const queryBtn = itinerary.querySelector(".query-btn");

    if (exploreBtn && backBtn && queryBtn) {
      // ==== Explore button click ====
      exploreBtn.addEventListener("click", () => {
        // Sab cards hide
        cards.forEach((c, i) => {
          if (i !== index) {
            gsap.to(c, { 
              duration: 0.5, 
              opacity: 0, 
              y: 50, 
              onComplete: () => (c.style.display = "none")
            });
          }
        });

        // Show selected itinerary
        itinerary.style.display = "block";  
        gsap.fromTo(itinerary,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        );
      });

      // ==== Back button click ====
      backBtn.addEventListener("click", () => {
        gsap.to(itinerary, {
          duration: 0.5,
          opacity: 0,
          y: 50,
          onComplete: () => {
            itinerary.style.display = "none";

            // Wapas sabhi cards show
            cards.forEach(c => {
              c.style.display = "flex";
              gsap.fromTo(c,
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
              );
            });
          }
        });
      });

      // ==== Query button click ====
      queryBtn.addEventListener("click", () => {
        const phoneNumber = "919953666689"; // apna WhatsApp number
        const packageTitle = document.querySelector(".itinerary-box h3").innerText;
          const destinationName = document.querySelector(".destination-card-horizontal h2")?.innerText || "";

          
const whatsappMsg = `Hello! I'm interested in ${packageTitle} package (${destinationName}). Please share more details and pricing.`;
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMsg)}`;
    
    window.open(whatsappURL, "_blank"); 
      });
    } 
  });
});

// ===== Contact Form WhatsApp Redirect =====
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    const phoneNumber = "919953666689"; 
    const whatsappURL = `https://wa.me/${phoneNumber}?text=Name:%20${encodeURIComponent(name)}%0AEmail:%20${encodeURIComponent(email)}%0AMessage:%20${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");
  });
});
