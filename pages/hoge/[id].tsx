import { GetServerSideProps } from "next";
import React, { useEffect, useRef, useState } from "react";

type Props = {
  id: string;
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { id } = context.query;
  if (typeof id !== "string") {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      id,
    },
  };
};

const TestInput: React.FC = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    buttonRef.current?.click();
  }, [buttonRef]);

  const handleOnClickButton = () => {
    console.log("click!");
    inputRef.current?.focus();
  };

  return (
    <>
      <button ref={buttonRef} onClick={handleOnClickButton}>
        focus
      </button>
      <input ref={inputRef} type="text" />
    </>
  );
};

const Container: React.FC<Props> = (props) => {
  const [showInput, setShowInput] = useState(false);
  console.log(props.id);

  const handleOnClickButton = () => {
    setShowInput(true);
  };
  return (
    <>
      <button onClick={handleOnClickButton}>button</button>
      {showInput && <TestInput />}
    </>
  );
};

export default Container;
