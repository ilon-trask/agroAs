import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "../../../tRPC serv/index";
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
  Itech_cart,
  Itech_operation,
  Itractor,
  tech_cart,
  tech_operation,
} from "../../../tRPC serv/models/models";
import {
  Iaggregate,
  Icost_material,
  Icost_service,
  Icost_transport,
} from "../../../tRPC serv/models/models";

const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:5000",
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
          console.log(oper);

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
  await client.cart.delete
    .query({ id: id })
    .then((data: { carts: resTechCartsWithOpers[] }) => {
      map.maps = data.carts;
    });
  map.isLoading = false;
}

export async function createCart(map: MapStore, data: Idata) {
  map.isLoading = true;
  await client.cart.create.query(data).then((res: Itech_cart) => {
    map.newMaps = res;
  });
  map.isLoading = false;
}

export async function updateMap(map: MapStore, data: any) {
  map.isLoading = true;
  await client.cart.patch.query(data).then(
    // @ts-ignore
    (res: {
      carts: Itech_cart[];
      opers: Itech_operation[];
      props: prope[];
    }) => {
      map.opers = [];
      map.costMechanical = [];
      map.costMaterials = [];
      map.costServices = [];
      map.costTransport = [];
      map.maps = res.carts;
      let ids = map.maps.map((el) => el.id);

      res.props.forEach((el) => {
        if ("nameMaterials" in el) {
          map.newCostMaterials = el;
        } else if ("nameService" in el) {
          map.newCostServices = el;
        } else if ("nameTransport" in el) {
          map.newCostTransport = el;
        } else if ("productionRateAmount" in el) {
          map.newCostHandWork = el;
        } else if ("fuelConsumption" in el) {
          map.newCostMechanical = el;
        }
      });
      map.opers = res.opers;
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

      mapData.totalCost! -= operValue(data);
    });
  map.isLoading = false;
}

export async function createOperation(
  map: MapStore,
  arr: {
    cell: Icell;
    res: any;
    section: number;
  },
  id: number
) {
  map.isLoading = true;

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

      map.opers = map.opers.filter((el) => el.id != arr.res.operId);
      map.newOper = res;
      let [mapData] = map.maps.filter((el) => el.id == res.techCartId);
      mapData.totalCost! += operValue(res);
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
  client.section.get.query().then((res) => (map.section = res));
}

export function createTractor(map: MapStore, res: Itractor) {
  client.tractor.create.query(res).then(() => {
    getTractor(map);
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
  client.machine.create.query(res).then((data: Imachine[]) => {
    map.machine = data;
  });
}

export function patchMachine(map: MapStore, res: Imachine) {
  client.machine.patch.query(res).then((data: Imachine[]) => {
    map.machine = data;
  });
}

export function getMachine(map: MapStore) {
  client.machine.get.query().then((res) => {
    map.machine = res;
  });
}
export function getGrades(map: MapStore) {
  client.grade.get.query().then((data) => {
    map.grade = data;
  });
}
