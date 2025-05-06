import React, { useState, useEffect } from 'react';

function App() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading]     = useState(true);
    const [error, setError]         = useState(null);

    const [name, setName]                 = useState('');
    const [description, setDescription]   = useState('');
    const [price, setPrice]               = useState('');
    const [stockQuantity, setStockQuantity] = useState('');
    const [brandID, setBrandID]           = useState('');
    const [categoryID, setCategoryID]     = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Send the form data to the backend
        await fetch('/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name,
                description,
                price: parseFloat(price),
                stockquantity: parseInt(stockQuantity, 10),
                brandid: parseInt(brandID, 10),
                categoryid: parseInt(categoryID, 10),
            }),
        });
        // Reload the page to fetch the updated list
        window.location.reload();
    };


    useEffect(() => {
        fetch('/products')
            .then(res => {
                if (!res.ok) throw new Error(`Status ${res.status}`);
                return res.json();
            })
            .then(setProducts)
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Loading…</p>;
    if (error)   return <p style={{color:'red'}}>Error: {error}</p>;
    if (!products.length) return <p>No products yet.</p>;

    return (
        <div style={{padding: 20}}>
            <form onSubmit={handleSubmit} style={{marginBottom: 20}}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Stock Quantity"
                    value={stockQuantity}
                    onChange={e => setStockQuantity(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Brand ID"
                    value={brandID}
                    onChange={e => setBrandID(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Category ID"
                    value={categoryID}
                    onChange={e => setCategoryID(e.target.value)}
                />
                <button type="submit">Add Product</button>
            </form>

            <h1>Products</h1>
            <ul>
                {products.map(p => (
                    <li key={p.productid}>
                        {p.name} — ${p.price} × {p.stockquantity}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
