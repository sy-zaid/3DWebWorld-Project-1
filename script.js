function scrollEffect() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}

scrollEffect();

// PAGE - 2 | Javascript
function text_animation(elem, skipped, end = null) {
  let span = "";

  let h1 = document.querySelector(`${elem}`).textContent.split(" ");
  // console.log(typeof(h1))

  let spanned_val = [];
  // h1.forEach((value) => {
  //   if (value != "") {
  //     span += `<span> ${value} </span>`;
  //     document.querySelector(`${elem}`).innerHTML = span;
  //   }
  // });
  for (let i = skipped; i <= h1.length; i++) {
    let value = h1[i];
    // console.log(value)
    if (value != "") {
      span += `<span> ${value} </span>`;
      document.querySelector(`${elem}`).innerHTML = span;
    }
  }
  // console.log(span);
  if (end == null) {
    gsap.to(`${elem}>span`, {
      scrollTrigger: {
        trigger: `${elem}>span`,
        start: `100% bottom`,
        end: `bottom 30%`,
        scroller: `#main`,
        scrub: 0.5,
      },
      stagger: 0.2,
      color: "#fff",
    });
  } else {
    gsap.to(`${elem}>span`, {
      scrollTrigger: {
        trigger: `${elem}>span`,
        start: `top bottom`,
        end: `bottom ${end}`,
        scroller: `#main`,
        scrub: 0.9,
        // markers:true
      },
      stagger: 0.2,
      delay:.5,
      color: "#fff",
    });
  }
}

text_animation(`#page-2>h1`, 0);

// PAGE - 3 | Javascript
function creating_canvas(elem, triggerPoint, endPoint, imageFiles, frameCount) {
  /*Parameter elem: Defines the element the animation will be played on e.g. "canvas-1"
    Parameter triggerPoint: Defines the page/ point where the animation will start or trigger.
    Parameter imageFiles: Contains the source variable of the images.
    frameCount: Number of frames in the canvas.
  
  */
  let canvas = document.querySelector(elem);
  let context = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
  });

  let imagesList = [];
  let imageSeq = {
    frame: 1,
  };

  let sourceOfImages = imageFiles;
  sourceOfImages = sourceOfImages.split("\n");

  function set_image_list(sList, fCount) {
    /*This function sets up the empty array into an array of images along with their paths*/

    for (let i = 0; i < fCount; i++) {
      let newImage = new Image();
      newImage.src = sourceOfImages[i];
      sList.push(newImage);
    }
  }

  set_image_list(imagesList, frameCount);
  console.log(imagesList);

  gsap.to(imageSeq, {
    frame: frameCount - 1,
    snap: `frame`,
    ease: `Power4.eastOut`,
    scrollTrigger: {
      scrub: 0.5,
      scroller: "#main",
      trigger: `${triggerPoint}`,
      start: `top top`,
      end: `250% top`,
    },
    onUpdate: render,
  });

  imagesList[1].onload = render;

  function render() {
    scaleImage(imagesList[imageSeq.frame], context);
  }

  function scaleImage(lImg, cont) {
    let canvas = cont.canvas;
    let hRatio = canvas.width / lImg.width;
    let vRatio = canvas.height / lImg.height;
    max_ratio = Math.max(hRatio, vRatio);
    let centerX = (canvas.width - lImg.width * max_ratio) / 2;
    let centerY = (canvas.height - lImg.height * max_ratio) / 2;
    cont.clearRect(0, 0, canvas.width, canvas.height);
    cont.drawImage(
      lImg,
      0,
      0,
      lImg.width,
      lImg.height,
      centerX,
      centerY,
      lImg.width * max_ratio,
      lImg.height * max_ratio
    );
  }
  ScrollTrigger.create({
    trigger: `${triggerPoint}`,
    pin: true,
    scroller: `#main`,
    start: `top top`,
    end: `${endPoint} top`,
    scrub: 0.8,
  });
}

