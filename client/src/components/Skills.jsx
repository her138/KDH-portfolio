// src/components/Skills.jsx
import React from 'react';
import { motion } from 'framer-motion';
import {
    SiReact,
    SiNextdotjs,
    SiTypescript,
    SiTailwindcss,
    SiJavascript,
    SiHtml5,
    SiCss3,
    SiNodedotjs,
    SiExpress,
    SiMongodb,
    SiMysql,
    SiPhp,
    SiFigma,
    SiAdobeillustrator,
    SiAdobephotoshop,
    SiGithub,
    SiVisualstudiocode,
    SiVercel,
} from 'react-icons/si';

const Skills = () => {
    const skills = [
        // Frontend
        { name: 'React', icon: SiReact, color: '#61DAFB' },
        { name: 'Next.js', icon: SiNextdotjs, color: '#000000' },
        { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
        { name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4' },
        { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
        { name: 'HTML5', icon: SiHtml5, color: '#E34F26' },
        { name: 'CSS3', icon: SiCss3, color: '#1572B6' },

        // Backend
        { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
        { name: 'Express', icon: SiExpress, color: '#000000' },
        { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
        { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
        { name: 'PHP', icon: SiPhp, color: '#777BB4' },

        // Design
        { name: 'Figma', icon: SiFigma, color: '#F24E1E' },
        { name: 'Illustrator', icon: SiAdobeillustrator, color: '#FF9A00' },
        { name: 'Photoshop', icon: SiAdobephotoshop, color: '#31A8FF' },

        // Tools
        { name: 'GitHub', icon: SiGithub, color: '#181717' },
        { name: 'VS Code', icon: SiVisualstudiocode, color: '#007ACC' },
        { name: 'Vercel', icon: SiVercel, color: '#000000' },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.4
            }
        }
    };

    return (
        <section id="skills" className="section-padding">
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-title block text-center mb-4">EXPERTISE</span>
                    <h2 className="font-playfair text-4xl font-semibold text-center mb-16">Technologies & Languages</h2>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 justify-items-center"
                    >
                        {skills.map((skill) => {
                            const IconComponent = skill.icon;
                            return (
                                <motion.div
                                    key={skill.name}
                                    variants={itemVariants}
                                >
                                    <div className="skill-button">
                                        <IconComponent size={28} style={{ color: skill.color }} />
                                        <span className="text-xs">{skill.name}</span>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;