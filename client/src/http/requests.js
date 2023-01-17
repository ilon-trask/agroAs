const CARTuRL = "http://localhost:5000/api/cart";
const OPERuRL = "http://localhost:5000/api/oper";
const SECuRL = "http://localhost:5000/api/sec";
const TRACuRL = "http://localhost:5000/api/tractor/";
const MACHINEuRL = "http://localhost:5000/api/machine/";

export function getCarts(map) {
  return fetch(CARTuRL)
    .then((res) => res.json())
    .then((res) => {
      map.opers = [];
      map.maps = res;
      let ids = map.maps.map((el) => el.id);

      for (let i = 0; i < ids.length; i++) {
        getOpers(map, ids[i]);
      }
    });
}

export function getOpers(map, id) {
  fetch(OPERuRL + "/" + id)
    .then((res) => res.json())
    .then((res) => {
      map.costMaterials = [];
      map.costServices = [];
      map.costTransport = [];
      res.forEach((el) => {
        getProps(map, id, el.id, el.cell);
      });
      map.newOper = res;
    });
}
export function getProps(map, id, el, cell) {
  fetch(OPERuRL + "/" + id + "/" + el + "/" + cell)
    .then((res) => res.json())
    .then((el) => {
      if (cell === "costMaterials") {
        map.newCostMaterials = el[0];
      } else if (cell === "costServices") {
        map.newCostServices = el[0];
      } else if (cell === "costTransport") {
        map.newCostTransport = el[0];
      } else if (cell === "costMechanical") {
      }
    });
}
export function getOnlyCart(map) {
  fetch(CARTuRL)
    .then((res) => res.json())
    .then((res) => {
      map.maps = [];
      map.maps = res;
    });
}
export function deleteCart(map, id) {
  fetch(CARTuRL, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: id }),
  }).then(() => {
    getCarts(map);
  });
}

export function createCart(map, data) {
  fetch(CARTuRL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(() => {
    getCarts(map);
  });
}

export function updateMap(map, res) {
  fetch(CARTuRL, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(res),
  }).then(() => {
    getOnlyCart(map);
  });
}

export function deleteOper(map, ind, elem, id, akk) {
  fetch(OPERuRL + "/" + id + "/" + ind, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify([elem, akk]),
  }).then(() => {
    map.opers = [];
    let ids = map.maps.map((el) => el.id);
    for (let i = 0; i < ids.length; i++) {
      getOpers(map, ids[i]);
    }
  });
}

export function createOperation(map, arr, id, akk) {
  console.log(+akk + (+arr.res.price * +arr.res.amount || +arr.res.price));
  fetch(OPERuRL + "/" + id, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cartId: id,
      sum: +akk + (+arr.res.price * +arr.res.amount || +arr.res.price),
      arr,
    }),
  }).then(() => {
    getCarts(map);
  });
}

export function patchOperation(map, arr, id, akkum) {
  fetch(OPERuRL + "/" + id, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cartId: id,
      sum: +akkum + (+arr.res.price * +arr.res.amount || +arr.res.price),
      arr,
    }),
  }).then(() => {
    getCarts(map);
  });
}

export function getSection(map) {
  fetch(SECuRL)
    .then((data) => data.json())
    .then((res) => (map.section = res));
}

export function createTractor(map, res) {
  fetch(TRACuRL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      res,
    }),
  }).then(() => {
    getTractor(map);
  });
}
export function getTractor(map) {
  fetch(TRACuRL)
    .then((data) => data.json())
    .then((res) => (map.tractor = res));
}

export function createMachine(map, res) {
  console.log(res);
  fetch(MACHINEuRL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      res,
    }),
  }).then(() => {
    getMachine(map);
  });
}
export function getMachine(map) {
  fetch(MACHINEuRL)
    .then((data) => data.json())
    .then((res) => {
      map.machine = res;
    });
}
