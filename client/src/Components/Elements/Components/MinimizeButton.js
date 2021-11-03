import { Button } from "tiny-ui";
import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

export default function MinimizeButton({ onClick, ...args }) {
  const [isActive, setIsActive] = useState(false);

  const _onClick = () => {
    onClick();
    setIsActive(!isActive);
  };

  return (
    <Button size="sm" btnType="ghost" onClick={_onClick} {...args}>
      {isActive ? (
        <>
          <FiChevronUp className="me-1" />
          Expandir
        </>
      ) : (
        <>
          <FiChevronDown className="me-1" />
          Minimizar
        </>
      )}
    </Button>
  );
}
