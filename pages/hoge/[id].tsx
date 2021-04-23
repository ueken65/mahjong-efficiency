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
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  return <input ref={inputRef} type="text" />;
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
