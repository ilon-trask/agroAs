import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { type AppRouter } from "../../../tRPC serv/index";
import { Icell, prope } from "../../../tRPC serv/controllers/OperService";
import {
  resTechCartsWithOpers,
  resTechOperation,
} from "../../../tRPC serv/controllers/TechCartService";
import MapStore from "../store/MapStore";
import BusinessStore from "../store/BusinessStore";
import {
  Ifinancing,
  Igrade,
  Imachine,
  Isection,
  Ispecial_work,
  Itech_cart,
  Itech_operation,
  Itractor,
  tech_operation,
} from "../../../tRPC serv/models/models";
import User from "../store/UserStore";
import { createClient } from "@supabase/supabase-js";
// import { type BusinessProps } from "../modules/createTEJ/CreateTEJ";
import {
  CreateBusinessPlan,
  PatchBusinessPlan,
} from "../../../tRPC serv/routes/businessRouter";
import { FeedBackProps } from "../modules/FeedbackForm/FeedBackForm";
import IncomeStore from "../store/IncomeStore";

import TEJStore from "../store/TEJStore";
import {
  createTEJType,
  setIsPublicTEJType,
} from "../../../tRPC serv/routes/TEJRouter";
import {
  CreateCartType,
  setIsBasicCartType,
} from "../../../tRPC serv/routes/cartRouter";
import {
  createOutcomeType,
  patchOutcomeType,
} from "../../../tRPC serv/routes/outcomeRouter";
import {
  createProductionType,
  PatchProductionType,
} from "../../../tRPC serv/routes/productionRouter";
import {
  createSaleType,
  PatchSaleType,
} from "../../../tRPC serv/routes/saleRouter";
import {
  CreateBuyingMachine,
  PatchBuyingMachine,
} from "../../../tRPC serv/routes/buyingMachineRouter";
import {
  CreateAdministration,
  PatchAdministration,
} from "../../../tRPC serv/routes/administrationRouter";
import { makeObservable } from "mobx";
import EnterpriseStore from "../store/EnterpriseStore";
import {
  CreateEnterpriseType,
  PatchEnterpriseType,
} from "../../../tRPC serv/routes/enterpriseRouter";
import {
  CreateJobType,
  PatchJobType,
} from "../../../tRPC serv/routes/jobRouter";
import {
  CreateWorkerType,
  PatchWorkerType,
} from "../../../tRPC serv/routes/workerRouter";
import { CreateVegetationType } from "../../../tRPC serv/routes/vegetationYearRouter";
import { resBusinessPlan } from "../../../tRPC serv/controllers/BusinessService";
import {
  CreateLandType,
  PatchLandType,
} from "../../../tRPC serv/routes/landRouter";
import {
  CreateBuildingType,
  PatchBuildingType,
} from "../../../tRPC serv/routes/buildingRouter";
import {
  CreateFinancingType,
  PatchFinancingType,
} from "../../../tRPC serv/routes/financingRouter";
import {
  CreateProductType,
  createYieldCalcType,
  CreateYieldPlantType,
  UpdateYieldPlantType,
} from "../../../tRPC serv/routes/incomeRouter";

let user = new User();
export const supabase = createClient(
  import.meta.env.VITE_DB_LINK + "",
  import.meta.env.VITE_DB_KEY + ""
);

const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:5000" || import.meta.env.VITE_SERVER_URL + "",
      async headers() {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();
        if (!session) return {};

        return {
          authorization: "Bearer " + session.access_token,
        };
      },
    }),
  ],
});

function operationsFilter(carts: resTechCartsWithOpers[], map: MapStore) {
  console.log("aaa");
  console.log(carts);
  for (let i = 0; i < carts.length; i++) {
    const cart = carts[i];

    map.maps = map.maps.filter((el) => el.id != cart.id);
    map.complex = map.complex.filter((el) => el.id != cart.id);
    map.businessCarts = map.businessCarts.filter((el) => el.id != cart.id);
    if (cart.isComplex) {
      map.newComplex = cart;
    } else if (cart.isBasic != null) {
      map.newBusinessCarts = cart;
    } else {
      map.newMap = cart;
    }

    const opers = cart.tech_operations;
    if (!opers) return;
    for (let j = 0; j < opers.length; j++) {
      const oper = opers[j];

      map.newOper = opers[j];

      if (oper.aggregate) {
        map.newCostMechanical = oper.aggregate;
      } else if (oper.cost_service) {
        map.newCostServices = oper.cost_service;
      } else if (oper.cost_transport) {
        map.newCostTransport = oper.cost_transport;
      } else if (oper.cost_material) {
        map.newCostMaterials = oper.cost_material;
      } else if (oper.cost_hand_work) {
        map.newCostHandWork = oper.cost_hand_work;
      }
    }
  }
}

function operValue(oper: Itech_operation) {
  return (
    oper.costMachineWork! +
      oper.costCars! +
      oper.costFuel! +
      oper.costHandWork! ||
    oper.costHandWork ||
    oper.costServices ||
    oper.costTransport ||
    oper.costMaterials ||
    0
  );
}
export async function getCarts(map: MapStore, cartId: number) {
  map.isLoading = true;
  console.log("try");

  await client.cart.getCart
    .query({ cartId: cartId })
    //@ts-ignore
    .then((carts: resTechCartsWithOpers[]) => {
      map.costMechanical = [];
      map.costMaterials = [];
      map.costServices = [];
      map.costTransport = [];
      map.opers = [];
      map.opers = map.opers.filter((el) => el.techCartId != carts[0].id);
      operationsFilter(carts, map);
      map.isLoading = false;
    });
}

