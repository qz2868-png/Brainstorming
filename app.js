/* ============================================
   YUMMI RECIPE APP — JavaScript
   Semi-Circle Wheel + Dynamic Recipes + Photo Upload
   ============================================ */

// ========== RECIPES DATABASE ==========
const defaultRecipes = [
  {
    name: 'Braised Pork',
    meta: '6 ingredients · 45m · Medium',
    img: 'images/meal1.jpg',
    glowColor: 'rgba(255, 205, 80, 0.75)',
    ingredients: ['Pork belly (500g)', 'Preserved mustard greens', 'Dark & light soy sauce', 'Rock sugar', 'Ginger & garlic slices', 'Shaoxing cooking wine']
  },
  {
    name: 'Soba Noodle Bowl',
    meta: '8 ingredients · 20m · Easy',
    img: 'images/meal2.jpg',
    glowColor: 'rgba(160, 220, 110, 0.7)',
    ingredients: ['Buckwheat soba noodles', 'Broccoli florets', 'Soy sauce soft-boiled egg', 'Avocado cubes', 'Soybean sprouts', 'Sesame oil & dashi']
  },
  {
    name: 'Steak & Mash',
    meta: '7 ingredients · 30m · Medium',
    img: 'images/meal3.jpg',
    glowColor: 'rgba(255, 175, 95, 0.75)',
    ingredients: ['Ribeye steak', 'Russet potatoes (mashed)', 'Fresh asparagus spears', 'Cherry tomatoes', 'Garlic herb butter', 'Sea salt & cracked black pepper']
  },
  {
    name: 'Meatball Soup',
    meta: '9 ingredients · 25m · Easy',
    img: 'images/meal4.jpg',
    glowColor: 'rgba(255, 215, 100, 0.75)',
    ingredients: ['Pork meatballs', 'Fresh baby spinach', 'Egg ribbon omelet slices', 'Chicken broth', 'White pepper', 'Sesame oil & scallions']
  },
  {
    name: 'Tomato & Egg Stir-Fry',
    meta: '5 ingredients · 15m · Easy',
    img: 'images/tomato_egg.jpg',
    glowColor: 'rgba(255, 150, 80, 0.75)',
    ingredients: ['Ripe tomatoes (3 pcs)', 'Eggs (4 pcs, beaten)', 'Scallions (chopped)', 'Pinch of sugar & salt', 'Sesame oil']
  },
  {
    name: 'Steamed Dumplings',
    meta: '8 ingredients · 35m · Medium',
    img: 'images/IMG_2020.jpg',
    glowColor: 'rgba(255, 215, 120, 0.75)',
    ingredients: ['Dumpling wrappers', 'Minced pork & shrimp', 'Napa cabbage or chives', 'Ginger & scallion water', 'Sesame oil', 'Black vinegar dip']
  },
  {
    name: 'Tofu & Greens',
    meta: '6 ingredients · 15m · Easy',
    img: 'images/IMG_2487.jpg',
    glowColor: 'rgba(170, 220, 110, 0.7)',
    ingredients: ['Braised tofu puffs', 'Crisp Asian greens', 'Garlic cloves (crushed)', 'Mild red chili slices', 'Light soy sauce', 'Toasted sesame seeds']
  },
  {
    name: 'Seafood Rice Cake Soup',
    meta: '10 ingredients · 25m · Medium',
    img: 'images/IMG_3423.jpg',
    glowColor: 'rgba(255, 190, 80, 0.75)',
    ingredients: ['Sliced Korean rice cakes', 'Fresh shrimp', 'Scrambled egg ribbons', 'Bok choy & mushrooms', 'Golden savory broth', 'White pepper']
  },
  {
    name: 'Stir-Fried Cauliflower',
    meta: '5 ingredients · 15m · Easy',
    img: 'images/IMG_4279.jpg',
    glowColor: 'rgba(255, 225, 110, 0.75)',
    ingredients: ['Cauliflower florets', 'Dried red chili peppers', 'Garlic & ginger slices', 'Light soy sauce & pinch of cumin', 'Spring scallions']
  },
  {
    name: 'Deluxe Seafood Pot',
    meta: '12 ingredients · 40m · Hard',
    img: 'images/IMG_3919.jpg',
    glowColor: 'rgba(255, 160, 90, 0.75)',
    ingredients: ['Fresh abalone', 'Large prawns', 'Bamboo shoots', 'Baby sea snails & clams', 'Edamame beans', 'Simmered seafood dashi']
  },
  {
    name: 'Clams & Mussels',
    meta: '7 ingredients · 20m · Medium',
    img: 'images/IMG_4681.jpg',
    glowColor: 'rgba(200, 215, 240, 0.75)',
    ingredients: ['Fresh live clams', 'Black mussels', 'Zucchini ribbons', 'Garlic butter & white wine', 'Scallions & edamame', 'Sea salt']
  },
  {
    name: 'Sautéed Water Spinach',
    meta: '4 ingredients · 10m · Easy',
    img: 'images/IMG_4683.jpg',
    glowColor: 'rgba(150, 225, 110, 0.7)',
    ingredients: ['Tender water spinach (空心菜)', 'Garlic cloves (minced)', 'Fermented bean curd or sea salt', 'High-heat wok oil']
  },
  {
    name: 'Creamy Spaghetti',
    meta: '6 ingredients · 20m · Easy',
    img: 'images/IMG_8690.jpg',
    glowColor: 'rgba(255, 215, 120, 0.75)',
    ingredients: ['Spaghetti (al dente)', 'Heavy cream & butter', 'Parmesan cheese (grated)', 'Fresh parsley', 'Black pepper', 'Sautéed mushrooms']
  }
];

