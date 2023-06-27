import { DeleteIcon } from "@chakra-ui/icons";
import iconPropsType from "src/shared/Types/IconPropType";
function MyDeleteIcon(prop: iconPropsType) {
  return (
    <DeleteIcon
      {...prop}
      color={"red.500"}
      boxSize={"22px"}
      cursor={"pointer"}
    />
  );
}

export default MyDeleteIcon;
