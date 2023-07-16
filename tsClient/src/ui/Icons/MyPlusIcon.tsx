import { PlusSquareIcon, IconProps } from "@chakra-ui/icons";
function MyPlusIcon(prop: IconProps) {
  return (
    <PlusSquareIcon
      {...prop}
      color={"blue.400"}
      boxSize={"22px"}
      cursor={"pointer"}
    />
  );
}

export default MyPlusIcon;
