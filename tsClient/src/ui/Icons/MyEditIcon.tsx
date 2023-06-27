import { EditIcon } from "@chakra-ui/icons";
import iconPropsType from "src/shared/Types/IconPropType";
function MyEditIcon(prop: iconPropsType) {
  return (
    <EditIcon
      {...prop}
      color={"blue.400"}
      boxSize={"22px"}
      cursor={"pointer"}
    />
  );
}

export default MyEditIcon;
