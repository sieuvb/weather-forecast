import styled from "styled-components"

export const CardContainer = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 120px;
  height: 200px;
  background-image: linear-gradient(#05336b, #094793);
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.2);
  margin-bottom: 24px;

  .ant-typography {
    color: white;
    margin: 0 !important;
  }

  @media screen and (max-width: 425px) {
    .ant-typography {
      font-size: 100%;
    }
  }
`
