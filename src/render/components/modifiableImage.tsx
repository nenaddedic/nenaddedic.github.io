import React from 'react';
import TextInput from './textInput';

const ModifiableImage: React.FC = () => {
  const [imageWidth, setImageWidth] = React.useState(100);
  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageWidth(Number(event.target.value));
  }
  return (
    <div>
      <TextInput
        v={imageWidth.toString()}
        onChange={handleTextChange}
      />
      <h1>{imageWidth}</h1>
      <h2>This is a modifasdsadiable image component</h2>
      <p>It can be used to display and modify images.</p>
    </div>
  );
}

export default ModifiableImage;