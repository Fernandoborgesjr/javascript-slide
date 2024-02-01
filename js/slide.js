export class Slide {
  constructor({ slide, wrapper }) {
    this.slide = document.querySelector(slide);
    this.wrapper = document.querySelector(wrapper);
    this.distance = {
      finalPosition: 0,
      startX: 0,
      movement: 0,
    };

    this.init();
  }

  init() {
    this.bindEvents();
    this.addSlideEvents();
    this.slidesConfig();
    return this;
  }

  slidesConfig() {
    this.slides = [...this.slide.children].map((element) => {
      const position = this.slidePosition(element);
      return { element, position };
    });
  }

  slidePosition(slide) {
    const margin = (this.wrapper.offsetWidth - slide.offsetWidth) / 2;
    return -(slide.offsetLeft - margin);
  }

  chageSlide(index) {
    const activeSlide = this.slides[index]
    this.moveSlide(activeSlide.position);
    this.slidesIndexNav(index);
    this.distance.finalPosition = activeSlide.position

  }

  slidesIndexNav(index) {
    const last = this.slides.length - 1;
    this.index = {
      prev: index ? index - 1 : undefined,
      active: index,
      next: index === last ? undefined : index + 1,
    };
  }

  /**
   * @param {MouseEvent|TouchEvent} event
   */
  onStart(event) {
    let movetype;
    if (event.type === "mousedown") {
      event.preventDefault();
      this.distance.startX = event.clientX;
      movetype = "mousemove";
    } else {
      this.distance.startX = event.changedTouches[0].clientX;
      movetype = "touchmove";
    }

    this.wrapper.addEventListener(movetype, this.onMove);
  }

  /**
   * @param {MouseEvent|TouchEvent} event
   */
  onEnd(event) {
    const movetype = event.type === "mouseup" ? "mousemove" : "touchmove";
    this.wrapper.removeEventListener(movetype, this.onMove);
    this.distance.finalPosition = this.distance.movePosition;
  }

  /**
   * @param {MouseEvent|TouchEvent} event
   */
  onMove(event) {
    const pointerPosition =
      event.type === "mousemove"
        ? event.clientX
        : event.changedTouches[0].clientX;
    const finalPosition = this.updatePosition(pointerPosition);
    this.moveSlide(finalPosition);
  }

  updatePosition(clientX) {
    this.distance.movement = (this.distance.startX - clientX) * 1.5;
    return this.distance.finalPosition - this.distance.movement;
  }

  moveSlide(distX) {
    this.distance.movePosition = distX;
    this.slide.style.transform = `translate3d(${distX}px, 0, 0)`;
  }

  addSlideEvents() {
    ["mousedown", "touchstart"].forEach((event) =>
      this.wrapper.addEventListener(event, this.onStart)
    );
    ["mouseup", "touchend"].forEach((event) =>
      this.wrapper.addEventListener(event, this.onEnd)
    );
  }

  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }
}
