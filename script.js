// ===== Debounce Function =====
function debounce(func, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

// ===== Hamburger toggle =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const searchContainer = document.querySelector('.search-container');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    searchContainer.classList.toggle('active');
});

// ===== Slider =====
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const dotsContainer = document.querySelector('.dots-container');
let currentIndex = 0;
const totalSlides = slides.length;

// Create dots dynamically
slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
        currentIndex = i;
        showSlide(currentIndex);
    });
    dotsContainer.appendChild(dot);
});

// Show slide function
function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) slide.classList.add('active');
    });
    const dots = document.querySelectorAll('.dot');
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
}

// Navigation buttons
prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    showSlide(currentIndex);
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalSlides;
    showSlide(currentIndex);
});

// Automatic slide change
setInterval(() => {
    currentIndex = (currentIndex + 1) % totalSlides;
    showSlide(currentIndex);
}, 3000); // Slider speed 3s

showSlide(currentIndex);

// ===== ScrollTrigger helper function =====
const animateOnScroll = (selector, trigger, yOffset = 50, duration = 0.8) => {
    gsap.utils.toArray(selector).forEach(el => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: trigger,
                start: "top 90%",
                toggleActions: "play none none none"
            },
            y: yOffset,
            opacity: 0,
            duration: duration,
            ease: "power1.out"
        });
    });
};

// ===== Scroll animations =====
animateOnScroll(".tour-packages h2", ".tour-packages");
animateOnScroll(".package-card", ".package-card");
animateOnScroll(".categories h2", ".categories h2");
animateOnScroll(".category-card", ".category-card");
animateOnScroll(".why-choose h2", ".why-choose h2");
animateOnScroll(".why-card", ".why-card");
animateOnScroll("footer .footer-section", "footer .footer-section");

// ===== Scroll to Top Button =====
const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
    scrollTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
});

scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// ===== GSAP Navbar + Slider Animation =====
function startNavbarAnimation() {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    tl.from(".navbar", { duration: 0.5, y: -100, opacity: 0 })
      .from(".logo img", { duration: 0.8, rotation: 360 })
      .from(".logo span", { duration: 0.5, opacity: 0, x: -20 }, "-=0.5")
      .from(".nav-links li", { duration: 0.4, opacity: 0, y: -20, stagger: 0.1 }, "-=0.3")
      .from(".search-container", { duration: 0.5, opacity: 0, x: 20 })
      .from(".slider-container", { duration: 0.8, opacity: 0, y: 50 });
}

// ===== Call navbar animation on page load =====
document.addEventListener("DOMContentLoaded", () => {
    startNavbarAnimation();
});

// Detect current page
const currentPage = window.location.pathname.split("/").pop();

// ===== INDEX.HTML LOGIC =====
if (currentPage === "index.html" || currentPage === "") {
    // Category card click -> store category
    document.querySelectorAll(".category-card button").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const categoryName = e.target.previousElementSibling.textContent;
            localStorage.setItem("selectedCategory", categoryName);
            window.location.href = "categories.html";
        });
    });
}

// ===== CATEGORIES.HTML LOGIC =====
if (currentPage === "categories.html") {
    const places = [
        { name: "Andaman Islands", category: "Adventure", img: "Image/neil island ( andaman).jpg", desc: "Discover pristine beaches and water sports." },
        { name: "Goa", category: "Beaches", img: "Image/goa.jpg", desc: "Relax on golden beaches and enjoy nightlife." },
        { name: "Manali", category: "Adventure", img: "Image/manali.jpg", desc: "Himalayan adventure and trekking." },
        { name: "Kerala", category: "Nature", img: "Image/kerala.webp", desc: "Backwaters, tea gardens, and culture." },
        { name: "Wildlife Sanctuary", category: "Wildlife", img: "Image/wildlife.jpg", desc: "Explore diverse flora and fauna." },
    ];

    const category = localStorage.getItem("selectedCategory") || "Adventure";
    document.getElementById("category-title").textContent = category;
    const container = document.getElementById("destinations-container");

    const filteredPlaces = places.filter(place => place.category === category);
    filteredPlaces.forEach(place => {
        const card = document.createElement("div");
        card.classList.add("package-card");
        card.innerHTML = `
            <img src="${place.img}" alt="${place.name}">
            <h3>${place.name}</h3>
            <p>${place.desc}</p>
            <button>Explore</button>
        `;
        container.appendChild(card);
    });
}

document.getElementById("searchToggle").addEventListener("click", function () {
  const input = document.getElementById("searchInput");
  input.classList.toggle("active");
  if (input.classList.contains("active")) {
    input.focus();
  }
});
