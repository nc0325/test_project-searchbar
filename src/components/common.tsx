import styled from "styled-components";
export const CustomButton = styled.button``;

export const PrimaryButton = styled.div<{ full?: boolean }>`
  border-radius: 2px;
  padding: 10px 16px;
  font-family: "Inter-Medium";
  border: none;
  cursor: pointer;
  color: #f5f5f5;
  background: #058ad4;
  color: #f5f5f5;
  width: ${(props) => (props.full ? "100%" : "auto")};
  height: 50px;

  &:hover {
    background: #2ea3e4;
  }

  &:active {
    background: rgba(5, 138, 212, 0.4);
    color: rgba(245, 245, 245, 0.72);
  }
`;
