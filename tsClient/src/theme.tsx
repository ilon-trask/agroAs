import { extendTheme } from "@chakra-ui/react";
import { radioAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(radioAnatomy.keys);

const baseStyle = definePartsStyle({
  // define the part you're going to style
  control: {
    borderRadius: "12px", // change the border radius
    borderColor: "grey.700", // change the border color
  },
});

const radioTheme = defineMultiStyleConfig({ baseStyle });

export const theme = extendTheme({
  components: { Radio: radioTheme },
});
