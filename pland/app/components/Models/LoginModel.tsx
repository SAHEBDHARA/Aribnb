'use client'
import { signIn } from "next-auth/react"
import axios from "axios"
import { AiFillGithub } from "react-icons/ai"
import {FcGoogle} from "react-icons/fc"
import { useCallback, useState } from "react"
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
                toast.error(callback.error);
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
    const toggle =useCallback(()=>{
        loginModel.onClose();
        registerModel.onOpen()
    },[loginModel, registerModel])

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <br/>
            <Button
            outline
            label="continue with Google"
            icon={FcGoogle}
            onClick={()=>signIn('google')}
            />
            <Button
            outline
            label="continue with GitHub"
            icon={AiFillGithub}
            onClick={()=>signIn('github')}
            />
            <div className="text-neutral-500 text-center mt-4 font-light">
                <div className="flex flex-row items-center gap-2 justify-center">
                    <div>It's your first time?</div>
                    <div className="text-neutral-800 cursor-pointer hover:underline" onClick={toggle}>Create an account</div>
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
