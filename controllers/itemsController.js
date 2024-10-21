const Category = require("../schema/Category")
const Item = require("../schema/Item")
exports.itemsController = async (req, res) => {
    try {
        const { selectedCateg } = req.params;  // Category ID from the route params
        const { name, price, description } = req.body;
        const imageUrl = req.file.path; // Cloud URL of the uploaded image
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

exports.itemsEditController = async (req, res) => {
    try {
        const { name, price, description, id, imageUrl } = req.body;
        let image
        if (req.file) {
            image = req.file.path; // New image path
        } else {
            image = imageUrl; // Existing image URL
        }
        const updatedCategory = await Item.findByIdAndUpdate(id, { name, price, description, imageUrl: image }, { new: true })

        res.status(200).json({ message: 'Product updated and added to category', updated: updatedCategory });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.deleteTheProduct = async (req, res) => {
   const {productId} = req.params
   console.log(productId)
   try {
    const deletedProduct = await Item.findByIdAndDelete(productId);
    
    if (!deletedProduct) {
        return res.status(400).send('Category not found');  // Return immediately after sending the response
    }
    return res.status(200).send({ message: 'Product deleted successfully', deletedProduct });

} catch (error) {
    console.error("Error in deleting the category:", error);
    if (!res.headersSent) {  // Make sure the headers haven't been sent yet
        res.status(500).send('Internal server error');
    }
}
}