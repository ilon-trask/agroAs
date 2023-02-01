import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "../../../tRPC serv/index";
import { Icell, prope } from "../../../tRPC serv/controllers/OperService";
import { Idata } from "../../../tRPC serv/controllers/TechCartService";
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
  console.log("start");

  await client.cart.get.query().then(
    // @ts-ignore
    (res: {
      carts: Itech_cart[];
      opers: Itech_operation[];
      props: prope[];
    }) => {
      console.log(res);
      console.log("end");
      map.opers = [];
      map.costMechanical = [];
      map.costMaterials = [];
      map.costServices = [];
      map.costTransport = [];
      map.maps = res.carts;
      map.opers = res.opers;
      console.log(map.opers);

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
    }
  );
}

export function getOpers(map: MapStore, id: number) {
  // @ts-ignore some_err_in_sequelize_mb
  client.oper.get
    .query({ id: id })
    // @ts-ignore
    .then((res: { opers: tech_operation[]; props: prope[] }) => {
      console.log("opers");

      map.costMaterials = [];
      map.costServices = [];
      map.costTransport = [];
      map.costHandWork = [];
      map.costMechanical = [];
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
      console.log(map.opers);
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
    map.maps = res.carts;
  });
}
export function deleteCart(map: MapStore, id: number) {
  client.cart.delete.query({ id: id }).then((data) => {
    map.maps = data.carts;
  });
}

export function createCart(map: MapStore, data: Idata) {
  client.cart.create.query(data).then((data) => {
    map.maps = data.carts;
  });
}

export function updateMap(map: MapStore, data: any) {
  client.cart.patch.query(data).then(
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
