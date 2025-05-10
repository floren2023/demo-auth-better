"use server";


import { auth } from "../lib/auth";





export const SignIn = async (formData: FormData) => {
    
  console.log(formData)
  const email = String(formData.get("email"));
   if (!email) {
     return { message: 'Must put email' }
  }
  const password = String(formData.get("password"));
  if (!password) {
     return { message: 'Must put password' }
  }

  try{
   const res= await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });
    
  }
  catch(error){
    return {message:"invalid password"}

  }
  }
    
  

export const SignUp = async (formData: FormData) => {
    
  const success = true;
  const error = "";
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));
  const name = String(formData.get("name"));

  if (email === "" && password === "" && name === "") {
    return { error: "you must put name, password, email", success: false };
  } else {
    try {
      await auth.api.signUpEmail({
        body: {
          email,
          password,
          name,
        },
      });
      
      return { error: "", success: true };
    } catch (error) {
      console.log(error);
      return { error, success: false };
    }
  }
};
