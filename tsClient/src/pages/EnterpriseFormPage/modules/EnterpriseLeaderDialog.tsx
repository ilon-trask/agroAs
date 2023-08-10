import { Box, Button, FormLabel, Input, ModalFooter } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Dialog from "src/components/Dialog";
import { patchEnterpriseLeader } from "src/http/requests";
import { Context } from "src/main";
type props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  leader: string | null | undefined;
  leaderEducation: string | null | undefined;
  busId: number;
  enterpriseId: number;
};

function EnterpriseLeaderDialog({
  open,
  setOpen,
  leader,
  leaderEducation,
  busId,
  enterpriseId,
}: props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      leader,
      leaderEducation,
    },
  });
  const { business, enterpriseStore } = useContext(Context);
  const onSubmit: SubmitHandler<{
    leader: string | null | undefined;
    leaderEducation: string | null | undefined;
  }> = (data) => {
    setOpen(false);
    patchEnterpriseLeader(
      business,
      enterpriseStore,
      {
        leader: data.leader!,
        leaderEducation: data.leaderEducation!,
        enterpriseId,
      },
      busId
    );
  };
  return (
    <Dialog open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display={"flex"} justifyContent={"space-around"}>
          <Box>
            <FormLabel>П. І. Б.</FormLabel>
            <Input {...register("leader", { required: true })} />
          </Box>
          <Box>
            <FormLabel>Освіта</FormLabel>
            <Input {...register("leaderEducation", { required: true })} />
          </Box>
        </Box>
        <ModalFooter>
          <Button type={"submit"}>Зберегти</Button>
        </ModalFooter>
      </form>
    </Dialog>
  );
}

export default EnterpriseLeaderDialog;
