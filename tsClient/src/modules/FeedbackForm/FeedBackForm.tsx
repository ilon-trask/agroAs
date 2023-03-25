import React, { useEffect, useState } from "react";
import Dialog from "../../components/Dialog";
import FeedBack from "./components/FeedBack";

export type FeedBackProps = {
  email: string;
  tel?: string;
  message: string;
};

export const feedBackProps: FeedBackProps = {
  email: "",
  tel: "",
  message: "",
};

export default function FeedBackForm({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [isErr, setIsErr] = useState(false);
  const [res, setRes] = useState<FeedBackProps>({
    email: "",
    message: "",
    tel: "",
  });
  return (
    <Dialog
      open={open}
      setOpen={setOpen}
      res={res}
      setRes={setRes as any}
      update={false}
      setUpdate={() => {}}
      props={feedBackProps}
      isErr={isErr}
      setIsErr={setIsErr}
    >
      <FeedBack
        res={res as FeedBackProps}
        setRes={setRes as any}
        setOpen={setOpen}
        setIsErr={setIsErr}
      />
    </Dialog>
  );
}
