import React from 'react';
import ProductCard from "../../components/casherComponents/ProductCard";

const PRODUCTS = [
    { id: 1, name: "Double Cheeseburger", price: 12.0, desc: "Double beef patty, cheddar...", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500" },
    { id: 2, name: "Margherita Pizza", price: 14.5, desc: "Tomato sauce, mozzarella...", image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=500" },
    { id: 3, name: "Spicy Wings", price: 9.0, desc: "6pcs buffalo sauce...", image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=500" },
    { id: 4, name: "Cola", price: 3.0, desc: "Refreshing beverage", image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500" },
];

export default function CasherHomePage() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {PRODUCTS.map((p) => (
                <ProductCard key={p.id} product={p} />
            ))}
        </div>
    );
}