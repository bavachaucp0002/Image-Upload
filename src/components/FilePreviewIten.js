import { memo } from "react";
import styled from "styled-components";
import { CURRENT_COLOR } from "../styles";
import { ReactComponent as Close } from "../assets/icons/close.svg";

export const FilePreviewItem = memo(({ file, onRemove }) => {
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

const FilePreviewStyle = styled.div`
  border-radius: 10px;
  gap: 10px;
  align-items: center;
  position: relative;
  overflow: hidden;

  .remove {
    display: none;
    position: absolute;
    right: 0;
    top: 0;
    cursor: pointer;
  }

  &:hover {
    img {
      opacity: 0.8;
    }

    cursor: pointer;
    outline: 1px solid ${CURRENT_COLOR};
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
    border: 1px solid ${CURRENT_COLOR};
    background-color: #ffffff;
    border-top: none;
    border-right: none;
    border-bottom-left-radius: 10px;

    &:hover {
      background: ${CURRENT_COLOR};
      color: #ffffff;
    }
  }
`;
