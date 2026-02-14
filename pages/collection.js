import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";
export default function CollectionPage() {
    const router = useRouter();
    useEffect(() => {
        router.push("/collections")
    }, [router]);
    return (
        <></>
    )
}
