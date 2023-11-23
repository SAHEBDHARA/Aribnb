'use client'

import useRentModel from '@/app/hooks/UseRentModel'
import Model from './Model'
import { useMemo, useState } from 'react'
import Heading from '../Heading'
import { catagories } from '../Navbar/Catagory'
import CatagoryInput from '../Inputs/CatagoryInputs'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import CountrySelect from '../Inputs/CountrySelect'
import dynamic from 'next/dynamic'
import Counter from '../Inputs/Counter'
import ImageUpload from '../Inputs/ImageUpload'
import Input from '../Inputs/Input'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'


enum STEPS {
  CATAGORY= 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE =5
}


const RentModel = () => {

  const router = useRouter();
  const rentModel = useRentModel()
  const [isLoading, setIsloading] = useState(false)

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
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      description: ''
    }
  })

  const catagory = watch('catagory')
  const location = watch('location')
  const guestCount = watch('guestCount')
  const roomCount = watch('roomCount')
  const bathroomCount = watch('bathroomCount')
  const imageSrc = watch('imageSrc')



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

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if(step !== STEPS.PRICE){
      return onNext();
    }
    setIsloading(true);
    axios.post('/api/listings',data)
    .then(()=>{
      toast.success('Listing created successfully');
      router.refresh()  
      reset();
      setStep(STEPS.CATAGORY);
      rentModel.onClose();
    })
    .catch(()=>{
      toast.error('Something went wrong')
    })
    .finally(()=>{
      setIsloading(false)
    })
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

  if(step === STEPS.LOCATION){
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
  if(step === STEPS.INFO){
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
        title='Share some basics about your place'
        subtitle='What amenities do you have?'
        />
        <Counter
        title='Guests'
        subtitle='How many people do you allow? '
        value={guestCount}
        onChange={(value) => setCustomValue('guestCount',value)}
        />
        <hr />
        <Counter
        title='Rooms'
        subtitle='How many rooms do you have? '
        value={roomCount}
        onChange={(value) => setCustomValue('roomCount',value)}
        />
        <hr />
        <Counter
        title='Bathrooms'
        subtitle='How many bathrooms do you have? '
        value={bathroomCount}
        onChange={(value) => setCustomValue('bathroomCount',value)}
        />
      </div>
    )
  }
  if(step === STEPS.IMAGES){
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
        title='Add a photo of your place'
        subtitle='Show your guest what your place looks like'
        />
        <ImageUpload
        value={imageSrc}
        onChange={(value)=> setCustomValue('imageSrc',value)}
        />
      </div>
    )
  }
  if(step === STEPS.DESCRIPTION){
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
        title='How would you describe your place?'
        subtitle='Short and sweet work best!'
        />
        <Input
        id='title'
        label='Title'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        />
        <hr />
        <Input
        id='description'
        label='Description'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        />
      </div>
    )
  }
  if(step === STEPS.PRICE){
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
        title='Now, set your price'
        subtitle='How much do you charge per night?'
        />
        <Input
        id='price'
        label='price'
        fromatPrice
        type='number'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        />
      </div>
    )
  }
  return (
    <Model
    isOpen = {rentModel.isOpen}
    onClose={rentModel.onClose}
    onSubmit={handleSubmit(onSubmit)}
    actionLabel={actionLabel}
    secondaryLabel={usesecondaryActionlable}
    secondaryAction={step == STEPS.CATAGORY ? undefined : onBack}
    title='Aribnb your hoome' 
    body={bodyContent}
    />
  )
}

export default RentModel