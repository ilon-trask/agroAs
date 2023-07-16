import { DeleteIcon, IconProps } from "@chakra-ui/icons";
function MyDeleteIcon(prop: IconProps) {
  return (
    <DeleteIcon {...prop} color={"red"} boxSize={"22px"} cursor={"pointer"} />
  );
}

export default MyDeleteIcon;
