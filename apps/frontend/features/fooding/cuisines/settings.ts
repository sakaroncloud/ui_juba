import { Settings } from "react-slick";
export const settings: Settings = {
  dots: false,
  arrows: false,
  speed: 1000,
  slidesToShow: 7,
  swipeToSlide: true,

  autoplay: false,
  autoplaySpeed: 5000,
  adaptiveHeight: true,
  centerPadding: "50px",
  draggable: false,
  responsive: [
    {
      breakpoint: 1240,
      settings: {
        slidesToShow: 5,
      },
    },
    {
      breakpoint: 1040,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};
