"use client";
import React, { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Upload } from "antd";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { UploadHandler } from "@/lib/actions/action.upload";

const { Dragger } = Upload;

type Props = {
    setShowLibrary?: React.Dispatch<React.SetStateAction<boolean>>;
    endPoint: string;
    multiple?: boolean;
};

export const AsyncDropZone = ({ endPoint, setShowLibrary, multiple = false }: Props) => {
    const [fileList, setFileList] = useState<any[]>([]);
    const queryClient = useQueryClient()

    const handleCustomRequest: UploadProps["customRequest"] = async ({
        file,
        onSuccess,
        onError,
    }: any) => {

        try {
            if (file instanceof File) {
                if (file.size > 1024 * 1024) {
                    toast.error("File size should be less than 1MB")
                    onError(new Error("File size should be less than 1MB"));
                    setFileList([]);
                    return
                }
            }
            const formData = new FormData();
            formData.append("images", file as any); //

            const response = await UploadHandler(
                formData,
                endPoint,
            );

            if (response.statusCode == 201) {
                // Display success message
                toast.success(`Uploaded successfully.`);
                // Call `onSuccess` with a proper response
                onSuccess(response, file);
                // Update file list
                setFileList([]);
                queryClient.invalidateQueries()

                // Optionally show the library if `setShowLibrary` exists
                if (setShowLibrary) {
                    setShowLibrary(true);
                }

            } else {
                // Handle server-side errors
                onError(new Error(response?.message || "Upload failed"));
                toast.error(response?.message || `upload failed.`);
            }
        } catch (error) {
            // Handle client-side errors
            onError(error);
            toast.error(`Failed to upload . Please try again.`);
        }
    };

    const handleChange: UploadProps["onChange"] = (info) => {
        setFileList([...info.fileList]);
    };


    return (
        <div >
            <Dragger
                name="file"
                multiple={multiple}
                listType="picture-card"
                customRequest={handleCustomRequest}

                fileList={fileList}
                onChange={handleChange}
                className="w-full pb-4"
            >
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                    Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibited from uploading
                    company data or other banned files.
                </p>
            </Dragger>
        </div>
    );
};