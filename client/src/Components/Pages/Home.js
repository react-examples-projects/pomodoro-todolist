import React from "react";
import img from "../../Images/landingPage.svg";
import { Link } from "react-router-dom";
import { Button, Row, Col, Image, Typography } from "tiny-ui";

export default function Home() {
  return (
    <div className="home">
      <Row>
        <Col span={12} className="center-y center-v ty-col-md-24 ty-col-md-order-2">
          <div className="home-content">
            <Typography.Heading level={1}>
              Administra tus tareas
              <br />
              y notas de forma simple
            </Typography.Heading>
            <Typography.Paragraph className="home-text">
              Con nuestra aplicación podrás administrar tus tareas y notas de
              forma sencilla y rápida.
            </Typography.Paragraph>
            <Button as={Link} to="/login" btnType="info" size="lg" className="mt-5 mt-md-2">
              Iniciar sesión
            </Button>
          </div>
        </Col>
        <Col span={12} className="center-y center-v ty-col-md-24 ty-col-md-order-1">
          <Image src={img} alt="landingPage"  className="home-image"/>
        </Col>
      </Row>
    </div>
  );
}
