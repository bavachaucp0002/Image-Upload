import React, { memo, useCallback, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { ReactComponent as Close } from "./assets/icons/close.svg";
import CloudUploadIcon from "./assets/icons/cloud-computing.png";
import { v4 as uuidv4 } from "uuid";

const COLORS = {
  done: "indigo",
  loading: "cyan",
  error: "red",
};
const dummydata = [
  {
    fileName: "File - 1.jpg",
    size: "20MB",
    status: "done",
  },
  {
    fileName: "File - 2.jpg",
    size: "30MB",
    status: "loading",
  },
  {
    fileName: "File - 3.jpg",
    size: "40MB",
    status: "error",
  },
];

const cloneDeep = (data) => JSON.parse(JSON.stringify(data));

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
  const [isUploading, setIsUploading] = useState(false);
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
        });
      }

      setFiles([...files, ...filesPreview]);
    },
    [files]
  );

  const { getRootProps, getInputProps, isDragAccept, isFocused } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
  });

  const onRemoveImage = (index) => () => {
    const newFiles = cloneDeep(files);
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const onUpload = async () => {
    setIsUploading(true);
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    // setIsUploading(false);
  };

  return (
    <Container>
      <UploadStyle>
        <UploadHeaderStyle>
          <span className="title">Upload Files</span>
          {!!files.length && (
            <button onClick={onUpload} className="btn-upload">
              Upload
            </button>
          )}
        </UploadHeaderStyle>
        <UploadBodyStyle isDragAccept={isDragAccept}>
          <div className="left" {...getRootProps()}>
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
              Max file size: 10MB <br />
              Support types: JPG, PNG, PDF, SVG
            </span>
          </div>
          <div className={`right`}>
            {!!files.length && (
              <div className="title">{`Selected images (${files.length})`}</div>
            )}
            <div className="images-container">
              {files.map((file, index) =>
                isUploading ? (
                  <UploadFile key={file.id} file={file} />
                ) : (
                  <FilePreview
                    key={file.id}
                    file={file}
                    onRemove={onRemoveImage(index)}
                  />
                )
              )}
            </div>
          </div>
        </UploadBodyStyle>
      </UploadStyle>
    </Container>
  );
}

const UploadFile = memo(({ file }) => {
  const [status, setStatus] = useState("loading");
  const onUpload = async () => {};
  return (
    <div className="file">
      <div className="file-name">{file.fileName}</div>
      <div className="file-size">{file.size}</div>
    </div>
  );
});

const FilePreview = memo(({ file, onRemove }) => {
  return (
    <FilePreviewStyle>
      {file.type === ""}
      <img
        width={70}
        height={70}
        style={{ objectFit: "cover" }}
        src={file.src}
        alt={file.fileName}
      />
      <Close
        className="remove"
        width={16}
        height={16}
        color="#A79277"
        onClick={onRemove}
      />
    </FilePreviewStyle>
  );
});

const Container = styled.main`
  max-width: 1280px;
  margin: 0 auto;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UploadStyle = styled.div`
  padding: 36px 48px;
  border-radius: 18px;
  box-shadow: 2px 2px 5px #a87676;
  background-color: #ffffff;
  font-size: 1rem;
  width: 70%;
  max-height: 80%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const UploadHeaderStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .title {
    color: #a87676;
    font-size: 1.4rem;
    font-weight: bold;
  }

  .btn-upload {
    background: #a87676;
    color: #ffffff;
    border: none;
    border-radius: 10px;
    padding: 10px 20px;
    cursor: pointer;
    font-weight: 600;

    &:hover {
      opacity: 0.8;
    }
  }
`;

const UploadBodyStyle = styled.section`
  margin-top: 12px;
  gap: 20px;
  flex: 1;
  overflow: auto;
  .left {
    border: dashed 3px
      ${({ isDragAccept, isFocused }) =>
        isFocused ? "#7BD3EA" : isDragAccept ? "#a87676" : "lightgray"};
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 10px 12px;
    gap: 8px;

    button {
      background: #ffffff;
      color: #a87676;
      border: 1px solid #a87676;
      border-radius: 10px;
      padding: 10px 20px;
      cursor: pointer;
      font-weight: 600;

      &:hover {
        opacity: 0.8;
        background: #a87676;
        color: #ffffff;
      }
    }
  }
  .right {
    margin-top: 12px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    position: relative;
    overflow: hidden;

    .title {
      font-size: 1rem;
      font-weight: 600;
      color: #a87676;
    }

    .images-container {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      overflow: auto;
    }
  }
`;

const FilePreviewStyle = styled.div`
  border-radius: 10px;
  gap: 10px;
  align-items: center;
  height: fit-content;
  position: relative;
  overflow: hidden;

  &:hover {
    img {
      opacity: 0.8;
    }

    cursor: pointer;
    outline: 1px solid #a87676;
    .remove {
      display: block;
    }
  }

  .remove {
    display: none;
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
    border: 1px solid #a87676;
    border-top: none;
    border-right: none;
    border-bottom-left-radius: 10px;

    &:hover {
      background: #a87676;
      color: #ffffff;
    }
  }
`;