export async function setIsPublic(
  map: MapStore,
  data: {
    id: number;
    isPublic: boolean;
    authorName?: string;
    cultural?: number;
    description?: string;
  }
) {
  map.isLoading = true;
  await client.cart.setIsPublic.query(data).then((res) => {
    if (!res) {
      map.isLoading = false;
      return;
    }
    res[0].tech_operations?.forEach((oper) => {
      map.costMechanical = map.costMechanical.filter(
        (el) => el.techOperationId != oper.id
      );
      map.costMaterials = map.costMaterials.filter(
        (el) => el.techOperationId != oper.id
      );
      map.costServices = map.costServices.filter(
        (el) => el.techOperationId != oper.id
      );
      map.costTransport = map.costTransport.filter(
        (el) => el.techOperationId != oper.id
      );
      map.costHandWork = map.costHandWork.filter(
        (el) => el.techOperationId != oper.id
      );
    });
    map.maps = map.maps.filter((el) => el.id != data.id);
    //@ts-ignore
    operationsFilter(res, map);
    map.isLoading = false;
  });
  getIsAgreeCarts(map);
}

export async function deleteCart(map: MapStore, id: number) {
  map.isLoading = true;
  await client.cart.delete.query({ id: id }).then((data: { id: number }) => {
    map.maps = map.maps.filter((el) => el.id != data.id);
    map.isLoading = false;
  });
}

export async function createCart(map: MapStore, data: CreateCartType) {
  map.isLoading = true;

  await client.cart.create.query(data).then((res) => {
    if (res.isComplex) {
      map.newComplex = res as resTechCartsWithOpers;
    } else {
      map.newMap = res as resTechCartsWithOpers;
    }
    map.isLoading = false;
  });
}

export async function updateMap(map: MapStore, dat: resTechCartsWithOpers) {
  map.isLoading = true;
  let data: resTechCartsWithOpers = JSON.parse(JSON.stringify(dat));

  //@ts-ignore
  await client.cart.patch.mutate(data).then((res) => {
    map.maps = map.maps.filter((el) => el.id != res[0].id);

    map.opers = map.opers.filter((el) => el.techCartId != res[0].id!);
    res[0].tech_operations?.forEach((oper) => {
      map.costMechanical = map.costMechanical.filter(
        (el) => el.techOperationId != oper.id
      );
      map.costMaterials = map.costMaterials.filter(
        (el) => el.techOperationId != oper.id
      );
      map.costServices = map.costServices.filter(
        (el) => el.techOperationId != oper.id
      );
      map.costTransport = map.costTransport.filter(
        (el) => el.techOperationId != oper.id
      );
      map.costHandWork = map.costHandWork.filter(
        (el) => el.techOperationId != oper.id
      );
    });
    //@ts-ignore
    operationsFilter(res, map);

    map.isLoading = false;
  });
}

export async function deleteOper(
  map: MapStore,
  operId: number,
  cartId: number
) {
  map.isLoading = true;
  await client.oper.delete
    .query({ cartId: +cartId, operId: operId })
    //@ts-ignore
    .then((data: any) => {
      map.opers = map.opers.filter((el) => el.id != data.id);
      let mapData = map.maps.find((el) => el.id == data.techCartId);
      if (!mapData) {
        mapData = map.complex.find((el) => el.id == data.techCartId)!;
      }
      mapData.costHectare! -= operValue(data);
      map.isLoading = false;
    });
}

export async function createOperation(
  map: MapStore,
  arr: {
    cell: Icell | "";
    res: any;
    section: number | "" | undefined;
  },
  id: number
) {
  map.isLoading = true;
  //@ts-ignore
  await client.oper.create[arr.cell]
    .query({
      arr: arr,
      cartId: +id,
    })
    //@ts-ignore
    .then((data: { oper: tech_operation; prope: prope }) => {
      const { oper, prope } = data;
      map.newOper = oper;
      let mapData = map.maps.find((el) => el.id == oper.techCartId);
      if (!mapData) {
        mapData = map.complex.find((el) => el.id == oper.techCartId)!;
      }
      mapData.tech_operations?.push(oper);
      mapData.costHectare! += operValue(oper);
      if ("nameMaterials" in prope) {
        map.newCostMaterials = prope;
      } else if ("nameService" in prope) {
        map.newCostServices = prope;
      } else if ("nameTransport" in prope) {
        map.newCostTransport = prope;
      } else if ("productionRateAmount" in prope) {
        map.newCostHandWork = prope;
      } else if ("fuelConsumption" in prope) {
        map.newCostMechanical = prope;
      }
      map.isLoading = false;
    });
}

