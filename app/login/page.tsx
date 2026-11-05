// "use client ";

// import { Backdrop } from "@/components/tailgrids/core/overlay";
// import {
//   Dialog,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogBody,
//   DialogFooter,
//   DialogClose,
// } from "@/components/tailgrids/core/dialog";

// import {
//   InputGroup,
//   InputGroupAddon,
//   InputGroupInput,
//   InputGroupButton,
//   InputGroupTextarea,
// } from "@/components/tailgrids/core/input-group";
// import { Keyboard } from "@tailgrids/icons";
// import { login } from "../data/credentials";
// import { useRouter } from "next/navigation";
// import { Router } from "next/router";
// import { useEffect } from "react";

// export default function Page() {
//   const rounter = useRouter();
//   useEffect(() => {} , [rounter])

//   const handleLogin = () => {
//     const userDom = document.getElementById("user") as HTMLInputElement;
//     const passDom = document.getElementById("pass") as HTMLInputElement;

//     const user = userDom.value.trim();
//     const pass = passDom.value.trim();

//     // validate
//     if (user == "") {
//         userDom.focus();
//       alert("Error : user is required");
//       return;
//     }
//     if (pass == "") {
//         passDom.focus();
//       alert("Error : user is required");
//       return;
//     }
//     login(`${user} @company.com`, pass)
//       .then((cred) => {
//         localStorage.setItem("credential", JSON.stringify(cred));
//         rounter.replace("/");
//         rounter.refresh();
//       })
//       .catch((errStr) => {
//         alert(`Error: ${errStr}`);
//       });
//   };

//   return (
//     <Backdrop isOpen={true}>
//       <Dialog showCloseButton={false} className="w-md">
//         <DialogHeader>
//           <DialogTitle className="text-center">Who are you?</DialogTitle>
//         </DialogHeader>
//         <DialogBody>
//           <InputGroup>
//             <InputGroupAddon>
//               <Keyboard />
//             </InputGroupAddon>

//             <InputGroupInput />

//             <InputGroupInput type="password" placeholder="pass" />
//           </InputGroup>
//         </DialogBody>
//         <DialogFooter>
//           <DialogClose
//             appearance="outline"
//             className="w-fit self-end"
//             onClick={() => handleLogin()}
//           >
//             Login
//           </DialogClose>
//         </DialogFooter>
//       </Dialog>
//     </Backdrop>
//   );
// }
