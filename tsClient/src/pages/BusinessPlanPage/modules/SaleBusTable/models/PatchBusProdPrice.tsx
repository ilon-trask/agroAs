import { Box, Input, Text, ModalFooter, Button } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import Dialog from "src/components/Dialog";
import { patchBusProd } from "src/http/requests";
import { Context } from "src/main";
import MyHeading from "src/ui/MyHeading";
import { resBusProd } from "../../../../../../../tRPC serv/controllers/BusinessService";

function PatchBusProdPrice({
  open,
  setOpen,
  busProd,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  busProd: resBusProd;
}) {
  const { business } = useContext(Context);
  const [price, setPrice] = useState<number | string>(busProd.price!);
  return (
    <Dialog open={open} setOpen={setOpen}>
      <MyHeading>Середня ціна реалізації</MyHeading>
      <Box>
        <Text>Введіть ціну</Text>
        <Input value={price} onChange={(e) => setPrice(e.target.value)} />
      </Box>
      <ModalFooter>
        <Button
          isDisabled={!price}
          onClick={() => {
            patchBusProd(business, {
              ...busProd,
              ownId: busProd.id!,
              year: busProd.year!,
              price: +price,
              techCartId: busProd.techCartId!,
              businessPlanId: busProd.businessPlanId!,
              cultivationTechnologyId: busProd.cultivationTechnologyId!,
              productId: busProd.productId!,
            });
            setOpen(false);
          }}
        >
          Зберегти
        </Button>
      </ModalFooter>
    </Dialog>
  );
}

export default PatchBusProdPrice;