export async function patchOperation(
  map: MapStore,
  arr: {
    cell: Icell;
    res: any;
  },
  cartId: number
) {
  map.isLoading = true;

  let [mapData] = map.maps.filter((el) => el.id == cartId);

  let [operData] = map.opers.filter((el) => el.id == arr.res.operId);
  //@ts-ignore
  let mapOperData = mapData.tech_operations?.find(
    (el) => el?.id == arr.res.operId
  );

  mapData.costHectare! -= operValue(operData);
  await client.oper.patch[arr.cell]
    .query({
      cartId: +cartId,
      arr: arr,
    })
    //@ts-ignore
    .then((res: resTechOperation) => {
      map.opers = map.opers.filter((el) => el.id != arr.res.operId);
      map.newOper = res;
      // let [mapData] = map.maps.filter((el) => el.id == res.techCartId);

      mapData.costHectare! += operValue(res);
      map.costHandWork = map.costHandWork.filter(
        (el) => el.techOperationId != arr.res.operId
      );
      map.costMaterials = map.costMaterials.filter(
        (el) => el.techOperationId != arr.res.operId
      );
      map.costMechanical = map.costMechanical.filter(
        (el) => el.techOperationId != arr.res.operId
      );
      map.costServices = map.costServices.filter(
        (el) => el.techOperationId != arr.res.operId
      );
      map.costTransport = map.costTransport.filter(
        (el) => el.techOperationId != arr.res.operId
      );
      if (!mapOperData) throw new Error("Нема");

      if (res.aggregate) {
        mapOperData.aggregate = res.aggregate;
        map.newCostMechanical = res.aggregate;
      } else if (res.cost_service) {
        mapOperData.cost_service = res.cost_service;
        map.newCostServices = res.cost_service;
      } else if (res.cost_transport) {
        mapOperData.cost_transport = res.cost_transport;
        map.newCostTransport = res.cost_transport;
      } else if (res.cost_material) {
        mapOperData.cost_material = res.cost_material;
        map.newCostMaterials = res.cost_material;
      } else if (res.cost_hand_work) {
        mapOperData.cost_hand_work = res.cost_hand_work;
        map.newCostHandWork = res.cost_hand_work;
      }
      map.isLoading = false;
    });
}

export function getSection(map: MapStore) {
  client.section.get.query().then((res: Isection[]) => (map.section = res));
}

export function createTractor(map: MapStore, res: Itractor) {
  client.tractor.create.query(res).then((data) => {
    map.newTractor = data;
  });
}

export function patchTractor(map: MapStore, res: Itractor) {
  map.isLoading = true;
  client.tractor.patch.query(res).then((data: Itractor) => {
    map.tractor = map.tractor.filter((el) => el.id != data.id);
    map.newTractor = data;
    map.isLoading = false;
  });
}

export function getTractor(map: MapStore) {
  client.tractor.get.query().then((res: Itractor[]) => {
    map.tractor = res;
  });
}

export function createMachine(map: MapStore, res: Imachine) {
  client.machine.create.query(res).then((data: Imachine) => {
    map.newMachine = data;
  });
}

export function patchMachine(map: MapStore, res: Imachine) {
  map.isLoading = true;
  client.machine.patch.query(res).then((data: Imachine) => {
    map.machine = map.machine.filter((el) => el.id != data.id);
    map.newMachine = data;
    map.isLoading = false;
  });
}

export function getMachine(map: MapStore) {
  client.machine.get.query().then((res: Imachine[]) => {
    map.machine = res;
  });
}
export function getGrades(map: MapStore) {
  client.grade.get.query().then((data: Igrade[]) => {
    map.grade = data;
  });
}
export function getCopyCarts(map: MapStore) {
  client.cart.getCopyCarts
    .query() //@ts-ignore
    .then((data: Itech_cart[]) => (map.copyCarts = data));
}
export function makeCopyCarts(map: MapStore, cartId: number) {
  client.cart.makeCopy.query({ cartId }).then((data) => {
    //@ts-ignore
    operationsFilter(data, map);
  });
}
export function getWorks(map: MapStore) {
  client.works.get
    .query()
    .then((works) => (map.works = works as Ispecial_work[]));
}
export function createWork(map: MapStore, data: Ispecial_work) {
  client.works.create
    .query(data)
    .then((res) => (map.newWork = res as Ispecial_work));
}
export function deleteWork(map: MapStore, workId: number) {
  client.works.delete
    .query({ workId })
    .then((res) => (map.works = map.works.filter((el) => el.id != workId)));
}
export function patchWork(map: MapStore, data: any) {
  client.works.patch.query(data).then((res) => {
    map.works = map.works.filter((el) => el.id != res.id);
    map.newWork = res;
  });
}
export function getCopyTractors(map: MapStore) {
  client.tractor.getCopyTractors.query().then((res) => {
    map.copyTractors = [];
    map.copyTractors = res;
  });
}
export function makeCopyTractor(map: MapStore, tractorId: number) {
  client.tractor.copyTractor.query({ tractorId }).then((res) => {
    map.copyTractors = map.copyTractors.filter(
      (el) => el.id != res.copiedFromId
    );
    map.newTractor = res;
  });
}
export function getCopyMachine(map: MapStore) {
  client.machine.getCopyMachine.query().then((res) => {
    map.copyMachine = [];
    map.copyMachine = res;
  });
}
export function makeCopyMachine(map: MapStore, machineId: number) {
  client.machine.copyMachine.query({ machineId }).then((res) => {
    map.copyMachine = map.copyMachine.filter((el) => el.id != res.copiedFromId);
    map.newMachine = res;
  });
}
export function getCultural(map: MapStore) {
  client.cultural.get.query().then((res) => {
    map.cultural = [];
    map.cultural = res;
  });
}
export function getIsAgreeCarts(map: MapStore) {
  client.cart.getNoAgreeCarts.query().then((res) => {
    map.NoAgreeCarts = []; //@ts-ignore
    map.NoAgreeCarts = res;
  });
}
export function setIsAgreeCarts(
  map: MapStore,
  isAgree: boolean,
  cartId: number,
  authorName?: string,
  cultural?: number,
  description?: string
) {
  map.isLoading = true;
  client.cart.setIsAgreeCarts
    .query({
      isAgree: isAgree,
      cartId: cartId,
      authorName: authorName,
      cultural: cultural,
      description: description,
    })
    .then((res) => {
      if (res == 1) {
        map.NoAgreeCarts = map.NoAgreeCarts.filter((el) => el.id != cartId);
      } else {
        map.maps = map.maps.filter((el) => el.id != cartId); //@ts-ignore
        map.newMap = res[0];
      }
      map.isLoading = false;
    });
}
export function agreeCarts(map: MapStore) {
  map.isLoading = true;
  client.cart.getAgreeCarts.query().then((res) => {
    map.agreeCarts = []; //@ts-ignore
    map.agreeCarts = res;
    map.isLoading = false;
  });
}
// export function getBusinessCategory(map: MapStore, Bus: BusinessStore) {
//   map.isLoading = true;
//   client.business.getCategory.query().then((res) => {
//     Bus.businessCategory = res;
//     map.isLoading = false;
//   });
// }

