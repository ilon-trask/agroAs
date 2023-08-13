import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import {
  Box,
  Input,
  Heading,
  Text,
  Select,
  Textarea,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { CreateBusinessProp } from "../CreateBusiness";
import { Context } from "../../../main";
import { useForm } from "react-hook-form";
import { supabase } from "src/http/requests";
type props = {
  res: CreateBusinessProp;
  func: (data: CreateBusinessProp) => void;
  buttonText: string;
  isWOEnterprise?: boolean;
};
function BusinessInputs({ res, func, isWOEnterprise, buttonText }: props) {
  const { enterpriseStore } = useContext(Context);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: res,
  });
  return (
    <Box>
      <Heading as={"h4"} size="md" textAlign={"center"}>
        Внесіть загальні дані бізнес-плану
      </Heading>
      <form onSubmit={handleSubmit(func)}>
        <Box display={"flex"} justifyContent={"space-around"}>
          <Box width={"40%"}>
            <Text fontWeight={"bold"}>Вкажіть назву бізнес-плану</Text>
            <Input
              {...register("name", { required: true })}
              placeholder="Впишіть назву"
            />
          </Box>
          <Box width={"40%"}>
            <Text fontWeight={"bold"}>Вкажіть тему бізнес-плану</Text>
            <Input
              {...register("topic", { required: true })}
              placeholder="Впишіть тему"
            />
          </Box>
        </Box>
        <Box display={"flex"} justifyContent={"space-around"}>
          <Box width={"40%"}>
            <Text fontWeight={"bold"}>Вкажіть дату початку</Text>
            <Input
              {...register("dateStart", { required: true })}
              // value={res.dateStart}
              // onChange={(e) =>
              //   setRes((prev) => ({ ...prev, dateStart: e.target.value }))
              // }
              placeholder="Впишіть дату"
              type={"date"}
            />
          </Box>
          <Box width={"40%"}>
            <Text fontWeight={"bold"}>Вкажіть термін реалізації</Text>
            <Input
              {...register("realizationTime", {
                required: true,
                valueAsNumber: true,
              })}
              placeholder="Впишіть термін"
              type={"number"}
              inputMode={"numeric"}
            />
          </Box>
        </Box>
        <Box display={"flex"} justifyContent={"space-around"}>
          <Box width={"40%"}>
            <Text fontWeight={"bold"}>Вкажіть початкову суму</Text>
            <Input
              {...register("initialAmount", {
                required: true,
                valueAsNumber: true,
              })}
              // value={res.initialAmount}
              // onChange={(e) =>
              //   setRes((prev) => ({
              //     ...prev,
              //     initialAmount: e.target.value as any,
              //   }))
              // }
              type={"number"}
              inputMode={"numeric"}
              placeholder="Впишіть термін"
            />
          </Box>
          {!isWOEnterprise ? (
            <Box width={"40%"}>
              <Text fontWeight={"bold"}>Виберіть підприємство</Text>
              <Select
                {...register("enterpriseId")}
                // value={res.enterpriseId!}
                // onChange={(e) =>
                //   setRes((prev) => ({
                //     ...prev,
                //     enterpriseId: e.target.value,
                //   }))
                // }
              >
                <option value="" hidden defaultChecked>
                  Виберіть опцію
                </option>
                {enterpriseStore.enterprise.map((el) => (
                  <option value={el.id!}>{el.name}</option>
                ))}
              </Select>
            </Box>
          ) : null}
        </Box>
        <Box display={"flex"} justifyContent={"space-around"}>
          <Box width={"40%"}>
            <Text fontWeight={"bold"}>Вкажіть відповідальну особу</Text>
            <Input
              {...register("responsiblePerson")}
              // value={res.responsiblePerson}
              // onChange={(e) =>
              //   setRes((prev) => ({
              //     ...prev,
              //     responsiblePerson: e.target.value,
              //   }))
              // }
              placeholder="Впишіть відповідальну особу"
            />
          </Box>
          <Box width={"40%"}>
            <Text fontWeight={"bold"}>Вкажіть населений пункт</Text>
            <Input
              {...register("city")}
              // value={res.city}
              // onChange={(e) =>
              //   setRes((prev) => ({
              //     ...prev,
              //     city: e.target.value,
              //   }))
              // }
              placeholder="Впишіть населений пункт"
            />
          </Box>
        </Box>
        <Box width={"90%"} mx={"auto"}>
          <Text fontWeight={"bold"}>Опишіть мету</Text>
          <Textarea
            {...register("goal", { max: 100 })}
            // value={res.goal}
            // onChange={(e) =>
            //   setRes((prev) => ({
            //     ...prev,
            //     goal: e.target.value,
            //   }))
            // }
            placeholder="Опишіть мету"
          />
        </Box>
        {res.planId && (
          <Box width={"90%"} mx={"auto"}>
            <Text fontWeight={"bold"}>
              Виберіть фото дял титульної сторінки
            </Text>
            <Input
              cursor={"pointer"}
              type="file"
              id="input"
              accept="image/jpeg, image/png"
              onChange={async (e: ChangeEvent<HTMLInputElement>) => {
                if (!e.target.files) return;
                const file = e.target.files[0];
                const data = await supabase.storage
                  .from("business-imgs")
                  .upload("title/" + res.planId, file);
                //@ts-ignore
                if (data.error?.error == "Duplicate") {
                  const data = await supabase.storage
                    .from("business-imgs")
                    .update("title/" + res.planId, file);
                }
              }}
            />
          </Box>
        )}
        {!isWOEnterprise && (
          <ModalFooter>
            <Button type="submit">{buttonText}</Button>
          </ModalFooter>
        )}
      </form>
    </Box>
  );
}

export default BusinessInputs;
