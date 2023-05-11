import classNames from 'classnames';
import { useKeenSlider } from 'keen-slider/react';
import Image from 'next/future/image';
import React, { FC, useState } from 'react';

const testimonials = [
  {
    id: 1,
    quote:
      'Super thick and non-irritating. Smells great and relieved my dry skin and eczema patches. Beyond impressed!',
    attribution: 'Stephanie Rosenwinkel',
    role: 'LavenderShea Hand & Body',
  },
  {
    id: 2,
    quote:
      'I have been using day creams for all my adult life and I can honestly say this is my favorite. It is light enough to wear all day without the cream feeling heavy or oily. It is very refreshing and a little goes a long way. ',
    attribution: 'Bardia Maghami',
    role: 'Daily Moisturizer',
  },
  {
    id: 3,
    quote:
      'I tried a sample of this amazing toner and ended up buying multiple bottles. As soon as I spray it, I can just feel my skin soaking it up - it feels so hydrating and refreshing. ',
    attribution: 'Jinny',
    role: 'Rosewater Facial Toner',
  },
  {
    id: 4,
    quote:
      'I love how this cleanser lathers and cleans without stripping my skin of all of its moisture. It makes it easy to clean off makeup and face products. My skin feels soft and clean every time!',
    attribution: 'Hannah',
    role: 'Wild Oats & Honey Facial',
  },
];

const Testimonials: FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      mode: 'snap',
      breakpoints: {
        '(max-width: 767px)': {
          slides: { origin: 'center', perView: 1.5, spacing: 5 },
        },
        '(min-width: 678px)': {
          slides: { origin: 'center', perView: 2.2, spacing: 24 },
        },
      },
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
    },
    [
      (slider) => {
        let timeout: ReturnType<typeof setTimeout>;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 5000);
        }
        slider.on('created', () => {
          slider.container.addEventListener('mouseover', () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener('mouseout', () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on('dragStarted', clearNextTimeout);
        slider.on('animationEnded', nextTimeout);
        slider.on('updated', nextTimeout);
      },
    ]
  );

  return (
    <section>
      <div className="max-w-2xl mx-auto lg:max-w-none">
        <div className="md:flex md:items-center md:justify-between md:flex-col mb-20">
          <h2 className="text-52 font-medium text-center -tracking-2 text-neutral">
            What are people saying?
          </h2>
        </div>

        <div ref={sliderRef} className="keen-slider">
          {testimonials.map((testimonial, i) => (
            <blockquote
              key={testimonial.id}
              className={'overflow-visible keen-slider__slide'}
            >
              <div
                className={classNames(
                  'absolute -top-[8%] -left-[2%] w-[110%] h-[120%] z-30',
                  currentSlide !== i ? '' : ''
                )}
              ></div>
              <div
                className={classNames(
                  ' bg-white rounded-[100px] rounded-bl-none px-10 py-6 md:p-16 text-center transition duration-500 blur-0 filter opacity-100',
                  currentSlide !== i ? ' blur-sm opacity-25' : ''
                )}
              >
                <Image
                  src="/images/icons-solid-quote@3x.png"
                  width={24}
                  height={24}
                  alt="icons-quote"
                  className="m-auto mb-6"
                />
                <div className="sm:flex flex justify-between flex-col flex-1 text-center">
                  <p className=" text-dark text-xs md:text-2xl font-medium font-raleway">
                    {testimonial.quote}
                  </p>
                  <div className="flex justify-between flex-col">
                    <p className="mt-8 block font-normal text-base md:text-base text-neutral">
                      - {testimonial.attribution} - {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