export function getBusinessPlans(map: MapStore, Bus: BusinessStore) {
  map.isLoading = true;
  client.business.get.query().then((res) => {
    Bus.businessPlan = res as resBusinessPlan[];
    map.isLoading = false;
  });
}

export function createBusinessPlan(
  map: MapStore,
  Bus: BusinessStore,
  data: CreateBusinessPlan
) {
  map.isLoading = true;
  client.business.create.query(data).then((res) => {
    if (!res) return;
    Bus.newBusinessPlan = res as resBusinessPlan;
    map.isLoading = false;
  });
}
export function deleteBusinessPlan(
  map: MapStore,
  Bus: BusinessStore,
  planId: number
) {
  map.isLoading = true;
  client.business.delete.query({ planId }).then((res) => {
    if (res == 1) {
      Bus.businessPlan = Bus.businessPlan.filter((el) => el.id != planId);
    }
    map.isLoading = false;
  });
}
export function patchBusinessPlan(
  map: MapStore,
  Bus: BusinessStore,
  data: PatchBusinessPlan
) {
  map.isLoading = true;
  client.business.patch.query(data).then((res) => {
    if (res) {
      Bus.businessPlan = Bus.businessPlan.filter((el) => el.id != res.id);
      Bus.newBusinessPlan = res as resBusinessPlan;
    }
    map.isLoading = false;
  });
}
export function setIsPublicBusiness(
  map: MapStore,
  Bus: BusinessStore,
  data: { planId: number; isPublic: boolean; description?: string }
) {
  map.isLoading = true;
  client.business.setIsPublic.query(data).then((res) => {
    if (res) {
      Bus.businessPlan = Bus.businessPlan.filter((el) => el.id != data.planId);
      Bus.newBusinessPlan = res as resBusinessPlan;
      getNoAgreeBusiness(map, Bus);
    }
    map.isLoading = false;
  });
}
export function sendFeedBack(data: FeedBackProps) {
  client.feedBack.get.query(data);
}
export function getNoAgreeBusiness(map: MapStore, Bus: BusinessStore) {
  map.isLoading = true;
  client.business.getNoAgree.query().then((res) => {
    //@ts-ignore
    Bus.noAgreeBusinessPlan = res;
    map.isLoading = false;
  });
}
export function setIsAgreeBusiness(
  map: MapStore,
  Bus: BusinessStore,
  data: { planId: number; isAgree: boolean; description?: string }
) {
  map.isLoading = true;
  client.business.setIsAgree.query(data).then((res) => {
    if (res)
      if (res[0]) {
        Bus.noAgreeBusinessPlan = Bus.noAgreeBusinessPlan.filter(
          (el) => el.id != data.planId
        );
      }
    map.isLoading = false;
  });
}

export function patchResume(
  Bus: BusinessStore,
  data: {
    businessId: number;
    data: {
      aboutProject?: string | null;
      investment?: string | null;
      finIndicators?: string | null;
      deduction?: string | null;
    };
  }
) {
  client.resume.patch.query(data).then((res) => {
    const plan = Bus.businessPlan.find((el) => el.id == data.businessId);
    if (!plan) {
      return;
    } //@ts-ignore
    plan.resume = res!;
  });
}
export function setIdTableInvestment(
  Bus: BusinessStore,
  data: { cartId: number; businessPlanId: number }
) {
  client.resume.setId_tableInvestment.query(data).then((res) => {
    const plan = Bus.businessPlan.find((el) => el.id == data.businessPlanId);
    if (!plan) {
      return;
    } //@ts-ignore
    plan.resume = res!;
  });
}

export function patchTitlePage(
  Bus: BusinessStore,
  data: { businessId: number; title: string }
) {
  client.titlePage.patch.mutate(data).then((res) => {
    const plan = Bus.businessPlan.find((el) => el.id == data.businessId);
    if (!plan) {
      return;
    } //@ts-ignore
    plan.titlePage = res!;
  });
}
export function getOnlyCart(map: MapStore) {
  map.isLoading = true;
  client.cart.getOnlyCart.query().then((res) => {
    // map.maps = [];

    res.forEach((el) => {
      let myMap = map.maps.find((e) => {
        return e.id == el.id;
      });

      if (!myMap && el.isComplex == false) {
        //@ts-ignore
        map.newMap = el;
      }
      let myComplex = map.complex.find((e) => e.id == el.id);
      if (!myComplex && el.isComplex == true) {
        //@ts-ignore
        map.newComplex = el;
      }
    });
    map.isLoading = false;
  });
}

