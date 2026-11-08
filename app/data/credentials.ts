type User = {
  email: string;
  password: string;
  name: string;
  role: string;
  other: string;
};

const users: User[] = [
  {
    email: "admin@company.com",
    password: "pass",
    name: "นายยิ่งใหญ่ ยิ่งใหญ่",
    role: "admin",
    other: "...",
  },
  {
    email: "user@company.com",
    password: "pass",
    name: "น.ส.ใช้งาน",
    role: "user",
    other: "...",
  },
  {
    email: "manager@company.com",
    password: "pass",
    name: "นางจัดการ",
    role: "manager",
    other: "...",
  },
];

export type Credential = {
  token: string;
  email: string;
  name: string;
  role: string;
};

export const login = (
  email: string,
  password: string,
): Promise<Credential | string> => {
  return new Promise((resolve, reject) => {
    setTimeout(
      () => {
        if (Math.random() <= 0.8) {
          const user = users.find(
            (u) => u.email === email && u.password === password,
          );
          if (user === undefined) {
            reject("user not found");
            return;
          }
          const newCredential: Credential = {
            token: crypto.randomUUID(),
            email: user.email,
            name: user.name,
            role: user.role,
          };
          resolve(newCredential);
        } else {
          reject("user not found");
        }
      },
      1000 + Math.random() * 2000,
    );
  });
};

export const logout = (token: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(
      () => {
        if (Math.random() <= 0.8) {
          resolve("logout success");
        } else {
          reject("connection refused");
        }
      },
      1000 + Math.random() * 2000,
    );
  });
};
