// Data for the cards
const cardsData = [
  {
    image: "images/horror2.jpeg",
    title: "HORROR",
    description: "Unearth chilling tales that haunt the mind and quicken the pulse. Step into the world of fear, suspense, and the supernatural.",
    link: "public/horror.html"
  },
  {
    image: "images/history.jpeg",
    title: "HISTORY",
    description: "Explore pivotal moments, iconic figures, and the events that shaped our world. History comes alive through captivating narratives.",
    link: "public/history.html"
  },
  {
    image: "images/space.jpeg",
    title: "SPACE BEYOND EARTH",
    description: "Venture beyond the stars with thrilling tales of exploration, unknown galaxies, and the mysteries of the cosmos. Explore now by clicking below",
    link: "public/space.html"
  },
  {
    image: "images/Fantasy.jpeg",
    title: "FANTASY",
    description: "Immerse yourself in magical worlds filled with mythical creatures, epic adventures, and boundless imagination.",
    link: "public/fantasy.html"
  },
  {
    image: "images/mystry.jpeg",
    title: "MYSTERY/THRILLER",
    description: "Dive into gripping tales of suspense, crime-solving, and unexpected twists.",
    link: "https://www.mysteryandsuspense.com"
  },
  {
    image: "images/download.jpeg",
    title: "PHYSICS",
    description: "Enjoy light-hearted, feel-good stories about love, humor, and charming characters.",
    link: "https://notalwaysright.com/romantic/"
  },
  {
    image: "images/geography.jpg",
    title: "GEOGRAPHY",
    description: "Explore geographical wonders and fascinating facts about the world.",
    link: "https://historyarchive.org"
  },
  {
    image: "images/dinasaur.jpg",
    title: "DINOSAUR",
    description: "Journey back to prehistoric times and discover the giants that once roamed the Earth.",
    link: "https://historyarchive.org"
  },
  {
    image: "images/time.webp",
    title: "TIME TRAVEL",
    description: "Explore the fascinating concept of time travel through captivating narratives.",
    link: "https://historyarchive.org"
  },
  {
    image: "images/mythology.jpg",
    title: "MYTHOLOGY",
    description: "Dive into ancient myths, legends, and folklore from around the world.",
    link: "https://historyarchive.org"
  },
  {
    image: "images/caves.webp",
    title: "SURVIVAL STORIES",
    description: "Inspirational tales of human resilience and survival against all odds.",
    link: "https://historyarchive.org"
  },
  {
    image: "images/genetic biology.png",
    title: "GENETIC BIOLOGY",
    description: "Explore the fascinating world of genes, DNA, and the blueprint of life.",
    link: "https://historyarchive.org"
  },
];

// Function to create a card
function createCard(card) {
  const cardElement = document.createElement('div');
  cardElement.className = 'card';
  cardElement.id = card.title.replace(/\s+/g, '-').toLowerCase();

  const image = document.createElement('img');
  image.src = card.image;
  image.alt = card.title + " image";

  const title = document.createElement('h3');
  title.textContent = card.title;

  const description = document.createElement('p');
  description.textContent = card.description;

  const link = document.createElement('a');
  link.href = card.link;
  link.className = 'button-link';
  link.textContent = 'READ MORE...';
  link.target = "_blank";
  link.rel = "noopener noreferrer";

  // Add favorite button
  const favoriteButton = document.createElement('button');
  favoriteButton.className = 'favorite-button';
  favoriteButton.innerHTML = '<i class="fa fa-heart"></i>';
  favoriteButton.setAttribute('aria-label', 'Add to favorites');
  
  // Check if card is already favorited
  const favorites = getFavorites();
  if (favorites.includes(card.title)) {
    favoriteButton.classList.add('favorited');
  }

  // Add click event for favorite button
  favoriteButton.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(card.title, favoriteButton);
  });

  cardElement.appendChild(image);
  cardElement.appendChild(title);
  cardElement.appendChild(description);
  cardElement.appendChild(link);
  cardElement.appendChild(favoriteButton);

  return cardElement;
}

