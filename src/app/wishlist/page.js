'use client';
import React, { useEffect, useState } from 'react';
import Classes from './Wishlist.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function Wishlist() {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWishlistProducts = async () => {
            try {
                const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
                if (storedWishlist.length > 0) {
                   
                    const productDetailsPromises = storedWishlist.map(productId =>
                        fetch(`https://fakestoreapi.com/products/${productId}`).then(response => response.json())
                    );
                    const products = await Promise.all(productDetailsPromises);
                    setWishlistItems(products);
                } else {
                    setWishlistItems([]);
                }
            } catch (error) {
                setError('Failed to fetch wishlist products.');
            } finally {
                setLoading(false);
            }
        };

        fetchWishlistProducts();
    }, []);

    const handleRemoveFromWishlist = (productId) => {
        
        const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        const updatedWishlist = storedWishlist.filter(itemId => itemId !== productId);
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
        

        setWishlistItems(wishlistItems.filter(item => item.id !== productId));
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className={Classes.wishlistContainer}>
            <h1>My Wishlist</h1>
            {wishlistItems.length > 0 ? (
                <div className={Classes.productContainer}>
                    {wishlistItems.map((product) => (
                        <div key={product.id} className={Classes.productCard}>
                            <img src={product.image} alt={product.title} className={Classes.productImage} />
                            <div className={Classes.productInfo}>
                                <h2 className={Classes.productTitle}>{product.title}</h2>
                                <p className={Classes.productPrice}>${product.price}</p>
                                <button
                                    className={Classes.removeButton}
                                    onClick={() => handleRemoveFromWishlist(product.id)}
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Your wishlist is empty.</p>
            )}
        </div>
    );
}
