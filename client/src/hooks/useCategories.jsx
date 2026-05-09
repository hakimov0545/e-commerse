import { useQuery } from "@tanstack/react-query";
import mainService from "../service/main.service";

function getAllCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await mainService.getAllCtegories();
      return res.data;
    },
  });
}

export default getAllCategories;
