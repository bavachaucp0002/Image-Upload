import { memo, useState, useRef, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { CURRENT_COLOR } from "../styles";
import { ReactComponent as Check } from "../assets/icons/check.svg";
import { ReactComponent as Error } from "../assets/icons/error.svg";
import { ReactComponent as Close } from "../assets/icons/close.svg";

export const FileUpLoadItem = memo(
  ({ file, onDone, canUpload, handleCancel }) => {
    const [status, setStatus] = useState("loading");
    const [errMessage, setErrMessage] = useState("");
    const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0);
    const refAbortUpload = useRef(null);
    const isError = !!errMessage;

    const onCancel = () => {
      if (!canUpload) {
        setStatus("error");
        setErrMessage("canceled");
        handleCancel();
        return;
      }
      refAbortUpload?.current?.abort();
    };

    useEffect(() => {
      const upload = async () => {
        if (status === "error") {
          onDone("error");
          return;
        }
        refAbortUpload.current = new AbortController();
        setStatus("loading");
        try {
          const data = new FormData();
          data.append("image", file.file);
          data.append("type", "image");
          data.append("title", file.fileName);
          // data.append("description", "This is a simple image upload in Imgur");
          const res = await axios({
            method: "post",
            url: "https://api.imgur.com/3/image",
            data,
            signal: refAbortUpload?.current?.signal,
            headers: {
              Accept: "*/*",
              Authorization: process.env.REACT_APP_CLIENT_ID,
              "Content-Type":
                "multipart/form-data; boundary=<calculated when request is sent>",
            },
            onUploadProgress: (ev) => {
              const percent = Math.round(ev.progress * 100);
              if (percent < 100) setProgress(percent);
            },
          });
          setStatus("success");
          onDone("success");
          setProgress(100);
          setUrl(`https://imgur.com/${res?.data?.data?.id}`);
        } catch (error) {
          onDone("error");
          setStatus("error");
          setErrMessage(error?.message);
        }
      };

      if (canUpload) upload();
    }, [canUpload]);

    const renderStatus = () => {
      switch (status) {
        case "loading":
          if (!canUpload) {
            return (
              <Close
                className="remove"
                width={16}
                height={16}
                color="#FF8080"
                onClick={onCancel}
              />
            );
          }
          return (
            <span
              onClick={onCancel}
              style={{ color: CURRENT_COLOR, fontSize: "0.6rem" }}
            >
              {progress}%
            </span>
          );
        case "success":
          return <Check width={16} height={16} color={CURRENT_COLOR} />;
        case "error":
          return <Error width={20} height={20} color={"#FF8080"} />;
        default:
          return null;
      }
    };

    return (
      <ImageUploadItemStyle>
        <img
          width={50}
          height={50}
          style={{ objectFit: "cover", borderRadius: "50%" }}
          src={file.src}
          alt={file.fileName}
        />
        <div
          style={{ display: "flex", flexDirection: "column", flex: 1, gap: 6 }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: "0.8rem" }}>
              {file.fileName} - {Math.round(file.size / 1024)}KB
            </span>
            <div className="status">{renderStatus()}</div>
          </div>

          <ProgressStyle value={progress} isError={isError} />
          {isError && (
            <p style={{ fontSize: "0.6rem", color: "#FF8080" }}>{errMessage}</p>
          )}
          {url && (
            <a
              href={url}
              target="_blank"
              style={{ fontSize: "0.6rem", color: CURRENT_COLOR }}
            >
              {url}
            </a>
          )}
        </div>
      </ImageUploadItemStyle>
    );
  }
);

const ImageUploadItemStyle = styled.div`
  display: flex;
  gap: 10px;
  .status {
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    .cancel {
      /* display: none; */
    }

    &:hover {
      .cancel {
        /* display: block; */
      }

      .content {
        /* display: none; */
      }
    }
  }
`;

const ProgressStyle = styled.div`
  height: 5px;
  border-radius: 5px;
  background-color: lightgray;
  width: 100%;
  position: relative;
  /* margin-top: 6px; */

  &::after {
    content: "";
    width: ${({ value }) => `${value}%`};
    height: 100%;
    background-color: ${({ isError }) => (isError ? "#FF8080" : CURRENT_COLOR)};
    border-radius: 5px;
    position: absolute;
    transition: all 0.1s;
  }
`;
