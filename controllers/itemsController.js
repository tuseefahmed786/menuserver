const Category = require("../schema/Category")
const Item = require("../schema/Item")
exports.itemsController = async (req, res) => {
    try {
        console.log("dddd" + req.file)

        const { selectedCateg } = req.params;  // Category ID from the route params
        const { name, price, description } = req.body;
        const imageUrl = req.file.path; // Cloudinary URL of the uploaded image
        const publicId = req.file.filename;

        const newProduct = new Item({ name, price, description, imageUrl, publicIdImg: publicId });

        await newProduct.save();
        // 2. Add the product to the selected category
        const category = await Category.findById(selectedCateg);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        category.products.push(newProduct._id);  // Add product ID to the category's products array
        await category.save();

        res.status(201).json({ message: 'Product created and added to category', product: newProduct });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}


// const imageUrl = req.file ? `/uploads/images/${req.file.filename}` : ''  {for local with out cloudniary  link store in db}