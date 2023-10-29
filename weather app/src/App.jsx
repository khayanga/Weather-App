import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
//import icons
import {
  IoMdCloudy, 
  IoMdSunny,
  IoMdRainy,
  IoMdSnow,
  IoMdThunderstorm,
  IoMdSearch,
} from 'react-icons/io'

import {
  BsCloudHaze2Fill,
  BsCloudDrizzleFill,
  BsWind,
  BsThermometer,
  BsEye,
  BsWater,
} from 'react-icons/bs'
import {TbTemperatureCelsius} from 'react-icons/tb'
import {ImSpinner8} from 'react-icons/im'

//api key
const APIkey ='f19e40fd891c76d5c50c821a624eb8a5'



function App() {
  const [data ,setData] = useState(null)
  const[location, setLocation]=useState('Bucharest')
  const[inputValue, setInputValue]=useState("")
  const [animate, setAnimate]=useState(false)

  const handleInput =(e) => {
    setInputValue(e.target.value)
  }
  const handleSubmit =(e) => {
    console.log(inputValue)
    //prevent default
    e.preventDefault()
    //if input value is empty
    if (inputValue !== ''){
      //setlocation
      setLocation(inputValue)
    }
    //clearing the input
    const input= document.querySelector('input')
    if (input.value === ''){
      //setanimate to true
      setAnimate(true)

      setTimeout(()=>{
        setAnimate(false)
      },500)
    }

    input.value=''
    
  }

  //Fetch data from our api
  useEffect(()=>{
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`;

    axios.get(url).then((res)=>{
      setData(res.data)
    })
  },[location]);
  console.log(data)

  //if the data is false
  if(!data){
    return(
      <div>
        <div>
          <ImSpinner8 className='text-5xl animate-spin' />
        </div>
      </div>
    )
  }

  //to set the icons accordingly
  let icon
  
  switch (data.weather[0].main){
    case 'Clouds':
      icon=< IoMdCloudy className='text-gray-500'/>;
      break;
      case 'Rain':
        icon=< IoMdRainy className='text-blue-400'/>
        break;
      case 'Clear':
        icon=< IoMdSunny className='text-amber-300'/>
        break;
      case 'Haze':
        icon=< BsCloudHaze2Fill className='text-zinc-300'/>
         break;
      case 'Drizzle':
        icon=< BsCloudDrizzleFill className='text-blue-400'/>
         break;
      case 'Snow':
        icon=< IoMdSnow className='text-blue-400'/>;
        break;
        case 'Thunderstorm':
          icon=< IoMdThunderstorm className='text-gray-400'/>;
          break;

  }
const date =new Date()
  return (
    <div className='w-full lg:max-w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
    bg-no-repeat bg-cover bg-center flex flex-col
    items-center justify-center p-6 lg:px-0'>
      {/*Form */}
      <form className={`${animate ? 'animate-shake':'animate-none'}h-16 bg-black/30 w-full max-w-[450px]
      rounded-lg backdrop-blur-[32px] mb-6`}>
        <div className='h-full relative flex items-center
        justif-between p-2'>
          <input className='flex-1 bg-transparent outline-none text-white
           placeholder:text-white text-[15px] font-light pl-6 h-full'
           type='text'
           value={inputValue}
           onChange={(e)=>handleInput(e)}
          placeholder='Search by city or country' />
          <button 
          onClick={(e)=>handleSubmit(e)}
          className='bg-purple-500 hover:bg-pink-500 rounded-lg  p-3 w-70 h-17 flex justify-center items-center transition'>
            <IoMdSearch className='text-2xl text-white/75' />
            </button>
        </div>
      </form>
      {/* Card*/}
      <div className='w-full max-w-[450px] bg-black/30 min-h-[584px]
      text-white backdrop-blur-[32px] rounded-[32px] py-8   px-6'>
        {/* Card Top*/}
        <div className='flex items-center gap-x-5'>
          
          {/* icon*/}
          <div className='text-[87px]'>{icon}</div>
          {/* Country Name*/}
          <div>
            <div className='text-2xl font-semibold'> {data.name} ,{data.sys.country}</div>
            <div>
              {date.getUTCDate()}/{date.getUTCMonth() +1}/{date.getUTCFullYear()}
            </div>

          </div>
          
            
        </div>
        {/* Card body*/}
        <div className='my-20'>
           {/* temperature*/}
          <div className='flex justify-center items-center'>
            <div className='text-[144px] leading-none font-light]'>
              {parseInt(data.main.temp)}
              </div>
              <div className='text-4xl'>
                <TbTemperatureCelsius />
              </div>
          </div>
           {/*Weather description*/}
          <div className='capitalize text-center'>
            {data.weather[0].description}
            </div>
          </div>
           {/* Card bottom*/}
        <div className='max-w-[378px] mx-auto flex flex-col gap-y-6'>
          <div className=' flex justify-between'>
            <div className='flex items-center gap-x-2 '>
              {/* icon*/}
              <div className='text-[20px]'>
                < BsEye/>
              </div>
              <div>
                Visibility <span className='ml-2'>{data.visibility /1000} km</span>
              </div>
            </div>
            <div className='flex items-center gap-x-2 '>
              {/* icon*/}
              <div className='text-[20px]'>
                < BsThermometer/>
              </div>
              <div className='flex'>
                Feels like
                 <div className=' flex ml-2'>
                  {parseInt(data.main.feels_like)}
                  <TbTemperatureCelsius />
                  </div>
              </div>
            </div>
            
          </div>
          <div className=' flex justify-between'>
            <div className='flex items-center gap-x-2 '>
              {/* icon*/}
              <div className='text-[20px]'>
                < BsWater/>
              </div>
              <div>
                Humidity <span className='ml-2'>{data.main.humidity}%</span>
              </div>
            </div>
            <div className='flex items-center gap-x-2 '>
              {/* icon*/}
              <div className='text-[20px]'>
                < BsWind/>
              </div>
              <div>Wind <span className='ml-2'>{data.wind.speed} 
              m/s</span>
              </div>
            </div>
            
          </div>
        </div>
      </div>
 
    </div>
  )
}

export default App
