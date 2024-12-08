import React from "react";
import img1 from "../../images/happy.png";
import img2 from "../../images/creative.png";
import img3 from "../../images/learn.png";
import img4 from "../../images/Explore.png";
import img5 from "../../images/fun.png";

import img10 from "../../images/ey.png";
import img17 from "../../images/light.png";
import img18 from "../../images/gem.png";
import Footer from "../../components/Footer";
import mainImg from "../../images/faq-team/hub.png";
import lets from "../../images/lets.png";

const LandingPage = () => {
  return (
    <div style={{ fontFamily: 'Poppins' }}>
      {/* Main Container */}
      <div className="bg-[#EB9721] w-full px-5 sm:px-5 relative">
        {/* Tagline Section with shadow */}
        <div className="bg-[#EBCEA8] w-full flex flex-col-reverse lg:flex-row justify-center items-center pb-10 lg:pb-20 relative h-auto lg:h-[100%]">
          {/* Center: Tagline in the center of the cover */}
          <div className="flex flex-col items-center justify-center w-full lg:max-w-[50%] px-4 lg:px-0">
            <h2
              className="text-[3rem] lg:text-[3.8rem] font-bold leading-tight text-center mt-[4vh] lg:mt-[12vh]"
              style={{ textShadow: "2px 2px 2px #EB9721", opacity: 100 }}
            >
              Early Learners Hub
            </h2>
            <p
              className="text-[2rem] lg:text-[1.8rem] leading-snug font-poppins ml-[-3rem] text-left mt-4"
              style={{ opacity: 0.8 }}
            >
              Where learning meets play, You can <br /> <span className="ml-[4rem]">game your way to growth!</span>
            </p>
          </div>

          {/* Right: Main Image */}
          <div className="w-full lg:max-w-[50%] flex justify-center lg:justify-end items-center">
            <img
              src={mainImg}
              alt="Main"
              className="h-[20vh] mt-3 mr-5 lg:h-[50vh] max-h-[50vh] object-cover w-full lg:w-[300%] transform rounded-3xl"
            />
          </div>
        </div>

        {/* Activities Section with shadow */}
        <div className="bg-[#EBCEA8] w-full py-8 lg:py-2 relative">
          <div className="text-[1.5rem] font-semibold mb-2 text-center lg:text-center">
            EXPLORE FUN ACTIVITIES
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 px-4 lg:px-5">
            {[
              { img: img1, title: "Happy Learning" },
              { img: img2, title: "Creative Playtime" },
              { img: img3, title: "Giggle and Learn" },
              { img: img4, title: "Let's Explore" },
              { img: img5, title: "Fun is Here!" },
            ].map((item, idx) => (
              <div className="text-center" key={idx}>
                <img
                  src={item.img}
                  alt={item.title}
                  className="rounded-lg object-cover w-full h-[120px] lg:h-[200px] border-2 border-[#EB9721] transition-transform duration-300 transform hover:scale-105"
                />
                <div className="text-lg font-semibold mt-4">{item.title}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#EBCEA8] w-full px-4 lg:px-20 py-8 lg:py-10 shadow-lg">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <div className="flex flex-col gap-4 w-full lg:w-[50%] ml-0 lg:ml-[10rem]">
              {/* Additional content can be added here */}
            </div>

            <div className="w-full lg:w-[50%] flex justify-center relative mt-10 lg:mt-0">
              {/* Additional content can be added here */}
            </div>
          </div>

          {/* Pillars of Strength Section */}
          <div
            className="text-center text-[2rem] lg:text-[30px] mt-[4rem] lg:mt-[1rem] font-bold"
            style={{ fontFamily: "'Poppins'" }}
          >
            PILLARS OF STRENGTH
          </div>

          {/* Mission, Vision, Values Section with shadow */}
          <div className="flex flex-wrap justify-around mt-10 ">
            {[
              {
                img: img10,
                title: "Our Mission",
                description:
                  "To create a safe, engaging, and enjoyable learning platform that supports early childhood education, providing interactive content that helps kids learn and grow.",
              },
              {
                img: img17,
                title: "Our Vision",
                description:
                  "To inspire a love of learning in kindergarten kids through fun, interactive, and educational activities.",
              },
              {
                img: img18,
                title: "Our Values",
                description:
                  "Our values prioritize fun, basic skills, creativity, safety, and inclusion collaborating with teachers, parents, and experts to create a secure, kid-friendly platform.",
              },
            ].map((pillar, idx) => (
              <div
                key={idx}
                className="text-center mb-10 lg:mb-0 p-4 lg:p-6 rounded-lg w-full sm:w-[45%] lg:w-[20%] h-auto lg:h-[50vh] bg-white bg-opacity-60 transition-transform duration-300 transform hover:scale-105 hover:shadow-lg"
                style={{ border: "2px solid #EB9721 " }}
              >
                <img
                  src={pillar.img}
                  alt={pillar.title}
                  className="mx-auto mb-4 lg:mb-6 w-[20%] lg:w-[30%]"
                />
                <h3 className="text-md lg:text-lg font-semibold mb-2 lg:mb-4">
                  {pillar.title}
                </h3>
                <p className="text-sm lg:text-base">{pillar.description}</p>
              </div>
            ))}
          </div>
          {/* Additional Section */}
          <div className="w-full h-[20vh] flex gap-9 justify-center items-center mt-5">
            <h2 className="w-[50vw] text-[1.3rem] text-center">
              Choose EarlyLearners Hub for an engaging, supportive, and
              effective learning journey that empowers your child to succeed!
            </h2>
            <img src={lets} alt="run" className="w-[10%] object-center" />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LandingPage;
