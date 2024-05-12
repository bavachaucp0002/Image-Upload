import { memo, useMemo } from "react";
import styled from "styled-components";
import { CURRENT_COLOR } from "../styles";

export const CountFileUploads = memo(({ fileUploads }) => {
  const errorFiles = useMemo(() => {
    return fileUploads.filter((file) => file.status === "error");
  }, [fileUploads]);

  const successFiles = useMemo(() => {
    return fileUploads.filter((file) => file.status === "success");
  }, [fileUploads]);

  return (
    <Container>
      <span style={{ color: CURRENT_COLOR, fontSize: "0.8rem" }}>
        Errors:{" "}
        <span
          style={{ color: "#FF8080", fontWeight: "bold", fontSize: "1rem" }}
        >
          {errorFiles.length}
        </span>
        /{fileUploads.length}
      </span>
      <span style={{ color: CURRENT_COLOR, fontSize: "0.8rem" }}>
        Success:{" "}
        <span
          style={{ color: "#A5DD9B", fontWeight: "bold", fontSize: "1rem" }}
        >
          {successFiles.length}
        </span>
        /{fileUploads.length}
      </span>
    </Container>
  );
});

const Container = styled.div`
  display: flex;
  gap: 10px;
  padding-top: 10px;
`;
