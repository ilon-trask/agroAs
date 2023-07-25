import { observer } from "mobx-react-lite";
import React, { Dispatch, SetStateAction, RefObject } from "react";

import { Tr, Td } from "@chakra-ui/react";
// import { BusinessProps } from "../../CreateTEJ/CreateTEJ";
import { iName } from "src/pages/BusinessPlanPage";

interface props {
  e: {
    id: number;
    name: string;
    label: iName;
    children?: any;
    ref: RefObject<HTMLParagraphElement>;
  };
  aref: RefObject<HTMLDivElement>;
}
import names from "../names";
import res from "../../../shared/hook/useIncomeTypes";
function CartsTableItem({ e, aref }: props) {
  let props;
  if (e.children) props = Object.keys(e.children);
  function func2() {
    aref.current?.scrollIntoView({ behavior: "smooth" });
  }
  return (
    <>
      <Tr
        key={e.id!}
        onClick={() => {
          if (e.ref.current) {
            // func2();
            // setTimeout(
            e.ref.current?.scrollIntoView({ behavior: "smooth" });
            //   500
            // );
          }
        }}
        cursor={"pointer"}
      >
        <Td fontWeight={"600"}>{e.name}</Td>
      </Tr>
    </>
  );
}
export default observer(CartsTableItem);

{
  /* <div>
  <div></div>;
  <div style={{ display: "flex" }}>
    <div></div>
    <div></div>
  </div>
</div>; */
}
