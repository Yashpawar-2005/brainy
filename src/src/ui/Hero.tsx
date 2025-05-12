import React from 'react'
import { Button } from '../components/ui/button';
import Spline from '@splinetool/react-spline';

import { Link } from 'react-router-dom';
const Hero = () => {
  return (
    <div className='h-screen p-0 text-white flex justify-center items-center flex-col'>
        <div className='min-h-[60vh]'></div>
        <div className="text-white py-12 px-4 sm:px-6 md:px-8 bg-black w-full h-full">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tighter">
              <span className="text-white">Query</span>
              <span className="text-purple-500 mx-4">&</span>
              <span className="text-white">Store</span>
            </h1>
            <p className="text-purple-400 text-2xl sm:text-3xl mt-4 tracking-wide font-semibold">
              Brainy
            </p>
            <div className='space-x-4 mt-6'>
          <Link to="/login">
            <Button>Login</Button>
          </Link>
          <Link to="/signup">
            <Button className="ml-4">Signup</Button>
          </Link>
            </div>
          </div>
        </div>
        <div className='h-screen absolute -top-32 left-0 w-screen -z-10 bg-black'>
          <Spline
            scene="https://prod.spline.design/GWAqDdWbsszo30mX/scene.splinecode" 
            className='w-full h-full'
          />
        </div>
    </div>
  )
}

export default Hero