'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styles from './Product.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import Arrow from '../../../public/Assets/arrow-left.png';
import TickIcon from '../../../public/Assets/tik.png';
import Image from 'next/image';

function Product({ searchQuery }) {
    const [products, setProducts] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedRating, setSelectedRating] = useState('');
    const [selectedFabrics, setSelectedFabrics] = useState([]);
    const [selectedSegments, setSelectedSegments] = useState([]);
    const [selectedSuitableFor, setSelectedSuitableFor] = useState([]);
    const [selectedRawMaterials, setSelectedRawMaterials] = useState([]);
    const [selectedPatterns, setSelectedPatterns] = useState([]);
    const [selectedJacketMaterials, setSelectedJacketMaterials] = useState([]);
    const [selectedSleeveLengths, setSelectedSleeveLengths] = useState([]);
    const [categoryOpen, setCategoryOpen] = useState(false);
    const [ratingOpen, setRatingOpen] = useState(false);
    const [fabricOpen, setFabricOpen] = useState(false);
    const [segmentOpen, setSegmentOpen] = useState(false);
    const [suitableForOpen, setSuitableForOpen] = useState(false);
    const [rawMaterialsOpen, setRawMaterialsOpen] = useState(false);
    const [patternOpen, setPatternOpen] = useState(false);
    const [jacketMaterialOpen, setJacketMaterialOpen] = useState(false);
    const [sleeveLengthOpen, setSleeveLengthOpen] = useState(false);
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const [sortOption, setSortOption] = useState('default');
    const [sortModalOpen, setSortModalOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    

    
    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(data => {
                setProducts(data);
                const uniqueCategories = [...new Set(data.map(product => product.category))];
                setCategories(uniqueCategories);
            
            })
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    useEffect(() => {
        const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        setWishlist(storedWishlist);
    }, []);

    
    const handleProductClick = (productId) => {
        const isLoggedIn = !!localStorage.getItem('token'); 
        if (isLoggedIn) {
            router.push(`/product/${productId}`); 
        } else {
            setShowModal(true);
        }
    };
  

    const handleCloseModal = () => setShowModal(false);

    const toggleWishlist = (productId) => {
        setWishlist(prevWishlist => {
            const updatedWishlist = prevWishlist.includes(productId)
                ? prevWishlist.filter(id => id !== productId)
                : [...prevWishlist, productId];

            localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
            return updatedWishlist;
        });
    };

    const handleCategoryChange = (e) => {
        const category = e.target.value;
        setSelectedCategories(prevCategories =>
            prevCategories.includes(category)
                ? prevCategories.filter(cat => cat !== category)
                : [...prevCategories, category]
        );
    };

    const handleRatingChange = (e) => {
        setSelectedRating(e.target.value);
    };

    const handleFabricChange = (e) => {
        const fabric = e.target.value;
        setSelectedFabrics(prevFabrics =>
            prevFabrics.includes(fabric)
                ? prevFabrics.filter(f => f !== fabric)
                : [...prevFabrics, fabric]
        );
    };

    const handleSegmentChange = (e) => {
        const segment = e.target.value;
        setSelectedSegments(prevSegments =>
            prevSegments.includes(segment)
                ? prevSegments.filter(seg => seg !== segment)
                : [...prevSegments, segment]
        );
    };

    const handleSuitableForChange = (e) => {
        const suitableFor = e.target.value;
        setSelectedSuitableFor(prevSuitableFor =>
            prevSuitableFor.includes(suitableFor)
                ? prevSuitableFor.filter(s => s !== suitableFor)
                : [...prevSuitableFor, suitableFor]
        );
    };

    const handleRawMaterialsChange = (e) => {
        const rawMaterial = e.target.value;
        setSelectedRawMaterials(prevRawMaterials =>
            prevRawMaterials.includes(rawMaterial)
                ? prevRawMaterials.filter(r => r !== rawMaterial)
                : [...prevRawMaterials, rawMaterial]
        );
    };

    const handlePatternChange = (e) => {
        const pattern = e.target.value;
        setSelectedPatterns(prevPatterns =>
            prevPatterns.includes(pattern)
                ? prevPatterns.filter(p => p !== pattern)
                : [...prevPatterns, pattern]
        );
    };

    const handleJacketMaterialChange = (e) => {
        const jacketMaterial = e.target.value;
        setSelectedJacketMaterials(prevJacketMaterials =>
            prevJacketMaterials.includes(jacketMaterial)
                ? prevJacketMaterials.filter(j => j !== jacketMaterial)
                : [...prevJacketMaterials, jacketMaterial]
        );
    };

    const handleSleeveLengthChange = (e) => {
        const sleeveLength = e.target.value;
        setSelectedSleeveLengths(prevSleeveLengths =>
            prevSleeveLengths.includes(sleeveLength)
                ? prevSleeveLengths.filter(s => s !== sleeveLength)
                : [...prevSleeveLengths, sleeveLength]
        );
    };

    const handleSortChange = (option) => {
        setSortOption(option);
        setSortModalOpen(false);
    };

    const filteredProducts = products
        .filter(product =>
            product.title && product.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .filter(product =>
            selectedCategories.length === 0 || selectedCategories.includes(product.category)
        )
        .filter(product =>
            selectedRating === '' || Math.floor(product.rating.rate) === Number(selectedRating)
        )
        .filter(product =>
            selectedFabrics.length === 0 || selectedFabrics.includes(product.fabric)
        )
        .filter(product =>
            selectedSegments.length === 0 || selectedSegments.includes(product.segment)
        )
        .filter(product =>
            selectedSuitableFor.length === 0 || selectedSuitableFor.includes(product.suitableFor)
        )
        .filter(product =>
            selectedRawMaterials.length === 0 || selectedRawMaterials.includes(product.rawMaterials)
        )
        .filter(product =>
            selectedPatterns.length === 0 || selectedPatterns.includes(product.pattern)
        )
        .filter(product =>
            selectedJacketMaterials.length === 0 || selectedJacketMaterials.includes(product.jacketMaterial)
        )
        .filter(product =>
            selectedSleeveLengths.length === 0 || selectedSleeveLengths.includes(product.sleeveLength)
        );

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortOption) {
            case 'priceLowToHigh':
                return a.price - b.price;
            case 'priceHighToLow':
                return b.price - a.price;
            case 'ratingHighToLow':
                return b.rating.rate - a.rating.rate;
            case 'ratingLowToHigh':
                return a.rating.rate - b.rating.rate;
            default:
                return 0;
        }
    });

    const renderStars = (rating) => {
        return (
            <>
                {Array.from({ length: 5 }, (_, index) => (
                    <span key={index} className={`${styles.star} ${index < rating ? styles.filled : ''}`}>&#9733;</span>
                ))}
            </>
        );
    };

    return (
        <div className={styles.container}>
            <div className={styles.separator}></div>
            <div className={styles.topBar}>
                <div className={styles.listItems}>
                    <span className={styles.itemCount}>{filteredProducts.length} Items</span>
                    <button
                        className={styles.hideSidebarButton}
                        onClick={() => setSidebarVisible(prev => !prev)}
                    >
                        {sidebarVisible ? 'HIDE FILTER' : 'SHOW FILTER'}
                    </button>
                </div>
                <div className={styles.sortContainer}>
                    <h4
                        onClick={() => setSortModalOpen(prev => !prev)}
                        className={styles.sortHeader}
                    >
                        RECOMMENDED
                        <Image src={Arrow} alt="Arrow" className={`${styles.arrow} ${sortModalOpen ? styles.arrowOpen : ''}`} />
                    </h4>
                    {sortModalOpen && (
                        <div className={styles.sortModal}>
                            {['default', 'priceLowToHigh', 'priceHighToLow', 'ratingHighToLow', 'ratingLowToHigh'].map(option => (
                                <div
                                    key={option}
                                    className={styles.sortOption}
                                    onClick={() => handleSortChange(option)}
                                >
                                    {option === sortOption && (
                                        <Image src={TickIcon} alt="Tick" className={styles.tickIcon} />
                                    )}
                                    {option === 'default' ? 'RECOMMENDED' : option.replace(/([A-Z])/g, ' $1').toUpperCase()}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className={styles.separator}></div>
            <div className={styles.mainSection}>
                {sidebarVisible && (
                    <div className={styles.filters}>
                        <h3>Filter By</h3>
                        <div className={styles.separator}></div>

                     
                        <div>
                            <h4 onClick={() => setCategoryOpen(prev => !prev)} className={styles.filterHeader}>
                                CATEGORY
                                <Image src={Arrow} alt="Arrow" className={`${styles.arrow} ${categoryOpen ? styles.arrowOpen : ''}`} />
                            </h4>
                            {categoryOpen && (
                                <div className={styles.filterContent}>
                                    {categories.map((category, index) => (
                                        <label key={index} className={styles.filterLabel}>
                                            <input
                                                type="checkbox"
                                                value={category}
                                                checked={selectedCategories.includes(category)}
                                                onChange={handleCategoryChange}
                                                className={styles.checkbox}
                                            />
                                            {category}
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Rating Filter */}
                        <div className={styles.separator}></div>
                        <div>
                            <h4 onClick={() => setRatingOpen(prev => !prev)} className={styles.filterHeader}>
                                RATING
                                <Image src={Arrow} alt="Arrow" className={`${styles.arrow} ${ratingOpen ? styles.arrowOpen : ''}`} />
                            </h4>
                            {ratingOpen && (
                                <div className={styles.filterContent}>
                                    {[1, 2, 3, 4, 5].map(rating => (
                                        <label key={rating} className={styles.filterLabel}>
                                            <input
                                                type="radio"
                                                name="rating"
                                                value={rating}
                                                checked={selectedRating === String(rating)}
                                                onChange={handleRatingChange}
                                                className={styles.radio}
                                            />
                                            {renderStars(rating)}
                                            {rating}
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>

                        
                        <div className={styles.separator}></div>
                        <div>
                            <h4 onClick={() => setFabricOpen(prev => !prev)} className={styles.filterHeader}>
                                FABRIC
                                <Image src={Arrow} alt="Arrow" className={`${styles.arrow} ${fabricOpen ? styles.arrowOpen : ''}`} />
                            </h4>
                            {fabricOpen && (
                                <div className={styles.filterContent}>
                                    {['Cotton', 'Silk', 'Wool', 'Linen', 'Velvet'].map(fabric => (
                                        <label key={fabric} className={styles.filterLabel}>
                                            <input
                                                type="checkbox"
                                                value={fabric}
                                                checked={selectedFabrics.includes(fabric)}
                                                onChange={handleFabricChange}
                                                className={styles.checkbox}
                                            />
                                            {fabric}
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Segment Filter */}
                        <div className={styles.separator}></div>
                        <div>
                            <h4 onClick={() => setSegmentOpen(prev => !prev)} className={styles.filterHeader}>
                                SEGMENT
                                <Image src={Arrow} alt="Arrow" className={`${styles.arrow} ${segmentOpen ? styles.arrowOpen : ''}`} />
                            </h4>
                            {segmentOpen && (
                                <div className={styles.filterContent}>
                                    {['Casual', 'Formal', 'Ethnic'].map(segment => (
                                        <label key={segment} className={styles.filterLabel}>
                                            <input
                                                type="checkbox"
                                                value={segment}
                                                checked={selectedSegments.includes(segment)}
                                                onChange={handleSegmentChange}
                                                className={styles.checkbox}
                                            />
                                            {segment}
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>

                        
                        <div className={styles.separator}></div>
                        <div>
                            <h4 onClick={() => setSuitableForOpen(prev => !prev)} className={styles.filterHeader}>
                                SUITABLE FOR
                                <Image src={Arrow} alt="Arrow" className={`${styles.arrow} ${suitableForOpen ? styles.arrowOpen : ''}`} />
                            </h4>
                            {suitableForOpen && (
                                <div className={styles.filterContent}>
                                    {['Men', 'Women', 'Kids'].map(suitableFor => (
                                        <label key={suitableFor} className={styles.filterLabel}>
                                            <input
                                                type="checkbox"
                                                value={suitableFor}
                                                checked={selectedSuitableFor.includes(suitableFor)}
                                                onChange={handleSuitableForChange}
                                                className={styles.checkbox}
                                            />
                                            {suitableFor}
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>

                        
                        <div className={styles.separator}></div>
                        <div>
                            <h4 onClick={() => setRawMaterialsOpen(prev => !prev)} className={styles.filterHeader}>
                                RAW MATERIALS
                                <Image src={Arrow} alt="Arrow" className={`${styles.arrow} ${rawMaterialsOpen ? styles.arrowOpen : ''}`} />
                            </h4>
                            {rawMaterialsOpen && (
                                <div className={styles.filterContent}>
                                    {['Cotton', 'Silk', 'Wool', 'Linen'].map(rawMaterial => (
                                        <label key={rawMaterial} className={styles.filterLabel}>
                                            <input
                                                type="checkbox"
                                                value={rawMaterial}
                                                checked={selectedRawMaterials.includes(rawMaterial)}
                                                onChange={handleRawMaterialsChange}
                                                className={styles.checkbox}
                                            />
                                            {rawMaterial}
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>

                        
                        <div className={styles.separator}></div>
                        <div>
                            <h4 onClick={() => setPatternOpen(prev => !prev)} className={styles.filterHeader}>
                                PATTERN
                                <Image src={Arrow} alt="Arrow" className={`${styles.arrow} ${patternOpen ? styles.arrowOpen : ''}`} />
                            </h4>
                            {patternOpen && (
                                <div className={styles.filterContent}>
                                    {['Solid', 'Pinstripes', 'Windowpane', 'Tartan'].map(pattern => (
                                        <label key={pattern} className={styles.filterLabel}>
                                            <input
                                                type="checkbox"
                                                value={pattern}
                                                checked={selectedPatterns.includes(pattern)}
                                                onChange={handlePatternChange}
                                                className={styles.checkbox}
                                            />
                                            {pattern}
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>

                        
                        <div className={styles.separator}></div>
                        <div>
                            <h4 onClick={() => setJacketMaterialOpen(prev => !prev)} className={styles.filterHeader}>
                                JACKET MATERIAL
                                <Image src={Arrow} alt="Arrow" className={`${styles.arrow} ${jacketMaterialOpen ? styles.arrowOpen : ''}`} />
                            </h4>
                            {jacketMaterialOpen && (
                                <div className={styles.filterContent}>
                                    {['Leather', 'Cotton', 'Velvet'].map(jacketMaterial => (
                                        <label key={jacketMaterial} className={styles.filterLabel}>
                                            <input
                                                type="checkbox"
                                                value={jacketMaterial}
                                                checked={selectedJacketMaterials.includes(jacketMaterial)}
                                                onChange={handleJacketMaterialChange}
                                                className={styles.checkbox}
                                            />
                                            {jacketMaterial}
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>

                    
                        <div className={styles.separator}></div>
                        <div>
                            <h4 onClick={() => setSleeveLengthOpen(prev => !prev)} className={styles.filterHeader}>
                                SLEEVE LENGTH
                                <Image src={Arrow} alt="Arrow" className={`${styles.arrow} ${sleeveLengthOpen ? styles.arrowOpen : ''}`} />
                            </h4>
                            {sleeveLengthOpen && (
                                <div className={styles.filterContent}>
                                    {['Half Sleeve', 'Full Sleeve', 'Cap Sleeve', 'Roll-Up Sleeve'].map(sleeveLength => (
                                        <label key={sleeveLength} className={styles.filterLabel}>
                                            <input
                                                type="checkbox"
                                                value={sleeveLength}
                                                checked={selectedSleeveLengths.includes(sleeveLength)}
                                                onChange={handleSleeveLengthChange}
                                                className={styles.checkbox}
                                            />
                                            {sleeveLength}
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>

                    </div>
                )}
                <div className={styles.productContainer}>
                    {sortedProducts.map(product => (
                        <div key={product.id} className={styles.productCard}>
                            <img src={product.image} alt={product.title} className={styles.productImage} />
                            <h2 className={styles.productTitle}>{product.title}</h2>
                            <p className={styles.productPrice}>${product.price}</p>
                            <div className={styles.productCardFooter}><Link href="#" ><span style={{textDecoration:"underline"}}>Sign in</span> or Create an account to see product details</Link>
                            <button
                                className={styles.wishlistButton}
                                onClick={() => toggleWishlist(product.id)}
                            >
                                <FontAwesomeIcon
                                    icon={wishlist.includes(product.id) ? solidHeart : regularHeart}
                                    className={styles.wishlistIcon}
                                />
                            </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Product;
