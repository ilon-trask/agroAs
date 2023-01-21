import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "../../../tRPC serv/index";

const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:5000",
    }),
  ],
});

export async function getCarts(map) {
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
      getOpers(map, ids[i]);
    }
  });
}

export function getOpers(map, id) {
  client.oper.get.query({ id: id }).then((res) => {
    map.costMaterials = [];
    map.costServices = [];
    map.costTransport = [];
    res.forEach((el) => {
      getProps(map, el.id, el.cell);
    });
    map.newOper = res;
  });
}
export function getProps(map, id, cell) {
  client.oper.getProps.query({ operId: id }).then((el) => {
    if (cell === "costMaterials") {
      map.newCostMaterials = el[0];
    } else if (cell === "costServices") {
      map.newCostServices = el[0];
    } else if (cell === "costTransport") {
      map.newCostTransport = el[0];
    } else if (cell === "costMechanical") {
      map.newCostMechanical = el[0];
    }
  });
}
export function getOnlyCart(map) {
  client.cart.get.query().then((res) => {
    map.maps = [];
    map.maps = res;
  });
}
export function deleteCart(map, id) {
  client.cart.delete.query({ id: id }).then(() => {
    getCarts(map);
  });
}

export function createCart(map, data) {
  client.cart.create.query(data).then(() => {
    getCarts(map);
  });
}

export function updateMap(map, data) {
  client.cart.patch.query(data).then(() => {
    getOnlyCart(map);
  });
}

export function deleteOper(map, operId, cartId, akk) {
  client.oper.delete
    .query({ akk: akk, cartId: +cartId, operId: operId })
    .then(() => {
      map.opers = [];
      let ids = map.maps.map((el) => el.id);
      for (let i = 0; i < ids.length; i++) {
        getOpers(map, ids[i]);
      }
    });
}

export function createOperation(map, arr, id, akk) {
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

export function patchOperation(map, arr, id, akkum) {
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

export function getSection(map) {
  client.section.get.query().then((res) => (map.section = res));
}

export function createTractor(map, res) {
  client.tractor.create.query(res).then(() => {
    getTractor(map);
  });
}
export function getTractor(map) {
  client.tractor.get.query().then((res) => (map.tractor = res));
}

export function createMachine(map, res) {
  client.machine.create.query(res).then(() => {
    getMachine(map);
  });
}
export function getMachine(map) {
  client.machine.get.query().then((res) => {
    map.machine = res;
  });
}
