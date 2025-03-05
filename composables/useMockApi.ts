import mockUsers from "~/data/mockUsers.json";

export function useMockApi() {
  const checkEmailExists = async (email: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 1500)); 
    return mockUsers.users.some(user => user.email === email);
  };

  return { checkEmailExists };
}
