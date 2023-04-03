import {
  Box,
  Button,
  Heading,
  Image,
  ListItem,
  OrderedList,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { MAP_ROUTE } from "../utils/consts";
import secondImg from "/howWorkImg.jpg";
import expCart from "/expCart.jpg";
import expMechanical from "/expMechanical.jpg";
import expHand from "/expHand.jpg";
import expMaterial from "/expMaterial.jpg";
import expTransport from "/expTransport.jpg";
import expService from "/expService.jpg";
import expRes from "/expRes.jpg";
import expPick from "/expPick.jpg";

function HowThisWork() {
  const navigate = useNavigate();
  return (
    <Box>
      <Box
        display={"grid"}
        gridTemplateColumns={["1fr", "1fr", "3fr 1fr"]}
        gridColumnGap={"15px"}
        gridGap={"15px"}
        maxW={"1200px"}
        mx={"auto"}
        mt={"15px"}
      >
        <Box fontSize={"20px"} fontWeight={700} textAlign={"center"}>
          <Text>
            Кожен господар, який має земельну ділянку хоче ефективно її
            використовувати, і зважди оцінює свої власні витрати на вирощування
            культур. Даний сервіс допомагає терміново та індивідуально створити
            розрахунок витрат.
          </Text>
          <Text>
            Сервіс гнучко враховує індивідуальні можливості та вартість ресурсів
            кожного господаря.
          </Text>
          <Box display={"flex"} justifyContent={"center"}>
            <Button w={"fit-content"} onClick={() => navigate(MAP_ROUTE)}>
              Спробувати зараз
            </Button>
          </Box>
          <Box></Box>
        </Box>
        <Box>
          <Image src={secondImg}></Image>
        </Box>
      </Box>
      <Heading mt={"30px"} mb={"20px"} textAlign={"center"}>
        Вибір культури
      </Heading>
      <Box
        display={"grid"}
        gridTemplateColumns={["1fr", "1fr", "2fr 2fr"]}
        gridColumnGap={"15px"}
        gridGap={"15px"}
        maxW={"1200px"}
        mx={"auto"}
        mt={"15px"}
      >
        <Box>
          <Image w={"100%"} h={"auto"} src={expPick}></Image>
        </Box>
        <Box>
          <Text fontWeight={700}>
            На головній сторіні ви можете вибрати культуру
          </Text>
          <OrderedList>
            <ListItem>Можна перейти на технологічну карту</ListItem>
          </OrderedList>
          <Button onClick={() => navigate(MAP_ROUTE)}>Спробувати зараз</Button>
        </Box>
      </Box>
      <Heading mt={"30px"} mb={"20px"} textAlign={"center"}>
        Змінити загальні показники
      </Heading>
      <Box
        display={"grid"}
        gridTemplateColumns={["1fr", "1fr", "2fr 2fr"]}
        gridColumnGap={"15px"}
        gridGap={"15px"}
        maxW={"1200px"}
        mx={"auto"}
        mt={"15px"}
      >
        <Box>
          <Image w={"100%"} h={"auto"} src={expCart}></Image>
        </Box>
        <Box>
          <Text fontWeight={700}>
            В цьому вікні ви можете змінити 4 показники
          </Text>
          <OrderedList>
            <ListItem>Можна додати сорт культури</ListItem>
            <ListItem>Можна змінити площу</ListItem>
            <ListItem>Можна змінити розрахункову заробітню плату</ListItem>
            <ListItem>Можна змінити варість дизельного палива</ListItem>
          </OrderedList>
          <Button onClick={() => navigate(MAP_ROUTE)}>Спробувати зараз</Button>
        </Box>
      </Box>
      <Heading mt={"30px"} mb={"20px"} textAlign={"center"}>
        Змінити вартість механізованих робіт
      </Heading>
      <Box
        display={"grid"}
        gridTemplateColumns={["1fr", "1fr", "2fr 2fr"]}
        gridColumnGap={"15px"}
        gridGap={"15px"}
        maxW={"1200px"}
        mx={"auto"}
        mt={"15px"}
      >
        <Box>
          <Image w={"100%"} h={"auto"} src={expMechanical}></Image>
        </Box>
        <Box>
          <Text fontWeight={700}>
            В цьому вікні ви можете змінити 2 показники
          </Text>
          <OrderedList>
            <ListItem>Можна змінити розхід палива</ListItem>
            <ListItem>Можна змінити робочу швидкість</ListItem>
          </OrderedList>
          <Button onClick={() => navigate(MAP_ROUTE)}>Спробувати зараз</Button>
        </Box>
      </Box>
      <Heading mt={"30px"} mb={"20px"} textAlign={"center"}>
        Змінити вартість ручних робіт
      </Heading>
      <Box
        display={"grid"}
        gridTemplateColumns={["1fr", "1fr", "2fr 2fr"]}
        gridColumnGap={"15px"}
        gridGap={"15px"}
        maxW={"1200px"}
        mx={"auto"}
        mt={"15px"}
      >
        <Box>
          <Image w={"100%"} h={"auto"} src={expHand}></Image>
        </Box>
        <Box>
          <Text fontWeight={700}>
            В цьому вікні ви можете змінити 2 показники
          </Text>
          <OrderedList>
            <ListItem>Можна змінити норму виробітку</ListItem>
            <ListItem>
              Можна змінити показник розходу або урожайності на 1га
            </ListItem>
          </OrderedList>
          <Button onClick={() => navigate(MAP_ROUTE)}>Спробувати зараз</Button>
        </Box>
      </Box>
      <Heading mt={"30px"} mb={"20px"} textAlign={"center"}>
        Змінити вартість матеріалів
      </Heading>
      <Box
        display={"grid"}
        gridTemplateColumns={["1fr", "1fr", "2fr 2fr"]}
        gridColumnGap={"15px"}
        gridGap={"15px"}
        maxW={"1200px"}
        mx={"auto"}
        mt={"15px"}
      >
        <Box>
          <Image w={"100%"} h={"auto"} src={expMaterial}></Image>
        </Box>
        <Box>
          <Text fontWeight={700}>
            В цьому вікні ви можете змінити 2 показники
          </Text>
          <OrderedList>
            <ListItem>Можна змінити ціну матеріалу</ListItem>
            <ListItem>Можна змінити розхід матеріалу на 1га</ListItem>
          </OrderedList>
          <Button onClick={() => navigate(MAP_ROUTE)}>Спробувати зараз</Button>
        </Box>
      </Box>
      <Heading mt={"30px"} mb={"20px"} textAlign={"center"}>
        Змінити вартість послуг
      </Heading>
      <Box
        display={"grid"}
        gridTemplateColumns={["1fr", "1fr", "2fr 2fr"]}
        gridColumnGap={"15px"}
        gridGap={"15px"}
        maxW={"1200px"}
        mx={"auto"}
        mt={"15px"}
      >
        <Box>
          <Image w={"100%"} h={"auto"} src={expService}></Image>
        </Box>
        <Box>
          <Text fontWeight={700}>
            В цьому вікні ви можете змінити 1 показник
          </Text>
          <OrderedList>
            <ListItem>Можна змінити ціну послуги</ListItem>
          </OrderedList>
          <Button onClick={() => navigate(MAP_ROUTE)}>Спробувати зараз</Button>
        </Box>
      </Box>
      <Heading mt={"30px"} mb={"20px"} textAlign={"center"}>
        Змінити вартість транспорту
      </Heading>
      <Box
        display={"grid"}
        gridTemplateColumns={["1fr", "1fr", "2fr 2fr"]}
        gridColumnGap={"15px"}
        gridGap={"15px"}
        maxW={"1200px"}
        mx={"auto"}
        mt={"15px"}
      >
        <Box>
          <Image w={"100%"} h={"auto"} src={expTransport}></Image>
        </Box>
        <Box>
          <Text fontWeight={700}>
            В цьому вікні ви можете змінити 1 показник
          </Text>
          <OrderedList>
            <ListItem>Можна змінити ціну транспортуванн</ListItem>
          </OrderedList>
          <Button onClick={() => navigate(MAP_ROUTE)}>Спробувати зараз</Button>
        </Box>
      </Box>
      <Heading mt={"30px"} mb={"20px"} textAlign={"center"}>
        Отриманий результат
      </Heading>
      <Box
        display={"grid"}
        gridTemplateColumns={["1fr", "1fr", "2fr 2fr"]}
        gridColumnGap={"15px"}
        gridGap={"15px"}
        maxW={"1200px"}
        mx={"auto"}
        mt={"15px"}
      >
        <Box>
          <Image w={"100%"} h={"auto"} src={expRes}></Image>
        </Box>
        <Box>
          <Text fontWeight={700}>
            В цьому вікні ви можете ознайомитися з результатами розрахунку
          </Text>
          <OrderedList>
            <ListItem>Культура</ListItem>
            <ListItem>Площо</ListItem>
            <ListItem>Загальна варість</ListItem>
            <ListItem>Собіварість на 1га</ListItem>
          </OrderedList>
          <Button onClick={() => navigate(MAP_ROUTE)}>Спробувати зараз</Button>
        </Box>
      </Box>
    </Box>
  );
}

export default HowThisWork;
