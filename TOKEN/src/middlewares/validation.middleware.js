export const ValidationMiddleware = (schema, target = "body") => {
    const ALLOWED_TARGETS = ["body", "query", "params"];

    if(!ALLOWED_TARGETS.includes(target)) {
        throw new Error("Validation Target invalid")
    }

    return (req, res, next) => {
        const {error, value} = schema.validate(req[target]);

        if(error) {
            return res.status(400).json({
                success: false,
                message: error.details
            })
        }

        req[target] = value;
        next()
    }
}