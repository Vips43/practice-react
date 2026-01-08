function Vote({ vote }) {
 const colorFunc = () => {
  if (vote >= 70) return "#20c574";
  if (vote >= 40) return "#f1cd00";
  return "#525252";
 };
 
 const progressColor = colorFunc();
 const trackColor = "#686868";
 return (
  <>
   <div className="border w-10 h-10 rounded-full text-xs p-[1px] bg-neutral-800">
    <div
     className={`w-full h-full rounded-full flex items-center justify-center text-white`}
     style={{
      background: `radial-gradient(closest-side, #262626 79%, transparent 95% 100%), conic-gradient(${progressColor} ${vote}%, ${trackColor} 0)`,
     }}
    >
     {vote}
     <span className="text-[7px] -mt-1">%</span>
    </div>
   </div>
  </>
 );
}

export default Vote;
