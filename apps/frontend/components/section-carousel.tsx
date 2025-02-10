"use client";
import React, { PropsWithChildren, useRef } from "react";
import { Button } from "@repo/ui/components/button";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider, { Settings } from "react-slick";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";
import SectionTitle from "./section-title";

type Props = {
  title: string;
  subtitle: string;
  settings: Settings;
  dataLength: number;
} & PropsWithChildren;

export const SectionCarousel = ({ ...props }: Props) => {
  const customSlider = useRef<Slider>(null);

  const gotoNext = () => {
    if (customSlider.current) {
      customSlider.current.slickNext();
    }
  };

  const gotoPrev = () => {
    if (customSlider.current) {
      customSlider.current.slickPrev();
    }
  };

  return (
    <div className="container">
      <div className="flex items-center justify-between gap-8">
        <SectionTitle {...props} />
        {props.dataLength > 5 && (
          <div className="flex items-center gap-3">
            <Button
              onClick={gotoPrev}
              variant={"outline"}
              size={"icon"}
              className="rounded-full hover:bg-primary/60 hover:text-white"
            >
              <HiArrowLeft />
            </Button>
            <Button
              onClick={gotoNext}
              variant={"outline"}
              size={"icon"}
              className="rounded-full hover:bg-primary/60 hover:text-white"
            >
              <HiArrowRight />
            </Button>
          </div>
        )}
        {/* Actual Carousel */}
      </div>
      <div className="slider-container pt-6">
        <Slider
          {...props.settings}
          infinite={props.dataLength > 5}
          ref={customSlider}
        >
          {props.children}
        </Slider>
      </div>
    </div>
  );
};
