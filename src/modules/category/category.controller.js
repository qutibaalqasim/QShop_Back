import slugify from 'slugify';


export const addCategory = async (req, res, next) => {
    const { name } = req.body;
    const slug = slugify(name);
    return res.json(slug);
}