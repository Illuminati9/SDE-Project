const Category = require('../models/category.js')

exports.createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name || !description) {
            return res.status(400).json({
                success: false,
                message: "Both 'name' and 'description' fields are required.",
            });
        }

        const categoryDetails = await Category.create({
            name, description
        });

        return res.status(201).json({
            success: true,
            message: "Category created Successfully",
            categoryDetails
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Couldn\'t create category",
            error: error.message,
        })
    }
}

exports.getCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const categoryDetails = await Category.findById(id).populate({path:"providers",populate:"address"});
        if (!categoryDetails) {
            return res.status(404).json({
                success: false,
                message: "No Category Found"
            });
        }

        const categoryProviders = categoryDetails.providers;

        return res.status(200).json({
            success: true,
            message: "Category details fetched successfully",
            categoryProviders,
            category: categoryDetails.name
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error Occured while fetching the details of this category",
            error: error.message,
        })
    }
}

exports.showAllCategories = async (req, res) => {
    try {
        const allCategories = await Category.find(
            {},
            {
                name: true,
                description: true,
                providers: true,
            }
        );

        res.status(200).json({
            success: true,
            message: "All Categories Returned Successfully",
            allCategory: allCategories,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch categories data",
            error: error.message,
        });
    }
};