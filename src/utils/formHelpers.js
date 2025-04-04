export const getInitialFormData = (product = {}) => ({
    name: product.name || '',
    price: product.price || '',
    category: product.category || '',
    stock: product.stock || '',
    description: product.description || '',
    image_url: product.image_url || ''
  });