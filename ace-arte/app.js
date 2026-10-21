/**
 * ACE ARTE — Luxury Real Estate Digital Showroom
 * Marketed by REALTY VAULT
 * Client-side Controller, 3D Engine, Smooth Parallax & Lead Dispatcher
 */

// ==========================================
// CONFIGURATION CONSTANTS
// ==========================================
const GOOGLE_FORM_URL = "https://forms.gle/WHGHjZ3Ywu14fa35A";
const WHATSAPP_NUMBER = "+91 98188 79699";
const BROCHURE_URL = "ADD_BROCHURE_URL_HERE"; 
const WEBHOOK_URL = "ADD_WEBHOOK_HERE"; // Zapier / Make / CRM Webhook
const COMPANY_PHONE = "+91 98188 79699";
const COMPANY_EMAIL = "enquiries@realtyvault.in";
const LEAD_EMAIL = "rahul156rajput@gmail.com";

// ==========================================
// UTM & URL PARAMETER TRACKER
// ==========================================
function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get("utm_source") || "direct",
    utm_medium: params.get("utm_medium") || "organic",
    utm_campaign: params.get("utm_campaign") || "ace-arte-preview",
    utm_term: params.get("utm_term") || "",
    utm_content: params.get("utm_content") || "",
    referrer: document.referrer || "direct"
  };
}

const utmContext = getQueryParams();

// ==========================================
// ANALYTICS TRACKING ENGINE
// ==========================================
function trackEvent(eventName, eventData = {}) {
  const payload = {
    event: eventName,
    timestamp: new Date().toISOString(),
    project: "ACE ARTE",
    promoter: "Realty Vault",
    ...utmContext,
    ...eventData
  };

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, payload);
  }
  if (typeof window.fbq === "function") {
    if (eventName === "form_submit") {
      window.fbq("track", "Lead", payload);
    } else {
      window.fbq("trackCustom", eventName, payload);
    }
  }

  console.log(`[Realty Vault Analytics] ${eventName}:`, payload);
}

// Track initial page view
trackEvent("page_view", { section: "landing" });

// ==========================================
// WHATSAPP TRIGGER
// ==========================================
function triggerWhatsApp(customText = "") {
  trackEvent("whatsapp_click", { action: "open_whatsapp" });

  const defaultMsg = "Hi Realty Vault, I’m interested in ACE ARTE, Sector 150 Noida. Please share the latest price, availability and project details.";
  const message = encodeURIComponent(customText || defaultMsg);
  window.open(`https://wa.me/919818879699?text=${message}`, "_blank");
}

// ==========================================
// MODAL CONTROLLER
// ==========================================
const ModalController = {
  open: function(modalId, configData = {}) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    
    modal.classList.add("open");
    document.body.style.overflow = "hidden";

    if (configData.config && document.getElementById("residenceModalConfig")) {
      document.getElementById("residenceModalConfig").value = configData.config;
    }
    if (configData.title && document.getElementById("residenceModalTitle")) {
      document.getElementById("residenceModalTitle").innerText = configData.title;
    }

    trackEvent("modal_open", { modal: modalId, ...configData });
  },

  close: function(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }
};

