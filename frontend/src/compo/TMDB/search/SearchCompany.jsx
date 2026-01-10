import React from 'react'
import useApiStore from '../oth/store'

function SearchCompany({movie}) {
  const isLoading = useApiStore(s=> s.isLoading)

  if(isLoading) <div className='mt-14 text-2xl font-bold animate-bounce grid place-items-center'>Loading...</div>
  // if(!movie) return
  return (
    <>
    <div>
 <div className='mt-14 text-2xl font-bold grid place-items-center'>No Data</div>
    </div>
    </>
  )
}

export default SearchCompany