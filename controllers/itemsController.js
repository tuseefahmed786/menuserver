const Category = require("../schema/Category");
const Item = require("../schema/Item");

exports.itemsController = async (req, res) => {
    try {
        const { selectedCateg } = req.params; // Category ID from the route params
        const { name, price, description } = req.body;
        
        let imageUrl = null;
        let publicId = null;

        if (req.file) {
            imageUrl = req.file.path; // Cloud URL of the uploaded image
            publicId = req.file.filename;
        }

        const newProduct = new Item({ 
            name, 
            price, 
            description, 
            imageUrl, 
            publicIdImg: publicId 
        });

        await newProduct.save();

        // Add the product to the selected category
        const category = await Category.findById(selectedCateg);
        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }

        category.products.push(newProduct._id);
        await category.save();

        res.status(201).json({ 
            message: "Product created and added to category", 
            product: newProduct 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.itemsEditController = async (req, res) => {
    try {
        const { name, price, description, id, imageUrl } = req.body;

        let updatedImageUrl = imageUrl; // Default to the existing image

        // If a new image is uploaded, use its path
        if (req.file) {
            updatedImageUrl = req.file.path; 
        }

        // Update the item
        const updatedCategory = await Item.findByIdAndUpdate(
            id,
            { name, price, description, imageUrl: updatedImageUrl }, // Use the correct variable
            { new: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.status(200).json({ message: "Product updated successfully", updated: updatedCategory });

    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.deleteTheProduct = async (req, res) => {
    const { productId } = req.params;

    try {
        const deletedProduct = await Item.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }

        return res.status(200).json({ 
            message: "Product deleted successfully", 
            deletedProduct 
        });
    } catch (error) {
        console.error("Error in deleting the product:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
