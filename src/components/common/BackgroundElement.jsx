import React from 'react';

const BackgroundElement = () => {
  return (
    <div className="relative">
      <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none">
        <svg width="100%" height="100%">
          <defs>
            <linearGradient id="gridGradientLight" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#dbeafe" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="gridGradientDark" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1e40af" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
            </linearGradient>

            {/* Beam Gradient */}
            <linearGradient id="beamGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
            </linearGradient>

            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="url(#gridGradientLight)"
                strokeWidth="1"
                className="dark:stroke-[url(#gridGradientDark)]"
              />
            </pattern>
          </defs>

          {/* Grid */}
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Animated Beams */}
          <g>
            {Array.from({ length: 5 }).map((_, i) => (
              <rect
                key={i}
                x={`${i * 20}%`}
                width="5"
                height="100%"
                fill="url(#beamGradient)"
                className="animate-beamMotion"
                style={{ animationDelay: `${i * 3}s` }}
              />
            ))}
          </g>
        </svg>
      </div>

      <style>{`
        @keyframes beamMotion {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% {
            transform: translateY(100%);
            opacity: 0;
          }
        }
        .animate-beamMotion {
          animation: beamMotion 6s ease-in-out infinite;
        }

        @media (prefers-color-scheme: dark) {
          .dark\\:stroke-\\[url\\(#gridGradientDark\\)\\] {
            stroke: url(#gridGradientDark);
          }
        }
      `}</style>
    </div>
  );
};

export default BackgroundElement;
