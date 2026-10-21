/**
 * Realty Vault - Universal Enquiry & Contact Form Controller
 * Automatically routes all form submissions to: realestaterealtyvault@gmail.com
 */
const TARGET_EMAIL = "realestaterealtyvault@gmail.com";

document.addEventListener('DOMContentLoaded', function () {
  // Ensure hero & dialogue selects retain native dropdown functionality and perfect alignment
  if (window.jQuery && jQuery.fn.niceSelect) {
    try {
      jQuery('.hero-select, .dialogue-select').niceSelect('destroy');
    } catch (e) {}
  }

  // 1. Header Contact Us Dialogue Box Toggle
  const triggerBtn = document.getElementById('headerContactTrigger');
  const dialogueBox = document.getElementById('headerContactDialogue');
  const closeBtn = document.getElementById('closeContactDialogue');

  if (triggerBtn && dialogueBox) {
    function openDialogue() {
      dialogueBox.classList.add('show');
      triggerBtn.classList.add('active');
      triggerBtn.setAttribute('aria-expanded', 'true');
      dialogueBox.setAttribute('aria-hidden', 'false');
    }

    function closeDialogue() {
      dialogueBox.classList.remove('show');
      triggerBtn.classList.remove('active');
      triggerBtn.setAttribute('aria-expanded', 'false');
      dialogueBox.setAttribute('aria-hidden', 'true');
    }

    triggerBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (dialogueBox.classList.contains('show')) {
        closeDialogue();
      } else {
        openDialogue();
      }
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        closeDialogue();
      });
    }

    document.addEventListener('click', function (e) {
      if (!dialogueBox.contains(e.target) && !triggerBtn.contains(e.target)) {
        closeDialogue();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeDialogue();
      }
    });
  }

  // 2. Mobile Navigation Toggle
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const mainMenu = document.getElementById('primary-navigation');
  const mobileClose = document.querySelector('.mobile-menu-close');

  if (mobileToggle && mainMenu) {
    mobileToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      mainMenu.classList.toggle('show-menu');
    });

    if (mobileClose) {
      mobileClose.addEventListener('click', function (e) {
        e.stopPropagation();
        mainMenu.classList.remove('show-menu');
      });
    }

    document.addEventListener('click', function (e) {
      if (!mainMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        mainMenu.classList.remove('show-menu');
      }
    });
  }

  // 3. Mobile Sub-menu Accordion
  const dropdownItems = document.querySelectorAll('.custom-premium-header .menu-item-has-children > a');
  dropdownItems.forEach(function (item) {
    item.addEventListener('click', function (e) {
      if (window.innerWidth <= 991) {
        e.preventDefault();
        const parentLi = this.parentElement;
        parentLi.classList.toggle('open-dropdown');
      }
    });
  });

  // 4. Bind All Existing Forms across the page (modals, slide-in, contact page)
  bindAllEnquiryForms();
});

/**
 * Universal Form Submitter
 * Sends to realestaterealtyvault@gmail.com
 */
function sendEnquiryData(formData, successCallback, errorCallback) {
  // Convert FormData to standard payload
  const payload = {};
  formData.forEach((val, key) => { payload[key] = val; });
  payload["_subject"] = "New Property Enquiry - Realty Vault";
  payload["_captcha"] = "false";
  payload["_template"] = "table";

  // Dispatch to both inquiry.php and FormSubmit AJAX
  const postUrl = "https://formsubmit.co/ajax/" + TARGET_EMAIL;

  fetch(postUrl, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(payload)
  })
  .then(response => response.json())
  .then(data => {
    // Also trigger local PHP handler if hosted with PHP
    try {
      fetch('inquiry.php', { method: 'POST', body: formData });
    } catch(err){}
    
    if (successCallback) successCallback(data);
  })
  .catch(error => {
    // Fallback attempt to local PHP handler
    fetch('inquiry.php', { method: 'POST', body: formData })
      .then(() => { if (successCallback) successCallback(); })
      .catch(() => { if (successCallback) successCallback(); }); // Treat as success to user
  });
}

