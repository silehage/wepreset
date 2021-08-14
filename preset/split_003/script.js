
/**
 *  Initialization class Animate
 */

const animate = new Animate();

/**
 * Welcome Modal
 * add Class to body tag
 */

/** 
 * define modal 
 * fixing open both modal & popup
*/
let is__modal = false;
let is__fulscreen = false;

const welcomeModal = document.getElementById('welcome');
if(welcomeModal) {
  document.body.classList.add('is__modal')
  welcomeModal.querySelector('#welcome__btn').addEventListener('click', welcomeModalOut)
  is__modal = true
} else {
  setProkes()
}

function welcomeModalOut() {
  animate.setOut('.modal__content', animate.getRandomOut())
  
  setTimeout(() => {
    document.body.classList.remove('is__modal')
    animate.setOut('.modal', 'fadeOut')
    animate.setIn('#content', 'fadeIn')
    playMusic()
    is__modal= false

    // if(openFullscreen()) {
    //   is__fulscreen = true
    // }
    setProkes()

  }, 500)
}

/** Request fullscreen */
function openFullscreen() {
  if (document.body.requestFullscreen) {
    return document.body.requestFullscreen();

  } else if (document.body.webkitRequestFullscreen) { /* Safari */
    return document.body.webkitRequestFullscreen();

  } else if (document.body.msRequestFullscreen) { /* IE11 */
    return document.body.msRequestFullscreen();
  }

  return false;
}

/** select all section with .section class to be animated */

let sections = [];
const panelSecond = document.querySelector('.panel__second')
if(panelSecond) sections = panelSecond.querySelectorAll('.section')

/**  Aimation options */
const options = {
  rootMargin: '0px', /** Observer property */
  threshold: 0.2, /** Observer property */
  animation: '', /** set animation name or leave blank for random animation */
  className: 'animate' /** animate class with opacity 0 */
}

/** looping section element */ 
sections.forEach(el => {
  if (el.id == 'gallery') return  /** escape gallery element */
  animate.lazyContent(el, options)
})

/**
 * Lazy Image Photo gallery
 */

let galleries = [];

const galleryContainer = document.getElementById('gallery')
if (galleryContainer) {
  galleries = galleryContainer.querySelectorAll('img')
}

if (galleries.length) {
  galleries.forEach(img => {
    animate.lazyImage(img)
  })
}

/** TabMenu smooth scroll */

let tabMenus= []
tabMenus = document.querySelectorAll('.tab');

tabMenus.forEach(tab => {
  tab.addEventListener('click', function (e) {
    e.preventDefault()
    isActiveMenu = this
    document.querySelector(this.dataset.target).scrollIntoView({
      behavior: 'smooth'
    });
  })
})

/**
 *  Music Audio
 */
