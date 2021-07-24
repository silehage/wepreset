Array.prototype.random = function () {
  return this[Math.floor((Math.random() * this.length))];
}

class Undangan {
  saveUcapan() {
    // save data to server
   alert('Sample save data. note ini hanya sample js.')
  }
}

class Animate {

  constructor() {
    this.animationIn = [ 'backInLeft', 'backInRight', 'backInUp','zoomIn', 'zoomInDown', 'zoomInLeft', 'zoomInRight', 'zoomInUp', 'slideInRight', 'slideInUp', 'fadeInUp', 'fadeInBottomLeft', 'fadeInBottomright','fadeIn', 'fadeInUp', 'fadeInLeft', 'fadeInRIght']
    this.animationOut = ['zoomOut', 'zoomOutDown', 'zoomOutDown', 'zoomOutDown', 'zoomOutUp', 'backOutDown', 'backOutLeft', 'backOutRight', 'backOutUp', 'bounceOutLeft', 'bounceOutUp', 'fadeOutLeft', 'fadeOutRight', 'fadeOutTopLeft', 'fadeOutTopRight', 'fadeOutBottomRight', 'fadeOutBottomLeft'];

  }

  in(node, animation = 'fadeInUp', prefix = 'animate__',){

    new Promise((resolve, reject) => {
      // node.style.opacity = 1
      const animationName = `${prefix}${animation}`;
      node.classList.add(`${prefix}animated`, animationName);

      function hadleAnimatedInEnd(event) {
        event.stopPropagation();
        node.classList.remove(`${prefix}animated`, animationName);
        resolve('Animation In ended');
      }

      node.addEventListener('animationend', hadleAnimatedInEnd, {once: true});
    
    });
  }
  modal(node, animation = 'zoomInDown', prefix = 'animate__',){

    new Promise((resolve, reject) => {
      node.style.opacity = 1
      const animationName = `${prefix}${animation}`;
      node.classList.add(`${prefix}animated`, animationName);

      function hadleAnimatedInEnd(event) {
        event.stopPropagation();
        node.classList.remove(`${prefix}animated`, animationName);
        resolve('Animation In ended');
      }

      node.addEventListener('animationend', hadleAnimatedInEnd, {once: true});
    
    });
  }

  out(node, animation = 'zoomOutDown', prefix = 'animate__',){

    new Promise((resolve, reject) => {
      const animationName = `${prefix}${animation}`;
      node.classList.add(`${prefix}animated`, animationName);

      function handleAnimatedOutEnd(event) {
        event.stopPropagation();
        node.classList.remove(`${prefix}animated`, animationName);
        node.style.display = 'none'
        resolve('Animation Out ended');
      }

      node.addEventListener('animationend', handleAnimatedOutEnd, {once: true});

    });

  }
  setOut(node, animation){
    const el = document.querySelector(node)
    if(!el) return
    this.out(el, animation)
  }
  setIn(node, animation){
    const el = document.querySelector(node)
    if(!el) return
    this.in(el, animation)
  }

  getRandomOut() {
    return this.animationOut[Math.floor((Math.random()*this.animationOut.length))];
  }
  getRandomIn() {
    return this.animationIn[Math.floor((Math.random()*this.animationIn.length))];
  }
  lazyContent(el, options) {

    let { rootMargin, threshold, animation, className } = options
    let opts = {
      rootMargin,
      threshold,
    }
    el.classList.add(className)
    
    let anim;
    if(!animation || animation == 'random' || animation == undefined) {
      anim = this.getRandomIn()
    } else {
      anim = animation
    }
    
    let clb = (entries) => {
      entries.forEach(entry => {

        if(!entry.isIntersecting) {
          return
          
        } else {
          el.classList.remove(className)
          this.in(entry.target, anim)
          observer.unobserve(entry.target)
        }
      });
    };
    let observer = new IntersectionObserver(clb, opts);

    observer.observe(el)

  }
  lazyImage(el) {

    let opts = {
      rootMargin: '0px',
      threshold: 0,
      animation: 'fadeIn'
    }
    let src = el.src
    el.dataset.src = src
    el.src = '#'

    let clb = (entries) => {
      entries.forEach(entry => {

        if(!entry.isIntersecting) {
          return
          
        } else {
          el.src = el.dataset.src
          el.dataset.src = ''
          this.in(entry.target, opts.animation)
          observer.unobserve(entry.target)
        }
      });
    };
    let observer = new IntersectionObserver(clb, opts);

    observer.observe(el)
  }

}
