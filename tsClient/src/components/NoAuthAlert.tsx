import React from "react";
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
type props = {
  showAlert: boolean;
  setShowAlert: (showAlert: boolean) => void;
};
export default function NoAuthAlert({ showAlert, setShowAlert }: props) {
  const navigate = useNavigate();
  return (
    //@ts-ignore
    <AlertDialog
      isCentered
      isOpen={showAlert}
      onClose={() => setShowAlert(false)}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogBody>
            Видалення і додавання доступно лише зареєстрованим користувачам
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button
              onClick={() => {
                navigate("/login");
                setShowAlert(false);
              }}
            >
              Зареєструватись
            </Button>
            <Button onClick={() => setShowAlert(false)} ml={3}>
              Закрити
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