export function downloaded(map: MapStore, cartId: number, value: number) {
  client.cart.downloaded.query({ cartId, value }).then((res) => {
    const cart = map.maps.find((el) => el.id == cartId);
    if (!cart) return;
    cart.timesDow = res?.timesDow;
  });
}
export function createYieldPlant(
  income: IncomeStore,
  data: CreateYieldPlantType
) {
  client.income.createYieldPlant.query(data).then((res) => {
    income.newYieldPlant = res;
  });
}
export function getCulturalInc(income: IncomeStore) {
  client.income.getCultural.query().then((res) => {
    income.cultural = res;
  });
}
export function getYieldPlants(income: IncomeStore) {
  client.income.getYieldPlant.query().then((res) => {
    income.yieldPlant = res;
    res?.forEach((el) => {
      income.newYieldCalc = el.yieldCalculation;
    });
  });
}
export function getYieldPlant(income: IncomeStore, plantId: number) {
  client.income.getOneYieldPlant.query({ plantId }).then((res) => {
    income.newYieldPlant = res;
  });
}
export function createYieldCalc(
  income: IncomeStore,
  data: createYieldCalcType
) {
  client.income.createCalc.query(data).then((res) => {
    income.yieldPlant = income.yieldPlant.filter((el) => el.id != res.id);
    income.newYieldPlant = res;
    income.newYieldCalc = res.yieldCalculation;
  });
}
export function updateYieldCalc(
  income: IncomeStore,
  data: createYieldCalcType
) {
  client.income.updateCalc.query(data).then((res) => {
    if (!res) return;

    income.yieldPlant = income.yieldPlant.filter((el) => el.id != res.id);
    income.newYieldPlant = res;
    income.yieldCalc = income.yieldCalc.filter(
      (el) => el?.id != res.yieldCalculation.id
    );
    income.newYieldCalc = res.yieldCalculation;
  });
}

export function deleteYieldPlant(
  income: IncomeStore,
  data: { yieldPlantId: number }
) {
  client.income.deleteYieldPlant.query(data).then((res) => {
    if (!res) return;
    income.yieldPlant = income.yieldPlant.filter((el) => el.id != res);
  });
}

export function updateYieldPlant(
  income: IncomeStore,
  data: UpdateYieldPlantType
) {
  client.income.updateYieldPlant.query(data).then((res) => {
    if (res) {
      income.yieldPlant = income.yieldPlant.filter((el) => el.id! != res.id);
      income.newYieldPlant = res;
    }
  });
}
export function getPurposesMaterial(map: MapStore) {
  client.oper.getPurposesMaterial.query().then((res) => {
    map.purposeMaterial = res;
  });
}

// export function getCultureTEJ(TEJ: TEJStore) {
//   client.income.getCultural.query().then((res) => {
//     TEJ.culture = res;
//   });
// }
export function getCultureTEJMap(map: MapStore) {
  client.income.getCultural.query().then((res) => {
    map.culture = res;
  });
}
export function getProductTEJMap(map: MapStore) {
  client.income.getProduct.query().then((res) => {
    if (res) map.product = res;
  });
}
export function createProduct(map: MapStore, data: CreateProductType) {
  client.income.createProduct.query(data).then((res) => {
    map.newProduct = res;
  });
}
export function getCultivationTechnologiesMap(map: MapStore) {
  client.TEJ.getCultivationTechnologies.query().then((res) => {
    map.cultivationTechnologies = res;
  });
}
// export function getCultivationTechnologies(TEJ: TEJStore) {
//   client.TEJ.getCultivationTechnologies.query().then((res) => {
//     TEJ.cultivationTechnologies = res;
//   });
// }

export function getTEJ(TEJ: TEJStore) {
  client.TEJ.get.query().then((res) => {
    //@ts-ignore
    if (res) TEJ.justification = res;
  });
}

export function createTEJ(data: createTEJType, TEJ: TEJStore) {
  client.TEJ.create.query(data).then((res) => {
    //@ts-ignore
    TEJ.newJustification = res;
  });
}

export function deleteTEJ(data: { TEJId: number }, TEJ: TEJStore) {
  client.TEJ.delete.query(data).then((res) => {
    if (res == 1) {
      TEJ.justification = TEJ.justification.filter((el) => el.id != data.TEJId);
    }
  });
}

export function patchTEJ(
  data: {
    TEJId: number;
    cartId: number;
    comment: string;
    area: number;
    cultureId: number;
    cultivationTechnologyId: number;
  },
  TEJ: TEJStore
) {
  client.TEJ.patch.query(data).then((res) => {
    if (res) {
      TEJ.justification = TEJ.justification.filter((el) => el.id != res?.id); //@ts-ignore
      TEJ.newJustification = res;
    }
  });
}

