"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

type FileUploadProps = {
  label: string;
  file: File | null;
  setFile: (file: File | null) => void;
  existingUrl?: string;
  type?: "image" | "video";
};

export default function FileUpload({
  label,
  file,
  setFile,
  existingUrl,
  type = "image",
}: FileUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    } else if (existingUrl) {
      setPreview(existingUrl);
    } else {
      setPreview(null);
    }
  }, [file, existingUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const removeFile = () => {
    setFile(null);
    setPreview(null);
  };

  return (
    <div className="space-y-2">
      <label className="text-base font-bold text-black">{label}</label>

      <input
        type="file"
        accept={type + "/*"}
        onChange={handleFileChange}
        className="block mt-1"
      />

      {preview && (
        <div className="relative mt-3 w-fit">
          {type === "image" ? (
            <img
              src={preview}
              alt="Preview"
              className="w-32 h-32 object-cover rounded border"
            />
          ) : (
            <video
              src={preview}
              controls
              className="w-48 h-32 object-cover rounded border"
            />
          )}

          <button
            type="button"
            onClick={removeFile}
            className="absolute -top-2 -right-2 bg-white border rounded-full p-1 shadow hover:bg-gray-100"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      )}
    </div>
  );
}

// "use client";

// import type React from "react";

// import Image from "next/image";
// import { Upload, X } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { useState, useEffect } from "react";

// interface FileUploadProps {
//   type: "image" | "video";
//   label: string;
//   file: File | null | string;
//   setFile: (file: File | null) => void;
//   existingUrl?: string;
// }

// const FileUpload: React.FC<FileUploadProps> = ({
//   type,
//   label,
//   file,
//   setFile,
//   existingUrl,
// }) => {
//   const [preview, setPreview] = useState<string | null>(null);

//   // Create and clean up object URLs for previews
//   // useEffect(() => {
//   //   if (file && typeof file !== "string" && file instanceof File) {
//   //     const objectUrl = URL.createObjectURL(file);
//   //     setPreview(objectUrl);

//   //     // Clean up the URL when component unmounts or file changes
//   //     return () => {
//   //       URL.revokeObjectURL(objectUrl);
//   //     };
//   //   }
//   //   else if (existingUrl) {
//   //     setPreview(existingUrl);
//   //   }
//   //   //  else if (typeof file === "string") {
//   //   //   setPreview(file);
//   //   // }
//   //   else {
//   //     setPreview(null);
//   //   }
//   // }, [file, existingUrl]);

//   useEffect(() => {
//     if (file && typeof file !== "string" && file instanceof File) {
//       const objectUrl = URL.createObjectURL(file);
//       setPreview(objectUrl);

//       return () => {
//         URL.revokeObjectURL(objectUrl);
//       };
//     } else if (!file && existingUrl) {
//       setPreview(existingUrl);
//     } else {
//       setPreview(null);
//     }
//   }, [file, existingUrl]);

//   const handleFileDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     const droppedFile = e.dataTransfer.files[0];

//     if (!droppedFile) return;

//     if (type === "image" && droppedFile.type.startsWith("image/")) {
//       setFile(droppedFile);
//     } else if (type === "video" && droppedFile.type.startsWith("video/")) {
//       setFile(droppedFile);
//     } else {
//       alert(`Please upload a valid ${type} file`);
//     }
//   };

//   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFile = e.target.files?.[0];
//     if (!selectedFile) return;

//     if (type === "image" && selectedFile.type.startsWith("image/")) {
//       setFile(selectedFile);
//     } else if (type === "video" && selectedFile.type.startsWith("video/")) {
//       setFile(selectedFile);
//     } else {
//       alert(`Please upload a valid ${type} file`);
//       e.target.value = "";
//     }
//   };

//   return (
//     <div className="space-y-4">
//       <Label className="text-base font-bold text-black">{label}</Label>
//       <div
//         className={`rounded-lg border-2 border-dashed p-4 text-center transition-colors hover:bg-accent/50 ${
//           file ? "border-primary" : "border-muted-foreground/25"
//         }`}
//         onDragOver={(e) => e.preventDefault()}
//         onDrop={handleFileDrop}
//         style={{ height: "160px" }}
//       >
//         {file ? (
//           <div className="relative h-full flex items-center justify-center">
//             {type === "image" ? (
//               <Image
//                 src={preview || "/placeholder.svg?height=200&width=200"}
//                 width={200}
//                 height={200}
//                 alt="Preview"
//                 className="mx-auto max-h-32 rounded object-contain"
//               />
//             ) : (
//               <video
//                 src={preview || ""}
//                 className="mx-auto max-h-32 rounded"
//                 controls
//               />
//             )}
//             <Button
//               type="button"
//               variant="ghost"
//               size="icon"
//               className="absolute -right-2 -top-2"
//               onClick={() => setFile(null)}
//             >
//               <X className="h-4 w-4" />
//             </Button>
//           </div>
//         ) : (
//           <div className="h-full flex flex-col items-center justify-center">
//             <Upload className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
//             <p className="mb-1 text-sm text-muted-foreground">
//               Drag and drop a {type} here or
//             </p>
//             <label className="cursor-pointer text-sm text-primary hover:underline">
//               Click to Upload
//               <input
//                 type="file"
//                 className="hidden"
//                 accept={type === "image" ? "image/*" : "video/*"}
//                 onChange={handleFileSelect}
//               />
//             </label>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FileUpload;

// "use client";