let museum = `
static/frames00013.png
static/frames00010.png
static/frames00016.png
static/frames00019.png
static/frames00022.png
static/frames00025.png
static/frames00028.png
static/frames00031.png
static/frames00034.png
static/frames00037.png
static/frames00040.png
static/frames00043.png
static/frames00046.png
static/frames00049.png
static/frames00052.png
static/frames00055.png
static/frames00058.png
static/frames00061.png
static/frames00064.png
static/frames00067.png
static/frames00070.png
static/frames00073.png
static/frames00076.png
static/frames00079.png
static/frames00082.png
static/frames00085.png
static/frames00088.png
static/frames00091.png
static/frames00094.png
static/frames00097.png
static/frames00100.png
static/frames00103.png
static/frames00106.png
static/frames00109.png
static/frames00112.png
static/frames00115.png
static/frames00118.png
static/frames00121.png
static/frames00124.png
static/frames00127.png
static/frames00130.png
static/frames00133.png
static/frames00136.png
static/frames00139.png
static/frames00142.png
static/frames00145.png
static/frames00148.png
static/frames00151.png
static/frames00154.png
static/frames00157.png
static/frames00160.png
static/frames00163.png
static/frames00166.png
static/frames00169.png
static/frames00172.png
static/frames00175.png
static/frames00178.png
static/frames00181.png
static/frames00184.png
static/frames00187.png
static/frames00190.png
static/frames00193.png
static/frames00196.png
static/frames00199.png
static/frames00202.png
static/frames00007.png
`;
creating_canvas("canvas", "#page-3", `bottom`, museum, 67);

// PAGE - 4 | JS

text_animation(`#page-4>h1`, 0);

// PAGE - 5 | JS
let bridges = `
static/bridges00004.png
static/bridges00007.png
static/bridges00010.png
static/bridges00013.png
static/bridges00016.png
static/bridges00019.png
static/bridges00022.png
static/bridges00025.png
static/bridges00028.png
static/bridges00031.png
static/bridges00034.png
static/bridges00037.png
static/bridges00040.png
static/bridges00043.png
static/bridges00046.png
static/bridges00049.png
static/bridges00052.png
static/bridges00055.png
static/bridges00058.png
static/bridges00061.png
static/bridges00064.png
static/bridges00067.png
static/bridges00070.png
static/bridges00073.png
static/bridges00076.png
static/bridges00079.png
static/bridges00082.png
static/bridges00085.png
static/bridges00088.png
static/bridges00091.png
static/bridges00094.png
static/bridges00097.png
static/bridges00100.png
static/bridges00103.png
static/bridges00106.png
static/bridges00109.png
static/bridges00112.png
static/bridges00115.png
static/bridges00118.png
static/bridges00121.png
static/bridges00124.png
static/bridges00127.png
static/bridges00130.png
static/bridges00133.png
static/bridges00136.png
static/bridges00139.png
static/bridges00142.png
static/bridges00145.png
static/bridges00148.png
static/bridges00151.png
static/bridges00154.png
static/bridges00157.png
static/bridges00160.png
static/bridges00163.png`;

creating_canvas("#page-5>canvas", "#page-5", `bottom`, bridges, 54);

// PAGE - 6 | JS
text_animation(`#page-6>h1`, 0);

// PAGE - 7 | JS