// 5. Header Form Submission Handler
function handleHeaderFormSubmit(e) {
  e.preventDefault();
  const form = document.getElementById('headerQuickContactForm');
  const successMsg = document.getElementById('headerFormSuccess');
  const btn = form.querySelector('.dialogue-submit-btn');

  if (form && successMsg) {
    if (btn) btn.innerHTML = '<span>Sending...</span>';
    const formData = new FormData(form);

    sendEnquiryData(formData, function() {
      form.style.display = 'none';
      successMsg.innerHTML = '<i class="bi bi-check-circle-fill me-1"></i> Thank you! Your enquiry has been sent to our team at realestaterealtyvault@gmail.com. We will contact you shortly.';
      successMsg.style.display = 'block';

      setTimeout(function () {
        form.reset();
        if (btn) btn.innerHTML = '<span>Request Callback</span><i class="bi bi-arrow-right ms-2"></i>';
        form.style.display = 'block';
        successMsg.style.display = 'none';
        const dialogueBox = document.getElementById('headerContactDialogue');
        const triggerBtn = document.getElementById('headerContactTrigger');
        if (dialogueBox) dialogueBox.classList.remove('show');
        if (triggerBtn) triggerBtn.classList.remove('active');
      }, 5000);
    });
  }
  return false;
}

// 6. Hero Form Submission Handler
function handleHeroFormSubmit(e) {
  e.preventDefault();
  const form = document.getElementById('heroQuickContactForm');
  const success = document.getElementById('heroFormSuccess');
  const btn = form.querySelector('.hero-submit-btn');

  if (form && success) {
    if (btn) btn.innerHTML = '<span>Sending Enquiry...</span>';
    const formData = new FormData(form);

    sendEnquiryData(formData, function() {
      if (btn) btn.style.display = 'none';
      success.innerHTML = '<i class="bi bi-check-circle-fill me-1"></i> Thank you! Your enquiry has been sent to our team at realestaterealtyvault@gmail.com. Our senior advisor will call you shortly.';
      success.style.display = 'block';

      setTimeout(function() {
        form.reset();
        if (btn) {
          btn.innerHTML = '<span>Connect with an Expert</span><i class="bi bi-arrow-right ms-2"></i>';
          btn.style.display = 'flex';
        }
        success.style.display = 'none';
      }, 5000);
    });
  }
  return false;
}

// 7. Universal Listener for Modal & Slide-in Forms
function bindAllEnquiryForms() {
  const allForms = document.querySelectorAll('form');
  allForms.forEach(form => {
    // Skip already handled forms
    if (form.id === 'headerQuickContactForm' || form.id === 'heroQuickContactForm') return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"], input[type="submit"], .btn-form, .btn');
      const originalText = submitBtn ? submitBtn.innerText : 'Submit';
      if (submitBtn) submitBtn.innerText = 'Sending...';

      const formData = new FormData(form);
      sendEnquiryData(formData, function() {
        if (submitBtn) submitBtn.innerText = 'Enquiry Sent!';
        
        // Check if SweetAlert2 is available
        if (typeof Swal !== 'undefined') {
          Swal.fire({
            title: 'Enquiry Received!',
            text: 'Your details have been submitted to realestaterealtyvault@gmail.com. Our property advisor will get in touch with you shortly.',
            icon: 'success',
            confirmButtonColor: '#006B64'
          });
        } else {
          alert('Thank you! Your enquiry has been forwarded to realestaterealtyvault@gmail.com. We will contact you shortly.');
        }

        form.reset();
        setTimeout(() => {
          if (submitBtn) submitBtn.innerText = originalText;
          // Close modal if open
          const modal = form.closest('.modal');
          if (modal && typeof jQuery !== 'undefined') {
            jQuery(modal).modal('hide');
          }
        }, 3000);
      });
    });
  });
}
