import React, { useState } from "react";

type ToggleChildProps = {
  open: () => void;
  close: () => void;
};

type ToggleContentProps = {
  toggle: (props: ToggleChildProps) => JSX.Element;
  content: (props: ToggleChildProps) => JSX.Element;
};

const ToggleContent = ({ toggle, content }: ToggleContentProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const api: ToggleChildProps = {
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  };

  return (
    <>
      {toggle(api)}
      {isOpen && content(api)}
    </>
  );
};

export default ToggleContent;
