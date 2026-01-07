function Input({ value, onChange }) {
 return (
  <div className="w-xs">
   <input type="text" value={value} onChange={onChange} />
  </div>
 );
}

export default Input;
