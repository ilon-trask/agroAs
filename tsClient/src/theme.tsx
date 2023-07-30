import { extendTheme } from "@chakra-ui/react";
import { radioAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(radioAnatomy.keys);

const baseStyle = definePartsStyle({
  control: {
    borderRadius: "12px",
    borderColor: "grey.700",
  },
});

const radioTheme = defineMultiStyleConfig({ baseStyle });

export const theme = extendTheme({
  components: { Radio: radioTheme },
});
