"use client";

import { useRouter } from "next/navigation";
import { Backdrop } from "@/components/tailgrids/core/overlay";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
  DialogClose,
} from "@/components/tailgrids/core/dialog";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/tailgrids/core/input-group";
import { EyeDisabled, Keyboard } from "@tailgrids/icons";
import { login } from "../data/credentials";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = () => {
    const userDom = document.getElementById("user") as HTMLInputElement;
    const passDom = document.getElementById("pass") as HTMLInputElement;

    const user = userDom.value.trim();
    const pass = passDom.value.trim();

    if (user === "") {
      userDom.focus();
      alert("Please enter username");
      return;
    }
    if (pass === "") {
      passDom.focus();
      alert("Please enter password");
      return;
    }

    login(`${user}@company.com`, pass)
      .then((credential) => {
        localStorage.setItem("credential", JSON.stringify(credential));
        window.dispatchEvent(new Event("credential-changed"));
        const returnPath = localStorage.getItem('returnPath' ) || '/'
        localStorage.removeItem('returnPath')
        router.replace(returnPath);
        router.refresh();
      })
      .catch((error) => {
        userDom.value = "";
        passDom.value = "";
        userDom.focus();
        alert(`Error: ${error}`);
      });
  };
  return (
    <Backdrop isOpen={true}>
      <Dialog showCloseButton={false} className="w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Who are you?</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <InputGroup>
            <InputGroupAddon align="inline-start">
              <Keyboard />
            </InputGroupAddon>
            <InputGroupInput id="user" placeholder="user | admin | manager" />
            <InputGroupAddon align="inline-end">@company.com</InputGroupAddon>
          </InputGroup>
          <InputGroup className="mt-2">
            <InputGroupAddon align="inline-start">
              <EyeDisabled />
            </InputGroupAddon>
            <InputGroupInput id="pass" type="password" placeholder="pass" />
            <InputGroupAddon align="inline-end"></InputGroupAddon>
          </InputGroup>
        </DialogBody>
        <DialogFooter>
          <div className="flex justify-end">
            <DialogClose appearance="outline" onClick={() => handleLogin()}>
              Login
            </DialogClose>
          </div>
        </DialogFooter>
      </Dialog>
    </Backdrop>
  );
}
