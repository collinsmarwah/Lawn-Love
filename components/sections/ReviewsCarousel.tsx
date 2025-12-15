import React, { useState, useEffect } from 'react';
import { Star, CheckCircle, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Review } from '../../types';

interface ReviewsCarouselProps {
  reviews: Review[];
}

export const ReviewsCarousel: React.FC<ReviewsCarouselProps> = ({ reviews }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-play functionality
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, reviews.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
  };

  return (
    <div 
      className="relative max-w-5xl mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Main Carousel Track */}
      <div className="overflow-hidden rounded-2xl bg-brand-card border border-white/5 shadow-2xl">
        <div 
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {reviews.map((review) => (
            <div 
              key={review.id} 
              className="w-full flex-shrink-0 p-8 md:p-12 lg:p-16 flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-brand-green/10 rounded-full flex items-center justify-center mb-8">
                <Quote className="w-8 h-8 text-brand-green" />
              </div>
              
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-6 h-6 ${i < review.rating ? 'fill-brand-green text-brand-green' : 'text-gray-600'}`} 
                  />
                ))}
              </div>

              <blockquote className="text-xl md:text-2xl lg:text-3xl font-medium text-white mb-8 leading-relaxed max-w-3xl">
                "{review.text}"
              </blockquote>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-green to-emerald-600 flex items-center justify-center text-brand-black font-bold text-xl">
                  {review.author.charAt(0)}
                </div>
                <div className="text-left">
                  <div className="font-bold text-white flex items-center gap-2 text-lg">
                    {review.author}
                    {review.verified && <CheckCircle className="w-4 h-4 text-brand-green" />}
                  </div>
                  <div className="text-sm text-gray-400">{review.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button 
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-12 h-12 rounded-full bg-brand-card border border-white/10 text-white flex items-center justify-center hover:bg-brand-green hover:text-brand-black hover:border-brand-green transition-all shadow-lg z-10"
        aria-label="Previous review"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button 
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-12 h-12 rounded-full bg-brand-card border border-white/10 text-white flex items-center justify-center hover:bg-brand-green hover:text-brand-black hover:border-brand-green transition-all shadow-lg z-10"
        aria-label="Next review"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Indicators */}
      <div className="flex justify-center gap-3 mt-8">
        {reviews.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-brand-green w-8' 
                : 'bg-white/20 hover:bg-white/40'
            }`}
            aria-label={`Go to review ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};