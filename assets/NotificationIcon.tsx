import { SVGProps } from 'react';
const NotificationIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 128 128"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#filter0_d_48_321)">
      <g filter="url(#filter1_i_48_321)">
        <path
          d="M112 56C112 78.0914 94.0914 96 72 96C49.9086 96 32 78.0914 32 56C32 33.9086 49.9086 16 72 16C94.0914 16 112 33.9086 112 56Z"
          fill="url(#paint0_linear_48_321)"
        />
      </g>
      <g filter="url(#filter2_bii_48_321)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M56 112C78.0914 112 96 94.0914 96 72C96 49.9086 78.0914 32 56 32C33.9086 32 16 49.9086 16 72C16 94.0914 33.9086 112 56 112ZM56 48C59.3137 48 62 50.6863 62 54V74C62 77.3137 59.3137 80 56 80C52.6863 80 50 77.3137 50 74V54C50 50.6863 52.6863 48 56 48ZM62 90C62 93.3137 59.3137 96 56 96C52.6863 96 50 93.3137 50 90C50 86.6863 52.6863 84 56 84C59.3137 84 62 86.6863 62 90Z"
          fill="white"
          fillOpacity={0.4}
        />
      </g>
    </g>
    <defs>
      <filter
        id="filter0_d_48_321"
        x={12}
        y={12}
        width={112}
        height={112}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx={4} dy={4} />
        <feGaussianBlur stdDeviation={4} />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.956863 0 0 0 0 0.364706 0 0 0 0 0.827451 0 0 0 0.2 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_48_321"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_48_321"
          result="shape"
        />
      </filter>
      <filter
        id="filter1_i_48_321"
        x={32}
        y={16}
        width={80}
        height={80}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation={4} />
        <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0"
        />
        <feBlend
          mode="normal"
          in2="shape"
          result="effect1_innerShadow_48_321"
        />
      </filter>
      <filter
        id="filter2_bii_48_321"
        x={12}
        y={28}
        width={88}
        height={88}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation={2} />
        <feComposite
          in2="SourceAlpha"
          operator="in"
          result="effect1_backgroundBlur_48_321"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_backgroundBlur_48_321"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation={2} />
        <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
        />
        <feBlend
          mode="normal"
          in2="shape"
          result="effect2_innerShadow_48_321"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy={4} />
        <feGaussianBlur stdDeviation={4} />
        <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
        />
        <feBlend
          mode="normal"
          in2="effect2_innerShadow_48_321"
          result="effect3_innerShadow_48_321"
        />
      </filter>
      <linearGradient
        id="paint0_linear_48_321"
        x1={72}
        y1={16}
        x2={72}
        y2={96}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FC954B" />
        <stop offset={1} stopColor="#F45DD3" />
      </linearGradient>
    </defs>
  </svg>
);
export default NotificationIcon;
