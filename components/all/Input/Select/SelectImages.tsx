// "use client";

// // file select and upload
// const primary = "#2A4C52";
// import { useDropzone } from "react-dropzone";
// import React, { FC, useCallback, useMemo, useState } from "react";
// import Image from "next/image";
// interface FIleUploadProps {
//   maxFiles: number;
//   setFiles: (files: File[]) => void;
// }
// const SelectImages: FC<FIleUploadProps> = ({ maxFiles, setFiles }) => {
//   const [files, setUploadFiles] = useState<File[]>([]);
//   const onDrop = useCallback(
//     (acceptFiles: File[]) => {
//       const totalFiles = files.length + acceptFiles.length;
//       if (totalFiles < maxFiles) {
//         setFiles([...files, ...acceptFiles]);
//         setUploadFiles([...files, ...acceptFiles]);
//       } else {
//         alert(`you can upload up to ${maxFiles} files only`);
//       }
//     },
//     [files, maxFiles, setFiles]
//   );
//   const removeFiles = (fileName: string) => {
//     const updateFiles = files.filter((file) => file.name !== fileName);
//     setFiles(updateFiles);
//     setUploadFiles(updateFiles);
//   };
//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     multiple: true,
//   });

//   const acceptedFiles = useMemo(
//     () =>
//       files.map((file) => (
//         <li
//           key={file.name + Math.random()}
//           style={{ borderRadius: "3px" }}
//           className=" text-white my-7 p-8  rounded-lg bg-slate-700  flex items-center justify-between"
//         >
//           <span>
//             {file.name}-{file.size} bytes
//           </span>
//           <button
//             className=" ml-2 bg-red-500 text-white hover:bg-red-600 px-2 rounded-md"
//             onClick={() => removeFiles(file.name)}
//           >
//             Remove
//           </button>
//         </li>
//       )),
//     []
//   );
//   return (
//     <div>
//       <div {...getRootProps()} className="">
//         <input {...getInputProps()} />
//         <span className=" text-white">
//           Drag & Drop files here or click to select files
//         </span>
//       </div>
//       <aside>
//         <h4>
//           Selected Files({files.length}/{maxFiles}){" "}
//         </h4>
//         <ul>{acceptedFiles}</ul>
//       </aside>
//     </div>
//   );
// };

// export default SelectImages;

import React, { FC, useCallback, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";

// Define the ImageColor type
type ImageColor = {
  color: string;
  files: File[];
};

interface SelectImagesProps {
  maxFiles: number;
  setFiles: (files: ImageColor[]) => void;
}

const SelectImages: FC<SelectImagesProps> = ({ maxFiles, setFiles }) => {
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setImageFiles(acceptedFiles);
  }, []);

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  const handleUpload = () => {
    if (!selectedColor) {
      alert("Please select a color before uploading images.");
      return;
    }

    if (imageFiles.length === 0) {
      alert("Please upload at least one image.");
      return;
    }

    const newImageColor: ImageColor = {
      color: selectedColor,
      files: imageFiles,
    };
    setFiles((prevFiles) => [...prevFiles, ...newImageColor]);

    // Reset state after upload
    setImageFiles([]);
    setSelectedColor("");
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const acceptedFiles = useMemo(
    () =>
      imageFiles.map((file) => (
        <li key={file.name} className="file-item">
          {file.name} - {file.size} bytes
        </li>
      )),
    [imageFiles]
  );

  return (
    <div>
      <div className="color-selection">
        <label htmlFor="color">Select Color:</label>
        <input
          type="text"
          id="color"
          value={selectedColor}
          onChange={(e) => handleColorChange(e.target.value)}
        />
      </div>

      <div className="dropzone" {...getRootProps()}>
        <input {...getInputProps()} />
        <span>Drag & Drop files here or click to select files</span>
      </div>

      <aside>
        <h4>
          Selected Files ({imageFiles.length}/{maxFiles})
        </h4>
        <ul>{acceptedFiles}</ul>
        <button onClick={handleUpload}>Upload</button>
      </aside>
    </div>
  );
};

export default SelectImages;
