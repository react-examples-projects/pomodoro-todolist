import React from "react";
import img from "../../Images/404.svg";
import { Image, Button, Typography } from "tiny-ui";

export default function NotFound() {
  return (
    <div className="not-found">
      <Image src={img} alt="Error" className="ms-auto me-auto d-block mb-4" width="400"/>
      <Typography.Heading level={2} className="text-center">
        No encontramos la página que buscas
      </Typography.Heading>
      <Typography.Paragraph
        className="text-center ms-auto me-auto"
        style={{ fontSize: "18px", fontWeight: "500", maxWidth: "500px" }}
      >
        Puedes volver a la página principal o intentar con otra dirección web.
      </Typography.Paragraph>

      <Button
        btnType="info"
        size="lg"
        onClick={() => (window.location.href = "/")}
        className="ms-auto me-auto d-block"
      >
        Ir al inicio
      </Button>
    </div>
  );
}
