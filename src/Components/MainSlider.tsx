// src/components/MainSlider.tsx
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import { useEffect, useState } from 'react';

const slides = [
  { id: 1, image: '/slider-image-1.jpeg', title: 'New Arrivals', subtitle: 'Shop the latest trends now!' },
  { id: 2, image: '/slider-2.jpeg', title: 'Big Sale', subtitle: 'Up to 50% off on top items!' },
  { id: 3, image: '/mainimg.jpeg', title: 'OmarStore Quality', subtitle: 'Trusted by hundreds of customers.' },
];

export default function MainSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      instanceRef.current?.next();
    }, 5000);
    return () => clearInterval(interval);
  }, [instanceRef]);

  return (
    <div className="relative">
      <div
        ref={sliderRef}
        className="keen-slider rounded-xl overflow-hidden shadow-lg mb-10 transition-transform duration-1000"
      >
        {slides.map((slide) => (
          <div key={slide.id} className="keen-slider__slide">
            <div
              className="h-64 md:h-[450px] w-full bg-cover bg-center flex flex-col justify-center items-start px-6 md:px-12 text-white transition duration-1000"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-2 drop-shadow-lg">{slide.title}</h2>
              <p className="text-lg md:text-2xl mb-4 drop-shadow-lg">{slide.subtitle}</p>
              <button className="bg-white text-black font-semibold px-5 py-2 rounded-full hover:bg-gray-200 transition">
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* نقاط أسفل السلايدر */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => instanceRef.current?.moveToIdx(idx)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentSlide === idx ? 'bg-white' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