// Load recipes from localStorage or fallback
let recipes = (function loadStoredRecipes() {
  try {
    const stored = localStorage.getItem('YUMMI_RECIPES');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length >= 4) return parsed;
    }
  } catch (e) {
    console.warn('Could not read localStorage:', e);
  }
  return defaultRecipes.slice();
})();

function persistRecipes() {
  try {
    localStorage.setItem('YUMMI_RECIPES', JSON.stringify(recipes));
  } catch (e) {
    console.warn('Could not save to localStorage:', e);
  }
}

// ========== PAGE NAVIGATION ==========
function switchPage(pageId, btnEl) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById(pageId);
  if (target) {
    target.classList.add('active');
    target.scrollTop = 0;
  }
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');
}

// ========== DYNAMIC RENDERING ==========

let currentActiveRecipeIndex = 0;

// Render Browse Grid (Page 2)
function renderBrowseGrid() {
  const grid = document.getElementById('recipe-grid');
  const countEl = document.getElementById('browse-recipe-count');
  const profileCountEl = document.getElementById('profile-recipe-count');

  if (countEl) countEl.textContent = `${recipes.length} delicious favorites`;
  if (profileCountEl) profileCountEl.textContent = recipes.length;
  if (!grid) return;

  grid.innerHTML = recipes.map((rec, i) => `
    <div class="recipe-card" onclick="openRecipeByIndex(${i})">
      <div class="recipe-card-img">
        <img src="${rec.img}" alt="${rec.name}" loading="lazy" />
      </div>
      <div class="recipe-card-info">
        <h3>${rec.name}</h3>
        <p>${rec.meta}</p>
        <div class="recipe-rating">
          <span class="star">★</span><span class="star">★</span><span class="star">★</span><span class="star">★</span><span class="star">★</span>
        </div>
      </div>
    </div>
  `).join('');
}

// Render Wheel Dishes (Page 1)
function renderWheelDishes() {
  const pivot = document.getElementById('wheel-pivot');
  if (!pivot) return;

  pivot.innerHTML = recipes.map((rec, i) => `
    <div class="dish" data-index="${i}">
      <div class="dish-circle">
        <img src="${rec.img}" alt="${rec.name}" draggable="false" decoding="async" />
      </div>
    </div>
  `).join('');
}

// ========== INTERACTIVE SEMI-CIRCLE WHEEL ==========
let updateWheelDishesFn = null;
let snapToWheelIndexFn = null;