// ==========================================
// LEAD ENGINE & DISPATCHER
// ==========================================
async function submitLead(leadData, formElement = null) {
  const fullLead = {
    id: "rv_lead_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
    submitted_at: new Date().toISOString(),
    project: "ACE ARTE",
    promoter: "Realty Vault",
    landing_page: window.location.href,
    ...utmContext,
    ...leadData
  };

  trackEvent("form_submit", fullLead);

  // Local storage persistence fallback
  try {
    const existing = JSON.parse(localStorage.getItem("rv_ace_arte_leads") || "[]");
    existing.push(fullLead);
    localStorage.setItem("rv_ace_arte_leads", JSON.stringify(existing));
  } catch (e) {
    console.warn("Local storage write error", e);
  }

  // Dispatch lead to rahul156rajput@gmail.com via FormSubmit AJAX endpoint
  try {
    fetch(`https://formsubmit.co/ajax/${LEAD_EMAIL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        _subject: `New Lead: ACE ARTE — ${leadData.name || 'Client'} (${leadData.phone || 'No phone'})`,
        _template: "table",
        _captcha: "false",
        "Client Name": leadData.name || "N/A",
        "Mobile Number": leadData.phone || "N/A",
        "Email Address": leadData.email || "N/A",
        "Configuration": leadData.configuration || "N/A",
        "Budget Range": leadData.budget || "N/A",
        "Preferred Call Time": leadData.preferred_time || "N/A",
        "Contact Preference": leadData.contact_preference || "N/A",
        "Form Source": leadData.source_form || "Website Enquiry",
        "Project": "ACE ARTE, Sector 150 Noida",
        "Submitted At": new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
        "UTM Source": utmContext.utm_source || "direct",
        "UTM Medium": utmContext.utm_medium || "organic",
        "UTM Campaign": utmContext.utm_campaign || "ace-arte-preview"
      })
    })
    .then(r => r.json())
    .then(data => console.log("[Realty Vault] Lead successfully emailed to rahul156rajput@gmail.com", data))
    .catch(err => console.warn("[Realty Vault] Email dispatch warning:", err));
  } catch (err) {
    console.warn("Email dispatch error:", err);
  }

  // Webhook submission (if CRM configured)
  if (WEBHOOK_URL && WEBHOOK_URL !== "ADD_WEBHOOK_HERE") {
    try {
      fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fullLead),
        mode: "no-cors"
      });
    } catch (err) {
      console.warn("Webhook dispatch fallback:", err);
    }
  }

  // Visual success feedback
  if (formElement) {
    formElement.innerHTML = `
      <div class="p-8 text-center bg-white/80 border border-[#C9A96A]/40 rounded-sm">
        <div class="w-12 h-12 rounded-full bg-[#C9A96A]/15 text-[#C9A96A] mx-auto flex items-center justify-center mb-4">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <h4 class="font-serif text-2xl text-[#3A3229] font-bold mb-2">Thank You, ${leadData.name || 'Valued Guest'}</h4>
        <p class="text-sm text-[#3A3229]/75 mb-6 max-w-sm mx-auto leading-relaxed">
          Your presentation request for ACE ARTE has been prioritized. A dedicated Realty Vault luxury property advisor will contact you shortly.
        </p>
        <div class="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <button type="button" onclick="triggerWhatsApp('Hi Realty Vault, I just requested details for ACE ARTE on the website.')" class="btn-champagne text-xs py-3 px-6">
            CONNECT ON WHATSAPP NOW
          </button>
          <a href="${GOOGLE_FORM_URL}" target="_blank" rel="noopener noreferrer" class="btn-outline-warm text-xs py-3 px-6">
            VIEW OFFICIAL GOOGLE FORM
          </a>
        </div>
      </div>
    `;
  }
}

// ==========================================
// SCROLL PROGRESS & STICKY HEADER
// ==========================================
function initScrollEngine() {
  const progressBar = document.getElementById("scrollProgressBar");
  const mainNav = document.getElementById("mainNav");
  const heroImage = document.querySelector(".hero-bg-media");
  const heroSection = document.getElementById("hero");
  const scrollTracks = document.querySelectorAll(".scroll-track-item");
  const sections = document.querySelectorAll("section[id]");

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    // 1. Top progress bar
    if (progressBar) {
      progressBar.style.width = scrollPercent + "%";
    }

    // 2. Translucent Nav Glass on scroll
    if (mainNav) {
      if (scrollTop > 80) {
        mainNav.classList.add("scrolled");
      } else {
        mainNav.classList.remove("scrolled");
      }
    }

    // 3. Cinematic Hero Camera Parallax (Static and unchanged)
    // Image remains 100% crisp without distortion
  }, { passive: true });
}

// ==========================================
// SCROLL REVEAL & NUMERICAL COUNTERS
// ==========================================
function initScrollReveals() {
  const reveals = document.querySelectorAll(".reveal");
  const counters = document.querySelectorAll(".counter-number");

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(el => revealObserver.observe(el));

  // Numerical Counter Animation
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const targetValue = parseFloat(el.getAttribute("data-target"));
        const suffix = el.getAttribute("data-suffix") || "";
        const prefix = el.getAttribute("data-prefix") || "";
        const isFloat = el.getAttribute("data-target").includes(".");
        const duration = 1600;
        const startTime = performance.now();

        function updateCounter(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease-out cubic
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const current = (easeOut * targetValue);

          el.innerText = prefix + (isFloat ? current.toFixed(1) : Math.floor(current).toLocaleString()) + suffix;

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            el.innerText = prefix + (isFloat ? targetValue.toFixed(1) : targetValue.toLocaleString()) + suffix;
          }
        }

        requestAnimationFrame(updateCounter);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.35 });

  counters.forEach(el => counterObserver.observe(el));
}

// ==========================================
// 3D RESIDENCE CARD TILT EFFECT (Desktop)
// Max tilt 3-5 degrees, smooth perspective
// ==========================================
function init3DCardTilt() {
  const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  if (isReducedMotion || isTouchDevice) return;

  const cards = document.querySelectorAll(".residence-3d-wrap");

  cards.forEach(wrap => {
    const card = wrap.querySelector(".residence-card");
    if (!card) return;

    wrap.addEventListener("mousemove", (e) => {
      const rect = wrap.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Restrict max rotation to 3.5 degrees
      const rotateX = ((y - centerY) / centerY) * -3.5;
      const rotateY = ((x - centerX) / centerX) * 3.5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(8px)`;
    });

    wrap.addEventListener("mouseleave", () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)`;
      card.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)";
    });

    wrap.addEventListener("mouseenter", () => {
      card.style.transition = "transform 0.1s ease-out";
    });
  });
}

// ==========================================
// SUBTLE LIGHT/PARTICLE CANVAS (Hero Section)
// Light & non-intrusive dust/light glints
// ==========================================
function initParticleCanvas() {
  const canvas = document.getElementById("particleCanvas");
  if (!canvas) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const ctx = canvas.getContext("2d");
  let width, height;
  let particles = [];
  const PARTICLE_COUNT = 24; // Very minimal to ensure high performance

  function resize() {
    width = canvas.width = canvas.parentElement.clientWidth;
    height = canvas.height = canvas.parentElement.clientHeight;
  }

  function createParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.4 + 0.1,
        speedY: -(Math.random() * 0.3 + 0.1),
        speedX: (Math.random() - 0.5) * 0.15
      });
    }
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.y += p.speedY;
      p.x += p.speedX;

      if (p.y < 0) {
        p.y = height;
        p.x = Math.random() * width;
      }
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(201, 169, 106, ${p.alpha})`;
      ctx.fill();
    });

    requestAnimationFrame(render);
  }

  window.addEventListener("resize", resize);
  resize();
  createParticles();
  render();
}

