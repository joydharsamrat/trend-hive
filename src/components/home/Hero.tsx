import React from "react";
import Link from "next/link";
import Image from "next/image";
import heroImg from "../../assets/image/hero.png";

const Hero: React.FC = () => {
  return (
    <section className="bg-gradient text-background-100 py-16 px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:justify-between">
        {/* Text Section */}
        <div className="lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate__animated animate__fadeInDown">
            Discover the Latest Trends
          </h1>
          <p className="text-lg md:text-xl text-neutral-300 mb-6 animate__animated animate__fadeInLeft ">
            Shop the season’s must-have items
          </p>
          <Link
            href="/shop"
            className="btn-secondary animate__animated animate__fadeInLeft animate__slower"
          >
            Shop Now
          </Link>
        </div>

        {/* Image Section */}
        <div className="lg:w-1/2 flex justify-center">
          <div className="animate__animated animate__zoomIn ">
            <Image
              src={heroImg}
              alt="E-commerce products collage"
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
