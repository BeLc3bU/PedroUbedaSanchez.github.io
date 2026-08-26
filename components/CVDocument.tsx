"use client";

import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import { portfolioData } from "@/data/portfolio";
import { locales, type Locale } from "@/data/locales";

const styles = StyleSheet.create({
    page: {
        flexDirection: "column",
        backgroundColor: "#FAFAFA",
        padding: 30,
        fontFamily: "Helvetica",
    },
    header: {
        flexDirection: "row",
        marginBottom: 15,
        paddingBottom: 15,
        borderBottomWidth: 2,
        borderBottomColor: "#06B6D4",
    },
    avatar: {
        width: 70,
        height: 90,
        marginRight: 15,
        objectFit: "cover",
        borderRadius: 5,
    },
    headerInfo: {
        flex: 1,
    },
    name: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#0E7490",
        marginBottom: 4,
    },
    title: {
        fontSize: 11,
        fontWeight: "bold",
        color: "#0891B2",
        marginBottom: 6,
    },
    contact: {
        fontSize: 9,
        color: "#64748B",
        marginBottom: 2,
    },
    link: {
        fontSize: 9,
        color: "#0891B2",
    },
    statsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 15,
        gap: 10,
    },
    statBox: {
        flex: 1,
        backgroundColor: "#ECFEFF",
        borderWidth: 1,
        borderColor: "#06B6D4",
        borderRadius: 8,
        padding: 10,
        alignItems: "center",
    },
    statIcon: {
        fontSize: 20,
        marginBottom: 5,
    },
    statValue: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#0E7490",
        marginBottom: 2,
    },
    statLabel: {
        fontSize: 8,
        color: "#0891B2",
        textAlign: "center",
    },
    section: {
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 13,
        fontWeight: "bold",
        color: "#0E7490",
        marginBottom: 6,
        paddingBottom: 3,
        borderBottomWidth: 1,
        borderBottomColor: "#06B6D4",
    },
    text: {
        fontSize: 10,
        color: "#334155",
        marginBottom: 3,
        lineHeight: 1.4,
    },
    jobTitle: {
        fontSize: 11,
        fontWeight: "bold",
        color: "#1E293B",
    },
    company: {
        fontSize: 10,
        color: "#0891B2",
        marginBottom: 3,
    },
    period: {
        fontSize: 9,
        color: "#64748B",
        marginBottom: 3,
    },
    bullet: {
        fontSize: 10,
        color: "#334155",
        marginLeft: 8,
        marginBottom: 2,
        lineHeight: 1.4,
    },
    skillsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 4,
    },
    skill: {
        fontSize: 8,
        backgroundColor: "#CFFAFE",
        color: "#0E7490",
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 3,
    },
    competency: {
        fontSize: 8,
        backgroundColor: "#E0F2FE",
        color: "#0369A1",
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 3,
    },
    educationItem: {
        marginBottom: 5,
    },
    educationTitle: {
        fontSize: 10,
        fontWeight: "bold",
        color: "#1E293B",
    },
    educationDetail: {
        fontSize: 9,
        color: "#64748B",
    },
    honorsItem: {
        fontSize: 10,
        color: "#0E7490",
        marginBottom: 2,
    },
    pageNumber: {
        position: "absolute",
        bottom: 15,
        left: 0,
        right: 0,
        textAlign: "center",
        fontSize: 9,
        color: "#94A3B8",
    },
    grid3: {
        flexDirection: "row",
        gap: 12,
    },
    gridColumn: {
        flex: 1,
    },
});

interface CVDocumentProps {
    locale?: Locale;
}

const CVDocument = ({ locale = "es" }: CVDocumentProps) => {
    const t = locales[locale] || locales.es;

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Image src={portfolioData.avatar} style={styles.avatar} />
                    <View style={styles.headerInfo}>
                        <Text style={styles.name}>{portfolioData.name}</Text>
                        <Text style={styles.title}>{portfolioData.title}</Text>
                        <Text style={styles.contact}>{portfolioData.social.email}</Text>
                        <Text style={styles.link}>{portfolioData.social.linkedin}</Text>
                        <Text style={styles.link}>{portfolioData.social.github}</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{t.about.title}</Text>
                    <Text style={styles.text}>{t.about.bio1}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{t.experience.title}</Text>
                    {t.experience.items.map((exp) => (
                        <View key={exp.id} style={{ marginBottom: 8 }}>
                            <Text style={styles.jobTitle}>{exp.title}</Text>
                            <Text style={styles.company}>{exp.company}</Text>
                            <Text style={styles.period}>
                                {exp.period} - {exp.location}
                            </Text>
                            {exp.highlights.map((highlight, i) => (
                                <Text key={i} style={styles.bullet}>
                                    • {highlight}
                                </Text>
                            ))}
                            <Text style={{ fontSize: 8, color: "#64748B", marginTop: 2 }}>
                                {locale === "es" ? "Tecnologías: " : "Technologies: "}
                                {exp.technologies.join(", ")}
                            </Text>
                        </View>
                    ))}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{t.education.title}</Text>
                    {t.education.certifications.map((cert, i) => (
                        <View key={i} style={styles.educationItem}>
                            <Text style={styles.educationTitle}>{cert.title}</Text>
                            <Text style={styles.educationDetail}>
                                {cert.institution} {cert.year && `- ${cert.year}`}
                            </Text>
                        </View>
                    ))}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{t.education.honorsTitle}</Text>
                    {t.education.honors.map((honor, i) => (
                        <Text key={i} style={styles.honorsItem}>
                            ★ {honor.title} {honor.institution && `- ${honor.institution}`}
                        </Text>
                    ))}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{t.skills.technicalTitle}</Text>
                    <View style={styles.skillsContainer}>
                        {t.skills.tools.map((skill, i) => (
                            <Text key={i} style={styles.skill}>
                                {skill}
                            </Text>
                        ))}
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{t.skills.competenciesTitle}</Text>
                    <View style={styles.skillsContainer}>
                        {t.skills.competencies.map((skill, i) => (
                            <Text key={i} style={styles.competency}>
                                {skill}
                            </Text>
                        ))}
                    </View>
                </View>

                <View style={styles.grid3}>
                    <View style={styles.gridColumn}>
                        <Text style={[styles.sectionTitle, { fontSize: 11 }]}>
                            {t.cv.additionalInfo}
                        </Text>
                        <Text style={styles.text}>• {t.cv.availability}</Text>
                        <Text style={styles.text}>• {t.cv.vehicle}</Text>
                        <Text style={styles.text}>• {t.cv.spanish}</Text>
                        <Text style={styles.text}>• {t.cv.english}</Text>
                    </View>
                    <View style={styles.gridColumn}>
                        <Text style={[styles.sectionTitle, { fontSize: 11 }]}>
                            {t.about.hobbiesTitle}
                        </Text>
                        {t.about.hobbies.map((hobby, i) => (
                            <Text key={i} style={styles.text}>
                                • {hobby}
                            </Text>
                        ))}
                    </View>
                </View>

                <Text
                    style={styles.pageNumber}
                    render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
                    fixed
                />
            </Page>
        </Document>
    );
};

export default CVDocument;
