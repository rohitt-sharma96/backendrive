

export const register = async (req, res, next) => {

    res.status(200).json({
        message:'registered successfully'
    })

}
    // const err = new Error("Password is too weak")
    // err.status = 400

    // next(err)
