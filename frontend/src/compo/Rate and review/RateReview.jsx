import Comments from "./Comments";
import { StarsStore, useUserStore } from "./StarsStore";
import Stars from "./Starts";
import Userform from "./UserForm";

function RateReview() {
 const rating = StarsStore((s) => s.rating);
 const { comments } = useUserStore();

 return (
  <div className="shadow-md m-5 p-5">
   <div className="m-5">
    <h2 className="text-center text-2xl font-semibold">Rate and Review</h2>
   </div>
   <div className="m-5 flex flex-col items-center gap-2 justify-center">
    <Stars />
   </div>
   <div className={`${rating ? "block" : "hidden"}`}>
    <Userform />
   </div>
   <div className={`${comments ? "block" : "hidden"}`}>
    <Comments />
   </div>
  </div>
 );
}

export default RateReview;
