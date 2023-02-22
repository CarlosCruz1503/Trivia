import express from "express"

export const handleError = (res: express.Response, message: string, status: number) => {
    res.status(status).send(`${message}`)
}
