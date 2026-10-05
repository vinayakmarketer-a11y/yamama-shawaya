import React, { useState, useMemo } from 'react';
import { Search, Flame, Sparkles, GlassWater } from 'lucide-react';
import { MENU_CATEGORIES, MAIN_FOOD_ITEMS, ALL_MOJITOS } from '../data/menuData';
import { MenuCard } from './MenuCard';
import { MojitoShowcaseCard } from './MojitoShowcaseCard';

export const MenuSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredFoodItems = useMemo(() => {
    return MAIN_FOOD_ITEMS.filter((item) => {
      const matchesCategory =
        activeCategory === 'all' || item.categoryId === activeCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Check if Mojitos should be displayed
  const showMojitoShowcase = useMemo(() => {
    if (activeCategory === 'mojitos') return true;
    if (activeCategory === 'all') {
      if (!searchQuery) return true;
      const matchesMojito = ALL_MOJITOS.some(
        (m) =>
          m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      return matchesMojito;
    }
    return false;
  }, [activeCategory, searchQuery]);

  return (
    <section id="menu" className="py-16 sm:py-24 bg-[#0b0c0e] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
            <span>Our Signature Offerings</span>
            <span aria-hidden="true">·</span>
            <span>Real Arabian Flavours</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight text-balance">
            AUTHENTIC SHAWAYA MENU
          </h2>

          <p className="text-sm sm:text-base text-stone-400 max-w-xl mx-auto leading-relaxed">
            Slow-roasted rotisserie chicken cooked over charcoal, authentic Yemen-style spiced rice, fluffy Kubus flatbreads, and chilled artisanal fruit mojitos.
          </p>
        </div>

        {/* Search and Category Filter Bar */}
        <div className="space-y-4 mb-10">
          {/* Search bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Search shawaya, rice, mojitos, flavours..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#121316] text-white placeholder-stone-500 rounded-xl border border-stone-800 focus:border-yellow-400 focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Tabs (Segmented control style) */}
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {MENU_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-yellow-400 text-stone-950 shadow-md shadow-yellow-500/20'
                      : 'bg-[#121316] text-stone-400 hover:text-white hover:bg-stone-850 border border-stone-800/80'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Pricing Guide Quick Strip for Main Categories */}
        {activeCategory === 'all' && !searchQuery && (
          <div className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-[#121316] border border-stone-800/80 hover:border-yellow-500/30 transition-colors flex items-center justify-between">
              <div>
                <span className="text-xs text-yellow-400 uppercase tracking-wider font-bold block">
                  Category 1 · Shawaya Chicken
                </span>
                <span className="text-xs text-stone-400">Pure charcoal roasted chicken</span>
              </div>
              <div className="text-right font-mono text-xs text-stone-300">
                <span className="text-yellow-400 font-black">F: ₹660</span> · H: ₹340 · Q: ₹180
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#121316] border border-stone-800/80 hover:border-yellow-500/30 transition-colors flex items-center justify-between">
              <div>
                <span className="text-xs text-yellow-400 uppercase tracking-wider font-bold block">
                  Category 2 · Shawaya + Kubus
                </span>
                <span className="text-xs text-stone-400">With fresh clay oven kubus</span>
              </div>
              <div className="text-right font-mono text-xs text-stone-300">
                <span className="text-yellow-400 font-black">F: ₹460</span> · H: ₹240 · Q: ₹130
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#121316] border border-stone-800/80 hover:border-yellow-500/30 transition-colors flex items-center justify-between">
              <div>
                <span className="text-xs text-yellow-400 uppercase tracking-wider font-bold block">
                  Category 3 · Bishawari Rice
                </span>
                <span className="text-xs text-stone-400">Fragrant basmati rice only</span>
              </div>
              <div className="text-right font-mono text-xs text-stone-300">
                <span className="text-yellow-400 font-black">F: ₹300</span> · H: ₹160 · Q: ₹90
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="space-y-10">
          {/* Main Food Items Grid */}
          {filteredFoodItems.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredFoodItems.map((item) => (
                <MenuCard key={item.id} item={item} />
              ))}
            </div>
          )}

          {/* Dedicated Mojito Showcase Card (Single Image with full flavor list) */}
          {showMojitoShowcase && (
            <div className="pt-2">
              <MojitoShowcaseCard />
            </div>
          )}

          {filteredFoodItems.length === 0 && !showMojitoShowcase && (
            <div className="text-center py-16 bg-[#121316] rounded-2xl border border-stone-850 p-8">
              <p className="text-base text-stone-300">No dishes found matching "{searchQuery}"</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="mt-3 text-xs font-semibold text-amber-400 hover:underline cursor-pointer"
              >
                Reset filters and view full menu
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
