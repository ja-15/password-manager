const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u',
  'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
  'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

const symbols = ['!', '#', '$', '%', '&', '(', ')', '*', '+']

 
export function newPassword() {
  const randomElement = (arr:string[]) => arr[Math.floor(Math.random() * arr.length + 1)]
  
  let passwordArray: string[] = [];
  for (let i = 0; i < 10; i++) {
    passwordArray.push(randomElement(letters));
  }
  for (let i = 0; i < 3; i++) {
    passwordArray.push(randomElement(numbers));
  }

  for (let i = 0; i < 3; i++) {
    passwordArray.push(randomElement(symbols));
  }

  passwordArray = passwordArray.sort(() => Math.random() - 0.5);

  return passwordArray.join('');
}
