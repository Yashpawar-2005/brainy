import Spline from '@splinetool/react-spline'
const AuthLeft = () => {
  return (
    <div className=''>
         <div className='h-[60vh] w-[30vw] z-10 bg-black flex flex-col text-center items-center justify-center'>
            {/* <div>
                Brainy
            </div> */}
          <Spline
            scene="https://prod.spline.design/GWAqDdWbsszo30mX/scene.splinecode" 
            className='w-full h-full'
          />
        </div>
    </div>
  )
}

export default AuthLeft