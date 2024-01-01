export default function LoadingAnimation() {
  return (
    <div className="flex flex-col justify-center items-center mx-auto w-[300px] h-[275px] rounded-xl">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          style={{
            margin: "auto",
            background: "none",
            display: "block",
            shapeRendering: "auto",
          }}
          width="200px"
          height="200px"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid"
        >
          <g>
            <circle cx={60} cy={50} r={4} fill="#e76a24">
              <animate
                attributeName="cx"
                repeatCount="indefinite"
                dur="0.8474576271186441s"
                values="95;35"
                keyTimes="0;1"
                begin="-0.7906s"
              />
              <animate
                attributeName="fill-opacity"
                repeatCount="indefinite"
                dur="0.8474576271186441s"
                values="0;1;1"
                keyTimes="0;0.2;1"
                begin="-0.7906s"
              />
            </circle>
            <circle cx={60} cy={50} r={4} fill="#e76a24">
              <animate
                attributeName="cx"
                repeatCount="indefinite"
                dur="0.8474576271186441s"
                values="95;35"
                keyTimes="0;1"
                begin="-0.3894s"
              />
              <animate
                attributeName="fill-opacity"
                repeatCount="indefinite"
                dur="0.8474576271186441s"
                values="0;1;1"
                keyTimes="0;0.2;1"
                begin="-0.3894s"
              />
            </circle>
            <circle cx={60} cy={50} r={4} fill="#e76a24">
              <animate
                attributeName="cx"
                repeatCount="indefinite"
                dur="0.8474576271186441s"
                values="95;35"
                keyTimes="0;1"
                begin="0s"
              />
              <animate
                attributeName="fill-opacity"
                repeatCount="indefinite"
                dur="0.8474576271186441s"
                values="0;1;1"
                keyTimes="0;0.2;1"
                begin="0s"
              />
            </circle>
          </g>
          <g transform="translate(-15 0)">
            <path
              d="M50 50L20 50A30 30 0 0 0 80 50Z"
              fill="#1c4595"
              transform="rotate(90 50 50)"
            />
            <path d="M50 50L20 50A30 30 0 0 0 80 50Z" fill="#1c4595">
              <animateTransform
                attributeName="transform"
                type="rotate"
                repeatCount="indefinite"
                dur="0.8474576271186441s"
                values="0 50 50;45 50 50;0 50 50"
                keyTimes="0;0.5;1"
              />
            </path>
            <path d="M50 50L20 50A30 30 0 0 1 80 50Z" fill="#1c4595">
              <animateTransform
                attributeName="transform"
                type="rotate"
                repeatCount="indefinite"
                dur="0.8474576271186441s"
                values="0 50 50;-45 50 50;0 50 50"
                keyTimes="0;0.5;1"
              />
            </path>
          </g>
        </svg>
      </div>
      <div className="text-black text-2xl font-bold">Calling API</div>
    </div>
  )
}
