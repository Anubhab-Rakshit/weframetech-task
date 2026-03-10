import axios from 'axios';

const MEDUSA_URL = process.env.MEDUSA_URL || 'http://localhost:9000';
const MEDUSA_API_KEY = process.env.MEDUSA_API_KEY;

export const syncToMedusa = async (productData: any) => {
  try {
    const { medusaId, title, price, slug, shortDescription } = productData;

    const medusaProduct = {
      title,
      handle: slug,
      description: shortDescription,
      // Simplified price logic for manual provider
      variants: [
        {
          title: 'Default Variant',
          prices: [
            {
              amount: price * 100, // Medusa uses cents
              currency_code: 'usd',
            },
          ],
          inventory_quantity: 100,
        },
      ],
    };

    if (medusaId) {
      // Update existing
      await axios.post(`${MEDUSA_URL}/admin/products/${medusaId}`, medusaProduct, {
        headers: {
          Authorization: `Bearer ${MEDUSA_API_KEY}`,
        },
      });
    } else {
      // Create new
      const response = await axios.post(`${MEDUSA_URL}/admin/products`, medusaProduct, {
        headers: {
          Authorization: `Bearer ${MEDUSA_API_KEY}`,
        },
      });
      return response.data.product.id;
    }
  } catch (error) {
    console.error('Error syncing to Medusa:', error);
  }
};