export function setIsPublicTEJ(TEJ: TEJStore, data: setIsPublicTEJType) {
  client.TEJ.setIsPublic.query(data).then((res) => {
    if (!res) return;
    TEJ.justification = TEJ.justification.filter((el) => el.id != res.id!); //@ts-ignore
    TEJ.newJustification = res; //@ts-ignore
    if (data.isPublic) TEJ.newNoAgreeJustification = res;
    else
      TEJ.noAgreeJustification = TEJ.noAgreeJustification.filter(
        (el) => el.id != res.id
      );
  });
}

export function getNoAgreeJustification(TEJ: TEJStore) {
  client.TEJ.getNoAgree.query().then((res) => {
    //@ts-ignore
    if (res[0]) TEJ.noAgreeJustification = res;
  });
}

export function setIsAgreeTEJ(TEJ: TEJStore, data: setIsPublicTEJType) {
  client.TEJ.setIsAgree.query(data).then((res) => {
    TEJ.justification = TEJ.justification.filter((el) => el.id != res.id!); //@ts-ignore
    TEJ.newJustification = res;
    if (data.isAgree) {
      TEJ.noAgreeJustification = TEJ.noAgreeJustification.filter(
        (el) => el.id != res.id
      ); //@ts-ignore
      TEJ.newNoAgreeJustification = res;
    } else
      TEJ.noAgreeJustification = TEJ.noAgreeJustification.filter(
        (el) => el.id != res.id
      );
  });
}
export function getAgreeTEJ(TEJ: TEJStore) {
  client.TEJ.getAgreeTEJ.query().then((res) => {
    //@ts-ignore
    TEJ.agreeJustification = res;
  });
}

export function getTechnologiesTEJ(TEJ: TEJStore) {
  client.TEJ.getTechnologies.query().then((res) => (TEJ.technologies = res));
}

export function copyComplex(map: MapStore, complexId: number, cartId: number) {
  client.cart.copyComplex.query({ cartId, complexId }).then((res) => {
    if (!res) return;
    map.maps = map.maps.filter((el) => el.id != res.id);
    map.opers = map.opers.filter((el) => el.techCartId != res.id!);
    res.tech_operations?.forEach((oper) => {
      map.costMechanical = map.costMechanical.filter(
        (el) => el.techOperationId != oper.id
      );
      map.costMaterials = map.costMaterials.filter(
        (el) => el.techOperationId != oper.id
      );
      map.costServices = map.costServices.filter(
        (el) => el.techOperationId != oper.id
      );
      map.costTransport = map.costTransport.filter(
        (el) => el.techOperationId != oper.id
      );
      map.costHandWork = map.costHandWork.filter(
        (el) => el.techOperationId != oper.id
      );
    }); //@ts-ignore
    operationsFilter([res], map);
  });
}

export function createOutcome(map: MapStore, data: createOutcomeType) {
  client.outcome.create.query(data).then((res) => {
    map.newOutcome = res;
  });
}

export function getOutcome(map: MapStore) {
  client.outcome.get.query().then((res) => {
    map.outcome = res;
  });
}
export function setIsUsingOutcome(
  map: MapStore,
  data: { outcomeId: number; value: boolean }
) {
  client.outcome.setIsUsing.query(data).then((res) => {
    map.outcome = map.outcome.filter((el) => el.id != res?.id);
    map.newOutcome = res!;
  });
}
export function deleteOutcome(map: MapStore, outcomeId: number) {
  client.outcome.delete.query({ outcomeId }).then((res) => {
    if (!res) return;
    map.outcome = map.outcome.filter((el) => el.id != outcomeId);
  });
}
export function patchOutcome(map: MapStore, data: patchOutcomeType) {
  client.outcome.patch.query(data).then((res) => {
    if (!res) return;
    map.outcome = map.outcome.filter((el) => el.id != res.id);
    map.newOutcome = res;
  });
}

export function createProduction(
  income: IncomeStore,
  data: createProductionType
) {
  client.production.create.query(data).then((res) => {
    income.newProduction = res;
  });
}

export function getProduction(incomeStore: IncomeStore) {
  client.production.get.query().then((res) => {
    incomeStore.production = res;
  });
}
export function patchProduction(
  incomeStore: IncomeStore,
  data: PatchProductionType
) {
  client.production.patch.query(data).then((res) => {
    if (!res) return;
    incomeStore.production = incomeStore.production.filter(
      (el) => el.id != res.id
    );
    incomeStore.newProduction = res;
  });
}
export function deleteProduction(
  incomeStore: IncomeStore,
  data: { prodId: number }
) {
  client.production.delete.query(data).then((res) => {
    if (res) {
      incomeStore.production = incomeStore.production.filter(
        (el) => el.id != data.prodId
      );
    }
  });
}
export function createSale(incomeStore: IncomeStore, data: createSaleType) {
  client.sale.create.query(data).then((res) => (incomeStore.newSale = res));
}

export function getSale(incomeStore: IncomeStore) {
  client.sale.get.query().then((res) => (incomeStore.sale = res));
}

export function patchSale(incomeStore: IncomeStore, data: PatchSaleType) {
  client.sale.patch.query(data).then((res) => {
    incomeStore.sale = incomeStore.sale.filter((el) => el.id != data.saleId);
    incomeStore.newSale = res!;
  });
}

export function deleteSale(incomeStore: IncomeStore, data: { saleId: number }) {
  client.sale.delete.query(data).then((res) => {
    incomeStore.sale = incomeStore.sale.filter((el) => el.id != data.saleId);
    incomeStore.income = incomeStore.income.filter(
      (el) => el.saleId != data.saleId
    );
  });
}

