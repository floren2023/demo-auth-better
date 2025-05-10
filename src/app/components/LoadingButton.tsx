import { Button } from '@/app/components/ui/button'
import React from 'react'

function LoadingButton({
    pending,
    children,
    onClick
}:{
    pending:boolean,
    children:React.ReactNode,
    onClick?:()=>void
}) {
  return (
    <Button
    onClick={onClick}
    type="submit"
    disabled={pending}
    className="w-full">

   {pending ? (
     <div  className='bg-indigo-700 text-white flex items-center justify-center'>

       
<svg xmlns="http://www.w3.org/2000/svg" id="Isolation_Mode" data-name="Isolation Mode" className='text-white mr-2 animate-spin '
 viewBox="0 0 24 24" width="6" height="6">
    <path d="M.415,12.051a12,12,0,0,1,23.17-4.364L20.791,8.779a9,9,0,1,0,0,6.545l2.794,1.092A12,12,0,0,1,.415,12.051Z"/></svg>

        
    Processing…
     </div>

   ):(
    <div>
       {children}
    </div>

   )

}

    </Button>

  )
}

export default LoadingButton