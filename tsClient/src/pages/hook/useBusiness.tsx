import React, { useEffect } from "react";
import { getBusinessPlans } from "../../http/requests";
import BusinessStore from "../../store/BusinessStore";
import MapStore from "../../store/MapStore";

function useBusiness(business: BusinessStore, map: MapStore) {
  useEffect(() => {
    if (!business.businessPlan[0]) {
      // getBusinessCategory(map, business);
      getBusinessPlans(map, business);
    }
  }, []);
}

export default useBusiness;
