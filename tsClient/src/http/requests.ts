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
  IbusinessPlan,
  Igrade,
  Imachine,
  Isection,
  Ispecial_work,
  Itech_cart,
  Itech_operation,
  Itractor,
  tech_operation,
  tractor,
} from "../../../tRPC serv/models/models";
import User from "../store/UserStore";
import { createClient } from "@supabase/supabase-js";
// import { type BusinessProps } from "../modules/createTEJ/CreateTEJ";
import { CreateBusinessPlan } from "../../../tRPC serv/routes/businessRouter";
import { FeedBackProps } from "../modules/FeedbackForm/FeedBackForm";
import IncomeStore from "../store/IncomeStore";
import {
  CreateIncome,
  createYieldCalcType,
  PatchIncome,
  setIsUsingIncomeType,
} from "../../../tRPC serv/routes/incomeRouter";
import TEJStore from "../store/TEJStore";
import {
  createTEJType,
  setIsPublicTEJType,
} from "../../../tRPC serv/routes/TEJRouter";
import { cartProps } from "../modules/CreateCart";
import { CreateCartType } from "../../../tRPC serv/routes/cartRouter";
import {
  createOutcomeType,
  patchOutcomeType,
} from "../../../tRPC serv/routes/outcomeRouter";
import { createProductionType } from "../../../tRPC serv/routes/productionRouter";
import {
  createSaleType,
  PatchSaleType,
} from "../../../tRPC serv/routes/saleRouter";
let user = new User();
export const supabase = createClient(
  import.meta.env.VITE_DB_LINK + "",
  import.meta.env.VITE_DB_KEY + ""
);

