import React from "react";
import img from "../../../Images/nothing.png";
import { Image, Typography } from "tiny-ui";

export default function NothingYet() {
  return (
    <div className="nothing-yet">
      <Image
        src={img}
        alt="Nada aún por aquí"
        className="ms-auto me-auto d-block"
      />
      <Typography.Heading level={4} className="text-center">
        Al parecer por aquí no hay nada
      </Typography.Heading>
      <Typography.Paragraph
        className="text-center ms-auto me-auto"
        style={{ fontSize: "16px", fontWeight: "500", maxWidth: "500px" }}
      >
        Intenta crear nuevo contenido en esta sección para mostrarlo aquí.
      </Typography.Paragraph>
    </div>
  );
}
