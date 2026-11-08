import { Credential, logout } from "@/app/data/credentials";
import { useRouter } from "next/navigation";

type Router = ReturnType<typeof useRouter>;

export const CheckLogin = (router: Router, returnPath: string) => {
  const credentialString = localStorage.getItem("credential");

  const redirectToLogin = () => {
    localStorage.setItem("returnPath", returnPath);
    localStorage.removeItem("credential");
    router.replace("/login");
  };

  if (credentialString === null) {
    redirectToLogin();
    return;
  }

  try {
    const { token, email, name, role }: Credential = JSON.parse(credentialString);

    if (!token || !email || !name || !role) {
      redirectToLogin();
    }
  } catch {
    redirectToLogin();
  }
};

export const doLogout = (router: Router, returnPath: string) => {
  const credentialString = localStorage.getItem("credential");

  if (credentialString === null) {
    router.replace(returnPath);
    return;
  }

  try {
    const { token }: Credential = JSON.parse(credentialString);

    logout(token)
      .catch(() => undefined)
      .finally(() => {
        localStorage.removeItem("credential");
        window.dispatchEvent(new Event("credential-changed"));
        router.replace(returnPath);
      });
  } catch {
    localStorage.removeItem("credential");
    window.dispatchEvent(new Event("credential-changed"));
    router.replace(returnPath);
  }
};
