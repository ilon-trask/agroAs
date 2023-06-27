import { ViewIcon } from "@chakra-ui/icons";
import iconPropsType from "src/shared/Types/IconPropType";
function MyViewIcon(prop: iconPropsType) {
  return (
    <ViewIcon
      {...prop}
      color={prop.color || "blue.400"}
      boxSize={"22px"}
      cursor={"pointer"}
    />
  );
}

export default MyViewIcon;
