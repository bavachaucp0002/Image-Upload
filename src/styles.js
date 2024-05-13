import styled from "styled-components";
export const CURRENT_COLOR = "#a87676";
export const ERROR_COLOR = "#FF8080";

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
  box-shadow: 2px 2px 5px ${CURRENT_COLOR};
  background-color: #ffffff;
  font-size: 1rem;
  width: 70%;
  max-height: 80%;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .images-upload-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow: auto;
  }
`;

const UploadBodyStyle = styled.section`
  gap: 20px;
  flex: 1;
  overflow: auto;
  .dropzone-container {
    border: dashed 3px
      ${({ isDragAccept, isFocused }) =>
        isFocused ? "#7BD3EA" : isDragAccept ? CURRENT_COLOR : "lightgray"};
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 10px 12px;
    gap: 8px;

    button {
      background: #ffffff;
      color: ${CURRENT_COLOR};
      border: 1px solid ${CURRENT_COLOR};
      border-radius: 10px;
      padding: 10px 20px;
      cursor: pointer;
      font-weight: 600;

      &:hover {
        opacity: 0.8;
        background: ${CURRENT_COLOR};
        color: #ffffff;
      }
    }
  }
  .selected-images-container {
    margin-top: 12px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    position: relative;
    overflow: hidden;

    .title {
      font-size: 1rem;
      font-weight: 600;
      color: ${CURRENT_COLOR};
    }

    .images-preview-container {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      overflow: auto;
      padding: 1px;
    }
  }
`;

export { Container, UploadBodyStyle, UploadStyle };
