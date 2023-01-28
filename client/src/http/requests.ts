import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "../../../tRPC serv/index";
import { Icell, prope } from "../../../tRPC serv/controllers/OperService";
import { Idata } from "../../../tRPC serv/controllers/TechCartService";
import MapStore from "../store/MapStore";
import {
  Icost_hand_work,
  Igrade,
  Imachine,
  Itech_operation,
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
  // @ts-ignore some_err_in_sequelize_mb
  client.oper.get.query({ id: id }).then((res: Itech_operation[]) => {
    map.costMaterials = [];
    map.costServices = [];
    map.costTransport = [];
    map.costHandWork = [];

    res.forEach((el) => {
      getProps(map, el.id!, el.cell);
    });

    map.opers = res;
  });
}
export function getProps(map: MapStore, id: number, cell: Icell) {
  client.oper.getProps.query({ operId: id }).then(
    //@ts-ignore some_err_in_sequelize_mb
    (
      el:
        | Iaggregate[]
        | Icost_material[]
        | Icost_service[]
        | Icost_transport[]
        | Icost_hand_work[]
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
      } else if (cell === "costHandWork") {
        let elem = el as Icost_hand_work[];
        map.newCostHandWork = elem[0];
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
  client.cart.delete.query({ id: id }).then((data) => {
    map.maps = data;
  });
}

export function createCart(map: MapStore, data: Idata) {
  client.cart.create.query(data).then((data) => {
    map.maps = data;
  });
}

export function updateMap(map: MapStore, data: Idata) {
  // @ts-ignore
  client.cart.patch.query(data).then((data) => {
    map.maps = data;
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
    .then((data) => {
      map.opers = [];
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
}

export function createOperation(
  map: MapStore,
  arr: {
    cell: Icell;
    res: any;
    section: number;
  },
  id: number,
  akk: number
) {
  console.log(arr.cell);

  client.oper.create[arr.cell]
    .query({
      arr: arr,
      cartId: +id,
      akk,
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
}

export function patchOperation(
  map: MapStore,
  arr: {
    cell: Icell;
    res: any;
  },
  id: number,
  akkum: number
) {
  client.oper.patch[arr.cell]
    .query({
      cartId: +id,
      akkum,
      arr: arr,
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
    map.tractor = [];
    map.tractor = res;
  });
}

export function createMachine(map: MapStore, res: Imachine) {
  client.machine.create.query(res).then(() => {
    getMachine(map);
  });
}

export function patchMachine(map: MapStore, res: Imachine) {
  client.machine.patch.query(res).then((data) => {
    getMachine(map);
  });
}

export function getMachine(map: MapStore) {
  client.machine.get.query().then((res) => {
    map.machine = [];
    map.machine = res;
  });
}
export function getGrades(map: MapStore) {
  client.grade.get.query().then((data) => {
    map.grade = data;
  });
}
