// "use client";

// import { getPostById } from "@/actions";
// import { useQuery } from "@tanstack/react-query";
// import React from "react";
// import Form from "./form";

// type formWrapperProps = {
//   id: string;
// };

// const FormWrapper = ({ id }: formWrapperProps) => {
//   const { data, isLoading, error } = useQuery({
//     queryKey: ["posts"],
//     queryFn: () => getPostById(id),
//   });

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error loading post. Please try again later.</div>;
//   }

//   if (!data) {
//     return <div>No post found.</div>;
//   }

//   return <Form post={data} />;
// };

// export default FormWrapper;
