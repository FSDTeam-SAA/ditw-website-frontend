"use client";
import ErrorContainer from "@/components/shared/ErrorContainer/ErrorContainer";
import Loading from "@/components/shared/Loading/Loading";
import { ReviewResponse } from "@/components/types/reviewDataType";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import AddReview from "./AddReview";
import DeleteModal from "@/components/shared/Modals/DeleteModal";
import { toast } from "react-toastify";
import EditReview from "./EditReview";

const AllReviewData = () => {
  const [isOpen, setIsOpen] = useState(false);
  const session = useSession();
  const token = (session?.data?.user as { token?: string })?.token;

  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const [editFormOpen, setEditFormOpen] = useState(false);

  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error } = useQuery<ReviewResponse>({
    queryKey: ["all-review-data"],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/review-data`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json()),
  });

  const allData = data?.data;

  if (isLoading) {
    return <Loading />;
  } else if (isError) {
    <div className="w-full h-[500px]">
      <ErrorContainer message={error?.message || "Something went Wrong"} />
    </div>;
  }

  const handleDeleteReview = async () => {
    if (!selectedReviewId) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/review-data/${selectedReviewId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await res.json();

      if (res.ok) {
        toast.success("Review deleted successfully!");
        setDeleteModalOpen(false);
        queryClient.invalidateQueries({ queryKey: ["all-review-data"] });
        // Optionally refetch the reviews
      } else {
        toast.error(result?.message || "Failed to delete review.");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete review. Please try again.");
    }
  };

  return (
    <div className="p-10">
      <div className="border rounded-[10px] bg-white shadow-lg px-10 pb-10">
        <div className="w-full flex items-center justify-end pt-5">
          <button
            onClick={() => setIsOpen(true)}
            className="bg-green-500 text-white py-1 px-4 rounded-[10px] text-base font-medium"
          >
            Add Review
          </button>
        </div>
        <h2 className="text-3xl font-bold text-black leading-normal text-center py-6">
          All Review Data
        </h2>
        <table className="w-full">
          <thead>
            <tr className="border-[2px] border-black">
              <th className="border-r-[2px] border-black py-2">SL</th>
              <th className="border-r-[2px] border-black py-2">Name</th>
              <th className="border-r-[2px] border-black py-2">Rating</th>
              <th className="border-r-[2px] border-black py-2">
                Review Message
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allData?.map((item, index) => {
              return (
                <tr key={index} className="border-[2px] border-black">
                  <td className="border-r-[2px] border-black text-center py-2">
                    {index + 1}
                  </td>
                  <td className="border-r-[2px] border-black text-center py-2">
                    {item.name}
                  </td>
                  <td className="border-r-[2px] border-black text-center py-2">
                    {item.star}
                  </td>
                  <td className="border-r-[2px] border-black text-center py-2">
                    {item.content}
                  </td>
                  <td className="w-full flex items-center justify-between px-3 md:px-5 lg:px-7 xl:px-10 py-1">
                    <div>
                      <button
                        onClick={() => {
                          setSelectedReviewId(item.id);
                          setDeleteModalOpen(true);
                        }}
                        className="bg-red-500 text-white py-1 px-4 rounded-[10px] text-base font-medium"
                      >
                        Delete
                      </button>
                    </div>
                    <div className="">
                      <button
                        onClick={() => {
                          setSelectedReviewId(item.id);
                          setEditFormOpen(true);
                        }}
                        className="bg-green-500 text-white py-1 px-4 rounded-[10px] text-base font-medium"
                      >
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* add review modal  */}
        {isOpen && (
          <AddReview open={isOpen} onOpenChange={() => setIsOpen(false)} />
        )}

        {/* Logout modal */}
        {deleteModalOpen && (
          <DeleteModal
            isOpen={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            onConfirm={handleDeleteReview}
          />
        )}

        {/* edit form modal  */}
        {editFormOpen && (
          <EditReview
            open={editFormOpen}
            onOpenChange={() => setEditFormOpen(false)}
            reviewId={selectedReviewId}
          />
        )}
      </div>
    </div>
  );
};

export default AllReviewData;
