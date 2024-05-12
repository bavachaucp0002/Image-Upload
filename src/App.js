import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import CloudUploadIcon from "./assets/icons/cloud-computing.png";
import { v4 as uuidv4 } from "uuid";
import { Container, UploadBodyStyle, UploadStyle } from "./styles";
import "./App.css";

import { FileUpLoadItem } from "./components/FileUpLoadItem";
import { CountFileUploads } from "./components/CountFileUploads";
import { Header } from "./components/Header";
import { FilePreviewItem } from "./components/FilePreviewIten";

const readFile = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = () => {
      reject(reader.error);
    };
    reader.readAsDataURL(file);
  });
};

export default function App() {
  const [files, setFiles] = useState([]);
  const [isUpload, setIsUpload] = useState(false);
  const [uploadingCount, setUploadCount] = useState(0);
  const onDrop = useCallback(
    async (acceptedFiles) => {
      const filesPreview = [];

      for (const file of acceptedFiles) {
        const src = await readFile(file);
        filesPreview.push({
          src,
          fileName: file.name,
          type: file.type,
          size: file.size,
          id: uuidv4(),
          file,
        });
      }

      setFiles([...files, ...filesPreview]);
    },
    [files]
  );

  const { getRootProps, getInputProps, isDragAccept } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
  });

  const onRemoveImage = (index) => () => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const onUpload = () => {
    setIsUpload(!isUpload);
    setUploadCount(0);
    if (isUpload) setFiles([]);
  };

  const onDone = (index) => (status) => {
    const newFiles = [...files];
    newFiles[index].status = status;
    setFiles(newFiles);
    setUploadCount((prev) => prev + 1);
  };

  const handleCancel = (index) => () => {
    const newFiles = [...files];
    newFiles[index].status = "error";
    setFiles(newFiles);
  };

  const isHasFiles = !!files.length;

  return (
    <Container>
      <UploadStyle>
        <Header
          isUpload={isUpload}
          onUpload={onUpload}
          isHasFiles={isHasFiles}
          fileCounts={files?.length}
          uploadingCount={uploadingCount}
        />
        {isUpload ? (
          <div className="images-upload-container">
            {files.map((file, index) => (
              <FileUpLoadItem
                handleCancel={handleCancel(index)}
                key={file.id}
                file={file}
                onDone={onDone(index)}
                canUpload={index <= uploadingCount}
              />
            ))}
          </div>
        ) : (
          <UploadBodyStyle isDragAccept={isDragAccept}>
            <div className="dropzone-container" {...getRootProps()}>
              <input {...getInputProps()} />
              <img src={CloudUploadIcon} width={50} alt="cloud" />
              <span style={{ textAlign: "center", color: "gray" }}>
                Drag files to upload <br />{" "}
                <span style={{ fontSize: "0.8rem" }}>or</span>
              </span>
              <button>Choose files</button>
              <span
                style={{
                  textAlign: "center",
                  fontSize: "0.8rem",
                  color: "gray",
                  lineHeight: 1.5,
                }}
              >
                {/* Max file size: 10MB <br /> */}
                Support types: JPG, PNG
              </span>
            </div>
            <div className={`selected-images-container`}>
              {isHasFiles && (
                <div className="title">{`Selected images (${files.length})`}</div>
              )}
              <div className="images-preview-container">
                {files.map((file, index) => (
                  <FilePreviewItem
                    key={file.id}
                    file={file}
                    onRemove={onRemoveImage(index)}
                  />
                ))}
              </div>
            </div>
          </UploadBodyStyle>
        )}
        {isUpload && <CountFileUploads fileUploads={files} />}
      </UploadStyle>
    </Container>
  );
}
