

function Vote({ vote }) {
 const colorFunc = () => {
  if (vote >= 70) {
   return "border-green-700";
  }
  if(vote>=40){
    return "border-yellow-700";
  }
  else{
    return "border-gray-500"
  }
 };
 return (
  <>
   <div className="border w-10 h-10 rounded-full text-xs p-[1px] bg-neutral-800 absolute -bottom-5 left-2">
    <div className={`w-full h-full rounded-full border-3 border-green-500 ${colorFunc()} grid place-items-center text-white`} >{vote}%</div>
   </div>
  </>
 );
}

export default Vote;
