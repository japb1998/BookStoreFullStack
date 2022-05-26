export function storeToken(token){
    localStorage.setItem('JWT_TOKEN',token)
}

export function retreiveToken(){
   return localStorage.getItem('JWT_TOKEN')
}
export function removeItem(){
    localStorage.removeItem('JWT_TOKEN')
}