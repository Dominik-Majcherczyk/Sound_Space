import React from 'react'

export default function Loading() {

    return (
<div className='flex items-center justify-center py-12'>
    <div style={{borderTopColor:"transparent"}}
        className=" w-16 h-16 border-4 border-indigo-500 border-solid rounded-full animate-spin"></div>
</div>
    )
}
