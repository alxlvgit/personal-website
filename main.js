// Target filter buttons, default filter button, swiper navigation
const buttons = document.querySelectorAll('button.filter-button');
const defaultBtn = document.getElementById("all");
const swiperNavigation = document.querySelectorAll(".swiper-nav");
const contactBtn = document.querySelector(".contact-btn");

// Initialize swiper
const swiper = new Swiper('.swiper', {
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    breakpoints: {
        600: {
            allowTouchMove: false
        }
    }
});

// Set the default filter button active on window load
window.addEventListener("load", () => {
    defaultBtn.classList.add("active");
    defaultBtn.click();
});

// Hide Swiper navigation if only one slide available
const hideSwiperNavButtons = (hideButtons) => {
    swiperNavigation.forEach(button => {
        if (hideButtons) {
            button.classList.add("swiper-button-hidden");
        } else {
            button.classList.remove("swiper-button-hidden");
        }
    });
}

// Add slides to Swiper based on the data set 
const addSlides = (dataSetId) => {
    swiper.removeAllSlides();
    hideSwiperNavButtons(false);
    const swiperDataSet = swiperData[dataSetId];
    if (swiperDataSet.length < 2) {
        hideSwiperNavButtons(true);
    }
    swiperDataSet.forEach((slideData, index) => {
        swiper.addSlide(index, `<div class="swiper-slide">
        <img src = "${slideData.path}">
       <a class="github-swiper" href="${slideData.gitHubLink}">
       <h2 class="project-title">${slideData.projectTitle}</h2>
       <span class="github"></span>
       </a>
        </div>`);
    });
    swiper.slideTo(1, 0, false);
}

// Populate filtered slides in Swiper on button click
buttons.forEach(function (filterBtn) {
    filterBtn.addEventListener('click', () => {
        const dataSetId = filterBtn.dataset.id;
        const currentlyClickedBtn = document.getElementById(dataSetId);
        document.querySelector(".active").classList.remove("active");
        currentlyClickedBtn.classList.add("active");
        addSlides(dataSetId);
    });
});

// Scroll down to contact section on button click
contactBtn.addEventListener("click", () => {
    const contactSection = document.getElementById("contact");
    contactSection.scrollIntoView({
        behavior: "smooth"
    })
})
