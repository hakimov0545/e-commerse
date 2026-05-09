import { useMutation, useQueryClient } from "@tanstack/react-query";
import mainService from "../service/main.service";

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const res = await mainService.updateUser(data);
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });

      alert("Profile updates");
    },

    omError: (error) => {
      console.log(eroor);

      alert("something went wrong");
    },
  });
}
