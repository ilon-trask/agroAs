import { ViewIcon, IconProps } from "@chakra-ui/icons";
function MyViewIcon(prop: IconProps) {
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
