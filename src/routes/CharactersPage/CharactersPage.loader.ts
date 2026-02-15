export const charactersLoader = async () => {
  const response = await fetch('/data/characters.json')
  const data = await response.json();
  
  return data;
};