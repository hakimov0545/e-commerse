import { useQuery } from "@tanstack/react-query";
import mainService from "../service/main.service";

export function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await mainService.getUser();
      return res.data;
    },
  });
}
