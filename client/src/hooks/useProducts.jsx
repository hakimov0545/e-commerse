import mainService from "../service/main.service";
import { useQuery } from "@tanstack/react-query";

function getAllProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await mainService.getAllProducts();
      return res.data;
    },
  });
}

export default getAllProducts;
