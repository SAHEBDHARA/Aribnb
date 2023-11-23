'use client'

import useRentModel from '@/app/hooks/UseRentModel'
import Model from './Model'
import { useMemo, useState } from 'react'
import Heading from '../Heading'
import { catagories } from '../Navbar/Catagory'
import CatagoryInput from '../Inputs/CatagoryInputs'
import { FieldValues, useForm } from 'react-hook-form'
import CountrySelect from '../Inputs/CountrySelect'
import dynamic from 'next/dynamic'


enum STEPS {
  CATAGORY= 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE =5
}


const RentModel = () => {

  const rentModel = useRentModel()

  const [step, setStep] = useState(STEPS.CATAGORY); 

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState:{
      errors,
    },
    reset
  } = useForm<FieldValues>({
    defaultValues:{
      catagory: '',
      location: null,
      guestCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      description: ''
    }
  })

  const catagory = watch('catagory')
  const location = watch('location')
  const Map = useMemo(()=> dynamic(()=> import('../Map'),{
    ssr: false,
  }),[location])
  const setCustomValue = (id: string, value: any) =>{
    setValue(id, value,{
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })
  }

  const onBack = () => {
    setStep((value)=> value - 1)
  }
  const onNext = () => {
    setStep((value)=> value + 1)
  }

  const actionLabel =useMemo(()=>{
    if(step === STEPS.PRICE){
      return 'Create'
    }
    return 'Next'
  },[step])

  const usesecondaryActionlable = useMemo(()=>{
    if(step === STEPS.CATAGORY){
      return undefined
    }
    return 'Back'
  },[step])


  let bodyContent = (
    <div className='flex flex-col gap-8 '>
      <Heading 
       title='Which of this best describes your place?'
       subtitle='Pick catagory'
      />
      <div className="grid grid-cols-1 md:grid-cols-2  overflow-y-auto gap-3 max-h-[50vh]">
        {catagories.map((item)=>(
          <div key={item.label}
          className="col-span-1"
          >
            <CatagoryInput
            onClick={(catagory)=>
            setCustomValue('catagory',catagory)}
            selected={catagory == item.label}
            label={item.label}
            icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  )

  if(step == STEPS.LOCATION){
    bodyContent = (
      <div
      className='flex flex-col gap-8'
      >
        <Heading
        title='Where your place is located?'
        subtitle='Help guest find you'
        />
        <CountrySelect
        value={location}
        onChange={(value)=> setCustomValue('location',value)}
        />
        <Map
        center={location?.latlng}
        />
      </div>
    )
  }


  return (
    <Model
    isOpen = {rentModel.isOpen}
    onClose={rentModel.onClose}
    onSubmit={onNext}
    actionLabel={actionLabel}
    secondaryLabel={usesecondaryActionlable}
    secondaryAction={step == STEPS.CATAGORY ? undefined : onBack}
    title='Aribnb your hoome' 
    body={bodyContent}
    />
  )
}

export default RentModel