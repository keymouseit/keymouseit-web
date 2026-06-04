/* eslint-disable */
// Small, sharp line-icons for failure modes + UI

const ArrowRight = ({ size = 14, stroke = "currentColor" }) => (
  <svg className="arrow" width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path d="M3 8h10M9 4l4 4-4 4" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ArrowUpRight = ({ size = 14, stroke = "currentColor" }) => (
  <svg className="arrow" width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path d="M5 11l6-6M5 5h6v6" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Failure-mode icons — each is a 56x56 diagrammatic glyph
function IconCoordination() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <g stroke="currentColor" strokeWidth="1.25" strokeLinecap="round">
        <circle cx="12" cy="14" r="3.5" />
        <circle cx="44" cy="14" r="3.5" />
        <circle cx="12" cy="42" r="3.5" />
        <circle cx="44" cy="42" r="3.5" />
        <circle cx="28" cy="28" r="2.5" fill="currentColor" opacity="0.4"/>
        {/* broken connections — dashed */}
        <path d="M15 14 H41" strokeDasharray="2 3"/>
        <path d="M12 17 V39" strokeDasharray="2 3"/>
        <path d="M44 17 V39" strokeDasharray="2 3" opacity="0.4"/>
        <path d="M15 42 H41" strokeDasharray="2 3" opacity="0.4"/>
      </g>
    </svg>
  );
}

function IconVisibility() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <g stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="14" width="40" height="28" rx="2" />
        <path d="M8 22 H48" />
        {/* dashboard bars, partly faded */}
        <path d="M14 36 V28" opacity="0.9"/>
        <path d="M20 36 V32" opacity="0.6"/>
        <path d="M26 36 V26" opacity="0.3"/>
        <path d="M32 36 V30" opacity="0.2"/>
        <path d="M38 36 V32" opacity="0.15"/>
        <path d="M44 36 V28" opacity="0.1"/>
        {/* stale tag */}
        <circle cx="42" cy="18" r="1.2" fill="currentColor"/>
      </g>
    </svg>
  );
}

function IconSequencing() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <g stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
        {/* 3 boxes in wrong order */}
        <rect x="6" y="20" width="12" height="16" rx="1.5"/>
        <rect x="22" y="20" width="12" height="16" rx="1.5"/>
        <rect x="38" y="20" width="12" height="16" rx="1.5"/>
        <text x="12" y="31" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="8" fill="currentColor" stroke="none">02</text>
        <text x="28" y="31" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="8" fill="currentColor" stroke="none">03</text>
        <text x="44" y="31" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="8" fill="currentColor" stroke="none">01</text>
        {/* swap arc */}
        <path d="M12 16 Q28 6 44 16" strokeDasharray="2 2"/>
      </g>
    </svg>
  );
}

function IconPlanning() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <g stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" strokeLinecap="round">
        {/* curve: overshoot and undershoot */}
        <path d="M6 30 L14 30 L14 18 L22 18 L22 40 L30 40 L30 24 L38 24 L38 12 L46 12 L46 36 L50 36" />
        {/* target line */}
        <path d="M6 26 H50" strokeDasharray="3 3" opacity="0.5"/>
      </g>
    </svg>
  );
}

function IconLatency() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <g stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="28" cy="28" r="16"/>
        <path d="M28 16 V28 L36 33" />
        {/* tick marks */}
        <path d="M28 10 V12"/>
        <path d="M28 44 V46"/>
        <path d="M10 28 H12"/>
        <path d="M44 28 H46"/>
        {/* alert */}
        <circle cx="44" cy="14" r="3" fill="currentColor" opacity="0.9" stroke="none"/>
      </g>
    </svg>
  );
}

