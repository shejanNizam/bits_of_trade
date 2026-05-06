import baseApi from "@/redux/api/baseApi/baseApi";

export interface DeleteAccountRequest {
  password: string;
  refresh?: string;
}

export interface DeleteAccountResponse {
  message: string;
}

export const accountDeletionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteAccount: builder.mutation<
      DeleteAccountResponse,
      DeleteAccountRequest
    >({
      query: (body) => ({
        url: "/api/accounts/me/delete/",
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["auth", "user"],
    }),
  }),
});

export const { useDeleteAccountMutation } = accountDeletionApi;
