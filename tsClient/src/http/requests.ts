import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { type AppRouter } from "../../../tRPC serv/index";
import { Icell, prope } from "../../../tRPC serv/controllers/OperService";
import {
  Idata,
  resTechCartsWithOpers,
  resTechOperation,
} from "../../../tRPC serv/controllers/TechCartService";
import MapStore from "../store/MapStore";
import {
  Icost_hand_work,
  Igrade,
  Imachine,
  Isection,
  Itech_cart,
  Itech_operation,
  Itractor,
  tech_cart,
  tech_operation,
  tractor,
} from "../../../tRPC serv/models/models";

import { createClient } from "@supabase/supabase-js";
import { cartProps } from "../modules/CreateCart";
import { TracProps } from "../modules/CreateTractor";
import { MachineProps } from "../modules/CreateMachine";

export const supabase = createClient(
  "https://bicofnobkczquxvztyzl.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpY29mbm9ia2N6cXV4dnp0eXpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ5MjQ5MTIsImV4cCI6MTk5MDUwMDkxMn0.jEd8pHzVzlqZxf-ioqC_QKoda_xqfD2nh4niJ1mea9s"
);
// (async () => {
//   console.log(
//     await (
//       await supabase.auth.getSession()
//     ).data.session?.access_token
//   );
// })();

const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:5000",
      async headers() {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();
        console.log(session);
        if (!session) return {};
        return {
          authorization: "Bearer " + session.access_token,
        };
      },
    }),
  ],
});

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
export async function getCarts(map: MapStore) {
  map.isLoading = true;

  await client.cart.get
    .query()
    .then((res: { carts: resTechCartsWithOpers[] }) => {
      console.log(res);

      map.opers = [];
      map.costMechanical = [];
      map.costMaterials = [];
      map.costServices = [];
      map.costTransport = [];
      map.maps = res.carts;
      for (let i = 0; i < res.carts.length; i++) {
        const opers = res.carts[i].tech_operations;
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
    });
  map.isLoading = false;
}

export async function setIsPublic(
  map: MapStore,
  data: { id: number; isPublic: boolean }
) {
  map.isLoading = true;
  await client.cart.setIsPublic.query(data).then((res) => {
    console.log(res);

    map.opers = [];
    map.costMechanical = [];
    map.costMaterials = [];
    map.costServices = [];
    map.costTransport = [];
    map.maps = res.carts;
    for (let i = 0; i < res.carts.length; i++) {
      const opers = res.carts[i].tech_operations;
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
  });
  map.isLoading = false;
}

export async function deleteCart(map: MapStore, id: number) {
  map.isLoading = true;
  await client.cart.delete.query({ id: id }).then((data: { id: number }) => {
    map.maps = map.maps.filter((el) => el.id != data.id);
  });
  map.isLoading = false;
}

export async function createCart(map: MapStore, data: Itech_cart) {
  map.isLoading = true;
  //@ts-ignore
  await client.cart.create.query(data).then((res: resTechCartsWithOpers) => {
    map.newMaps = res;
  });
  map.isLoading = false;
}

export async function updateMap(map: MapStore, dat: any) {
  map.isLoading = true;
  let data = JSON.parse(JSON.stringify(dat));
  console.log(data);

  await client.cart.patch.query(data).then(
    // @ts-ignore
    (res: { carts: resTechCartsWithOpers[] }) => {
      console.log(res);
      map.opers = [];
      map.costMechanical = [];
      map.costMaterials = [];
      map.costServices = [];
      map.costTransport = [];
      map.maps = res.carts;
      for (let i = 0; i < res.carts.length; i++) {
        const opers = res.carts[i].tech_operations;
        for (let j = 0; j < opers.length; j++) {
          const oper = opers[j];
          console.log(oper);

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
  );
  map.isLoading = false;
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
    .then((data: Itech_operation) => {
      map.opers = map.opers.filter((el) => el.id != data.id);
      let [mapData] = map.maps.filter((el) => el.id == data.techCartId);

      console.log(operValue(data));

      mapData.totalCost! -= operValue(data);
    });
  map.isLoading = false;
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
      console.log(data);

      const { oper, prope } = data;
      map.newOper = oper;
      let [mapData] = map.maps.filter((el) => el.id == oper.techCartId);
      mapData.totalCost! += operValue(oper);
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
    });
  map.isLoading = false;
}

export async function patchOperation(
  map: MapStore,
  arr: {
    cell: Icell;
    res: any;
  },
  id: number
) {
  map.isLoading = true;

  let [mapData] = map.maps.filter((el) => el.id == id);
  let [operData] = map.opers.filter((el) => el.id == arr.res.operId);
  console.log(mapData);
  console.log(operData);
  mapData.totalCost! -= operValue(operData);
  await client.oper.patch[arr.cell]
    .query({
      cartId: +id,
      arr: arr,
    })
    //@ts-ignore
    .then((res: resTechOperation) => {
      console.log(res);
      console.log(arr.res.operId);
      console.log(map.opers[2].id);
      console.log(map.opers.filter((el) => el.id != arr.res.operId));

      map.opers = map.opers.filter((el) => el.id != arr.res.operId);

      map.newOper = res;
      let [mapData] = map.maps.filter((el) => el.id == res.techCartId);
      console.log(mapData);

      mapData.totalCost! += operValue(res);
      map.costHandWork = map.costHandWork.filter(
        (el) => el.techOperationId != arr.res.operId
      );
      map.costMaterials = map.costMaterials.filter(
        (el) => el.techOperationId != arr.res.operId
      );
      console.log(map.maps);
      let [thisMap] = map.maps.filter((el) => el.id == id);
      console.log(thisMap);
      for (let i = 0; i < thisMap.tech_operations.length; i++) {
        const el = thisMap.tech_operations[i];
        if (el?.cost_material?.id == res.cost_material?.id) {
          el.cost_material = res.cost_material;
        }
        if (el?.cost_service?.id == res.cost_service?.id) {
          el.cost_service = res.cost_service;
        }
        if (el?.aggregate?.id == res.aggregate?.id) {
          el.aggregate = res.aggregate;
        }
        if (el.cost_hand_work?.id == res.cost_hand_work?.id) {
          el.cost_hand_work = res.cost_hand_work;
        }
        if (el?.cost_transport?.id == res.cost_transport?.id) {
          el.cost_transport = res.cost_transport;
        }
      }
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
        map.newCostMechanical = res.aggregate;
      } else if (res.cost_service) {
        map.newCostServices = res.cost_service;
      } else if (res.cost_transport) {
        map.newCostTransport = res.cost_transport;
      } else if (res.cost_material) {
        map.newCostMaterials = res.cost_material;
      } else if (res.cost_hand_work) {
        map.newCostHandWork = res.cost_hand_work;
      }
    });
  map.isLoading = false;
}

export function getSection(map: MapStore) {
  client.section.get.query().then((res: Isection[]) => (map.section = res));
}

export function createTractor(map: MapStore, res: Itractor) {
  client.tractor.create.query(res).then((data: Itractor) => {
    map.newTractor = data;
  });
}

export function patchTractor(map: MapStore, res: Itractor) {
  client.tractor.patch.query(res).then(() => getTractor(map));
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
  client.machine.patch.query(res).then((data: Imachine) => {
    map.newMachine = data;
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
