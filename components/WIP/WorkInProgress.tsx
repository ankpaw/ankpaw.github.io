import React from "react";
import Lottie from "react-lottie";
import devAnimation from "../../animations/developer.json";
/**
 * This is the work in progress component, use it wherever development is still ongoing
 * @return {JSX.Element}: The JSX code for work in progress component.
 */
const Home = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: devAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      <Lottie options={defaultOptions} height={400} width={400} />
      <h1 className="text-center text-4xl text-blue-900">Work in Progress!</h1>
    </div>
  );
};
export default Home;
