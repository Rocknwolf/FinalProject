import React from "react";
import { useForm } from "react-hook-form";

function Upload() {
  const { register, handleSubmit } = useForm() 

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register} type="file" name="picture" />
      <button>Submit</button>
    </form>
  );
}

export default Upload;