function sortFinancing(arr: Ifinancing[], IncomeStore: IncomeStore) {
  arr.forEach((el) => {
    if (el.type == "credit") {
      IncomeStore.credit = IncomeStore.credit.filter((e) => e.id! != el.id!);
      IncomeStore.newCredit = el;
    } else if (el.type == "investment") {
      IncomeStore.investment = IncomeStore.investment.filter(
        (e) => e.id != el.id!
      );
      IncomeStore.newInvestment = el;
    } else if (el.type == "derj_support") {
      IncomeStore.derj = IncomeStore.derj.filter((e) => e.id != el.id!);
      IncomeStore.newDerj = el;
    } else if (el.type == "grant") {
      IncomeStore.grant = IncomeStore.grant.filter((e) => e.id != el.id);
      IncomeStore.newGrant = el;
    }
  });
}
export function createFinancing(
  IncomeStore: IncomeStore,
  data: CreateFinancingType
) {
  client.financing.create.query(data).then((res) => {
    //@ts-ignore
    if (res) sortFinancing([res], IncomeStore);
  });
}
export function getFinancing(IncomeStore: IncomeStore) {
  client.financing.get.query().then((res) => {
    //@ts-ignore
    sortFinancing(res, IncomeStore);
  });
}

export function patchFinancing(
  IncomeStore: IncomeStore,
  data: PatchFinancingType
) {
  client.financing.patch.query(data).then((res) => {
    //@ts-ignore
    if (res) sortFinancing([res], IncomeStore);
  });
}
export function deleteFinancing(incomeStore: IncomeStore, financingId: number) {
  client.financing.delete.query({ financingId }).then((el) => {
    incomeStore.credit = incomeStore.credit.filter(
      (el) => el.id != financingId
    );
    incomeStore.investment = incomeStore.investment.filter(
      (el) => el.id != financingId
    );
    incomeStore.derj = incomeStore.derj.filter((el) => el.id != financingId);
    incomeStore.grant = incomeStore.grant.filter((el) => el.id != financingId);
    incomeStore.income = incomeStore.income.filter(
      (el) => el.financingId != financingId
    );
  });
}

export function getBuyingMachine(map: MapStore) {
  client.buyingMachine.get.query().then((res) => (map.buyingMachine = res));
}
export function createBuyingMachine(map: MapStore, data: CreateBuyingMachine) {
  client.buyingMachine.create.query(data).then((res) => {
    map.newBuyingMachine = res;
  });
}

export function patchBuyingMachine(map: MapStore, data: PatchBuyingMachine) {
  client.buyingMachine.patch.query(data).then((res) => {
    if (!res) return;
    map.buyingMachine = map.buyingMachine.filter((el) => el.id != res.id);
    map.newBuyingMachine = res;
  });
}
export function deleteBuyingMachine(map: MapStore, buyingId: number) {
  client.buyingMachine.delete.query({ buyingId }).then((res) => {
    map.buyingMachine = map.buyingMachine.filter((el) => el.id != buyingId);
    map.outcome = map.outcome.filter((el) => el.buyingMachineId != buyingId);
  });
}

export function createAdministration(
  map: MapStore,
  data: CreateAdministration
) {
  client.administration.create.query(data).then((res) => {
    map.newAdministration = res;
  });
}
export function getAdministration(map: MapStore) {
  client.administration.get.query().then((res) => {
    map.administration = res;
  });
}
export function patchAdministration(map: MapStore, data: PatchAdministration) {
  client.administration.patch.query(data).then((res) => {
    if (!res) return;
    map.administration = map.administration.filter((el) => el.id != res.id);
    map.newAdministration = res;
  });
}
export function deleteAdministration(map: MapStore, admId: number) {
  client.administration.delete.query({ admId }).then((res) => {
    map.administration = map.administration.filter((el) => el.id != admId);
  });
}

export function getEnterprise(EnterpriseStore: EnterpriseStore) {
  client.enterprise.get.query().then((res) => {
    EnterpriseStore.enterprise = res;
  });
}
export function createEnterprise(
  EnterpriseStore: EnterpriseStore,
  data: CreateEnterpriseType
) {
  client.enterprise.create.query(data).then((res) => {
    EnterpriseStore.newEnterprise = res;
  });
}
export function patchEnterprise(
  EnterpriseStore: EnterpriseStore,
  data: PatchEnterpriseType
) {
  client.enterprise.patch.query(data).then((res) => {
    if (!res) return;
    EnterpriseStore.enterprise = EnterpriseStore.enterprise.filter(
      (el) => el.id != res.id
    );
    EnterpriseStore.newEnterprise = res;
  });
}
export function deleteEnterprise(
  EnterpriseStore: EnterpriseStore,
  entId: number
) {
  client.enterprise.delete.query({ entId }).then((res) => {
    EnterpriseStore.enterprise = EnterpriseStore.enterprise.filter(
      (el) => el.id != entId
    );
  });
}
export function getJob(enterprise: EnterpriseStore) {
  client.job.get.query().then((res) => {
    enterprise.job = res;
  });
}
export function createJob(enterprise: EnterpriseStore, data: CreateJobType) {
  client.job.create.query(data).then((res) => {
    enterprise.newJob = res;
  });
}
export function patchJob(enterprise: EnterpriseStore, data: PatchJobType) {
  client.job.patch.query(data).then((res) => {
    if (!res) return;
    enterprise.job = enterprise.job.filter((el) => el.id != res.id);
    enterprise.newJob = res;
  });
}
export function deleteJob(
  enterprise: EnterpriseStore,
  data: { jobId: number }
) {
  client.job.delete.query(data).then((res) => {
    enterprise.job = enterprise.job.filter((el) => el.id != data.jobId);
  });
}

