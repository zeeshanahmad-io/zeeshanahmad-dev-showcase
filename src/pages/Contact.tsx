import React from 'react';
import ContactSection from '@/components/ContactSection';
import { motion } from 'framer-motion';

const Contact = () => {
    return (
        <div className="min-h-screen bg-background pt-10 pb-32">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <ContactSection />
            </motion.div>
        </div>
    );
};

export default Contact;
