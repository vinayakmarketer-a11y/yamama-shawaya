import React from 'react';
import { RESTAURANT_INFO } from '../data/menuData';

interface BrandHeadingProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const BrandHeading: React.FC<BrandHeadingProps> = ({
  size = 'md',
  showSubtitle = true,
}) => {
  const svgHeight = {
    sm: 'h-9 sm:h-10',
    md: 'h-11 sm:h-13',
    lg: 'h-16 sm:h-20',
  }[size];

  const mascotSize = {
    sm: 'w-10 h-10',
    md: 'w-11 h-11 sm:w-13 sm:h-13',
    lg: 'w-16 h-16 sm:w-20 sm:h-20',
  }[size];

  return (
    <div className="flex items-center gap-2.5 sm:gap-3.5 select-none py-1">
      {/* Chicken Chef Mascot Circular Emblem */}
      <div
        className={`${mascotSize} rounded-full overflow-hidden border-2 border-yellow-400 shadow-md shadow-yellow-500/25 shrink-0 bg-stone-950 transition-transform group-hover:scale-105`}
      >
        <img
          src={RESTAURANT_INFO.logo}
          alt="Yamama Shawaya Mascot"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Main Brand Heading Logotype (Top Left Display) */}
      <div className="flex flex-col justify-center">
        {/* Vector SVG Wordmark with 3D Glossy Yellow Lettering & Thick Contour */}
        <div className="flex items-center">
          <svg
            viewBox="0 0 215 78"
            className={`${svgHeight} w-auto transition-transform group-hover:scale-[1.02]`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Yamama Shawaya"
          >
            <defs>
              <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Shrikhand&family=Titan+One&display=swap');
                .yamama-title {
                  font-family: 'Shrikhand', 'Titan One', cursive, system-ui, sans-serif;
                  font-weight: 900;
                }
              `}</style>

              {/* Vibrant Sunshine Yellow to Golden-Amber Gloss Gradient */}
              <linearGradient id="yamamaGlossYellow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFF875" />
                <stop offset="22%" stopColor="#FFE600" />
                <stop offset="70%" stopColor="#FFCC00" />
                <stop offset="100%" stopColor="#FFA500" />
              </linearGradient>

              {/* Deep Drop Shadow for Standout Presence */}
              <filter id="yamamaShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="#000000" floodOpacity="0.95" />
              </filter>
            </defs>

            <g filter="url(#yamamaShadow)">
              {/* Thick Black Outline Contour for 'Yamama' */}
              <text
                x="8"
                y="36"
                className="yamama-title"
                fontSize="38"
                stroke="#000000"
                strokeWidth="10"
                strokeLinejoin="round"
                strokeLinecap="round"
                fill="#000000"
                letterSpacing="-0.5px"
              >
                Yamama
              </text>

              {/* Thick Black Outline Contour for 'Shawaya' */}
              <text
                x="28"
                y="70"
                className="yamama-title"
                fontSize="34"
                stroke="#000000"
                strokeWidth="9"
                strokeLinejoin="round"
                strokeLinecap="round"
                fill="#000000"
                letterSpacing="-0.5px"
              >
                Shawaya
              </text>

              {/* Vibrant Glossy Yellow Fill for 'Yamama' */}
              <text
                x="8"
                y="36"
                className="yamama-title"
                fontSize="38"
                fill="url(#yamamaGlossYellow)"
                letterSpacing="-0.5px"
              >
                Yamama
              </text>

              {/* Vibrant Glossy Yellow Fill for 'Shawaya' */}
              <text
                x="28"
                y="70"
                className="yamama-title"
                fontSize="34"
                fill="url(#yamamaGlossYellow)"
                letterSpacing="-0.5px"
              >
                Shawaya
              </text>

              {/* Specular White Highlights for 3D Bubbly Sheen */}
              <path
                d="M 17 18 Q 23 14 29 19"
                stroke="#FFFFFF"
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity="0.85"
              />
              <path
                d="M 43 19 Q 49 15 55 20"
                stroke="#FFFFFF"
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity="0.85"
              />
              <path
                d="M 70 19 Q 76 15 82 20"
                stroke="#FFFFFF"
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity="0.85"
              />
              <path
                d="M 98 19 Q 104 15 110 20"
                stroke="#FFFFFF"
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity="0.85"
              />
              <path
                d="M 126 19 Q 132 15 138 20"
                stroke="#FFFFFF"
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity="0.85"
              />

              <path
                d="M 38 52 Q 44 48 50 53"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.85"
              />
              <path
                d="M 68 52 Q 74 48 80 53"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.85"
              />
              <path
                d="M 96 52 Q 102 48 108 53"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.85"
              />
              <path
                d="M 124 52 Q 130 48 136 53"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.85"
              />
            </g>
          </svg>
        </div>

        {/* Tagline Subtitle Ribbon */}
        {showSubtitle && (
          <div className="flex items-center gap-1.5 mt-0.5 pl-1">
            <span className="px-2 py-0.5 rounded-full bg-red-600 text-[8.5px] sm:text-[9.5px] tracking-[0.16em] text-white font-black uppercase font-sans shadow-sm leading-none">
              {RESTAURANT_INFO.slogan}
            </span>
            <span className="text-[10px] text-yellow-400/90 font-serif hidden md:inline">
              {RESTAURANT_INFO.arabicTitle}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
