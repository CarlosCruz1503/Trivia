import bcrypt from 'bcrypt'

export const encrypt = async (passwordPlain:string) => {
    let password
    const hash = await bcrypt.hash(passwordPlain,10).then(res => password = res)
    return password
}
export const comparePassword = async ( myPlaintextPassword:string, hashPassword:string ) => {
    let password
    await bcrypt.compare(myPlaintextPassword, hashPassword).then(res => password = res)
    return password
}