// Case-study layer icons
function LayerGlyph({ kind }) {
  // kind: exec | vis | orch | plan | dec
  const common = { width: 40, height: 40, viewBox: "0 0 40 40", fill: "none" };
  if (kind === "exec") return (
    <svg {...common}><g stroke="currentColor" strokeWidth="1.25" strokeLinecap="round">
      <rect x="6" y="8" width="8" height="8"/><rect x="16" y="8" width="8" height="8"/><rect x="26" y="8" width="8" height="8"/>
      <rect x="6" y="18" width="8" height="8"/><rect x="16" y="18" width="8" height="8" fill="currentColor" opacity="0.25"/><rect x="26" y="18" width="8" height="8"/>
      <rect x="6" y="28" width="8" height="4"/><rect x="16" y="28" width="8" height="4"/><rect x="26" y="28" width="8" height="4"/>
    </g></svg>
  );
  if (kind === "vis") return (
    <svg {...common}><g stroke="currentColor" strokeWidth="1.25" strokeLinecap="round">
      <rect x="6" y="6" width="28" height="28" rx="1.5"/>
      <path d="M6 14 H34"/>
      <path d="M10 26 V20"/><path d="M14 26 V18"/><path d="M18 26 V22"/><path d="M22 26 V16"/><path d="M26 26 V20"/><path d="M30 26 V24"/>
    </g></svg>
  );
  if (kind === "orch") return (
    <svg {...common}><g stroke="currentColor" strokeWidth="1.25" strokeLinecap="round">
      <circle cx="20" cy="20" r="3" fill="currentColor"/>
      <circle cx="8"  cy="10" r="2.5"/><circle cx="32" cy="10" r="2.5"/>
      <circle cx="8"  cy="30" r="2.5"/><circle cx="32" cy="30" r="2.5"/>
      <path d="M10 12 L18 18"/><path d="M30 12 L22 18"/>
      <path d="M10 28 L18 22"/><path d="M30 28 L22 22"/>
    </g></svg>
  );
  if (kind === "plan") return (
    <svg {...common}><g stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 28 L14 22 L20 26 L28 14 L34 18"/>
      <circle cx="6"  cy="28" r="1.5" fill="currentColor"/>
      <circle cx="14" cy="22" r="1.5" fill="currentColor"/>
      <circle cx="20" cy="26" r="1.5" fill="currentColor"/>
      <circle cx="28" cy="14" r="1.5" fill="currentColor"/>
      <circle cx="34" cy="18" r="1.5" fill="currentColor"/>
      <path d="M6 34 H34" strokeDasharray="2 2" opacity="0.5"/>
    </g></svg>
  );
  if (kind === "dec") return (
    <svg {...common}><g stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 L20 34"/>
      <path d="M20 14 L10 22"/>
      <path d="M20 14 L30 22"/>
      <circle cx="20" cy="6" r="2" fill="currentColor"/>
      <circle cx="10" cy="22" r="2"/>
      <circle cx="30" cy="22" r="2"/>
      <circle cx="20" cy="34" r="2" fill="currentColor"/>
    </g></svg>
  );
  return null;
}

