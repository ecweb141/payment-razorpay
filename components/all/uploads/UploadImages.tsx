import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { fireStorage } from "@/lib/firebase";

interface fileProps {
  files: File[];
}

import React, { FC } from "react";

export type ImageColor = {
  color: string;
  files: File[];
};

const UploadImages: FC<fileProps> = async ({ files }) => {
  const fileLinks: string[] = [];
  if (!files) {
    return null;
  }
  try {
    console.log(files, "files are already provided");
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const storageRef = ref(fireStorage, file.name);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      fileLinks.push(downloadURL);
      console.log(`file ${file.name} uploaded successFully`);
    }
    console.log("File Links ", fileLinks);
  } catch (error) {
    console.log("Error uploading files");
  }
};

export default UploadImages;
