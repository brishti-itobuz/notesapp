import yup from 'yup'

export const noteSchema = yup.object({

    title: yup.string().trim()
        .min(4, 'Title must be at least 4 characters'),
    content: yup.string()
});

export const noteValidator = (schema) => async (req, res, next) => {
    try {
        await schema.validate(req.body);
        next();
    } catch (err) {
        return res.status(400).json({ errors: err.errors });
    }
};