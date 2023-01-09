const CARTuRL = "http://localhost:5000/api/cart";
const SECuRL = "http://localhost:5000/api/sec";

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
  fetch("http://localhost:5000/api/cart/" + id)
    .then((res) => res.json())
    .then((res) => {
      map.costMaterials = [];
      map.costServices = [];
      res.forEach((el) => {
        getProps(map, id, el.id, el.cell);
      });
      map.newOper = res;
    });
}
export function getProps(map, id, el, cell) {
  fetch(`http://localhost:5000/api/cart/${id}/${el}/${cell}`)
    .then((res) => res.json())
    .then((el) => {
      if (cell === "costMaterials") {
        map.newCostMaterials = el[0];
      } else if (cell === "costServices") {
        console.log(el[0]);
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
  fetch("http://localhost:5000/api/cart", {
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
  console.log(ind);
  console.log(elem);
  console.log(id);
  console.log(akk);
  fetch(`http://localhost:5000/api/cart/${id}/${ind}`, {
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
  console.log(id);
  console.log(akk);
  console.log(+arr.res.price * +arr.res.amount);
  console.log(+arr.res.price);
  console.log(+arr.res.price * +arr.res.amount || +arr.res.price);
  console.log(akk + (+arr.res.price * +arr.res.amount || +arr.res.price));
  fetch(`http://localhost:5000/api/cart/${id}`, {
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
  fetch(`http://localhost:5000/api/cart/${id}`, {
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
