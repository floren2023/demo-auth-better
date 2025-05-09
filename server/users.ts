"use server"
import {auth} from "../lib/auth"

export const SignIn=async()=>{
    await auth.api.signInEmail({
        body:{
            email:"florentavakar@gmail.com",
            password:"password1234"

        }
    })



}

export const SignUp=async()=>{
    await auth.api.signUpEmail({
        body:{
            email:"florentavakarv@gmail.com",
            password:"password1234",
            name:"Florenta"

        }
    })
}