// import { useEffect, useRef, useState } from "react";
// import { UploadCloud, X } from "lucide-react";

// type FileUploadProps = {
//   file: File | null;
//   setFile: (file: File | null) => void;
//   existingUrl?: string;
// };

// export default function FileUpload({ file, setFile, existingUrl }: FileUploadProps) {
//   const [preview, setPreview] = useState<string | null>(null);
//   const [dragging, setDragging] = useState(false);
//   const inputRef = useRef<HTMLInputElement | null>(null);

//   useEffect(() => {
//     if (file) {
//       const url = URL.createObjectURL(file);
//       setPreview(url);
//       return () => URL.revokeObjectURL(url);
//     } else if (existingUrl) {
//       setPreview(existingUrl);
//     } else {
//       setPreview(null);
//     }
//   }, [file, existingUrl]);

//   const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragging(false);
//     const droppedFile = e.dataTransfer.files?.[0] || null;
//     if (droppedFile) setFile(droppedFile);
//   };

//   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selected = e.target.files?.[0] || null;
//     if (selected) setFile(selected);
//   };

//   const removeFile = () => {
//     setFile(null);
//     setPreview(null);
//   };

//   return (
//     <div className="w-full max-w-sm">
//       {!preview ? (
//         <div
//           className={`border-2 border-dashed rounded-md p-6 text-center cursor-pointer transition-colors ${
//             dragging ? "border-blue-400 bg-blue-50" : "border-gray-300"
//           }`}
//           onDragOver={(e) => {
//             e.preventDefault();
//             setDragging(true);
//           }}
//           onDragLeave={() => setDragging(false)}
//           onDrop={handleDrop}
//           onClick={() => inputRef.current?.click()}
//         >
//           <UploadCloud className="mx-auto text-gray-400 mb-2" size={40} />
//           <p className="text-gray-500">Drag and drop a image here or</p>
//           <p className="text-blue-600 font-medium underline">Click to Upload</p>
//           <input
//             type="file"
//             accept="image/*"
//             ref={inputRef}
//             onChange={handleFileSelect}
//             className="hidden"
//           />
//         </div>
//       ) : (
//         <div className="relative w-fit mt-4">
//           <img
//             src={preview}
//             alt="Preview"
//             className="w-40 h-40 object-cover rounded-md border"
//           />
//           <button
//             type="button"
//             onClick={removeFile}
//             className="absolute -top-2 -right-2 bg-white p-1 rounded-full border shadow hover:bg-gray-100"
//           >
//             <X className="w-4 h-4 text-gray-500" />
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// "use client";

// import { useEffect, useRef, useState } from "react";
// import { UploadCloud, X } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";

// type FileUploadProps = {
//   label?: string;
//   file: File | null;
//   setFile: (file: File | null) => void;
//   accept?: string;
//   existingUrl?: string;
// };

// export default function FileUpload({
//   label = "Upload File",
//   file,
//   setFile,
//   accept = "image/*,video/*",
//   existingUrl,
// }: FileUploadProps) {
//   const [preview, setPreview] = useState<string | null>(null);
//   const [dragging, setDragging] = useState(false);
//   const inputRef = useRef<HTMLInputElement | null>(null);

//   useEffect(() => {
//     if (file) {
//       const url = URL.createObjectURL(file);
//       setPreview(url);
//       return () => URL.revokeObjectURL(url);
//     } else if (existingUrl) {
//       setPreview(existingUrl);
//     } else {
//       setPreview(null);
//     }
//   }, [file, existingUrl]);

//   const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setDragging(false);
//     const dropped = e.dataTransfer.files?.[0];
//     if (dropped) setFile(dropped);
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selected = e.target.files?.[0];
//     if (selected) setFile(selected);
//   };

//   const removeFile = () => {
//     setFile(null);
//     setPreview(null);
//   };

//   const renderPreview = () => {
//     if (!preview) return null;

//     if (file?.type.startsWith("video/")) {
//       return (
//         <video
//           src={preview}
//           controls
//           className="w-full max-w-xs rounded-md border shadow-sm"
//         />
//       );
//     }

//     return (
//       <img
//         src={preview}
//         alt="Preview"
//         className="w-full max-w-xs h-48 object-cover rounded-md border shadow-sm"
//       />
//     );
//   };

//   return (
//     <div className="space-y-2">
//       <Label className="font-medium">{label}</Label>

//       {!preview ? (
//         <div
//           onClick={() => inputRef.current?.click()}
//           onDrop={handleDrop}
//           onDragOver={(e) => {
//             e.preventDefault();
//             setDragging(true);
//           }}
//           onDragLeave={() => setDragging(false)}
//           className={`border-2 border-dashed rounded-md p-6 text-center cursor-pointer transition ${
//             dragging ? "border-blue-400 bg-blue-50" : "border-muted"
//           }`}
//         >
//           <UploadCloud className="mx-auto mb-2 text-gray-400" size={32} />
//           <p className="text-sm text-gray-500">Drag and drop or click to upload</p>
//           <input
//             ref={inputRef}
//             type="file"
//             accept={accept}
//             onChange={handleChange}
//             className="hidden"
//           />
//         </div>
//       ) : (
//         <div className="relative w-fit mt-2">
//           {renderPreview()}
//           <Button
//             type="button"
//             variant="ghost"
//             size="icon"
//             className="absolute -top-2 -right-2 bg-white border shadow hover:bg-gray-100"
//             onClick={removeFile}
//           >
//             <X className="w-4 h-4 text-gray-500" />
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// }
