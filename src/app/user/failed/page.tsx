import Link from "next/link";

const Failed = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient">
      <div className="max-w-lg p-8 bg-white rounded-lg shadow-lg animate__animated animate__fadeInUp">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-700 mb-4 animate__animated animate__fadeIn">
            Payment Failed!
          </h1>
          <p className="text-lg text-gray-700 mb-6 animate__animated animate__fadeIn ">
            Unfortunately, the payment could not be processed. Please try again.
          </p>

          <div className="flex justify-center ">
            <Link
              href="/"
              className="px-6 py-3 bg-red-500 text-white rounded-full text-xl font-semibold hover:bg-red-600 transition duration-300 animate__animated animate__zoomIn "
            >
              Go to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Failed;
