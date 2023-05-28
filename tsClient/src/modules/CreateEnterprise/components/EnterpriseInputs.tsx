import React, { Dispatch, SetStateAction } from "react";
import { Box, Heading, Text, Input, Select } from "@chakra-ui/react";
import useEnterpriseForm, {
  EnterpriseFormType,
} from "../../../shared/hook/useEnterpriseForm";
import useEnterpriseTaxGroup from "../../../shared/hook/useEnterpriseTaxGroup";
import { CreateEnterpriseProps } from "../CreateEnterprise";
type props = {
  res: CreateEnterpriseProps;
  setRes: Dispatch<SetStateAction<CreateEnterpriseProps>>;
};
const forms = useEnterpriseForm;
function EnterpriseInputs({ res, setRes }: props) {
  return (
    <Box>
      <Heading size="md" textAlign={"center"}>
        Вкажіть данні для підприємства
      </Heading>
      <Box>
        <Box>
          <Text>Введіть назву </Text>
          <Input
            value={res.name}
            placeholder="Введіть назву"
            onChange={(e) =>
              setRes((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </Box>
        <Box>
          <Text>Виберіть організаційно правову форму</Text>
          <Select
            value={res.form}
            onChange={(e) =>
              setRes((prev) => ({
                ...prev,
                form: e.target.value as EnterpriseFormType,
              }))
            }
          >
            <option value="" hidden defaultChecked>
              Виберіть опцію
            </option>
            {forms.map((el) => (
              <option key={el.id} value={el.name}>
                {el.name}
              </option>
            ))}
          </Select>
        </Box>
        <Box>
          <Text>Виберіть групу оподаткування</Text>
          <Select
            value={res.taxGroup}
            onChange={(e) =>
              setRes((prev) => ({ ...prev, taxGroup: e.target.value as any }))
            }
          >
            <option value="" hidden defaultChecked>
              Виберіть опцію
            </option>
            {useEnterpriseTaxGroup.map((el) => (
              <option key={el.id} value={el.name}>
                {el.name}
              </option>
            ))}
          </Select>
        </Box>
      </Box>
    </Box>
  );
}

export default EnterpriseInputs;