const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: import.meta.env.VITE_SERVER_URL + "",
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
  for (let i = 0; i < carts.length; i++) {
    const cart = carts[i];
    console.log(map.maps);
    map.maps = map.maps.filter((el) => el.id != cart.id);
    console.log(map.maps);

    map.complex = map.complex.filter((el) => el.id != cart.id);
    if (cart.isComplex) {
      map.newComplex = cart;
    } else {
      map.newMap = cart;
    }

    const opers = carts[i].tech_operations;
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
        console.log(oper.cost_hand_work);

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

  await client.cart.getCart.query({ cartId: cartId }).then((carts) => {
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
  let [mapOperData] = mapData.tech_operations?.filter((el) => {
    return el?.id == arr.res.operId;
  });
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
    .query()
    .then((data: Itech_cart[]) => (map.copyCarts = data));
}
export function makeCopyCarts(map: MapStore, cartId: number) {
  client.cart.makeCopy.query({ cartId }).then((data) => {
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
    map.NoAgreeCarts = [];
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
        map.maps = map.maps.filter((el) => el.id != cartId);
        map.newMap = res[0];
      }
      map.isLoading = false;
    });
}
export function agreeCarts(map: MapStore) {
  map.isLoading = true;
  client.cart.getAgreeCarts.query().then((res) => {
    map.agreeCarts = [];
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
    console.log(res);

    Bus.businessPlan = res;
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
    Bus.newBusinessPlan = res;
    map.isLoading = false;
  });
}
export function deleteBusinessPlan(
  map: MapStore,
  Bus: BusinessStore,
  BusinessId: number
) {
  map.isLoading = true;
  client.business.delete.query({ BusinessId }).then((res) => {
    if (res == 1) {
      Bus.businessPlan = Bus.businessPlan.filter((el) => el.id != BusinessId);
    }
    map.isLoading = false;
  });
}
// export function patchBusinessPlan(
//   map: MapStore,
//   Bus: BusinessStore,
//   data: BusinessProps
// ) {
//   map.isLoading = true;
//   client.business.patch
//     .query({
//       businessCategoryId: +data.businessCategoryId!,
//       name: data.name,
//       planId: data.id!,
//     })
//     .then((res) => {
//       if (res) {
//         Bus.businessPlan = Bus.businessPlan.filter((el) => el.id != data.id);
//         Bus.newBusinessPlan = res;
//       }
//       map.isLoading = false;
//     });
// }
export function setIsPublicBusiness(
  map: MapStore,
  Bus: BusinessStore,
  data: { BusinessId: number; isPublic: boolean; description?: string }
) {
  map.isLoading = true;
  client.business.setIsPublic.query(data).then((res) => {
    if (res) {
      Bus.businessPlan = Bus.businessPlan.filter(
        (el) => el.id != data.BusinessId
      );
      Bus.newBusinessPlan = res;
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
    Bus.noAgreeBusinessPlan = res;
    map.isLoading = false;
  });
}
export function setIsAgreeBusiness(
  map: MapStore,
  Bus: BusinessStore,
  data: { BusinessId: number; isAgree: boolean; description?: string }
) {
  map.isLoading = true;
  client.business.setIsAgree.query(data).then((res) => {
    if (res)
      if (res[0]) {
        Bus.noAgreeBusinessPlan = Bus.noAgreeBusinessPlan.filter(
          (el) => el.id != data.BusinessId
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
    }
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
    }
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
    }
    plan.titlePage = res!;
  });
}
export function getOnlyCart(map: MapStore) {
  map.isLoading = true;
  client.cart.getOnlyCart.query().then((res) => {
    map.maps = [];

    res.forEach((el) => {
      let myMap = map.maps.find((e) => {
        return e.id == el.id;
      });

      if (!myMap && el.isComplex == false) {
        map.newMap = el;
      }
      let myComplex = map.complex.find((e) => e.id == el.id);
      if (!myComplex && el.isComplex == true) {
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
  data: { cultureId: number; comment: string }
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
  data: { yieldPlantId: number; cultureId: number; comment: string }
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
    map.product = res;
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
    if (res) TEJ.justification = res;
  });
}

export function createTEJ(data: createTEJType, TEJ: TEJStore) {
  client.TEJ.create.query(data).then((res) => {
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
      TEJ.justification = TEJ.justification.filter((el) => el.id != res?.id);
      TEJ.newJustification = res;
    }
  });
}

export function setIsPublicTEJ(TEJ: TEJStore, data: setIsPublicTEJType) {
  console.log("work");

  client.TEJ.setIsPublic.query(data).then((res) => {
    if (!res) return;
    TEJ.justification = TEJ.justification.filter((el) => el.id != res.id!);
    TEJ.newJustification = res;
    if (data.isPublic) TEJ.newNoAgreeJustification = res;
    else
      TEJ.noAgreeJustification = TEJ.noAgreeJustification.filter(
        (el) => el.id != res.id
      );
  });
}

export function getNoAgreeJustification(TEJ: TEJStore) {
  client.TEJ.getNoAgree.query().then((res) => {
    if (res[0]) TEJ.noAgreeJustification = res;
  });
}

export function setIsAgreeTEJ(TEJ: TEJStore, data: setIsPublicTEJType) {
  console.log(data.isAgree);

  client.TEJ.setIsAgree.query(data).then((res) => {
    TEJ.justification = TEJ.justification.filter((el) => el.id != res.id!);
    TEJ.newJustification = res;
    if (data.isAgree) {
      TEJ.noAgreeJustification = TEJ.noAgreeJustification.filter(
        (el) => el.id != res.id
      );
      TEJ.newNoAgreeJustification = res;
    } else
      TEJ.noAgreeJustification = TEJ.noAgreeJustification.filter(
        (el) => el.id != res.id
      );
  });
}
export function getAgreeTEJ(TEJ: TEJStore) {
  client.TEJ.getAgreeTEJ.query().then((res) => {
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
    });
    operationsFilter([res], map);
  });
}

export function createIncome(Income: IncomeStore, data: CreateIncome) {
  client.income.create.query(data).then((res) => {
    Income.newIncome = res;
  });
}
export function getIncome(Income: IncomeStore) {
  client.income.get.query().then((res) => {
    Income.income = res;
  });
}
export function setIsUsingIncome(
  Income: IncomeStore,
  data: setIsUsingIncomeType
) {
  client.income.setIsUsing.query(data).then((res) => {
    Income.income = Income.income.filter((el) => el.id != res?.id);
    Income.newIncome = res!;
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
    console.log(res);

    income.newProduction = res;
  });
}

export function getProduction(incomeStore: IncomeStore) {
  client.production.get.query().then((res) => {
    incomeStore.production = res;
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
  });
}

export function patchIncome(incomeStore: IncomeStore, data: PatchIncome) {
  client.income.patch.query(data).then((res) => {
    incomeStore.income = incomeStore.income.filter((el) => el.id != res?.id);
    incomeStore.newIncome = res!;
  });
}

export function deleteIncome(
  incomeStore: IncomeStore,
  data: { incomeId: number }
) {
  client.income.delete.query(data).then((res) => {
    if (res)
      incomeStore.income = incomeStore.income.filter(
        (el) => el.id != data.incomeId
      );
  });
}
