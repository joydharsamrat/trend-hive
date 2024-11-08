import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient text-center">
      <h1 className="text-6xl font-bold text-primary-700 animate__animated animate__fadeInDown mb-4">
        404
      </h1>
      <p className="text-xl text-white mb-8 animate__animated animate__fadeInUp animate__delay-1s">
        Oops! The page you are looking for does not exist.
      </p>

      <Link href="/" passHref>
        <button className="bg-primary-500 text-white px-6 py-3 rounded-full shadow-md transition-transform transform hover:scale-105 focus:outline-none animate__animated animate__zoomIn animate__delay-2s">
          Go to Home
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
