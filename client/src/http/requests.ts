import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "../../../tRPC serv/index";
import {
  Icell,
  Ires,
  IresPatch,
} from "../../../tRPC serv/controllers/OperService";
import { Idata } from "../../../tRPC serv/controllers/TechCartService";
import MapStore from "../store/MapStore";
import {
  Imachine,
  Itractor,
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
  client.cart.get.query().then((res) => {
    console.log(res);

    map.opers = [];
    map.costMechanical = [];
    map.costMaterials = [];
    map.costServices = [];
    map.costTransport = [];
    map.maps = res;
    let ids = map.maps.map((el) => el.id);

    for (let i = 0; i < ids.length; i++) {
      getOpers(map, ids[i]!);
    }
  });
}

export function getOpers(map: MapStore, id: number) {
  //@ts-ignore some_err_in_sequelize_mb
  client.oper.get.query({ id: id }).then((res: tech_operation[]) => {
    map.costMaterials = [];
    map.costServices = [];
    map.costTransport = [];
    res.forEach((el) => {
      getProps(map, el.id!, el.cell);
    });

    map.newOper = res;
  });
}
export function getProps(map: MapStore, id: number, cell: Icell) {
  client.oper.getProps.query({ operId: id }).then(
    //@ts-ignore some_err_in_sequelize_mb
    (
      el: Iaggregate[] | Icost_material[] | Icost_service[] | Icost_transport[]
    ) => {
      if (cell === "costMaterials") {
        let elem = el as Icost_material[];
        map.newCostMaterials = elem[0];
      } else if (cell === "costServices") {
        let elem = el as Icost_service[];
        map.newCostServices = elem[0];
      } else if (cell === "costTransport") {
        let elem = el as Icost_transport[];
        map.newCostTransport = elem[0];
      } else if (cell === "costMechanical") {
        let elem = el as Iaggregate[];
        map.newCostMechanical = elem[0];
      }
    }
  );
}
export function getOnlyCart(map: MapStore) {
  client.cart.get.query().then((res) => {
    map.maps = [];
    map.maps = res;
  });
}
export function deleteCart(map: MapStore, id: number) {
  client.cart.delete.query({ id: id }).then(() => {
    getCarts(map);
  });
}

export function createCart(map: MapStore, data: Idata) {
  client.cart.create.query(data).then(() => {
    getCarts(map);
  });
}

export function updateMap(map: MapStore, data: Idata) {
  //@ts-ignore
  client.cart.patch.query(data).then(() => {
    getOnlyCart(map);
  });
}

export function deleteOper(
  map: MapStore,
  operId: number,
  cartId: number,
  akk: number
) {
  client.oper.delete
    .query({ akk: akk, cartId: +cartId, operId: operId })
    .then(() => {
      map.opers = [];
      let ids = map.maps.map((el) => el.id);
      for (let i = 0; i < ids.length; i++) {
        getOpers(map, ids[i]!);
      }
    });
}

export function createOperation(
  map: MapStore,
  arr: {
    cell: Icell;
    res: Ires;
    section: number;
  },
  id: number,
  akk: number
) {
  client.oper.create
    .query({
      arr: arr,
      cartId: +id,
      akk,
    })
    .then(() => {
      getCarts(map);
    });
}

export function patchOperation(
  map: MapStore,
  arr: {
    cell: Icell;
    res: IresPatch;
  },
  id: number,
  akkum: number
) {
  client.oper.patch
    .query({
      arr: arr,
      cartId: +id,
      akkum,
    })
    .then(() => {
      getCarts(map);
    });
}

export function getSection(map: MapStore) {
  client.section.get.query().then((res) => (map.section = res));
}

export function createTractor(map: MapStore, res: Itractor) {
  client.tractor.create.query(res).then(() => {
    getTractor(map);
  });
}
export function getTractor(map: MapStore) {
  client.tractor.get.query().then((res: Itractor[]) => (map.tractor = res));
}

export function createMachine(map: MapStore, res: Imachine) {
  client.machine.create.query(res).then(() => {
    getMachine(map);
  });
}
export function getMachine(map: MapStore) {
  client.machine.get.query().then((res) => {
    map.machine = res;
  });
}