// ==========================================
// LUXURY CUSTOM CURSOR
// ==========================================
function initCustomCursor() {
  const cursorDot = document.getElementById("cursorDot");
  const cursorRing = document.getElementById("cursorRing");

  if (!cursorDot || !cursorRing) return;
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.opacity = "1";
    cursorRing.style.opacity = "1";
    cursorDot.style.left = mouseX + "px";
    cursorDot.style.top = mouseY + "px";
  });

  function renderCursorRing() {
    ringX += (mouseX - ringX) * 0.2;
    ringY += (mouseY - ringY) * 0.2;
    cursorRing.style.left = ringX + "px";
    cursorRing.style.top = ringY + "px";
    requestAnimationFrame(renderCursorRing);
  }
  renderCursorRing();

  // Hover state on interactive elements
  const interactiveElements = document.querySelectorAll("a, button, input, select, textarea, .residence-3d-wrap, .accordion-header");
  interactiveElements.forEach(el => {
    el.addEventListener("mouseenter", () => cursorRing.classList.add("active"));
    el.addEventListener("mouseleave", () => cursorRing.classList.remove("active"));
  });
}

// ==========================================
// MATERIAL TABS SWITCHER
// ==========================================
function initMaterialTabs() {
  const tabs = document.querySelectorAll(".material-tab-btn");
  const panels = document.querySelectorAll(".material-panel");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const targetMaterial = tab.getAttribute("data-material");

      tabs.forEach(t => t.classList.remove("active"));
      panels.forEach(p => p.classList.remove("active"));

      tab.classList.add("active");
      const activePanel = document.getElementById(`material-${targetMaterial}`);
      if (activePanel) {
        activePanel.classList.add("active");
      }
    });
  });
}

