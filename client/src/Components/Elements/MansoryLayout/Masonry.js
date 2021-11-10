import React, { useEffect, useState } from "react";
import useMediaQuery from "../../Hooks/Utils/useMediaQuery";
import styled from "styled-components";

const ContainerDiv = styled.div`
  display: flex;
  width: ${(props) => props.width || null};
  margin-left: ${(props) => (props.center ? "auto" : null)};
  margin-right: ${(props) => (props.center ? "auto" : null)};

  @media screen and (max-width: 992px) {
    flex-wrap: wrap;
  }

  @media screen and (max-width: 612px) {
    &:not(.ms-fluid) {
      flex-wrap: wrap;
    }
  }
`;

const Column = styled.div`
  box-sizing: border-box;
  flex: 1 1 0;
  display: flex;
  align-self: flex-start;
  flex-direction: column;

  > img,
  > figure {
    object-fit: cover;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    transition: all 0.3s ease;
  }

  @media screen and (max-width: 992px) {
    flex-basis: 33.333%;
  }

  @media screen and (max-width: 612px) {
    flex-basis: 100%;
  }
`;

const Item = styled.div`
  margin: 0.3rem;
`;

const Container = ({ children, ...args }) => {
  const [columns, setColumns] = useState([]);
  const isTablet = useMediaQuery("max-width:980px");
  const isMobile = useMediaQuery("max-width:820px");

  useEffect(() => {
    let indexColumn = 0;
    const COLUMNS_COUNT = isTablet ? (isMobile ? 1 : 2) : 3;
    const columns = [];

    for (let i = 0; i < COLUMNS_COUNT; i++) {
      columns.push([]);
    }

    children.forEach((child) => {
      columns[indexColumn].push(child);

      if (indexColumn < COLUMNS_COUNT) indexColumn++;
      if (indexColumn >= COLUMNS_COUNT) indexColumn = 0;
    });

    setColumns(columns);
  }, [children, isTablet, isMobile]);

  return (
    <ContainerDiv {...args}>
      {columns.map((column, index) => (
        <Column key={index}>
          {column.map((child, index) => (
            <Item key={index}>{child}</Item>
          ))}
        </Column>
      ))}
    </ContainerDiv>
  );
};

Container.Column = Column;

export default Container;
