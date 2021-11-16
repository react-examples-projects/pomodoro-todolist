import { useState } from "react";

export default function useCaptcha(captchaRef) {
  const [isValidCaptcha, setIsValidCaptcha] = useState(false);
  function handleChangeCaptcha() {
    if (captchaRef.current.getValue()) {
      setIsValidCaptcha(true);
    } else {
      setIsValidCaptcha(false);
    }
  }

  function handleExpireCaptcha() {
    setIsValidCaptcha(false);
  }
  return { isValidCaptcha, handleChangeCaptcha, handleExpireCaptcha };
}
