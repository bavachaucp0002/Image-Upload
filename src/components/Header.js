import { memo } from "react";
import styled from "styled-components";
import { CURRENT_COLOR } from "../styles";

export const Header = memo(
  ({ isUpload, onUpload, isHasFiles, fileCounts, uploadingCount }) => {
    return (
      <UploadHeaderStyle>
        <span className="title">
          {isUpload ? "Total Files" : "Upload Files"}{" "}
          {isHasFiles && isUpload && (
            <span>
              ({isUpload && `${uploadingCount}/`}
              {`${fileCounts}`})
            </span>
          )}
        </span>
        {isHasFiles && (
          <button onClick={onUpload} className="btn-upload">
            {isUpload ? "Back" : "Upload"}
          </button>
        )}
      </UploadHeaderStyle>
    );
  }
);

const UploadHeaderStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  .title {
    color: ${CURRENT_COLOR};
    font-size: 1.4rem;
    font-weight: bold;
  }

  .btn-upload {
    background: ${CURRENT_COLOR};
    color: #ffffff;
    border: none;
    border-radius: 10px;
    padding: 10px 20px;
    cursor: pointer;
    font-weight: 600;

    &:hover {
      opacity: 0.8;
    }

    &:focus-visible {
      border: none;
      outline: none;
    }
  }
`;
