import baseApi from "@/redux/api/baseApi/baseApi";

export const disciplineTest = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Add the send report mutation
    sendDisciplineReport: builder.mutation({
      query: ({ email, risk_level }) => ({
        url: "/api/notifications/discipline-report/send/",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, risk_level }),
      }),
    }),
  }),
});

export const { useSendDisciplineReportMutation } = disciplineTest;
