import React, { useEffect, useState, useRef } from 'react';
import { Languages } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' }
  ];
  useEffect(() => {
    // Handle outside clicks
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // Add event listener when dropdown is open
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    // Clean up the event listener
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      /* Hide all Google Translate UI elements */
      .goog-te-banner-frame, 
      .goog-te-balloon-frame, 
      #goog-gt-tt, 
      .goog-te-bubble-frame, 
      .goog-tooltip, 
      .skiptranslate,
      .goog-te-gadget-icon,
      iframe[name="googleTranslateElementInit"],
      .VIpgJd-ZVi9od-l4eHX-hSRGPd {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
        height: 0 !important;
        width: 0 !important;
        position: absolute !important;
        top: -9999px !important;
      }
      
      /* Restore document body position */
      body {
        top: 0 !important;
        position: static !important;
      }
      
      /* Hide Google branding text */
      .goog-te-gadget {
        font-size: 0 !important;
        color: transparent !important;
      }
      
      /* Remove highlight styling */
      .goog-text-highlight {
        background-color: transparent !important;
        box-shadow: none !important;
        border: none !important;
      }
      
      /* Prevent hover tooltip/highlighting effect */
      .goog-tooltip,
      .goog-tooltip:hover {
        display: none !important;
      }
      
      .goog-text-highlight,
      .goog-text-highlight:hover {
        background-color: transparent !important;
        border: none !important;
        box-shadow: none !important;
      }
      
      /* Target the specific hover behavior */
      *[data-preoriginal]:hover::after,
      *[data-postoriginal]:hover::after {
        display: none !important;
        visibility: hidden !important;
      }
      
      /* Additional selectors to target hover translations */
      #goog-gt-,
      .goog-te-menu-value:hover,
      div#goog-gt- {
        display: none !important;
        visibility: hidden !important;
      }
      
      /* Disable all tooltips */
      [data-preoriginal],
      [data-postoriginal],
      [data-original] {
        position: relative !important;
      }
      
      [data-preoriginal]::after,
      [data-postoriginal]::after,
      [data-original]::after {
        display: none !important;
        content: none !important;
      }
    `;
    document.head.appendChild(style);

    const disableTranslateHoverEffects = () => {
      // Remove data attributes that Google Translate adds for hover effects
      document.querySelectorAll('[data-preoriginal], [data-postoriginal], [data-original]').forEach(el => {
        el.removeAttribute('data-preoriginal');
        el.removeAttribute('data-postoriginal');
        el.removeAttribute('data-original');
      });

      // Also remove any tooltip elements that might have been created
      document.querySelectorAll('.goog-tooltip').forEach(el => {
        if (el) el.remove();
      });
    };

    const cleanupInterval = setInterval(() => {
      document.querySelectorAll('.skiptranslate, .goog-te-banner-frame, #google_translate_element font').forEach(el => {
        if (el) {
          el.style.display = 'none';
          el.style.visibility = 'hidden';
          el.setAttribute('aria-hidden', 'true');
        }
      });

      if (document.body.style.top !== '0px' && document.body.style.top !== '') {
        document.body.style.top = '0px';
      }

      // Run the hover effect removal function
      disableTranslateHoverEffects();
    }, 300);

    const addGoogleTranslateScript = () => {
      if (!window.googleTranslateElementInit) {
        window.googleTranslateElementInit = () => {
          new window.google.translate.TranslateElement({
            pageLanguage: 'en',
            autoDisplay: false,
            includedLanguages: 'en,es,fr,de,zh-CN,id,tl',
            layout: google.translate.TranslateElement.InlineLayout.SIMPLE
          }, 'google_translate_element');
        };

        const script = document.createElement('script');
        script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.async = true;
        document.body.appendChild(script);
      }
    };

    // Override Google Translate's showTooltip function
    const overrideGoogleTranslateFunctions = () => {
      const checkInterval = setInterval(() => {
        if (window.google && window.google.translate) {
          if (window.google.translate.TranslateElement) {
            try {
              // Override tooltip function if it exists
              if (window.google.translate.TranslateElement.showTooltip) {
                window.google.translate.TranslateElement.showTooltip = function () { return false; };
              }
              if (window.google.translate.TranslateElement.showBubble) {
                window.google.translate.TranslateElement.showBubble = function () { return false; };
              }
              clearInterval(checkInterval);
            } catch (e) {
              console.error('Failed to override Google Translate functions:', e);
            }
          }
        }
      }, 1000);

      // Clear interval after 10 seconds to prevent memory leaks
      setTimeout(() => clearInterval(checkInterval), 10000);
    };

    addGoogleTranslateScript();
    overrideGoogleTranslateFunctions();

    return () => {
      clearInterval(cleanupInterval);
    };
  }, []);

  const changeLanguage = (languageCode) => {
    if (window.google && window.google.translate) {
      const cookieName = 'googtrans';
      const cookieValue = `/auto/${languageCode}`;
      const domain = window.location.hostname;

      document.cookie = `${cookieName}=${cookieValue}; domain=${domain}; path=/;`;

      if (domain.indexOf('.') !== -1) {
        const rootDomain = domain.substring(domain.indexOf('.'));
        document.cookie = `${cookieName}=${cookieValue}; domain=${rootDomain}; path=/;`;
      }

      try {
        const select = document.querySelector('select.goog-te-combo');
        if (select) {
          select.value = languageCode;
          select.dispatchEvent(new Event('change'));
        }
      } catch (e) {
        console.error('Error changing language:', e);
      }

      // Force immediate cleanup of hover effects
      document.querySelectorAll('[data-preoriginal], [data-postoriginal], [data-original]').forEach(el => {
        el.removeAttribute('data-preoriginal');
        el.removeAttribute('data-postoriginal');
        el.removeAttribute('data-original');
      });

      window.location.reload();
    }

    setIsOpen(false);
  };

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    // Added fixed positioning with higher z-index to prevent overlap
    <div className="fixed top-4 left-4 z-50" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-center p-2 rounded-full bg-white hover:bg-blue-50 text-gray-500 hover:text-blue-500 transition-colors duration-300 shadow-md border border-gray-100 focus:outline-none"
        aria-label="Select language"
      >
        <Languages className="w-4 h-4" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="dropdown"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="absolute top-full mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 left-0"
          >
            <div className="py-1 max-h-60 overflow-y-auto">
              {languages.map((language) => (
                <button
                  key={language.code}
                  className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  onClick={() => changeLanguage(language.code)}
                >
                  {language.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        id="google_translate_element"
        style={{ display: 'none', visibility: 'hidden' }}
      ></div>
    </div>
  );
};

export default LanguageSelector;