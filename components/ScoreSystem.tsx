import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { readString } from 'react-native-csv'
import Papa from 'papaparse';
import OpenAI from 'openai';
import * as FileSystem from 'expo-file-system';
import * as dotenv from 'dotenv';
import { ChatCompletionMessageParam } from 'openai/resources/chat';
import React, { useState, useEffect } from 'react';
dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const keyword = "acne-prone";

interface Product {
    product_name: string;
    ingredients: string;
}

const parseCSV = async (url: string): Promise<Product[]> => {
    try {
        const response = await fetch(url);
        const csvData = await response.text();

        const parseResult = await readString(csvData, {
            header: true,
            skipEmptyLines: true,
        });

        const products: Product[] = parseResult.data.map((row: any) => ({
            product_name: row.product_name || '',
            ingredients: row.ingredients || '',
        }));

        return products.slice(0, 5);
    } catch (error) {
        console.error('Error parsing CSV:', error);
        return [];
    }
};


async function getProductRecommendations(products: Promise<Product[]>, keyword: string, numRecommendations: number = 5): Promise<[string, number][]> {
    const recommendations: [string, number][] = [];

    for (const product of await products) {
        const messages: ChatCompletionMessageParam[] = [
            { role: "system", content: "You are a helpful assistant that evaluates skincare products." },
            {
                role: "user", content: `Given the following product ingredients: ${product.ingredients}
      How suitable is this product for ${keyword} skin? 
      Provide a score from 0 to 10, where 0 is not suitable at all and 10 is extremely suitable.
      Only return the numeric score.
    ` }
        ];

        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: messages,
            max_tokens: 1,
            n: 1,
            temperature: 0.5,
        });

        const score = parseFloat(response.choices[0].message.content?.trim() || "0");
        recommendations.push([product.product_name, score]);
    }

    // Sort recommendations by score in descending order
    recommendations.sort((a, b) => b[1] - a[1]);

    return recommendations.slice(0, numRecommendations);
}

export default function InsertScreen() {
    const [recommendations, setRecommendations] = useState<[string, number][]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadRecommendations() {
            const csvUrl = 'https://raw.githubusercontent.com/aaronmpark/hackathon/refs/heads/main/src/assets/skincare_products.csv';
            const loadedProducts = parseCSV(csvUrl);
            const productRecommendations = await getProductRecommendations(loadedProducts, keyword);
            setRecommendations(productRecommendations);
            setLoading(false);
        }
        loadRecommendations();
    }, []);

    if (loading) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Loading recommendations...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Product Recommendations for {keyword} Skin</Text>
            {recommendations.map((recommendation, index) => (
                <View key={index} style={styles.productCard}>
                    <Text style={styles.productName}>{recommendation[0]}</Text>
                    <Text style={styles.score}>Suitability Score: {recommendation[1].toFixed(1)}/10</Text>
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
        textAlign: 'center',
    },
    text: {
        color: '#fff',
        textAlign: 'center',
    },
    productCard: {
        backgroundColor: '#2c3e50',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ecf0f1',
        marginBottom: 5,
    },
    score: {
        color: '#bdc3c7',
        fontSize: 16,
        fontWeight: 'bold',
    },
});