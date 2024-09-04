import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function ProductDetail() {
    const router = useRouter();
    const { id } = router.query;
    const [product, setProduct] = useState(null);

    useEffect(() => {
        if (id) {
            fetch(`https://fakestoreapi.com/products/${id}`)
                .then(response => response.json())
                .then(data => setProduct(data))
                .catch(error => console.error('Error fetching product:', error));
        }
    }, [id]);

    if (!product) return <div>Loading...</div>;

    return (
        <div>
            <h1>{product.title}</h1>
            <img src={product.image} alt={product.title} />
            <p>${product.price}</p>
            <p>{product.description}</p>
       
        </div>
    );
}

export default ProductDetail;
