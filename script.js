/* -------------------------------------------------------------
   Baba Gold Tea JS Interactivity & Animations Script
   ------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {

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

  // Colors mapping for tea bases to update the glow effect background color
  const glowColors = {
    cashew: 'rgba(90, 69, 24, 0.4)',       // Amber brown (#5A4518)
    oat: 'rgba(207, 161, 16, 0.4)',         // Gold/Yellow (#CFA110)
    almond: 'rgba(78, 140, 52, 0.4)',      // Green (#4E8C34)
    coconut: 'rgba(140, 88, 21, 0.4)'      // Dark brown (#8C5815)
  };

  const updateCustomizerValues = () => {
    let totalPrice = 0;

    // 1. Get Base
    const selectedBase = document.querySelector('input[name="milk-base"]:checked');
    const basePrice = parseFloat(selectedBase.getAttribute('data-price'));
    const baseName = selectedBase.nextElementSibling.innerText;
    totalPrice += basePrice;

    // Apply active checked class to parent label
    document.querySelectorAll('input[name="milk-base"]').forEach(input => {
      input.closest('.option-card').classList.remove('checked');
    });
    selectedBase.closest('.option-card').classList.add('checked');

    // Update glow color and preview image
    const baseKey = selectedBase.value;
    if (glowEffect) {
      glowEffect.style.background = `radial-gradient(circle, ${glowColors[baseKey]} 0%, rgba(255,255,255,0) 70%)`;
    }

    const baseImages = {
      cashew: 'assets/baba_gold_tea.png',
      oat: 'assets/princess_gold_tea.png',
      almond: 'assets/princess_elaichi_tea.png',
      coconut: 'assets/baba_gold_tea.png'
    };

    if (customBottleImg) {
      customBottleImg.src = baseImages[baseKey];
      if (baseKey === 'coconut') {
        // Apply warm oolong-colored filter to the package
        customBottleImg.style.filter = 'drop-shadow(0 15px 25px rgba(0,0,0,0.2)) sepia(0.55) saturate(1.1) hue-rotate(-25deg) brightness(0.8)';
      } else {
        customBottleImg.style.filter = 'drop-shadow(0 15px 25px rgba(0,0,0,0.2))';
      }
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

    // 3. Get Boosters
    const selectedBoosters = document.querySelectorAll('input[name="booster"]:checked');
    selectedBoosters.forEach(booster => {
      totalPrice += parseFloat(booster.getAttribute('data-price'));
      booster.closest('.option-card').classList.add('checked');
    });

    document.querySelectorAll('input[name="booster"]:not(:checked)').forEach(booster => {
      booster.closest('.option-card').classList.remove('checked');
    });

    // Update Price Display
    if (customPriceEl) {
      customPriceEl.innerText = `$${totalPrice.toFixed(2)}`;
    }
  };

  // Event Listeners for customizer changes
  if (customForm) {
    customForm.addEventListener('change', updateCustomizerValues);
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
      showToast(`Custom ${selectedBaseName} Blend added to order! 🚀`);
    });
  }

  // Quick Add for Product cards
  const cards = document.querySelectorAll('.product-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const title = card.querySelector('.card-title').innerText;
      showToast(`Added ${title} to your cart! 🛍️`);
    });
  });


  /* ==========================================
     5. Recipes Serving Multiplier & Tabs
     ========================================== */
  const recipeTabBtns = document.querySelectorAll('.recipe-tab-btn');
  const recipePanels = document.querySelectorAll('.recipe-content-panel');

  recipeTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      recipeTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const recipeId = btn.getAttribute('data-recipe');
      recipePanels.forEach(panel => {
        panel.classList.remove('active');
        if (panel.id === `recipe-${recipeId}`) {
          panel.classList.add('active');
        }
      });
    });
  });

  // Serving Counter Logic
  const handleServingChange = (panel, isIncrement) => {
    const countEl = panel.querySelector('.serving-count');
    const ingredientList = panel.querySelector('.ingredients-list');
    const initialServings = parseInt(ingredientList.getAttribute('data-servings'));
    
    let currentServings = parseInt(countEl.innerText);
    if (isIncrement) {
      currentServings++;
    } else {
      if (currentServings <= 1) return;
      currentServings--;
    }
    
    countEl.innerText = currentServings;

    // Scale ingredient values
    const items = ingredientList.querySelectorAll('li');
    items.forEach(li => {
      const baseVal = parseFloat(li.getAttribute('data-base'));
      const spanVal = li.querySelector('span');
      if (spanVal) {
        const scaledVal = (baseVal / initialServings) * currentServings;
        // Format to nice decimals
        spanVal.innerText = scaledVal % 1 === 0 ? scaledVal : scaledVal.toFixed(2);
      }
    });
  };

  recipePanels.forEach(panel => {
    const minusBtn = panel.querySelector('.minus-btn');
    const plusBtn = panel.querySelector('.plus-btn');

    if (minusBtn && plusBtn) {
      minusBtn.addEventListener('click', () => handleServingChange(panel, false));
      plusBtn.addEventListener('click', () => handleServingChange(panel, true));
    }
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