(function initWheel() {
  const stage = document.getElementById('wheel-stage');
  const pivot = document.getElementById('wheel-pivot');
  const glow = document.getElementById('home-glow');
  const nameEl = document.getElementById('selected-name');
  const metaEl = document.getElementById('selected-meta');

  if (!stage || !pivot) return;

  // Initial renders
  renderWheelDishes();
  renderBrowseGrid();

  let currentAngle = 0; // Global rotation angle in degrees
  let isDragging = false;
  let startX = 0;
  let lastX = 0;
  let lastTime = 0;
  let velocity = 0;
  let animFrame = null;
  let glowTimer = null;

  function getRadius() {
    const stageWidth = stage.clientWidth || window.innerWidth;
    return Math.max(160, Math.min(stageWidth * 0.52, 215));
  }

  function updateDishes() {
    const radius = getRadius();
    const dishes = Array.from(pivot.querySelectorAll('.dish'));
    const numItems = recipes.length;
    if (numItems === 0) return;

    const stepAngle = 360 / numItems;

    dishes.forEach((dish, i) => {
      const nominalAngle = (i * stepAngle) + currentAngle;
      let diff = ((nominalAngle % 360) + 540) % 360 - 180; // range [-180, 180]

      // ratio = diff / stepAngle (0 = apex, +1 = right neighbor, -1 = left neighbor)
      const ratio = diff / stepAngle;

      // Map to visual arc angle (approx 58° per step)
      const arcAngleDeg = ratio * 58;
      const arcAngleRad = (arcAngleDeg * Math.PI) / 180;

      const x = radius * Math.sin(arcAngleRad);
      const y = radius * (1 - Math.cos(arcAngleRad));

      const absRatio = Math.abs(ratio);

      // Scale: 1.12 at apex down to 0.72 for neighbors
      const scale = Math.max(0.60, 1.12 - (Math.min(absRatio, 1.5) * 0.38));

      // Opacity: smoothly visible for |ratio| <= 1.4, fades to 0 beyond that
      let opacity = 0;
      if (absRatio <= 1.45) {
        opacity = Math.max(0, 1 - Math.pow(absRatio / 1.45, 2));
      }

      const zIndex = Math.round((1 - Math.min(1, absRatio / 2)) * 50);

      dish.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) scale(${scale.toFixed(3)})`;
      dish.style.opacity = opacity.toFixed(2);
      dish.style.zIndex = zIndex;
      dish.style.pointerEvents = opacity < 0.25 ? 'none' : 'auto';

      dish.classList.toggle('active-dish', absRatio < 0.5);
    });
  }

  function getClosestIndex() {
    let closestIdx = 0;
    let minDiff = Infinity;
    const numItems = recipes.length;
    if (numItems === 0) return 0;
    const stepAngle = 360 / numItems;

    for (let i = 0; i < numItems; i++) {
      const nominalAngle = (i * stepAngle) + currentAngle;
      const diff = Math.abs(((nominalAngle % 360) + 540) % 360 - 180);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = i;
      }
    }
    return closestIdx;
  }

  function onRecipeSelected(index) {
    currentActiveRecipeIndex = index;
    const recipe = recipes[index];
    if (!recipe) return;

    nameEl.style.opacity = '0';
    metaEl.style.opacity = '0';

    clearTimeout(glowTimer);
    glowTimer = setTimeout(() => {
      nameEl.textContent = recipe.name;
      metaEl.textContent = recipe.meta;
      nameEl.style.opacity = '1';
      metaEl.style.opacity = '1';

      glow.classList.add('glowing');
      if (recipe.glowColor) {
        glow.style.background = `radial-gradient(circle, ${recipe.glowColor} 0%, rgba(247, 185, 80, 0.35) 45%, transparent 72%)`;
      }
    }, 110);
  }

  function dimGlowWhileSpinning() {
    glow.classList.remove('glowing');
  }

  function snapToIndex(targetIndex) {
    if (animFrame) cancelAnimationFrame(animFrame);
    const numItems = recipes.length;
    if (numItems === 0) return;

    const stepAngle = 360 / numItems;
    const idealAngle = -(targetIndex * stepAngle);
    let diff = ((idealAngle - currentAngle) % 360 + 540) % 360 - 180;
    const finalAngle = currentAngle + diff;

    const start = currentAngle;
    const distance = diff;
    const startTime = performance.now();
    const duration = Math.min(450, Math.max(240, Math.abs(distance) * 4.5));

    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      currentAngle = start + distance * easeOutCubic(progress);
      updateDishes();

      if (progress < 1) {
        animFrame = requestAnimationFrame(step);
      } else {
        currentAngle = finalAngle;
        updateDishes();
        onRecipeSelected(targetIndex);
      }
    }

    animFrame = requestAnimationFrame(step);
  }

  function applyInertia() {
    const friction = 0.92;
    const minVelocity = 0.12;

    function step() {
      velocity *= friction;
      currentAngle += velocity;
      updateDishes();

      if (Math.abs(velocity) > minVelocity) {
        animFrame = requestAnimationFrame(step);
      } else {
        const bestIdx = getClosestIndex();
        snapToIndex(bestIdx);
      }
    }

    animFrame = requestAnimationFrame(step);
  }

  function onDragStart(clientX) {
    if (animFrame) cancelAnimationFrame(animFrame);
    isDragging = true;
    startX = clientX;
    lastX = clientX;
    lastTime = performance.now();
    velocity = 0;
    dimGlowWhileSpinning();
  }

  function onDragMove(clientX) {
    if (!isDragging) return;

    const deltaX = clientX - lastX;
    const numItems = recipes.length;
    const stepAngle = 360 / numItems;

    // A swipe of 150px advances 1 recipe
    const angleDelta = (deltaX / 150) * stepAngle;

    currentAngle += angleDelta;
    lastX = clientX;

    const now = performance.now();
    const dt = now - lastTime;
    if (dt > 0) {
      velocity = (angleDelta / dt) * 16;
    }
    lastTime = now;

    updateDishes();
  }

  function onDragEnd() {
    if (!isDragging) return;
    isDragging = false;

    if (Math.abs(velocity) > 0.3) {
      applyInertia();
    } else {
      const bestIdx = getClosestIndex();
      snapToIndex(bestIdx);
    }
  }

  // Touch handlers
  stage.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) onDragStart(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (isDragging && e.touches.length === 1) onDragMove(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchend', onDragEnd);
  window.addEventListener('touchcancel', onDragEnd);

  // Mouse handlers
  stage.addEventListener('mousedown', (e) => {
    e.preventDefault();
    onDragStart(e.clientX);
  });
  window.addEventListener('mousemove', (e) => {
    if (isDragging) onDragMove(e.clientX);
  });
  window.addEventListener('mouseup', () => {
    if (isDragging) onDragEnd();
  });

  // Tap on dish
  pivot.addEventListener('click', (e) => {
    const dish = e.target.closest('.dish');
    if (!dish) return;
    const idx = parseInt(dish.getAttribute('data-index'), 10);
    if (!isNaN(idx) && (!isDragging || Math.abs(velocity) < 0.2)) {
      snapToIndex(idx);
    }
  });

  window.addEventListener('resize', updateDishes);

  // Exports for dynamic additions
  updateWheelDishesFn = () => {
    renderWheelDishes();
    updateDishes();
  };
  snapToWheelIndexFn = (idx) => {
    snapToIndex(idx);
  };

  // Initial load
  updateDishes();
  setTimeout(() => snapToIndex(0), 100);
})();

// ========== RECIPE DETAIL MODAL (OPEN BUTTON) ==========

let currentModalRecipeIndex = 0;

function openRecipeModalWithData(recipe, idx) {
  if (!recipe) return;
  currentModalRecipeIndex = (typeof idx === 'number') ? idx : currentActiveRecipeIndex;

  const backdrop = document.getElementById('recipe-modal-backdrop');
  const imgEl = document.getElementById('modal-img');
  const titleEl = document.getElementById('modal-title');
  const metaEl = document.getElementById('modal-meta');
  const ingList = document.getElementById('modal-ingredients');

  imgEl.src = recipe.img;
  titleEl.textContent = recipe.name;
  metaEl.textContent = recipe.meta;

  if (recipe.ingredients && recipe.ingredients.length > 0) {
    ingList.innerHTML = recipe.ingredients.map(ing => `<li>${ing}</li>`).join('');
  } else {
    ingList.innerHTML = `
      <li>Fresh ingredients prepared with passion</li>
      <li>Seasoned with garlic, scallions, and soy sauce</li>
      <li>Cooked to golden perfection</li>
    `;
  }

  backdrop.classList.add('open');
}

function openCurrentRecipeModal() {
  const current = recipes[currentActiveRecipeIndex];
  openRecipeModalWithData(current, currentActiveRecipeIndex);
}

function openRecipeByIndex(idx) {
  const current = recipes[idx];
  openRecipeModalWithData(current, idx);
}

function closeRecipeModal() {
  const backdrop = document.getElementById('recipe-modal-backdrop');
  backdrop.classList.remove('open');
}

function deleteCurrentModalRecipe() {
  if (recipes.length <= 1) {
    alert('You need at least 1 recipe in your app!');
    return;
  }

  const recipeToRemove = recipes[currentModalRecipeIndex];
  const recipeName = recipeToRemove ? recipeToRemove.name : 'this recipe';

  if (!confirm(`Are you sure you want to remove "${recipeName}"?`)) {
    return;
  }

  // Remove from array and persist
  recipes.splice(currentModalRecipeIndex, 1);
  persistRecipes();

  // Close modal
  closeRecipeModal();

  // Re-render both views
  if (updateWheelDishesFn) updateWheelDishesFn();
  renderBrowseGrid();

  // Snap to safe index
  if (snapToWheelIndexFn) {
    const nextIdx = Math.max(0, Math.min(currentModalRecipeIndex, recipes.length - 1));
    setTimeout(() => snapToWheelIndexFn(nextIdx), 150);
  }
}

// ========== PHOTO LIBRARY UPLOAD (PAGE 3: ADD) ==========

let pendingRecipeImageData = null;

function triggerPhotoLibrary() {
  const input = document.getElementById('recipe-file-input');
  if (input) input.click();
}

function handlePhotoSelected(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const rawData = e.target.result;

    // Downscale via canvas to max 600x600 for optimal speed and storage
    const img = new Image();
    img.onload = function () {
      const maxDim = 600;
      let w = img.width;
      let h = img.height;
      if (w > maxDim || h > maxDim) {
        if (w > h) {
          h = Math.round((h * maxDim) / w);
          w = maxDim;
        } else {
          w = Math.round((w * maxDim) / h);
          h = maxDim;
        }
      }
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, w, h);
      pendingRecipeImageData = canvas.toDataURL('image/jpeg', 0.85);

      // Show preview and remove button
      const previewImg = document.getElementById('add-preview-img');
      const plusIcon = document.querySelector('.placeholder-plus-icon');
      const label = document.getElementById('add-photo-label');
      const removeBtn = document.getElementById('remove-photo-btn');

      if (previewImg && plusIcon) {
        previewImg.src = pendingRecipeImageData;
        previewImg.style.display = 'block';
        plusIcon.style.display = 'none';
        if (label) label.textContent = 'Looks delicious! Tap to change 📸';
        if (removeBtn) removeBtn.style.display = 'inline-block';
      }

      // Auto-focus the name field
      const nameInput = document.getElementById('input-recipe-name');
      if (nameInput) nameInput.focus();
    };
    img.src = rawData;
  };
  reader.readAsDataURL(file);
}

function clearSelectedPhoto() {
  pendingRecipeImageData = null;
  const fileInput = document.getElementById('recipe-file-input');
  if (fileInput) fileInput.value = '';

  const previewImg = document.getElementById('add-preview-img');
  const plusIcon = document.querySelector('.placeholder-plus-icon');
  const label = document.getElementById('add-photo-label');
  const removeBtn = document.getElementById('remove-photo-btn');

  if (previewImg && plusIcon) {
    previewImg.style.display = 'none';
    previewImg.src = '';
    plusIcon.style.display = 'block';
    if (label) label.textContent = 'Tap to choose from Library 📸';
    if (removeBtn) removeBtn.style.display = 'none';
  }
}

function saveNewRecipe() {
  const nameInput = document.getElementById('input-recipe-name');
  const metaInput = document.getElementById('input-recipe-meta');

  const name = (nameInput && nameInput.value.trim()) || 'My Secret Recipe';
  const meta = (metaInput && metaInput.value.trim()) || 'Fresh ingredients · 20m · Easy';
  const img = pendingRecipeImageData || 'images/tomato_egg.jpg';

  const newRecipe = {
    name: name,
    meta: meta,
    img: img,
    glowColor: 'rgba(255, 205, 80, 0.75)',
    ingredients: ['Fresh seasonal produce', 'Chef secret seasonings', 'Cooked with love']
  };

  // Add to top of list
  recipes.unshift(newRecipe);
  persistRecipes();

  // Re-render both Wheel and Browse Grid!
  if (updateWheelDishesFn) updateWheelDishesFn();
  renderBrowseGrid();

  // Reset form
  if (nameInput) nameInput.value = '';
  if (metaInput) metaInput.value = '';
  clearSelectedPhoto();

  // Switch to Home page and highlight the new recipe!
  const homeBtn = document.querySelector('.nav-btn[data-page="page-home"]');
  switchPage('page-home', homeBtn);
  if (snapToWheelIndexFn) {
    setTimeout(() => snapToWheelIndexFn(0), 150);
  }
}

// ========== COMMUNITY: LIKE BUTTON ==========
function toggleLike(btn) {
  btn.classList.toggle('liked');
  const countEl = btn.querySelector('.like-count');
  if (countEl) {
    let count = parseInt(countEl.textContent, 10);
    count += btn.classList.contains('liked') ? 1 : -1;
    countEl.textContent = count;
  }
}
