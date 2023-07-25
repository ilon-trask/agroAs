import { EditIcon, IconProps } from "@chakra-ui/icons";
function MyEditIcon(prop: IconProps) {
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
