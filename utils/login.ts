import { useRouter } from "next/navigation"
import { crede
type Router = ReturnType<typeof useRouter>

export const checkLogin = (router : Router, returnPath : string) => {
    const credentialString = localStorage.getItem('credential')
    if (credentialString != null){
        // found
        const { token,email,name,role }: Credential =
        JSON.parse(credentialString)
        if(token != undefined && email != undefined && name != undefined && role != undefined){
            router.replace(returnPath)
            router.refresh()
        }else{
            localStorage.setItem('returnPath')
        }
    }else {
        // not found
    }

}

export const doLogou = (router : Router , returnPath : string) =>
{
    localStorage.removeItem('cre')
}