// Function to get favorites from localStorage
function getFavorites() {
  const favorites = localStorage.getItem('favorites');
  return favorites ? JSON.parse(favorites) : [];
}

// Function to toggle favorite status
function toggleFavorite(title, button) {
  const favorites = getFavorites();
  const index = favorites.indexOf(title);
  
  if (index === -1) {
    // Add to favorites
    favorites.push(title);
    button.classList.add('favorited');
  } else {
    // Remove from favorites
    favorites.splice(index, 1);
    button.classList.remove('favorited');
  }
  
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Function to render all cards
function renderCards() {
  const cardContainer = document.querySelector('.container');
  if (!cardContainer) {
    console.error("Container div not found!");
    return;
  }
  cardsData.forEach(card => {
    const cardElement = createCard(card);
    cardContainer.appendChild(cardElement);
  });
}

// Populate the genres dropdown
function populateGenresDropdown() {
  const dropdown = document.getElementById('genreDropdown');
  if (!dropdown) {
    console.error("Genre dropdown not found!");
    return;
  }

  cardsData.forEach(card => {
    const genreLink = document.createElement('a');
    const id = card.title.replace(/\s+/g, '-').toLowerCase();
    genreLink.href = `#${id}`;
    genreLink.textContent = card.title;
    genreLink.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      closeDropdown(); // close after selecting
    });
    dropdown.appendChild(genreLink);
  });
}

// Setup dropdown click open/close
function setupDropdownToggle() {
  const toggleButton = document.getElementById('dropdownToggle');
  const dropdownWrapper = document.getElementById('genreDropdownWrapper');

  if (toggleButton && dropdownWrapper) {
    toggleButton.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdownWrapper.classList.toggle('active');
    });

    // Close dropdown if clicking outside
    document.addEventListener('click', (e) => {
      if (!dropdownWrapper.contains(e.target)) {
        dropdownWrapper.classList.remove('active');
      }
    });
  }
}

// Close dropdown (helper function)
function closeDropdown() {
  const dropdownWrapper = document.getElementById('genreDropdownWrapper');
  if (dropdownWrapper) {
    dropdownWrapper.classList.remove('active');
  }
}

// Update the current year in the footer
function updateFooterYear() {
  const currentYear = new Date().getFullYear();
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = currentYear;
  } else {
    console.error("Footer year element not found!");
  }
}

// Dark mode toggle function
function toggleDarkMode() {
  const body = document.body;
  const button = document.getElementById('darkModeToggle');
  body.classList.toggle('dark-mode');
  const isDark = body.classList.contains('dark-mode');
  button.setAttribute('aria-pressed', isDark);

  const icon = button.querySelector('i');
  if (isDark) {
    icon.classList.remove('fa-moon-o');
    icon.classList.add('fa-sun-o');
  } else {
    icon.classList.remove('fa-sun-o');
    icon.classList.add('fa-moon-o');
  }
}

// Initialize the page
function init() {
  renderCards();
  populateGenresDropdown();
  setupDropdownToggle();
  updateFooterYear();

  // Add search functionality
  const searchInput = document.querySelector('.input');
  const cardContainer = document.querySelector('.container');

  if (searchInput && cardContainer) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      // Clear current cards
      cardContainer.innerHTML = '';
      // Filter cardsData based on title or description matching query
      const filteredCards = cardsData.filter(card => 
        card.title.toLowerCase().includes(query) || 
        card.description.toLowerCase().includes(query)
      );
      // Render filtered cards
      filteredCards.forEach(card => {
        const cardElement = createCard(card);
        cardContainer.appendChild(cardElement);
      });
    });
  }

  const darkModeBtn = document.getElementById('darkModeToggle');
  if (darkModeBtn) {
    darkModeBtn.addEventListener('click', toggleDarkMode);
  }
}

// Run the init function when the page loads
window.onload = init;

