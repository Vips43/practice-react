import { useParams } from "react-router";
import WatchProvider from "./compo/WatchProvider";

function LeftNav() {
 const { type, keyVal } = useParams();

 return (
  <div className="w-3xs bg-neutral-100 py-2">
   <h3 className="font-bold text-black! capitalize m-2 text-2xl">
    {keyVal}
   </h3>
   <WatchProvider />
  </div>
 );
}

export default LeftNav;
