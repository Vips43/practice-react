import { useEffect, useRef } from "react";
import { useFakeStore } from "../../store/store";
import Input from "./Input";

function FakeStore() {
 const fetchData = useFakeStore((state) => state.fetchData);

 const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
   clearTimeout(timer);
   timer = setTimeout(() => fn(...args), delay);
  };
 };
 const debounceFetch = useRef(debounce(fetchData, 300)).current;

 return (
  <>
   <div>
    <h1 className="text-3xl font-bold underline">Fake Store Products</h1>

    <button className="w-fit! " onClick={debounceFetch}>
     click me
    </button>
   </div>
   <Input/>
  </>
 );
}

export default FakeStore;