export function getWorker(enterprise: EnterpriseStore) {
  client.worker.get.query().then((res) => {
    enterprise.worker = res;
  });
}
export function createWorker(
  enterprise: EnterpriseStore,
  data: CreateWorkerType
) {
  client.worker.create.query(data).then((res) => {
    enterprise.newWorker = res;
  });
}
export function patchWorker(
  enterprise: EnterpriseStore,
  data: PatchWorkerType
) {
  client.worker.patch.query(data).then((res) => {
    if (!res) return;

    enterprise.worker = enterprise.worker.filter((el) => el.id != res.id!); //@ts-ignore
    enterprise.newWorker = res;
  });
}
export function deleteWorker(
  enterprise: EnterpriseStore,
  data: { workerId: number }
) {
  client.worker.delete.query(data).then((res) => {
    enterprise.worker = enterprise.worker.filter(
      (el) => el.id != data.workerId
    );
  });
}

export function productSetIsPlan(
  income: IncomeStore,
  data: { prodId: number; isPlan: boolean }
) {
  client.production.setIsPlan.query(data).then((res) => {
    if (!res) return;
    income.production = income.production.filter((el) => el.id != data.prodId);
    income.newProduction = res;
  });
}

export function saleSetIsPlan(
  income: IncomeStore,
  data: { saleId: number; isPlan: boolean }
) {
  client.sale.setIsPlan.query(data).then((res) => {
    if (!res) return;
    income.sale = income.sale.filter((el) => el.id != data.saleId);
    income.newSale = res;
  });
}

export function getVegetationYear(income: IncomeStore) {
  client.vegetation.get.query().then((res) => {
    income.vegetationYear = res;
  });
}
export function createVegetationYear(
  income: IncomeStore,
  data: CreateVegetationType
) {
  client.vegetation.create.query(data).then((res) => {
    income.vegetationYear = res;
  });
}

export async function getManyCartWithOpers(map: MapStore, ids: number[]) {
  console.log("work2");
  let a: resTechCartsWithOpers[] = [];
  for (let i = 0; i < ids.length; i++) {
    const el = ids[i];
    await client.cart.getCart.query({ cartId: el }).then((res) => {
      //@ts-ignore
      a.push(...res);
    });
  }
  operationsFilter(a, map);
}
export function getLand(enterprise: EnterpriseStore) {
  client.land.get.query().then((res) => {
    //@ts-ignore
    enterprise.land = res;
  });
}
export function createLand(enterprise: EnterpriseStore, data: CreateLandType) {
  client.land.create.query(data).then((res) => {
    //@ts-ignore
    enterprise.newLand = res;
  });
}
export function patchLand(enterprise: EnterpriseStore, data: PatchLandType) {
  client.land.patch.query(data).then((res) => {
    if (res) {
      enterprise.land = enterprise.land.filter((el) => el.id != res.id); //@ts-ignore
      enterprise.newLand = res;
    }
  });
}
export function deleteLand(
  enterprise: EnterpriseStore,
  data: { landId: number }
) {
  client.land.delete.query(data).then((res) => {
    enterprise.land = enterprise.land.filter((el) => el.id != data.landId);
  });
}

export function getBuilding(enterprise: EnterpriseStore) {
  client.building.get.query().then((res) => {
    enterprise.building = res;
  });
}
export function createBuilding(
  enterprise: EnterpriseStore,
  data: CreateBuildingType
) {
  client.building.create.query(data).then((res) => {
    enterprise.newBuilding = res;
  });
}
export function patchBuilding(
  enterprise: EnterpriseStore,
  data: PatchBuildingType
) {
  client.building.patch.query(data).then((res) => {
    if (!res) return;
    enterprise.building = enterprise.building.filter((el) => el.id != res.id);
    enterprise.newBuilding = res;
  });
}
export function deleteBuilding(
  enterprise: EnterpriseStore,
  data: { buildId: number }
) {
  client.building.delete.query(data).then((res) => {
    enterprise.building = enterprise.building.filter(
      (el) => el.id != data.buildId
    );
  });
}

export function getCartForBusiness(map: MapStore) {
  client.cart.getForBusiness.query().then((res) => {
    //@ts-ignore
    map.businessCarts = res;
  });
}

export function setIsBasicCart(map: MapStore, data: setIsBasicCartType) {
  client.cart.setIsBasicCart.query(data).then((res) => {
    if (!res) return;
    if (res == "присутній") {
    } else {
      map.businessCarts = map.businessCarts.filter((el) => el.id != res.id!);
      //@ts-ignore
      map.newBusinessCarts = res;
    }
  });
}

export function addFinancingToBusinessPlan(
  income: IncomeStore,
  bus: BusinessStore,
  data: {
    businessId: number;
    value: number[];
  }
) {
  client.business.addFinancing.query(data).then((res) => {
    bus.businessPlan = bus.businessPlan.filter((el) => el.id! != res.id!);
    //@ts-ignore
    bus.newBusinessPlan = res;
    //@ts-ignore
    // sortFinancing(res.financings, income);
  });
}