let pages = `
https://thisismagma.com/assets/home/lore/seq/1.webp?2
https://thisismagma.com/assets/home/lore/seq/2.webp?2
https://thisismagma.com/assets/home/lore/seq/3.webp?2
https://thisismagma.com/assets/home/lore/seq/4.webp?2
https://thisismagma.com/assets/home/lore/seq/5.webp?2
https://thisismagma.com/assets/home/lore/seq/6.webp?2
https://thisismagma.com/assets/home/lore/seq/7.webp?2
https://thisismagma.com/assets/home/lore/seq/8.webp?2
https://thisismagma.com/assets/home/lore/seq/9.webp?2
https://thisismagma.com/assets/home/lore/seq/10.webp?2
https://thisismagma.com/assets/home/lore/seq/11.webp?2
https://thisismagma.com/assets/home/lore/seq/12.webp?2
https://thisismagma.com/assets/home/lore/seq/13.webp?2
https://thisismagma.com/assets/home/lore/seq/14.webp?2
https://thisismagma.com/assets/home/lore/seq/15.webp?2
https://thisismagma.com/assets/home/lore/seq/16.webp?2
https://thisismagma.com/assets/home/lore/seq/17.webp?2
https://thisismagma.com/assets/home/lore/seq/18.webp?2
https://thisismagma.com/assets/home/lore/seq/19.webp?2
https://thisismagma.com/assets/home/lore/seq/20.webp?2
https://thisismagma.com/assets/home/lore/seq/21.webp?2
https://thisismagma.com/assets/home/lore/seq/22.webp?2
https://thisismagma.com/assets/home/lore/seq/23.webp?2
https://thisismagma.com/assets/home/lore/seq/24.webp?2
https://thisismagma.com/assets/home/lore/seq/25.webp?2
https://thisismagma.com/assets/home/lore/seq/26.webp?2
https://thisismagma.com/assets/home/lore/seq/27.webp?2
https://thisismagma.com/assets/home/lore/seq/28.webp?2
https://thisismagma.com/assets/home/lore/seq/29.webp?2
https://thisismagma.com/assets/home/lore/seq/30.webp?2
https://thisismagma.com/assets/home/lore/seq/31.webp?2
https://thisismagma.com/assets/home/lore/seq/32.webp?2
https://thisismagma.com/assets/home/lore/seq/33.webp?2
https://thisismagma.com/assets/home/lore/seq/34.webp?2
https://thisismagma.com/assets/home/lore/seq/35.webp?2
https://thisismagma.com/assets/home/lore/seq/36.webp?2
https://thisismagma.com/assets/home/lore/seq/37.webp?2
https://thisismagma.com/assets/home/lore/seq/38.webp?2
https://thisismagma.com/assets/home/lore/seq/39.webp?2
https://thisismagma.com/assets/home/lore/seq/40.webp?2
https://thisismagma.com/assets/home/lore/seq/41.webp?2
https://thisismagma.com/assets/home/lore/seq/42.webp?2
https://thisismagma.com/assets/home/lore/seq/43.webp?2
https://thisismagma.com/assets/home/lore/seq/44.webp?2
https://thisismagma.com/assets/home/lore/seq/45.webp?2
https://thisismagma.com/assets/home/lore/seq/46.webp?2
https://thisismagma.com/assets/home/lore/seq/47.webp?2
https://thisismagma.com/assets/home/lore/seq/48.webp?2
https://thisismagma.com/assets/home/lore/seq/49.webp?2
https://thisismagma.com/assets/home/lore/seq/50.webp?2
https://thisismagma.com/assets/home/lore/seq/51.webp?2
https://thisismagma.com/assets/home/lore/seq/52.webp?2
https://thisismagma.com/assets/home/lore/seq/53.webp?2
https://thisismagma.com/assets/home/lore/seq/54.webp?2
https://thisismagma.com/assets/home/lore/seq/55.webp?2
https://thisismagma.com/assets/home/lore/seq/56.webp?2
https://thisismagma.com/assets/home/lore/seq/57.webp?2
https://thisismagma.com/assets/home/lore/seq/58.webp?2
https://thisismagma.com/assets/home/lore/seq/59.webp?2
https://thisismagma.com/assets/home/lore/seq/60.webp?2
https://thisismagma.com/assets/home/lore/seq/61.webp?2
https://thisismagma.com/assets/home/lore/seq/62.webp?2
https://thisismagma.com/assets/home/lore/seq/63.webp?2
https://thisismagma.com/assets/home/lore/seq/64.webp?2
https://thisismagma.com/assets/home/lore/seq/65.webp?2
https://thisismagma.com/assets/home/lore/seq/66.webp?2
https://thisismagma.com/assets/home/lore/seq/67.webp?2
https://thisismagma.com/assets/home/lore/seq/68.webp?2
https://thisismagma.com/assets/home/lore/seq/69.webp?2
https://thisismagma.com/assets/home/lore/seq/70.webp?2
https://thisismagma.com/assets/home/lore/seq/71.webp?2
https://thisismagma.com/assets/home/lore/seq/72.webp?2
https://thisismagma.com/assets/home/lore/seq/73.webp?2
https://thisismagma.com/assets/home/lore/seq/74.webp?2
https://thisismagma.com/assets/home/lore/seq/75.webp?2
https://thisismagma.com/assets/home/lore/seq/76.webp?2
https://thisismagma.com/assets/home/lore/seq/77.webp?2
https://thisismagma.com/assets/home/lore/seq/78.webp?2
https://thisismagma.com/assets/home/lore/seq/79.webp?2
https://thisismagma.com/assets/home/lore/seq/80.webp?2
https://thisismagma.com/assets/home/lore/seq/81.webp?2
https://thisismagma.com/assets/home/lore/seq/82.webp?2
https://thisismagma.com/assets/home/lore/seq/83.webp?2
https://thisismagma.com/assets/home/lore/seq/84.webp?2
https://thisismagma.com/assets/home/lore/seq/85.webp?2
https://thisismagma.com/assets/home/lore/seq/86.webp?2
https://thisismagma.com/assets/home/lore/seq/87.webp?2
https://thisismagma.com/assets/home/lore/seq/88.webp?2
https://thisismagma.com/assets/home/lore/seq/89.webp?2
https://thisismagma.com/assets/home/lore/seq/90.webp?2
https://thisismagma.com/assets/home/lore/seq/91.webp?2
https://thisismagma.com/assets/home/lore/seq/92.webp?2
https://thisismagma.com/assets/home/lore/seq/93.webp?2
https://thisismagma.com/assets/home/lore/seq/94.webp?2
https://thisismagma.com/assets/home/lore/seq/95.webp?2
https://thisismagma.com/assets/home/lore/seq/96.webp?2
https://thisismagma.com/assets/home/lore/seq/97.webp?2
https://thisismagma.com/assets/home/lore/seq/98.webp?2
https://thisismagma.com/assets/home/lore/seq/99.webp?2
https://thisismagma.com/assets/home/lore/seq/100.webp?2
https://thisismagma.com/assets/home/lore/seq/101.webp?2
https://thisismagma.com/assets/home/lore/seq/102.webp?2
https://thisismagma.com/assets/home/lore/seq/103.webp?2
https://thisismagma.com/assets/home/lore/seq/104.webp?2
https://thisismagma.com/assets/home/lore/seq/105.webp?2
https://thisismagma.com/assets/home/lore/seq/106.webp?2
https://thisismagma.com/assets/home/lore/seq/107.webp?2
https://thisismagma.com/assets/home/lore/seq/108.webp?2
https://thisismagma.com/assets/home/lore/seq/109.webp?2
https://thisismagma.com/assets/home/lore/seq/110.webp?2
https://thisismagma.com/assets/home/lore/seq/111.webp?2
https://thisismagma.com/assets/home/lore/seq/112.webp?2
https://thisismagma.com/assets/home/lore/seq/113.webp?2
https://thisismagma.com/assets/home/lore/seq/114.webp?2
https://thisismagma.com/assets/home/lore/seq/115.webp?2
https://thisismagma.com/assets/home/lore/seq/116.webp?2
https://thisismagma.com/assets/home/lore/seq/117.webp?2
https://thisismagma.com/assets/home/lore/seq/118.webp?2
https://thisismagma.com/assets/home/lore/seq/119.webp?2
https://thisismagma.com/assets/home/lore/seq/120.webp?2
https://thisismagma.com/assets/home/lore/seq/121.webp?2
https://thisismagma.com/assets/home/lore/seq/122.webp?2
https://thisismagma.com/assets/home/lore/seq/123.webp?2
https://thisismagma.com/assets/home/lore/seq/124.webp?2
https://thisismagma.com/assets/home/lore/seq/125.webp?2
https://thisismagma.com/assets/home/lore/seq/126.webp?2
https://thisismagma.com/assets/home/lore/seq/127.webp?2
https://thisismagma.com/assets/home/lore/seq/128.webp?2
https://thisismagma.com/assets/home/lore/seq/129.webp?2
https://thisismagma.com/assets/home/lore/seq/130.webp?2
https://thisismagma.com/assets/home/lore/seq/131.webp?2
https://thisismagma.com/assets/home/lore/seq/132.webp?2
https://thisismagma.com/assets/home/lore/seq/133.webp?2
https://thisismagma.com/assets/home/lore/seq/134.webp?2
https://thisismagma.com/assets/home/lore/seq/135.webp?2
https://thisismagma.com/assets/home/lore/seq/136.webp?2

`;
creating_canvas(`#page-7>canvas`, `#page-7`, `250%`, pages, 136);

gsap.to(`#page-7>#circle`, {
  scrollTrigger: {
    trigger: `#page-7`,
    start: `top center`,
    end: `bottom top`,
    scroller: `#main`,
    scrub: 0.5,
  },
  scale: 1.6,
});

// PAGE - 9 | JS
text_animation(`#p9-li-1`, 0,end=`50%`);
text_animation(`#p9-li-2`, 0,end=`50%`);
text_animation(`#p9-li-3`, 0,end=`50%`);
text_animation(`#p9-li-4`, 0,end=`50%`);
