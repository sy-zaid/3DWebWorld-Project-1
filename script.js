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

let span = "";

let h1 = document.querySelector("#page-2>h1").textContent.split(" ");
// console.log(typeof(h1))

let spanned_val = [];
h1.forEach((value) => {
  if (value != "") {
    span += `<span> ${value} </span>`;
    document.querySelector("#page-2>h1").innerHTML = span;
  }
});
// console.log(span)

gsap.to("#page-2>h1>span", {
  scrollTrigger: {
    trigger: `#page-2>h1>span`,
    start: `top bottom`,
    end: `bottom top`,
    scroller: `#main`,
    scrub: 0.5,
  },
  stagger: 0.2,
  color: "#fff",
});

// PAGE - 3 | Javascript
function creating_canvas() {
  let canvas = document.querySelector("canvas");
  let context = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
  });

  let frameno = 67;

  let imagesList = [];
  let imageSeq = {
    frame: 1,
  };

  let sourceOfImages = `
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
  sourceOfImages = sourceOfImages.split("\n");

  function set_image_list(sList, fCount) {
    /*This function sets up the empty array into an array of images along with their paths*/

    for (let i = 0; i < fCount; i++) {
      let newImage = new Image();
      newImage.src = sourceOfImages[i];
      sList.push(newImage);
    }
  }

  set_image_list(imagesList, frameno);
  // console.log(imagesList)

  gsap.to(imageSeq, {
    frame: frameno - 1,
    snap: `frame`,
    ease: `Power4.easeOut`,
    scrollTrigger: {
      scrub: .5,
      scroller: "#main",
      trigger: `#page-3`,
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
    trigger: "#page-3",
    pin: true,
    scroller: `#main`,
    start: `top top`,
    end: `bottom top`,
    scrub:0.8
  });
}

creating_canvas();


