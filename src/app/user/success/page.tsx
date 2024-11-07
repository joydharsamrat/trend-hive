import Link from "next/link";

const Success = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient">
      <div className="max-w-lg p-8 bg-white rounded-lg shadow-lg animate__animated animate__fadeInUp">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-green-700 mb-4 animate__animated animate__fadeIn ">
            Order Successful!
          </h1>
          <p className="text-lg text-gray-700 mb-6 animate__animated animate__fadeIn ">
            Thank you for your purchase. Your order has been successfully
            placed. We will process it shortly.
          </p>

          <div className="flex justify-center gap-4">
            <Link
              href="/"
              className="px-6 py-3 bg-green-500 text-white rounded-full text-xl font-semibold hover:bg-green-600 transition duration-300 animate__animated animate__zoomIn "
            >
              Go to Home
            </Link>
            <Link
              href="/user/orders"
              className="px-6 py-3 bg-blue-500 text-white rounded-full text-xl font-semibold hover:bg-blue-600 transition duration-300 animate__animated animate__zoomIn "
            >
              View Orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
