// Target filter buttons, default filter button, swiper navigation
const buttons = document.querySelectorAll("button.filter-button");
const defaultBtn = document.getElementById("all");
const contactBtn = document.querySelector(".contact-btn");
const projectsContainer = document.querySelector(".projects");

// Set the default filter button active on window load
window.addEventListener("load", () => {
  defaultBtn.classList.add("active");
  defaultBtn.click();
});

// Create project tech for overlay
const createTech = (tech) => {
  const projectTech = document.createElement("p");
  projectTech.classList.add("project-tech");
  projectTech.textContent = tech;
  return projectTech;
};

// Create info button for overlay
const createInfoBtn = (project) => {
  const infoBtn = document.createElement("button");
  infoBtn.classList.add("info-button");
  infoBtn.textContent = "MORE INFO";
  infoBtn.addEventListener("click", () => {
    renderProjectModal(project);
  });
  return infoBtn;
};

// Create overlay for project tiles
const createProjectOverlayOnHover = (project) => {
  const overlay = document.createElement("div");
  overlay.classList.add("overlay");
  const tileTop = document.createElement("div");
  tileTop.classList.add("tile-top");
  const projectTitle = document.createElement("h2");
  projectTitle.classList.add("title");
  projectTitle.textContent = project.projectTitle;
  tileTop.appendChild(projectTitle);
  tileTop.appendChild(createTech(project.tech));
  overlay.appendChild(tileTop);
  overlay.appendChild(createInfoBtn(project));
  return overlay;
};

// Render project tiles in projects container
const addProjectsTiles = (dataSetId) => {
  projectsContainer.innerHTML = "";
  data.map((project) => {
    const { projectType } = project;
    if (projectType.includes(dataSetId) || dataSetId === "all") {
      const projectTile = document.createElement("div");
      projectTile.classList.add("project-tile");
      const tileImage = document.createElement("img");
      tileImage.classList.add("tile-image");
      tileImage.src = project.thumbnail;
      tileImage.alt = "Project thumbnail";
      projectTile.appendChild(tileImage);
      projectTile.appendChild(createProjectOverlayOnHover(project));
      projectsContainer.appendChild(projectTile);
    }
  });
};

// Create close button for modal
const createCloseBtn = (modal) => {
  const closeBtn = document.createElement("span");
  closeBtn.classList.add("close-btn");
  closeBtn.innerHTML = "&times;";
  closeBtn.addEventListener("click", () => {
    modal.remove();
  });
  return closeBtn;
};

// Create project description for modal
const createDescription = (description) => {
  const projectDescription = document.createElement("p");
  projectDescription.classList.add("project-description");
  projectDescription.textContent = description;
  return projectDescription;
};

// Create project link for modal
const createProjectLink = (link) => {
  const projectLink = document.createElement("a");
  projectLink.classList.add("project-link");
  projectLink.href = link;
  projectLink.target = "_blank";
  projectLink.innerHTML =
    ' View Website <i class="fas fa-external-link-alt"></i>';
  return projectLink;
};

// Create project GitHub link for modal
const createGitHubLink = (link) => {
  const gitHubLink = document.createElement("a");
  gitHubLink.classList.add("github-link-modal");
  gitHubLink.href = link;
  gitHubLink.target = "_blank";
  return gitHubLink;
};

// Create project title for modal
const createTitle = (title) => {
  const projectTitle = document.createElement("h2");
  projectTitle.classList.add("project-title-modal");
  projectTitle.textContent = title;
  return projectTitle;
};

// Create modal overlay
const createModalOverlay = (modal) => {
  const modalOverlay = document.createElement("div");
  modalOverlay.classList.add("modal-overlay");
  modalOverlay.addEventListener("click", () => {
    modal.remove();
  });
  return modalOverlay;
};

// Initialize swiper
const initSwiper = () => {
  new Swiper(".swiper", {
    slidesPerView: "auto",
    mousewheel: {
      forceToAxis: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    speed: 800,
  });
};

// Add swiper navigation
const addSwiperNavigation = () => {
  const swiperNavigation = document.createElement("div");
  swiperNavigation.classList.add("swiper-navigation");
  const swiperPrev = document.createElement("div");
  swiperPrev.classList.add("swiper-button-prev", "swiper-navigation-button");
  const swiperNext = document.createElement("div");
  swiperNext.classList.add("swiper-button-next", "swiper-navigation-button");
  swiperNavigation.appendChild(swiperPrev);
  swiperNavigation.appendChild(swiperNext);
  return swiperNavigation;
};

// Create project slides for modal
const createSwiperComponents = (images) => {
  const swiperContainer = document.createElement("div");
  swiperContainer.classList.add("swiper");
  const swiperWrapper = document.createElement("div");
  const pagination = document.createElement("div");
  pagination.classList.add("swiper-pagination");
  swiperWrapper.classList.add("swiper-wrapper");
  swiperContainer.appendChild(pagination);
  swiperContainer.appendChild(addSwiperNavigation());
  images.forEach((image) => {
    const swiperSlide = document.createElement("div");
    swiperSlide.classList.add("swiper-slide");
    const swiperImage = document.createElement("img");
    swiperImage.src = image;
    swiperImage.alt = "Project image";
    swiperSlide.appendChild(swiperImage);
    swiperWrapper.appendChild(swiperSlide);
  });
  swiperContainer.appendChild(swiperWrapper);
  return swiperContainer;
};

// Render project modal
const renderProjectModal = (project) => {
  const modal = document.createElement("div");
  modal.classList.add("modal");
  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");
  const projectInfoContainer = document.createElement("div");
  projectInfoContainer.classList.add("project-info-container");
  const titleContainer = document.createElement("div");
  titleContainer.classList.add("title-container");
  titleContainer.appendChild(createTitle(project.projectTitle));
  titleContainer.appendChild(createGitHubLink(project.gitHubLink));
  const separator = document.createElement("hr");
  separator.classList.add("separator");
  projectInfoContainer.appendChild(titleContainer);
  projectInfoContainer.appendChild(separator);
  projectInfoContainer.appendChild(createDescription(project.description));
  project.hostedLink
    ? projectInfoContainer.appendChild(createProjectLink(project.hostedLink))
    : null;
  modalContent.appendChild(createSwiperComponents(project.images));
  modalContent.appendChild(projectInfoContainer);
  modalContent.appendChild(createCloseBtn(modal));
  modal.appendChild(modalContent);
  modal.appendChild(createModalOverlay(modal));
  document.body.appendChild(modal);
  initSwiper();
};

// Scroll down to contact section on button click
contactBtn.addEventListener("click", () => {
  const contactSection = document.getElementById("contact");
  contactSection.scrollIntoView({
    behavior: "smooth",
  });
});

// Render project tiles on filter button click
buttons.forEach(function (filterBtn) {
  filterBtn.addEventListener("click", () => {
    const dataSetId = filterBtn.dataset.id;
    const currentlyClickedBtn = document.getElementById(dataSetId);
    document.querySelector(".active").classList.remove("active");
    currentlyClickedBtn.classList.add("active");
    addProjectsTiles(dataSetId);
  });
});
