import React, { useState } from 'react';
import { Camera, ZoomIn, X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { GalleryItem } from '../lib/api';
import { INITIAL_GALLERY } from '../lib/initialData';

interface GallerySectionProps {
  gallery: GalleryItem[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({ gallery }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const effectiveGallery = (gallery && gallery.length > 0) ? gallery : INITIAL_GALLERY;

  const categories = ['All', 'Classrooms'];

  const filteredItems = effectiveGallery.filter((item) =>
    activeCategory === 'All' ? true : item.category === activeCategory
  );

  return (
    <section id="gallery" className="py-20 md:py-28 bg-gradient-to-b from-white via-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full ios-glass-pill text-slate-800 text-xs font-bold tracking-wider uppercase mb-3 shadow-xs border border-slate-200/80">
            <Camera className="w-3.5 h-3.5 text-red-600" /> Campus & Infrastructure
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Inside <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-600">Our Institute</span>
          </h2>
          <div className="w-16 h-1 bg-red-600 mx-auto mt-4 rounded-full" />
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Take a look inside our fully air-conditioned classrooms, lecture setups, and modern educational spaces at Madangir, New Delhi.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id || idx}
              onClick={() => setSelectedImageIndex(idx)}
              className="group relative rounded-3xl overflow-hidden bg-slate-200 aspect-4/3 shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1.5 cursor-pointer border border-slate-200/80"
            >
              <img
                src={item.image_url}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                loading="lazy"
              />

              {/* iOS Frosted Glass Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent opacity-90 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5 sm:p-6 text-white">
                <div className="flex items-end justify-between gap-3">
                  <div className="min-w-0">
                    <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-amber-400 block mb-1">
                      {item.category}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white leading-snug truncate">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-xs text-slate-300 font-normal line-clamp-1 mt-0.5 hidden sm:block">
                        {item.description}
                      </p>
                    )}
                  </div>
                  <div className="w-10 h-10 rounded-2xl ios-glass-dark flex items-center justify-center text-white group-hover:bg-red-600 transition-colors flex-shrink-0 shadow-md">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedImageIndex !== null && filteredItems[selectedImageIndex] && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-4"
          onClick={() => setSelectedImageIndex(null)}
        >
          <div
            className="relative w-full max-w-[min(900px,calc(100vw-1.5rem))] bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImageIndex(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-slate-800/90 hover:bg-slate-700 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/10"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <button
              onClick={() =>
                setSelectedImageIndex(
                  (prev) => (prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : 0)
                )
              }
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/10"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={() =>
                setSelectedImageIndex(
                  (prev) => (prev !== null ? (prev + 1) % filteredItems.length : 0)
                )
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/10"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="max-h-[65vh] sm:max-h-[75vh] flex items-center justify-center p-3 sm:p-4 bg-slate-950">
              <img
                src={filteredItems[selectedImageIndex].image_url}
                alt={filteredItems[selectedImageIndex].title}
                className="max-h-[60vh] sm:max-h-[70vh] max-w-full object-contain rounded-2xl"
              />
            </div>

            <div className="p-4 sm:p-5 bg-slate-900 border-t border-slate-800 text-white text-center">
              <h4 className="text-base sm:text-lg font-bold">{filteredItems[selectedImageIndex].title}</h4>
              <p className="text-xs text-slate-400 mt-1">{filteredItems[selectedImageIndex].description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
