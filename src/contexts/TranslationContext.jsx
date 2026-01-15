import React, { createContext, useState, useContext, useEffect } from "react";
import { BASE_URL } from "@/lib/constants";

const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
    const [locale, setLocale] = useState(localStorage.getItem("selectedLanguage") || "en");
    const [translations, setTranslations] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTranslations(locale);
    }, [locale]);

    const fetchTranslations = async (lang) => {
        setLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/translations/${lang}`);
            if (response.ok) {
                const data = await response.json();
                setTranslations(data);
            } else {
                console.error("Failed to fetch translations");
            }
        } catch (error) {
            console.error("Translation error:", error);
        } finally {
            setLoading(false);
        }
    };

    const changeLanguage = (lang) => {
        setLocale(lang);
        localStorage.setItem("selectedLanguage", lang);
        // document.documentElement.lang = lang; // handled by Settings or here
    };

    // Helper to get nested keys, e.g. t('auth.login.title')
    const t = (key, defaultText = "") => {
        // If backend returns flat keys or nested, adapt here.
        // Assuming backend returns flat JSON or standard Laravel nested structure if we parse it.
        // For now, let's assume flat or simple 1-level for simplicity, or handle nested.

        // Check direct key
        if (translations[key]) return translations[key];

        // Check nested key "section.key"
        const keys = key.split('.');
        let value = translations;
        for (const k of keys) {
            value = value?.[k];
        }

        return value || defaultText || key;
    };

    return (
        <TranslationContext.Provider value={{ locale, changeLanguage, t, loading }}>
            {children}
        </TranslationContext.Provider>
    );
};

export const useTranslation = () => useContext(TranslationContext);
