import React, { useEffect, useRef } from "react";

const App = () => {
  const path = useRef(null);
  let progress = 0;
  let time = Math.PI / 2;
  const lerp = (x, y, a) => x * (1 - a) + y * a;
  let reqId = null;
  let x = 0.5;

  const manageMouseEnter = () => {
    if (reqId) {
      window.cancelAnimationFrame(reqId);
      resetAnimation();
    }
  };

  useEffect(() => {
    setPath(progress);
  }, []);

  const setPath = (progress) => {
    const { innerWidth } = window;
    const width = innerWidth * 0.7;
    path.current.setAttributeNS(
      "",
      "d",
      `M0 50 Q${width * x} ${50 + progress} , ${width} 50 `
    );
  };

  const manageMouseMove = (e) => {
    const { movementY, clientX } = e;
    const { left, width } = path.current.getBoundingClientRect();
    x = (clientX - left) / width;
    progress += movementY;
    setPath(progress);
  };
  const manageMouseLeave = () => {
    animateOut();
  };
  const animateOut = () => {
    const newProgress = progress * Math.sin(time);

    time += 0.2;
    setPath(newProgress);
    progress = lerp(progress, 0, 0.025);

    if (Math.abs(progress) > 0.75) {
      reqId = window.requestAnimationFrame(animateOut);
    } else {
      resetAnimation();
    }
  };

  const resetAnimation = () => {
    time = Math.PI / 2;
    progress = 0;
  };
  return (
    <div className="h-screen w-full flex justify-center items-center  text-white ">
      <div className="w-[70vw] mx-auto">
        <div className="h-px w-full relative ">
          <div
            onMouseEnter={manageMouseEnter}
            onMouseMove={manageMouseMove}
            onMouseLeave={manageMouseLeave}
            className="h-10 hover:h-[150px] hover:top-[-75px]     relative -top-5 z-1 "
          ></div>
          <svg className="w-full h-[100px] top-[-50px] absolute">
            <path
              stroke="white"
              ref={path}
              fill="transparent"
              strokeWidth={1}
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default App;
