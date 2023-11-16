'use client'
import axios from "axios"
import { AiFillGithub } from "react-icons/ai"
import {FcGoogle, FcIcons8Cup} from "react-icons/fc"
import { useState, useCallback } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import useRegisterModel from "@/app/hooks/UseRegisterModel"
import Model from "./Model"
import Heading from "../Heading"
import Input from "../Inputs/Input"
import toast from "react-hot-toast"
import Button from "../Button"

export const RegisterModel = () => {
    const registerModel = useRegisterModel();  
    const [isLoading, setIsloading] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        },
    });
    

    const onSubmit: SubmitHandler<FieldValues>= (data) =>{
        setIsloading(true)
        axios.post('/api/register', data)
        .then(()=>{
            registerModel.onClose()
        })
        .catch((error)=>{
            toast.error("Something went wrong")
        })
        .finally(()=>{
            setIsloading(false)
        })
    }

    const bodyContent = (
        <div className="flex flex-col gap-4 ">
            <Heading
            title="Welcome to Airbnb"
            subtitle="Create an Account"
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
            id='name'
            label="Name"
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
        </div>
    )

  return (
    <Model
    disabled={isLoading}
    isOpen={registerModel.isOpen}
    title="Register"
    actionLabel="Continue"
    onClose={registerModel.onClose}
    onSubmit={handleSubmit(onSubmit)}
    body={bodyContent}
    footer={footerContent}
    />
  )
}
