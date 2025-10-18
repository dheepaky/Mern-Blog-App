import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
export default function BlogDetailSkeleton() {
  return (
    <div className="flex flex-col md:flex-row gap-6 p-5">
      {/* Left Section - Blog List */}

      <div className="w-full md:w-[70%]">
        <div className="border border-gray-300 rounded-lg p-4 mb-6 shadow-sm bg-white">
          <Stack spacing={2}>
            <h2 className="text-xl font-semibold mb-5">
              <Skeleton
                variant="text"
                sx={{ fontSize: "1.25rem" }}
                width="10%"
              />
            </h2>
            {/* Title */}

            {/* Image */}
            <Skeleton variant="rectangular" height={200} />

            <Skeleton variant="text" width="85%" />
            <Skeleton variant="text" width="70%" />

            {/* Button */}
            <Skeleton variant="rounded" width={100} height={36} />
          </Stack>
        </div>
      </div>
      <div className="w-full md:w-[30%]">
        <h1 className="text-center text-2xl font-bold mb-4">
          <Skeleton variant="text" height={100} />
        </h1>
        <Skeleton variant="rectangular" height={200} />
        <h1 className="text-3xl font-bold mb-6">
          <Skeleton variant="text" />
        </h1>
      </div>
    </div>
  );
}