// ==========================================
// FAQ ACCORDION
// ==========================================
function initAccordion() {
  const accordions = document.querySelectorAll(".accordion-header");

  accordions.forEach(header => {
    header.addEventListener("click", () => {
      const content = header.nextElementSibling;
      const isOpen = content.classList.contains("open");
      const icon = header.querySelector(".accordion-icon");

      // Close all others
      document.querySelectorAll(".accordion-content").forEach(c => {
        c.classList.remove("open");
        c.style.maxHeight = null;
      });
      document.querySelectorAll(".accordion-icon").forEach(i => {
        i.style.transform = "rotate(0deg)";
      });

      if (!isOpen) {
        content.classList.add("open");
        content.style.maxHeight = content.scrollHeight + "px";
        if (icon) icon.style.transform = "rotate(180deg)";
      }
    });
  });
}

// ==========================================
// FORM ATTACHMENT HANDLERS
// ==========================================
function initForms() {
  // 1. Main Lead Generation Form
  const leadForm = document.getElementById("mainLeadForm");
  if (leadForm) {
    leadForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(leadForm);
      submitLead({
        name: formData.get("name"),
        phone: formData.get("phone"),
        email: formData.get("email"),
        configuration: formData.get("configuration"),
        budget: formData.get("budget"),
        contact_preference: formData.get("preference"),
        source_form: "main_lead_presentation"
      }, leadForm);
    });
  }

  // 2. Callback Modal Form
  const callbackForm = document.getElementById("callbackForm");
  if (callbackForm) {
    callbackForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(callbackForm);
      submitLead({
        name: formData.get("cb_name"),
        phone: formData.get("cb_phone"),
        configuration: formData.get("cb_config"),
        preferred_time: formData.get("cb_time"),
        source_form: "callback_modal"
      }, callbackForm);
    });
  }

  // 3. Brochure Modal Form
  const brochureForm = document.getElementById("brochureForm");
  if (brochureForm) {
    brochureForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(brochureForm);
      submitLead({
        name: formData.get("b_name"),
        phone: formData.get("b_phone"),
        email: formData.get("b_email"),
        source_form: "brochure_modal"
      }, brochureForm);
    });
  }

  // 4. Residence Enquiry Modal Form
  const resModalForm = document.getElementById("residenceModalForm");
  if (resModalForm) {
    resModalForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(resModalForm);
      submitLead({
        name: formData.get("rq_name"),
        phone: formData.get("rq_phone"),
        configuration: formData.get("rq_config"),
        source_form: "residence_detail_modal"
      }, resModalForm);
    });
  }
}

// ==========================================
// DOCUMENT INITIALIZATION
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("hero-loaded");
  initScrollEngine();
  initScrollReveals();
  init3DCardTilt();
  initParticleCanvas();
  initCustomCursor();
  initMaterialTabs();
  initAccordion();
  initForms();
});
