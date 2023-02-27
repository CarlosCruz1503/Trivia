import axios from "axios"

export const configSimple = (token:string) => {
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
}

export const config = (token:string) => {
    return {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    }
}
export const configForm = (token:string) => {
    return {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
        }
    }
}