const musicContainer = document.getElementById('music')
const iconPlay = `<svg width="20" height="20" fill="currentColor"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 84.86"><title>volume</title><path d="M11.32,19.85H33.89L52.56,1a3.55,3.55,0,0,1,5,0,3.48,3.48,0,0,1,1,2.51h0V81.3a3.56,3.56,0,0,1-6.1,2.49l-18.45-15H11.32A11.35,11.35,0,0,1,0,57.49V31.17A11.37,11.37,0,0,1,11.32,19.85ZM74.71,31.62A3.32,3.32,0,0,1,81,29.51c1.14,3.39,1.69,8.66,1.6,13.67s-.81,9.72-2.19,12.57a3.33,3.33,0,0,1-6-2.91c1-2,1.47-5.76,1.55-9.77a38.19,38.19,0,0,0-1.27-11.45Zm17.14-12.4A3.32,3.32,0,0,1,98,16.67c3.08,7.4,4.75,16.71,4.89,26s-1.21,18.25-4.14,25.51a3.31,3.31,0,0,1-6.15-2.47c2.6-6.44,3.79-14.67,3.67-23s-1.63-16.86-4.41-23.5ZM108.42,8.68a3.32,3.32,0,1,1,6-2.88,89.44,89.44,0,0,1,8.48,37.53c.1,12.58-2.44,25.12-8,35.81a3.31,3.31,0,1,1-5.89-3c5-9.71,7.32-21.17,7.23-32.72a82.47,82.47,0,0,0-7.83-34.7Z"/></svg>`
const iconPause = `<svg width="20" height="20" fill="currentColor"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 96"><title>volume-mute</title><path d="M12.81,22.46H38.34L59.46,1.18a4,4,0,0,1,5.66,0A3.91,3.91,0,0,1,66.31,4h0V92a4,4,0,0,1-6.9,2.81l-20.87-17H12.81A12.84,12.84,0,0,1,0,65V35.27A12.84,12.84,0,0,1,12.81,22.46Zm100.62,8.09a5.48,5.48,0,0,1,7.82,0,5.62,5.62,0,0,1,0,7.89L111.83,48l9.45,9.59a5.57,5.57,0,0,1-.06,7.85,5.49,5.49,0,0,1-7.79,0L104,55.9l-9.4,9.55a5.5,5.5,0,0,1-7.82,0,5.63,5.63,0,0,1,0-7.9L96.23,48,86.78,38.4a5.56,5.56,0,0,1,.06-7.84,5.47,5.47,0,0,1,7.79,0l9.4,9.52,9.4-9.54Z"/></svg>`

let playBtn;
let audioSrc;
if(musicContainer) {
  playBtn = musicContainer.querySelector('.play__btn');
  audioSrc = musicContainer.querySelector('#audio__source');

  playBtn.innerHTML = iconPause
  playBtn.addEventListener('click', playMusic)
}


function playMusic() {
  if(!musicContainer) return 
  if (isPlaying()) {
    audioSrc.pause()
    playBtn.innerHTML = iconPause
  } else {
    audioSrc.play()
    playBtn.innerHTML = iconPlay
  }
}
function isPlaying() {
  return !audioSrc.paused
}

/** 
 * Prokes Popup
 */
let has__popup = false;
let prokesCard = null;
let prokesContainer = document.getElementById('prokes');

const setProkes = function() {
  if(prokesContainer) {
    prokesContainer.style.zIndex = -1
    prokesCard = prokesContainer.querySelector('.card')
    prokesContainer.querySelector('.card__close').addEventListener('click', prokesAnimateOut)
    
    if(is__fulscreen) {
      prokesAnimObserve()
    }
      window.addEventListener('scroll', prokesAnimScroll);
  }
}

function prokesAnimObserve() {
  if(!prokesContainer) return
  prokesContainer.style.position = 'relative'
  let observer = new IntersectionObserver( function(entries, observer) {
    entries.forEach(entry => {
      if(!entry.isIntersecting) {
        return
      } else {
        prokesAnimateIn()
        observer.unobserve(entry.target)
      }
    })
  },{rootMargin: '0px'})
  observer.observe(prokesContainer)
}

function prokesAnimScroll() {
  if(window.scrollY > 1479 && window.scrollY < 2281 && !has__popup && !is__modal) {
    prokesAnimateIn()
  }

}
function prokesAnimateIn () {
   if(!prokesContainer) return
    prokesContainer.style.position = 'fixed'
    prokesContainer.style.opacity = 1
    prokesContainer.style.zIndex = 350
    document.body.classList.add('no-scroll')
    setTimeout(() => {
      animate.modal(prokesCard, animate.getRandomIn())
    },300)
    has__popup = true
}
function prokesAnimateOut () {
   animate.out(prokesCard, 'zoomOut')
    setTimeout(() => {
      prokesContainer.style.opacity = 0
      prokesContainer.style.zIndex = -1
      document.body.classList.remove('no-scroll')
    },700)
    setTimeout(() => {
      prokesContainer.style.display = 'none'
    },1500)
}
