// controllers/categoryController.js
const Category = require('../schema/Category');

// Controller to add a new cate gory
exports.addCategory = async (req, res) => {
    try {
        const { title, selectedIcon } = req.body;
        const userId = req.user.userId;

        // Check if the category already exists
        const categoryExists = await Category.findOne({ title, ownerId:userId });
        if (categoryExists) {
            return res.status(400).json({ message: 'Category already exists' });
        }

        // Create a new category
        const newCategory = new Category({
            title,
            icon: selectedIcon,
            ownerId: userId
        });

        // Save the category to the database
        await newCategory.save();

        return res.status(201).json({ message: 'Category added successfully', category: newCategory });
    } catch (error) {
        console.error('Error adding category:', error.message);
        return res.status(500).json({ message: 'Server error' });
    }
};

exports.allCategory = async (req, res) => {
    try {
        const userId = req.user.userId;
        const getAllCategory = await Category.find({ ownerId: userId }).populate('products');
        console.log(getAllCategory);

        // if (getAllCategory.length === 0) {
        //     return res.status(200).json(getAllCategory);
        // }

        res.status(200).json(getAllCategory); // Send back as JSON with a success status
    } catch (error) {
        console.error("Error fetching categories:", error);
        return res.status(500).json({ message: "Error fetching categories", error: error.message });
    }
};


exports.editCategory = async (req, res) => {
    try {
        const { title, selectedIcon } = req.body;
        const categoryId = req.params
        const userId = req.user.userId;

        const existingCategory = await Category.findOne({
            ownerId: userId,
            title: { $regex: new RegExp(`^${title}$`, 'i') },
            _id: { $ne: categoryId.categoryId }
        });

        if (existingCategory) {
            return res.status(400).json({ message: "category with this title already exists for this user" });
        }

        const updatedCategory = await Category.findByIdAndUpdate(categoryId.categoryId, { title, icon: selectedIcon },{new:true}).populate('products')
        return res.status(201).json({ message: 'Category updated/edit successfully', category: updatedCategory });
    } catch (error) {
        res.status(404).send("error in editing category"+ error)
    }
}

exports.deleteTheCategory = async (req, res) => {
    const { editCategory } = req.params;
    console.log(editCategory);  // Category ID from the route params

    try {
        const deletedCategory = await Category.findByIdAndDelete(editCategory);
        
        if (!deletedCategory) {
            return res.status(400).send('Category not found');  // Return immediately after sending the response
        }
        return res.status(200).send({ message: 'Category deleted successfully', deletedCategory });
    
    } catch (error) {
        console.error("Error in deleting the category:", error);
        if (!res.headersSent) {  // Make sure the headers haven't been sent yet
            res.status(500).send('Internal server error');
        }
    }
};
