'use client'
import { signIn } from "next-auth/react"
import axios from "axios"
import { AiFillGithub } from "react-icons/ai"
import {FcGoogle} from "react-icons/fc"
import { useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import useRegisterModel from "@/app/hooks/UseRegisterModel"
import useLoginModel from "@/app/hooks/UserLoginModel"
import Model from "./Model"
import Heading from "../Heading"
import Input from "../Inputs/Input"
import toast from "react-hot-toast"
import Button from "../Button"
import { useRouter } from "next/navigation"

export const LoginModel = () => {
    const router = useRouter()
    const registerModel = useRegisterModel();  
    const loginModel = useLoginModel()
    const [isLoading, setIsloading] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: '',
        },
    });
    

    const onSubmit: SubmitHandler<FieldValues>= (data) =>{
        setIsloading(true)
        signIn('credentials',{
            ...data,
            redirect: false,
        })
        .then((callback)=>{
            setIsloading(false)

            if(callback?.ok){
                toast.success("Logged in"),
                router.refresh()
                loginModel.onClose()
            }
            if(callback?.error){
                toast.error(callback.error)
            }
        })
    }

    const bodyContent = (
        <div className="flex flex-col gap-4 ">
            <Heading
            title="Welcome back"
            subtitle="Login to your account"
            />
            <Input
            id='email'
            label="Email"
            disabled={isLoading}
            errors={errors}
            register={register}
             required
             />
            
            <Input
            id='password'
            label="Password"
            type="password"
            disabled={isLoading}
            errors={errors}
            register={register}
             required
             />
        </div>
    )

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <br/>
            <Button
            outline
            label="continue with Google"
            icon={FcGoogle}
            onClick={()=>{}}
            />
            <Button
            outline
            label="continue with GitHub"
            icon={AiFillGithub}
            onClick={()=>{}}
            />
            <div className="text-neutral-500 text-center mt-4 font-light">
                <div className="flex flex-row items-center gap-2 justify-center">
                    <div>Already Registered?</div>
                    <div className="text-neutral-800 cursor-pointer hover:underline" onClick={registerModel.onClose}>Log in</div>
                </div>
            </div>
        </div>
    )

  return (
    <Model
    disabled={isLoading}
    isOpen={loginModel.isOpen}
    title="Login"
    actionLabel="Continue"
    onClose={loginModel.onClose}
    onSubmit={handleSubmit(onSubmit)}
    body={bodyContent}
    footer={footerContent}
    />
  )
}
