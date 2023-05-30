import React, { useContext, useEffect } from "react";
import { getEnterprise } from "../../http/requests";
import { Context } from "../../main";

function useEnterprise() {
  const { enterpriseStore } = useContext(Context);
  useEffect(() => {
    if (!enterpriseStore.enterprise[0]) getEnterprise(enterpriseStore);
  }, []);
}

export default useEnterprise;
