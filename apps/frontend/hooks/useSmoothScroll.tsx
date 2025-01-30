"use client"
import { useEffect } from "react";

export const useSmoothScroll = () => {
    const headerHeight = (document.getElementById("site-header")?.clientHeight || 60); // Get the height of the header
    useEffect(() => {
        // Function to handle scroll with an offset
        const handleScroll = () => {
            const hash = window.location.hash;
            if (hash) {
                const targetElement = document.querySelector(hash);
                if (targetElement) {
                    const offset = headerHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
                    window.scrollTo({ top: targetPosition - 20, behavior: 'smooth' });
                }
            }
        };

        // Call the scroll adjustment when the page loads or when hash changes
        handleScroll();

        // Listen for changes in the URL hash
        const onHashChange = () => {
            handleScroll();
        };

        window.addEventListener('hashchange', onHashChange);

        return () => {
            window.removeEventListener('hashchange', onHashChange);
        };
    }, [headerHeight]);
}