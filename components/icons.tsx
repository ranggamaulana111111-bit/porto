import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function base({ size = 20, strokeWidth = 1.6, ...props }: IconProps) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    ...props,
  };
}

export const ArrowUpRight = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

export const ArrowDown = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 5v14M6 13l6 6 6-6" />
  </svg>
);

export const Mail = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

export const GitHub = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M9 19c-4 1.5-4-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.3 4.3 0 0 0-.1-3.2s-1-.3-3.4 1.3a11.6 11.6 0 0 0-6 0C6.3 1.5 5.3 1.8 5.3 1.8a4.3 4.3 0 0 0-.1 3.2A4.6 4.6 0 0 0 3.9 8.2c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
  </svg>
);

export const LinkedIn = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 0 1 4 0v4M11 17v-7" />
  </svg>
);

export const Twitter = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 4l7 9M4 20l7-7M20 4l-7 8M14 13l6 7" />
  </svg>
);

export const WhatsApp = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3 21l1.6-4.3A8 8 0 1 1 8 19l-5 2z" />
    <path d="M9 9c0 3 2 5 5 5 .8 0 1.4-.2 2-.5" />
  </svg>
);

export const Compass = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="m15.5 8.5-2 5-5 2 2-5 5-2z" />
  </svg>
);

export const Gauge = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 18a8 8 0 1 1 16 0" />
    <path d="M12 14l4-4" />
    <circle cx="12" cy="14" r="1" />
  </svg>
);

export const Sparkle = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2 2M16 16l2 2M18 6l-2 2M8 16l-2 2" />
  </svg>
);

export const Handshake = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3 13l4-4 4 4M21 13l-4-4-4 4M7 13l3 3 4-4 3 4" />
  </svg>
);

export const Send = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 12l16-8-6 16-3-7-7-1z" />
  </svg>
);

export const Menu = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const Close = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const Check = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 12l5 5 9-10" />
  </svg>
);

export const Clock = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

export const Pin = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
);

export const Quote = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M7 7h4v4c0 2-1.5 3.5-4 4M13 7h4v4c0 2-1.5 3.5-4 4" />
  </svg>
);

export const Search = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

export const External = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M14 5h5v5M19 5l-8 8M19 13v6H5V5h6" />
  </svg>
);
