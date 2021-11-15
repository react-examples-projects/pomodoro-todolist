import React from "react";
import img from "../../Images/errorPage.png";
import { Image, Button, Typography } from "tiny-ui";

export default function ErrorPage() {
  return (
    <div className="error-page">
      <Image src={img} alt="Error" className="ms-auto me-auto d-block" />
      <Typography.Heading level={2} className="text-center">
        Oops!
      </Typography.Heading>
      <Typography.Paragraph
        className="text-center ms-auto me-auto"
        style={{ fontSize: "18px", fontWeight: "500", maxWidth: "500px" }}
      >
        Sucedió un error inesperado, por lo tanto estamos trabajando para
        solucionarlo. Por favor, intente nuevamente más tarde o comuníquese con
        nosotros.
      </Typography.Paragraph>

      <Button
        btnType="info"
        size="lg"
        onClick={() => window.location.reload()}
        className="ms-auto me-auto d-block"
      >
        Volver a intentar
      </Button>
    </div>
  );
}
