const categoriesRepository = require('../repositories/categories.repository');

const createRepo = async ({ name, slug, description }) => {
    const normalizeName = name.trim().length <= 100;
    const normalizeSlug = slug.trim().length <= 100;
    if (!normalizeName) {
        const error = new Error('name should not exceed more than 100 character');
        error.status = 400;
        throw error;
    }
    if (!normalizeSlug) {
        const error = new Error('slug should not exceed more than 100 character');
        error.status = 400;
        throw error;
    }
    const categoryName = name.trim().toLowerCase();
    const categorySlug = slug.trim().toLowerCase();
    const categoryDescription = description.trim();


    const isCategoryAvailable = await categoriesRepository.existingCategory(categoryName);
    if (isCategoryAvailable) {
        const error = new Error('Category already present');
        error.status = 400;
        throw error;
    }

    const createCategoryItem = await categoriesRepository.createCategory(categoryName, categorySlug, categoryDescription);

    return createCategoryItem;

}

const getRepoById = async (id) => {
    if (!id) {
        const error = new Error("id is required");
        error.status = 400;
        throw error;
    }
    // categoryDetail already returns a single row (or null)
    return categoriesRepository.categoryDetail(id);
}

const badRequest = (message, status = 400) => {
    const error = new Error(message);
    error.status = status;
    return error;
}

// Trims and validates an optional string field; returns undefined when not provided
const normalizeField = (value, field, { maxLength, lowercase = false } = {}) => {
    if (value === undefined || value === null) return undefined;
    if (typeof value !== 'string') throw badRequest(`${field} must be a string`);
    const trimmed = value.trim();
    if (maxLength && trimmed.length === 0) throw badRequest(`${field} should not be empty`);
    if (maxLength && trimmed.length > maxLength) {
        throw badRequest(`${field} should not exceed more than ${maxLength} character`);
    }
    return lowercase ? trimmed.toLowerCase() : trimmed;
}

const updateRepo = async (id, { name, slug, description } = {}) => {
    if (!id) throw badRequest('id is required');

    const categoryName = normalizeField(name, 'name', { maxLength: 100, lowercase: true });
    const categorySlug = normalizeField(slug, 'slug', { maxLength: 100, lowercase: true });
    const categoryDescription = normalizeField(description, 'description');

    if (categoryName === undefined && categorySlug === undefined && categoryDescription === undefined) {
        throw badRequest('At least one of name, slug or description is required');
    }

    const existing = await categoriesRepository.categoryDetail(id);
    if (!existing) throw badRequest('Category not found', 404);

    if (categoryName !== undefined && categoryName !== existing.name) {
        const duplicate = await categoriesRepository.existingCategory(categoryName);
        if (duplicate && duplicate.id !== id) throw badRequest('Category already present');
    }

    return categoriesRepository.updateCategory({
        name: categoryName ?? null,
        slug: categorySlug ?? null,
        description: categoryDescription ?? null,
        id,
    });
}

const allCategories = async()=>{
    const result = categoriesRepository.getAllRepo();
    return result;
}




module.exports = { createRepo, getRepoById, updateRepo,allCategories};