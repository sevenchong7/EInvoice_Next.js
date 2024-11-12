'use client'
import { useEffect } from "react";

export default function Page() {
    const closeWindow = () => {
        window.close()
    }
    useEffect(() => {
        closeWindow()
        // Check if the window was opened by another window (i.e., not navigated directly)
        if (window.opener) {
            // Window was opened via JavaScript, so it can be safely closed
            closeWindow()
        } else {
            // The user navigated directly to this page, so you can't close it
            // You can guide them to close it manually or handle the flow differently
            console.log("This page cannot be closed automatically.");
            alert("Please close this tab.");
        }
    }, []);

    return null; // Nothing to render as you only want to close the page
}
