import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "../../../tRPC serv/index";
import { Icell, prope } from "../../../tRPC serv/controllers/OperService";
import {
  Idata,
  resTechCartsWithOpers,
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

export async function getCarts(map: MapStore) {
  map.isLoading = true;
  let data;
  await client.cart.get
    .query()
    .then((res: { carts: resTechCartsWithOpers[] }) => {
      map.opers = [];
      data = res;
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
            console.log(oper.aggregate);

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
  return data;
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
    .then((data) => {
      map.maps = data.carts;
      map.opers = data.opers;
      data.props?.forEach((el) => {
        let [oper] = data.opers.filter(
          //@ts-ignore
          (oper) => oper.id == el.techOperationId
        );
        console.log(oper);

        let cell = oper.cell;
        if (cell == "costMaterials") {
          let elem = el as Icost_material;
          map.newCostMaterials = elem;
        } else if (cell == "costServices") {
          let elem = el as Icost_service;
          map.newCostServices = elem;
        } else if (cell == "costTransport") {
          let elem = el as Icost_transport;
          map.newCostTransport = elem;
        } else if (cell == "costMechanical") {
          let elem = el as Iaggregate;
          map.newCostMechanical = elem;
        } else if (cell == "costHandWork") {
          let elem = el as Icost_hand_work;
          map.newCostHandWork = elem;
        }
      });
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
    .then((data) => {
      data.props?.forEach((el) => {
        let [oper] = data.opers.filter(
          //@ts-ignore
          (oper) => oper.id == el.techOperationId
        );
        console.log(oper);

        let cell = oper.cell;
        if (cell == "costMaterials") {
          let elem = el as Icost_material;
          map.newCostMaterials = elem;
        } else if (cell == "costServices") {
          let elem = el as Icost_service;
          map.newCostServices = elem;
        } else if (cell == "costTransport") {
          let elem = el as Icost_transport;
          map.newCostTransport = elem;
        } else if (cell == "costMechanical") {
          let elem = el as Iaggregate;
          map.newCostMechanical = elem;
        } else if (cell == "costHandWork") {
          let elem = el as Icost_hand_work;
          map.newCostHandWork = elem;
        }
      });
      map.opers = data.opers;
      map.maps = data.carts;
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
  await client.oper.patch[arr.cell]
    .query({
      cartId: +id,

      arr: arr,
    })
    .then((data) => {
      map.costMechanical = [];
      map.costMaterials = [];
      map.costServices = [];
      map.costTransport = [];
      map.costHandWork = [];
      data.props?.forEach((el) => {
        let [oper] = data.opers.filter(
          //@ts-ignore
          (oper) => oper.id == el.techOperationId
        );
        console.log(oper);
        console.log(el);
        console.log(map.costHandWork);

        let cell = oper.cell;
        if (cell == "costMaterials") {
          let elem = el as Icost_material;
          map.newCostMaterials = elem;
        } else if (cell == "costServices") {
          let elem = el as Icost_service;
          map.newCostServices = elem;
        } else if (cell == "costTransport") {
          let elem = el as Icost_transport;
          map.newCostTransport = elem;
        } else if (cell == "costMechanical") {
          let elem = el as Iaggregate;
          map.newCostMechanical = elem;
        } else if (cell == "costHandWork") {
          let elem = el as Icost_hand_work;
          map.newCostHandWork = elem;
        }
      });
      map.opers = data.opers;
      map.maps = data.carts;
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
