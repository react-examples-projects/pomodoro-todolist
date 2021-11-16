import { forwardRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { recaptcha_key } from "../../../Config/config";

const Captcha = (props, ref) => {
  return (
    <ReCAPTCHA
      ref={ref}
      sitekey={recaptcha_key}
      className="captcha mb-2 d-block"
      {...props}
    />
  );
};

export default forwardRef(Captcha);
