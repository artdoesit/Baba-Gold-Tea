/* -------------------------------------------------------------
   Baba Gold Tea JS Interactivity & Animations Script
   ------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================
     0. Load Embedded Base64 Images
     ========================================== */
  if (typeof BABA_TEA_IMAGES !== 'undefined') {
    const cardImages = {
      'card-baba-special': BABA_TEA_IMAGES.baba_special,
      'card-princess-regular': BABA_TEA_IMAGES.princess_regular,
      'card-princess-elaichi': BABA_TEA_IMAGES.princess_elaichi,
      'card-baba-dilkhush': BABA_TEA_IMAGES.baba_dilkhush,
      'card-baba-premium': BABA_TEA_IMAGES.baba_premium
    };

    Object.keys(cardImages).forEach(className => {
      const card = document.querySelector(`.${className}`);
      if (card) {
        const img = card.querySelector('.card-product-img');
        if (img) img.src = cardImages[className];
      }
    });

    // Also update customizer preview image default on load
    const customPreviewImg = document.getElementById('custom-bottle-img');
    if (customPreviewImg && BABA_TEA_IMAGES.baba_special) {
      customPreviewImg.src = BABA_TEA_IMAGES.baba_special;
    }
  }

  /* ==========================================
     1. Sticky Header & Parallax Scroll Effects
     ========================================== */
  const header = document.querySelector('.main-header');
  const titleLeft = document.querySelector('.hero-title-left');
  const titleRight = document.querySelector('.hero-title-right');
  const bottle = document.querySelector('.bottle-wrapper');

  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;

    // Header class update
    if (scrolled > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Parallax on big text titles
    if (titleLeft && titleRight) {
      titleLeft.style.transform = `translateX(${-scrolled * 0.15}px) rotate(${-3 - scrolled * 0.005}deg)`;
      titleRight.style.transform = `translateX(${scrolled * 0.15}px) rotate(${3 + scrolled * 0.005}deg)`;
    }


  });


  /* ==========================================
     2. Mobile Drawer Navigation
     ========================================== */
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const mobileDrawerClose = document.querySelector('.mobile-drawer-close');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  const toggleDrawer = (open) => {
    if (open) {
      mobileDrawer.classList.add('open');
    } else {
      mobileDrawer.classList.remove('open');
    }
  };

  mobileNavToggle.addEventListener('click', () => toggleDrawer(true));
  mobileDrawerClose.addEventListener('click', () => toggleDrawer(false));

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => toggleDrawer(false));
  });


  /* ==========================================
     3. Tea Comparison Panel
     ========================================== */
  const nutritionData = {
    water: {
      title: "Purity & Sourcing",
      dairyVal: "Pesticides Present",
      milkiesVal: "100% Pesticide-Free",
      dairyWidth: "100%",
      milkiesWidth: "100%",
      summary: "Baba Gold tea leaves are 100% organic and pesticide-free, grown with sustainable farming practices compared to mass-produced commercial blends."
    },
    co2: {
      title: "Tea Leaf Quality",
      dairyVal: "Dust & Sweepings",
      milkiesVal: "100% Whole Leaf",
      dairyWidth: "30%",
      milkiesWidth: "100%",
      summary: "Unlike typical commercial bags filled with dust and sweepings (fannings), Baba Gold offers only premium whole leaf tea for a cleaner, richer brew."
    },
    calcium: {
      title: "Antioxidant Levels (ORAC)",
      dairyVal: "Low Retention",
      milkiesVal: "Very High",
      dairyWidth: "40%",
      milkiesWidth: "100%",
      summary: "Whole leaf tea retains its natural essential oils and catechins, delivering up to 3x more active antioxidants than processed commercial bag dust."
    },
    sugar: {
      title: "Flavors & Additives",
      dairyVal: "Artificial Flavors",
      milkiesVal: "100% Pure & Natural",
      dairyWidth: "90%",
      milkiesWidth: "0%",
      summary: "We blend our tea leaves exclusively with real spices, herbs, and flowers—completely free of chemical flavorings and oils."
    }
  };

  const tabs = document.querySelectorAll('.selector-tab');
  const metricTitle = document.getElementById('metric-title');
  const dairyBar = document.getElementById('dairy-bar');
  const milkiesBar = document.getElementById('milkies-bar');
  const dairyVal = document.getElementById('dairy-val');
  const milkiesVal = document.getElementById('milkies-val');
  const comparisonText = document.getElementById('comparison-text');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Toggle active class
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Get metric data key
      const key = tab.getAttribute('data-compare');
      const data = nutritionData[key];

      // Update data with smooth transition
      metricTitle.innerText = data.title;
      dairyVal.innerText = data.dairyVal;
      milkiesVal.innerText = data.milkiesVal;
      comparisonText.innerText = data.summary;

      dairyBar.style.width = data.dairyWidth;
      milkiesBar.style.width = data.milkiesWidth;
    });
  });


  /* ==========================================
     4. Interactive Customizer: "Blend Your Perfect Cup"
     ========================================= */
  const customForm = document.getElementById('custom-milk-form');
  const customPriceEl = document.getElementById('custom-price');
  const customBottleImg = document.getElementById('custom-bottle-img');
  const glowEffect = document.querySelector('.glow-effect');
  const tagBase = document.getElementById('nutrient-tag-1');
  const tagSweet = document.getElementById('nutrient-tag-2');
  const btnAddCustom = document.getElementById('btn-add-custom');

  const teaPricings = {
    baba_special: [
      { size: '250g', label: '250 Grams', desc: 'Standard pack (₹100)', price: 100 },
      { size: '500g', label: '500 Grams', desc: 'Family pack (₹220)', price: 220 },
      { size: '1kg', label: '1 Kg', desc: 'Bulk pack (₹400)', price: 400 }
    ],
    princess_regular: [
      { size: '200g', label: '200 Grams', desc: 'Standard pack (₹60)', price: 60 },
      { size: '1kg', label: '1 Kg', desc: 'Bulk pack (₹300)', price: 300 }
    ],
    princess_elaichi: [
      { size: '200g', label: '200 Grams', desc: 'Standard pack (₹60)', price: 60 },
      { size: '1kg', label: '1 Kg', desc: 'Bulk pack (₹300)', price: 300 }
    ],
    black_diamond: [
      { size: '250g', label: '250 Grams', desc: 'Standard pack (₹115)', price: 115 },
      { size: '500g', label: '500 Grams', desc: 'Family pack (₹230)', price: 230 },
      { size: '1kg', label: '1 Kg', desc: 'Bulk pack (₹460)', price: 460 }
    ],
    baba_dilkhush: [
      { size: '1pc', label: '1 Piece', desc: 'Standard pack (₹95)', price: 95 }
    ]
  };

  const renderPackSizes = (baseKey) => {
    const container = document.getElementById('pack-size-container');
    if (!container) return;

    const sizes = teaPricings[baseKey] || [];
    let html = '';

    sizes.forEach((opt, index) => {
      const isChecked = index === 0 ? 'checked' : '';
      const cardClass = index === 0 ? 'option-card checked' : 'option-card';
      
      html += `
        <label class="${cardClass}">
          <input type="radio" name="sweetness" value="${opt.size}" ${isChecked} data-price="${opt.price}.00">
          <span class="option-name">${opt.label}</span>
          <span class="option-desc">${opt.desc}</span>
        </label>
      `;
    });

    container.innerHTML = html;
  };

  const glowColors = {
    baba_special: 'rgba(194, 24, 7, 0.4)',      // Red
    princess_regular: 'rgba(178, 34, 34, 0.4)',  // Firebrick Red
    princess_elaichi: 'rgba(27, 77, 62, 0.4)',   // Green
    baba_dilkhush: 'rgba(210, 20, 58, 0.4)',    // Jar Red
    black_diamond: 'rgba(34, 34, 34, 0.4)'       // Black Diamond
  };

  let currentBaseKey = '';

  const updateCustomizerValues = () => {
    // 1. Get Base
    const selectedBase = document.querySelector('input[name="milk-base"]:checked');
    if (!selectedBase) return;

    const baseKey = selectedBase.value;
    const baseName = selectedBase.nextElementSibling.innerText;

    // If the base has changed, re-render pack sizes!
    if (baseKey !== currentBaseKey) {
      currentBaseKey = baseKey;
      renderPackSizes(baseKey);
    }

    const basePrice = parseFloat(selectedBase.getAttribute('data-price'));
    let totalPrice = basePrice;

    // Apply active checked class to parent label
    document.querySelectorAll('input[name="milk-base"]').forEach(input => {
      input.closest('.option-card').classList.remove('checked');
    });
    selectedBase.closest('.option-card').classList.add('checked');

    // Update glow color and preview image
    if (glowEffect) {
      glowEffect.style.background = `radial-gradient(circle, ${glowColors[baseKey]} 0%, rgba(255,255,255,0) 70%)`;
    }

    const baseImages = {
      baba_special: BABA_TEA_IMAGES.baba_special,
      princess_regular: BABA_TEA_IMAGES.princess_regular,
      princess_elaichi: BABA_TEA_IMAGES.princess_elaichi,
      baba_dilkhush: BABA_TEA_IMAGES.baba_dilkhush,
      black_diamond: BABA_TEA_IMAGES.black_diamond
    };

    if (customBottleImg) {
      customBottleImg.src = baseImages[baseKey];
      customBottleImg.style.filter = 'drop-shadow(0 15px 25px rgba(0,0,0,0.2))';
    }

    // Update base tag text
    if (tagBase) {
      tagBase.innerText = baseName;
    }

    // 2. Get Sweetness
    const selectedSweet = document.querySelector('input[name="sweetness"]:checked');
    const sweetPrice = parseFloat(selectedSweet.getAttribute('data-price'));
    const sweetName = selectedSweet.nextElementSibling.innerText;
    totalPrice += sweetPrice;

    document.querySelectorAll('input[name="sweetness"]').forEach(input => {
      input.closest('.option-card').classList.remove('checked');
    });
    selectedSweet.closest('.option-card').classList.add('checked');

    // Update sweetness tag text
    if (tagSweet) {
      tagSweet.innerText = sweetName;
    }


    // Update Price Display
    if (customPriceEl) {
      customPriceEl.innerText = `₹${totalPrice.toFixed(0)}`;
    }
  };

  // Event Listeners for customizer changes
  if (customForm) {
    customForm.addEventListener('change', updateCustomizerValues);
    updateCustomizerValues(); // Initialize values on load
  }

  // Cart Toast Notification
  const toast = document.getElementById('toast-message');
  const showToast = (message) => {
    if (toast) {
      toast.querySelector('.toast-text').innerText = message;
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 3500);
    }
  };

  if (btnAddCustom) {
    btnAddCustom.addEventListener('click', () => {
      const selectedBaseName = document.querySelector('input[name="milk-base"]:checked').nextElementSibling.innerText;
      showToast(`Inquiry for Custom ${selectedBaseName} submitted! ✉️`);
    });
  }

  // Quick Add for Product cards
  const cards = document.querySelectorAll('.product-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const title = card.querySelector('.card-title').innerText;
      showToast(`Inquiry for ${title} submitted! ✉️`);
    });
  });



  /* ==========================================
     6. Testimonial Slider Carousel
     ========================================== */
  const track = document.querySelector('.testimonial-track');
  const slides = Array.from(document.querySelectorAll('.testimonial-card'));
  const dots = Array.from(document.querySelectorAll('.dot'));
  const nextBtn = document.querySelector('.next-btn');
  const prevBtn = document.querySelector('.prev-btn');
  
  let activeIndex = 0;

  const updateSlider = (index) => {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    
    activeIndex = index;

    // Shift track
    if (track) {
      track.style.transform = `translateX(-${activeIndex * 100}%)`;
    }

    // Toggle slide classes
    slides.forEach((slide, i) => {
      slide.classList.remove('active');
      if (i === activeIndex) {
        slide.classList.add('active');
      }
    });

    // Update dots
    dots.forEach((dot, i) => {
      dot.classList.remove('active');
      if (i === activeIndex) {
        dot.classList.add('active');
      }
    });
  };

  if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', () => updateSlider(activeIndex + 1));
    prevBtn.addEventListener('click', () => updateSlider(activeIndex - 1));
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const targetIndex = parseInt(dot.getAttribute('data-index'));
      updateSlider(targetIndex);
    });
  });

  // Auto-play Slider every 6 seconds
  setInterval(() => {
    updateSlider(activeIndex + 1);
  }, 6000);

});
