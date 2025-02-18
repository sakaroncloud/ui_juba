"use client";
import React, { Suspense } from "react";
import { GalleryGrid } from "../gallery-grid";
import { AsyncDropZone } from "../form/async-dropzone";
import { useGalleryContext } from "@/components/providers/gallery-context";

type Props = {
  uploadEndPoint: string;
  fetchEndPoint: string;
  multiple?: boolean;
};

export const DropzoneAndMediaWrapper = ({
  fetchEndPoint,
  uploadEndPoint,
  multiple,
}: Props) => {
  const { open } = useGalleryContext();
  return (
    <div className="p-4 rounded-lg ">
      {open && <AsyncDropZone endPoint={uploadEndPoint} multiple={multiple} />}
      <Suspense>
        <GalleryGrid
          uploadEndPoint={uploadEndPoint}
          fetchEndPoint={fetchEndPoint}
        />
      </Suspense>
    </div>
  );
};
