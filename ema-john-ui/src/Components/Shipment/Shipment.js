import React from 'react';
import { useForm } from 'react-hook-form';

const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = data => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input name="example" defaultValue="test" ref={register} /><br/>
      <input name="exampleRequired" ref={register({ required: true })} /><br/>
      {errors.exampleRequired && <span>This field is required</span>} <br/>
      <input type="submit" />
    </form>
  );
};

export default Shipment;