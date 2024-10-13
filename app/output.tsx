import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { readString } from 'react-native-csv';
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/chat';
import OPENAI_API_KEY from "./key";

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const keyword = "acne-prone oily";
const productTypes = ["Cleanser", "Moisturiser", "Toner", "Exfoliator", "Oil", "Serum"];
const acne = "blackheads pustules";
const confidence1 = "0.4";
const confidence2 = "0.8";

interface Product {
  product_name: string;
  ingredients: string;
}

const parseCSV = async (url: string, type: string): Promise<Product[]> => {
  try {
    const response = await fetch(url);
    const csvData = await response.text();

    const parseResult = readString(csvData, {
      header: true,
      skipEmptyLines: true,
    });

    const products: Product[] = parseResult.data
      .filter((row: any) => row.product_type === type)
      .map((row: any) => ({
        product_name: row.product_name || '',
        ingredients: row.ingredients || '',
      }));
    console.log(`Parsed ${products.length} ${type} products`);
    return products;
  } catch (error) {
    console.error('Error parsing CSV:', error);
    return [];
  }
};

async function getProductRecommendations(products: Product[], keyword: string, numRecommendations: number = 20): Promise<[string, number][]> {
  const recommendations: [string, number][] = [];

  const productsString = products.map(product =>
    `Product Name: ${product.product_name}\nIngredients: ${product.ingredients}`
  ).join('\n\n');

  const messages: ChatCompletionMessageParam[] = [
    { role: "system", content: "You are a helpful assistant that evaluates skincare products." },
    {
      role: "user", content: `Given the following products and their ingredients:

${productsString}

For each product, evaluate how suitable it is for ${keyword} skin.
The user has a predicted confidence value of ${confidence1} for having blackheads, and has a predicted 
confidence value of ${confidence2} for having pustules. 
Can you account for these confidence values and use them to help you score the values?
Provide a score from 0 to 10 for each product, where 0 is not suitable at all and 10 is extremely suitable.
Score these with decimal values with intervals of 0.5.
Return the results in the following format:
Product Name: Score

Only include the product names and scores, nothing else.`
    }
  ];

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: messages,
    max_tokens: 500,
    n: 1,
    temperature: 0.5,
  });

  const content = response.choices[0].message.content?.trim() || "";
  const lines = content.split('\n');

  for (const line of lines) {
    const [productName, scoreStr] = line.split(':');
    if (productName && scoreStr) {
      const score = parseFloat(scoreStr.trim());
      if (!isNaN(score)) {
        recommendations.push([productName.trim(), score]);
      }
    }
  }

  // Sort recommendations by score in descending order
  recommendations.sort((a, b) => b[1] - a[1]);

  return recommendations.slice(0, numRecommendations);
}

export default function InsertScreen() {
  const [recommendations, setRecommendations] = useState<{ [key: string]: [string, number][] }>({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(productTypes[0]);

  useEffect(() => {
    async function loadRecommendations() {
      const csvUrl = 'https://raw.githubusercontent.com/aaronmpark/hackathon/refs/heads/main/src/assets/skincare_products_clean.csv';
      const allRecommendations: { [key: string]: [string, number][] } = {};

      for (const type of productTypes) {
        const loadedProducts = await parseCSV(csvUrl, type);
        const productRecommendations = await getProductRecommendations(loadedProducts, keyword);
        allRecommendations[type] = productRecommendations;
      }

      setRecommendations(allRecommendations);
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
    <View style={styles.container}>
      <Text style={styles.header}>Product Recommendations for {keyword} Skin</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabContainer}>
        {productTypes.map((type) => (
          <TouchableOpacity
            key={type}
            style={[styles.tab, activeTab === type && styles.activeTab]}
            onPress={() => setActiveTab(type)}
          >
            <Text style={[styles.tabText, activeTab === type && styles.activeTabText]}>{type}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <ScrollView style={styles.recommendationsContainer}>
        {recommendations[activeTab]?.map((recommendation, index) => (
          <View key={index} style={styles.productCard}>
            <Text style={styles.productName}>{recommendation[0]}</Text>
            <Text style={styles.score}>Suitability Score: {recommendation[1].toFixed(1)}/10</Text>
          </View>
        ))}
      </ScrollView>
    </View>
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
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#34495e',
  },
  activeTab: {
    backgroundColor: '#3498db',
  },
  tabText: {
    color: '#ecf0f1',
    fontSize: 16,
  },
  activeTabText: {
    fontWeight: 'bold',
  },
  recommendationsContainer: {
    flex: 1,
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