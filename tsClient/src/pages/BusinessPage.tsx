import { Box, TableContainer } from "@chakra-ui/react";
import BusinessTable from "../modules/BusinessTable";
import React, { useState } from "react";
import CreateBusinessPlan from "../modules/CreateBusiness";
function Business() {
  const [createOpen, setCreateOpen] = useState(false);
  const [res, setRes] = useState<{
    name: string;
    businessCategoryId: "" | number;
  }>({
    name: "",
    businessCategoryId: "",
  });
  const [isErr, setIsErr] = useState(false);
  const [update, setUpdate] = useState(false);
  return (
    <Box>
      <TableContainer maxW="1000px" mx="auto" mt={"20px"} overflowX={"scroll"}>
        <BusinessTable
          setCreate={setCreateOpen}
          //   maps={maps}
          //   setRes={setRes}
          //   setOpen={setOpen}
          //   setUpdate={setUpdate}
          //   setShowAlert={setShowAlert}
          //   deleteOpen={deleteOpen}
          //   setDeleteOpen={setDeleteOpen}
          //   setPublicationOpen={setPublicationOpen}
        />
      </TableContainer>
      <CreateBusinessPlan
        open={createOpen}
        setOpen={setCreateOpen}
        isErr={false}
        res={res}
        setRes={setRes}
        setIsErr={setIsErr}
        setUpdate={setUpdate}
        update={false}
      />
    </Box>
  );
}

export default Business;
