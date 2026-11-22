// src/components/Reviews.jsx

import React, { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiStar } from 'react-icons/fi';
import GlassButton from './GlassButton';
import { supabase } from '../lib/supabase';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Keep the existing testimonial carousel styling. Only the source changes.
  useEffect(() => {
    let active = true;

    async function loadReviews() {
      const { data, error } = await supabase
        .from('client_reviews')
        .select('id, name, role, comment, rating, sort_order')
        .eq('is_published', true)
        .eq('permission_confirmed', true)
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (!active) return;

      if (error) {
        console.error('Could not load client reviews:', error);
        setReviews([]);
        return;
      }

      const nextReviews = (data ?? []).map((review) => ({
        ...review,
        _id: review.id,
      }));
      setReviews(nextReviews);
      setCurrentIndex((previous) =>
        previous < nextReviews.length ? previous : 0
      );
    }

    const onFocus = () => { void loadReviews(); };
    const onVisible = () => {
      if (document.visibilityState === 'visible') void loadReviews();
    };

    void loadReviews();
    window.addEventListener('focus', onFocus);
    document.addEventListener('visibilitychange', onVisible);

    return () => {
      active = false;
      window.removeEventListener('focus', onFocus);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, []);

  const nextReview = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  }, [reviews.length]);

  const prevReview = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  }, [reviews.length]);

  const activeReview = reviews[currentIndex] ?? reviews[0];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => {
      const starNumber = index + 1;

      return (
        <FiStar
          key={starNumber}
          size={20}
          className={
            starNumber <= rating
              ? 'fill-[#EB5E28] text-[#EB5E28]'
              : 'text-[#CCC5B9] dark:text-[#404040]'
          }
        />
      );
    });
  };

  if (reviews.length === 0) {
    return null;
  }

  return (
    <section id="reviews" className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-title block text-center mb-4">
            TESTIMONIALS
          </span>

          <h2 className="font-playfair text-4xl font-semibold text-center mb-16">
            Client Reviews
          </h2>

          <div className="relative max-w-5xl mx-auto">
            {reviews.length > 1 && (
              <>
                <div className="absolute left-[-80px] top-1/2 -translate-y-1/2 hidden lg:block">
                  <GlassButton
                    onClick={prevReview}
                    className="p-3 icon-only"
                    aria-label="Previous review"
                  >
                    <FiChevronLeft size={20} />
                  </GlassButton>
                </div>

                <div className="absolute right-[-80px] top-1/2 -translate-y-1/2 hidden lg:block">
                  <GlassButton
                    onClick={nextReview}
                    className="p-3 icon-only"
                    aria-label="Next review"
                  >
                    <FiChevronRight size={20} />
                  </GlassButton>
                </div>
              </>
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="testimonial-card mx-auto text-center"
              >
                <div className="flex flex-col items-center justify-center space-y-4">
                  <p className="text-[#252422] dark:text-[#EDEDED] text-lg italic">
                    “{activeReview.comment}”
                  </p>

                  <h3 className="text-2xl font-playfair font-semibold text-[#252422] dark:text-[#EDEDED]">
                    {activeReview.name}
                  </h3>

                  <p className="text-[#403D39] dark:text-[#B0B0B0]">
                    {activeReview.role}
                  </p>

                  <div className="flex gap-1 justify-center">
                    {renderStars(activeReview.rating)}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {reviews.length > 1 && (
              <div className="flex justify-center items-center mt-8 gap-4">
                <div className="flex lg:hidden">
                  <GlassButton
                    onClick={prevReview}
                    className="p-3 icon-only"
                    aria-label="Previous review"
                  >
                    <FiChevronLeft size={20} />
                  </GlassButton>
                </div>

                <div className="flex justify-center gap-2">
                  {reviews.map((review, index) => (
                    <button
                      key={review._id}
                      onClick={() => setCurrentIndex(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex
                          ? 'w-8 bg-[#EB5E28]'
                          : 'w-2 bg-[#CCC5B9] dark:bg-[#404040] hover:bg-[#EB5E28]/50'
                      }`}
                      aria-label={`Go to review ${index + 1}`}
                      type="button"
                    />
                  ))}
                </div>

                <div className="flex lg:hidden">
                  <GlassButton
                    onClick={nextReview}
                    className="p-3 icon-only"
                    aria-label="Next review"
                  >
                    <FiChevronRight size={20} />
                  </GlassButton>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Reviews;