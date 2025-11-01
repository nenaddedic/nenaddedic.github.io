import React from 'react';

export interface TextInputProps {
  initialValue: string;
  onChange: React.FormEventHandler<HTMLInputElement>;
}

export function TextInput({initialValue, onChange}: TextInputProps) {
  const [val, setVal] = React.useState(initialValue);
  function commit() {
    if (val == initialValue) return;
    onChange({target: {value: val}} as unknown as React.FormEvent<HTMLInputElement>);
  }
  function handleNativeChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setVal(event.target.value);
  }
  function handleBlur(event: React.FocusEvent<HTMLTextAreaElement>) {
    console.log("Blur event, committing");
    commit();
  }
  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    console.log("Key down event: " + event.key);
    if (event.key == 'Enter') {
      event.preventDefault();
      commit();
    }
  }
  return (
    <div>
      <textarea cols="80" rows="10" value={val} onChange={handleNativeChange} onBlur={handleBlur} onKeyDown={handleKeyDown} />
    </div>
  );
}
export default TextInput;