function Logo({ height = 38, className, mode = "light", style }) {
  const textColor = mode === "dark" ? "#FFFFFF" : "#343434";

  return (
    <div
      className={className}
      style={{
        display: "inline-block",
        height: `${height}px`,
        ...style
      }}
    >
      <svg
        viewBox="300 0 2300 650"
        height="100%"
        style={{ height: "100%", width: "auto", display: "block" }}
        shapeRendering="geometricPrecision"
        textRendering="geometricPrecision"
        imageRendering="optimizeQuality"
      >
        <g transform="matrix(1.3333333,0,0,-1.3333333,0,1109.3333)">
          {/* ICON GROUP */}
          <g transform="translate(100, 130) scale(0.78)">
            {/* Arrow pointer (light blue) */}
            <g transform="translate(551.8407,340.2126)">
              <path
                fill="#2eb2ef"
                fillOpacity={1}
                fillRule="nonzero"
                stroke="none"
                d="M 0,0 C -1.926,-2.682 -3.825,-2.193 -4.222,1.082 L -22.78,154.503 c -0.397,3.276 1.43,4.325 4.058,2.33 L 104.386,63.42 c 2.629,-1.994 2.092,-3.879 -1.194,-4.188 L 44.14,53.688 c -3.286,-0.309 -7.549,-2.754 -9.475,-5.434 z"
              />
            </g>
            {/* Dark grey laptop panel back */}
            <g transform="translate(523.873,406.3806)">
              <path
                fill={textColor}
                fillOpacity={1}
                fillRule="nonzero"
                stroke="none"
                d="M 0,0 -2.533,26.293 -155.508,67.594 -170.709,49.975 Z"
              />
            </g>
            {/* Yellow accent */}
            <g transform="translate(253.5898,485.5061)">
              <path
                fill="#f6c342"
                fillOpacity={1}
                fillRule="nonzero"
                stroke="none"
                d="m 0,0 99.575,-29.151 15.2,17.619 -45.025,12.157 77.429,25.402 25.682,29.768 z"
              />
            </g>
            {/* Dark grey connector */}
            <g transform="translate(510.0898,538.0061)">
              <path
                fill={textColor}
                fillOpacity={1}
                fillRule="nonzero"
                stroke="none"
                d="m 0,0 129.409,10.082 -11.97,10.513 z"
              />
            </g>
            {/* Red accent */}
            <g transform="translate(461.5942,705.3835)">
              <path
                fill="#f0463b"
                fillOpacity={1}
                fillRule="nonzero"
                stroke="none"
                d="m 0,0 20.132,-17.663 102.272,36.486 29.638,35.344 z"
              />
            </g>
            {/* Teal accent right */}
            <g transform="translate(725.0898,676.0822)">
              <path
                fill="#00a9a0"
                fillOpacity={1}
                fillRule="nonzero"
                stroke="none"
                d="m 0,0 -21.125,-23.554 v -80.522 l -76.436,-13.405 11.97,-10.513 85.591,6.668 z"
              />
            </g>
            {/* Dark grey right outline */}
            <g transform="translate(725.0898,799.2561)">
              <path
                fill={textColor}
                fillOpacity={1}
                fillRule="nonzero"
                stroke="none"
                d="m 0,0 -111.453,-39.706 -29.639,-35.343 119.967,42.799 V -146.728 L 0,-123.174 Z"
              />
            </g>
            {/* Dark grey left outline */}
            <g transform="translate(452.4648,702.1311)">
              <path
                fill={textColor}
                fillOpacity={1}
                fillRule="nonzero"
                stroke="none"
                d="m 0,0 -13.375,-156.75 -12.639,-4.08 -25.682,-29.768 57.071,18.723 L 18.5,-18.25 29.261,-14.411 9.129,3.252 Z"
              />
            </g>
            {/* Teal connector inner */}
            <g transform="translate(686.5887,506.7273)">
              <path
                fill="#00a9a0"
                fillOpacity={1}
                fillRule="nonzero"
                stroke="none"
                d="M 0,0 3.562,-3.129 34.084,27.279 Z"
              />
            </g>
            {/* Dark grey connector inner */}
            <g transform="translate(621.3398,454.5056)">
              <path
                fill={textColor}
                fillOpacity={1}
                fillRule="nonzero"
                stroke="none"
                d="m 0,0 11.5,-8 57.31,57.093 -3.561,3.129 z"
              />
            </g>
          </g>

          {/* TEXT GROUP shifted horizontally to the right, scaled up and vertically aligned */}
          <g transform="translate(680, 250) scale(1.35)">
            {/* Letter K */}
            <g transform="translate(103.2385,249.6384)">
              <path
                fill={textColor}
                fillOpacity={1}
                stroke="none"
                d="m 0,0 38.803,69.933 1.648,2.97 H 37.054 19.511 18.329 L 17.759,71.867 -19.792,3.63 v 67.273 2 h -2 -17.321 -2 v -2 -155.442 -2 h 2 17.321 2 v 2 51.635 l 6.942,11.682 31.678,-64.202 0.551,-1.115 h 1.243 17.765 3.179 l -1.377,2.866 z"
              />
            </g>
            {/* Letter E */}
            <g transform="translate(154.9461,322.5417)">
              <path
                fill={textColor}
                fillOpacity={1}
                stroke="none"
                d="m 0,0 h -2 v -2 -155.442 -2 h 2 63.954 2 v 2 15.766 2 h -2 -44.633 v 51.293 h 35.972 2 v 2 15.544 2 h -2 -35.972 v 49.073 h 44.633 2 v 2 V -2 0 h -2 z"
              />
            </g>
            {/* Letter Y */}
            <g transform="translate(296.1721,322.5417)">
              <path
                fill={textColor}
                fillOpacity={1}
                stroke="none"
                d="M 0,0 H -1.46 L -1.905,-1.391 -24.418,-71.795 -46.725,-1.395 -47.167,0 h -1.464 -17.988 -2.765 l 0.866,-2.626 32.765,-99.4 v -55.416 -2 h 2 17.098 2 v 2 55.414 L 18.331,-2.63 19.204,0 h -2.771 z"
              />
            </g>
            {/* Letter M */}
            <g transform="translate(399.2044,322.5417)">
              <path
                fill="#2eb2ef"
                fillOpacity={1}
                stroke="none"
                d="M 0,0 H -1.642 L -1.961,-1.61 -24.684,-116.038 -48.227,-1.597 -48.555,0 h -1.631 -24.205 -2 v -2 -155.442 -2 h 2 15.101 2 v 2 104.497 l 21.801,-104.684 0.331,-1.592 h 1.627 16.655 1.643 l 0.318,1.613 20.687,104.738 v -104.572 -2 h 2 16.433 2 v 2 V -2 0 h -2 z"
              />
            </g>
            {/* Letter O */}
            <g transform="translate(458.9368,283.9021)">
              <path
                fill="#2eb2ef"
                fillOpacity={1}
                stroke="none"
                d="M 0,0 C 0,13.555 5.528,20.428 16.431,20.428 27.333,20.428 32.862,13.555 32.862,0 v -82.163 c 0,-13.746 -5.375,-20.428 -16.431,-20.428 C 5.528,-102.591 0,-95.718 0,-82.163 Z m 16.431,40.194 c -23.85,0 -37.53,-14.974 -37.53,-41.083 v -80.385 c 0,-12.357 3.231,-22.619 9.343,-29.678 6.553,-7.568 16.036,-11.405 28.187,-11.405 12.249,0 21.797,3.836 28.378,11.402 6.133,7.049 9.374,17.312 9.374,29.681 v 80.385 c 0,26.109 -13.76,41.083 -37.752,41.083"
              />
            </g>
            {/* Letter U */}
            <g transform="translate(580.1765,322.5417)">
              <path
                fill="#2eb2ef"
                fillOpacity={1}
                stroke="none"
                d="m 0,0 h -2 v -2 -118.803 c 0,-13.746 -5.229,-20.427 -15.986,-20.427 -10.907,0 -16.209,6.681 -16.209,20.427 V -2 0 h -2 -17.1 -2 v -2 -117.914 c 0,-12.623 2.985,-22.634 8.869,-29.753 6.336,-7.665 15.68,-11.552 27.773,-11.552 12.191,0 21.599,3.885 27.964,11.548 5.906,7.11 8.9,17.121 8.9,29.757 V -2 0 h -2 z"
              />
            </g>
            {/* Letter S */}
            <g transform="translate(653.9421,250.0622)">
              <path
                fill="#2eb2ef"
                fillOpacity={1}
                stroke="none"
                d="m 0,0 c -11.898,9.664 -23.137,18.792 -23.137,34.284 0,13.446 5.157,19.984 15.765,19.984 10.608,0 15.765,-6.61 15.765,-20.206 v -5.108 -2 h 2 16.432 2 v 2 4.22 c 0,12.559 -3.016,22.501 -8.966,29.547 -6.338,7.507 -15.649,11.313 -27.675,11.313 -23.486,0 -36.42,-14.511 -36.42,-40.86 0,-24.099 15.4,-36.624 28.988,-47.674 11.814,-9.608 22.975,-18.684 22.975,-34.045 0,-13.408 -5.454,-20.206 -16.209,-20.206 -10.756,0 -16.209,6.798 -16.209,20.206 v 9.771 2 h -2 -16.211 -2 v -2 -8.882 c 0,-12.573 3.027,-22.515 8.997,-29.552 6.366,-7.505 15.742,-11.31 27.867,-11.31 23.568,0 37.085,14.894 37.085,40.862 C 29.047,-23.592 13.615,-11.058 0,0"
              />
            </g>
            {/* Letter E */}
            <g transform="translate(696.0867,322.5417)">
              <path
                fill="#2eb2ef"
                fillOpacity={1}
                stroke="none"
                d="m 0,0 h -2 v -2 -155.442 -2 h 2 63.953 2 v 2 15.766 2 h -2 -44.633 v 51.293 h 35.973 2 v 2 15.544 2 h -2 -35.973 v 49.073 h 44.633 2 v 2 V -2 0 h -2 z"
              />
            </g>
            {/* Letter T */}
            <g transform="translate(914.1414,322.5417)">
              <path
                fill={textColor}
                fillOpacity={1}
                stroke="none"
                d="m 0,0 h -74.612 -2 v -2 -15.766 -2 h 2 26.645 v -137.676 -2 h 2 17.321 2 v 2 137.676 H 0 2 v 2 L 2,-2 v 2 z"
              />
            </g>
            {/* Letter i dot */}
            <g transform="translate(829.7625,302.7761)">
              <path
                fill={textColor}
                fillOpacity={1}
                stroke="none"
                d="m 0,0 v 17.766 2 h -2 -17.32 -2 v -2 V 0 Z"
              />
            </g>
            {/* Letter i stem */}
            <g transform="translate(808.4421,291.0349)">
              <path
                fill={textColor}
                fillOpacity={1}
                stroke="none"
                d="m 0,0 v -125.936 -2 h 2 17.32 2 v 2 V 0 Z"
              />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}

Object.assign(window, {
  ArrowRight, ArrowUpRight,
  IconCoordination, IconVisibility, IconSequencing, IconPlanning, IconLatency,
  LayerGlyph, Logo,
});
