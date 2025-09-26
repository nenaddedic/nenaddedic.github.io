import React from 'react';

export interface TextInputProps {
  v: string;
  onChange: React.FormEventHandler<HTMLInputElement>;
}

export function TextInput({v, onChange}: TextInputProps) {
  return (
    <div>
      <input type="text" placeholder="Type something..." value={v} onChange={onChange} />
    </div>
  );
}
export default TextInput;