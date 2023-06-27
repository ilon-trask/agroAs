import { PlusSquareIcon } from "@chakra-ui/icons";
import iconPropsType from "src/shared/Types/IconPropType";

function MyAddIcon(prop: iconPropsType) {
  return (
    <PlusSquareIcon
      {...prop}
      color={"blue.400"}
      boxSize={"22px"}
      cursor={"pointer"}
    />
  );
}

export default MyAddIcon;
