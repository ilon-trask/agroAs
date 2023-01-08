// type arr = [number, string];

// let b:arr  = {a:3,b:'s'}

function add(a: number, b: string) {
  return [a, b];
}
// console.log(add(2, "s"));

enum section {
  "s" = "поливання",
  "поливання" = 0,
  "зберігання" = 1,
}

console.log(section[0]);

type res = {
  nameOper: string;
  price: number;
  amount: number;
  unitsOfCost: string;
  unitsOfConsumption: string;
};
type arr = {
  cell: string;
  res: res;
  section: number;
};

type reqes = {
  cartId: number;
  sum: number;
  arr: arr;
};

function createOper(req, res) {
  try {
    const data: reqes = req.body;
    const {
      cartId,
      sum,
      arr: {
        cell,
        res: { nameOper, price, amount, unitsOfCost, unitsOfConsumption },
        section,
      },
    } = data;
    console.log(data.cartId);
    console.log(data.sum);
    console.log();
    console.log(req.body);

    if (cell == "costMaterials") {
      const techOperation = TechOperation.create({
        techCartId: cartId,
        nameOperation: nameOper,
        cell,
        [cell]: price * amount,
        sectionId: section,
      })
        .then((data) => {
          const operId = data.id;
          CostMaterial.create({
            nameMaterials: nameOper,
             price,
            unitsOfCost,
            consumptionPerHectare: amount,
            unitsOfConsumption,
            cell,
            techOperationId: operId,
          });
        })
        .then(TechCart.update({ totalCost: sum }, { where: { id: cartId } }));
    } else if (cell == "costServices") {
      const techOperation = TechOperation.create({
        techCartId: cartId,
        nameOperation: nameOper,
        cell,
        [cell]: +price,
      })
        .then((data) => {
          const operId = data.id;
          const costService = CostService.create({
            nameService: nameOper,
            price: +price,
            unitsOfCost,
            cell,
            techOperationId: operId,
          });
        })
        .then(TechCart.update({ totalCost: sum }, { where: { id: cartId } }));
    // }

    return res.json("all good");
  } catch (e) {
    console.log(e);
  }
}
