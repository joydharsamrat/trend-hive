/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  useAddReviewMutation,
  useGetProductReviewsQuery,
} from "@/redux/features/review/review.api";
import React, { useEffect } from "react";
import { FieldValues } from "react-hook-form";
import Loader from "../shared/Loader";
import THForm from "../form/THForm";
import THInput from "../form/THInput";
import { useUser } from "@/context/userProvider";
import toast from "react-hot-toast";

const ProductReview = ({ productId }: { productId: string }) => {
  const { user } = useUser();
  const { data, isLoading } = useGetProductReviewsQuery(productId);
  const [addReview] = useAddReviewMutation();

  useEffect(() => console.log(data), [data]);

  const onSubmit = async (data: FieldValues) => {
    const reviewData = {
      user: user?._id,
      feedback: data.feedback,
      product: productId,
    };
    const loadingToast = toast.loading("loading...");
    try {
      const res = await addReview(reviewData);
      console.log(res);
      toast.success("Login successful!", { id: loadingToast });
    } catch (error: any) {
      toast.error(error?.data?.message || "Login failed. Please try again.", {
        id: loadingToast,
      });
      console.log(error);
    }
  };

  useEffect(() => console.log(data), [data]);

  if (isLoading) {
    return <Loader />;
  }

  const reviews = data.data.data;

  return (
    <div className="mt-8 max-w-6xl mx-auto">
      {user ? (
        <div>
          {user.role === "user" && (
            <THForm onsubmit={onSubmit}>
              <h3 className="text-lg font-semibold mb-4">Add a Review</h3>
              <THInput label="Feedback" name="feedback" required type="text" />
              <button type="submit" className=" btn-primary">
                Submit Review
              </button>
            </THForm>
          )}
        </div>
      ) : (
        <p className="text-sm text-red-500 text-center">
          Login to provide feedback
        </p>
      )}

      <div className="space-y-4 my-5">
        <h3 className="text-lg font-semibold">Reviews</h3>
        {reviews.length > 0 ? (
          reviews?.map((review: any) => (
            <div key={review._id} className="p-4 bg-gray-100 rounded shadow-sm">
              <div className="flex justify-between">
                <span className="font-semibold">{review.user.name}</span>
                <span className="text-sm text-gray-500">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="mt-1">{review.feedback}</p>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProductReview;
